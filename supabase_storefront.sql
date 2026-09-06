-- ═══════════════════════════════════════════════════════════
-- finda — storefront schema (run AFTER supabase_schema.sql and supabase_upgrade.sql)
-- Adds: orders + order_items tables, RLS policies, stock guard,
-- revenue view, and indexes. Matches the demo Order model:
--   fulfilment: pickup | delivery
--   payment:    paid | on_pickup | unpaid
--   status:     pending | confirmed | ready | completed | cancelled
-- ═══════════════════════════════════════════════════════════

-- ── 1. Orders ──────────────────────────────────────────────
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  business_id uuid references public.businesses(id) on delete cascade not null,
  fulfilment text check (fulfilment in ('pickup', 'delivery')) not null default 'pickup',
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  address text,
  note text,
  subtotal numeric(12,2) not null default 0,
  delivery_fee numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  payment text check (payment in ('paid', 'on_pickup', 'unpaid')) not null default 'unpaid',
  payment_reference text,           -- Flutterwave transaction reference
  status text check (status in ('pending', 'confirmed', 'ready', 'completed', 'cancelled')) not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ── 2. Order items (denormalized product snapshot) ─────────
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid,                  -- nullable: product may be deleted later
  name text not null,               -- snapshot at purchase time
  unit_price numeric(12,2) not null,
  quantity integer not null check (quantity > 0)
);

-- ── 3. Enable RLS ──────────────────────────────────────────
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Anyone (including guests) can create orders — checkout requires no account.
create policy "Anyone can place orders."
  on public.orders for insert with check (true);

-- Buyers see their own orders; owners see orders for their business.
create policy "Users can view own orders."
  on public.orders for select using (auth.uid() = user_id);

create policy "Owners can view orders for their business."
  on public.orders for select using (
    exists (
      select 1 from public.businesses
      where businesses.id = orders.business_id
        and businesses.owner_id = auth.uid()
    )
  );

create policy "Admins can view all orders."
  on public.orders for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Owners manage the lifecycle of orders for their business.
create policy "Owners can update their business orders."
  on public.orders for update using (
    exists (
      select 1 from public.businesses
      where businesses.id = orders.business_id
        and businesses.owner_id = auth.uid()
    )
  );

create policy "Admins can manage all orders."
  on public.orders for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Order items follow their parent order's visibility.
create policy "Order items follow order visibility."
  on public.order_items for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (o.user_id = auth.uid() or o.user_id is null)
    )
    or exists (
      select 1 from public.orders o
      join public.businesses b on b.id = o.business_id
      where o.id = order_items.order_id
        and b.owner_id = auth.uid()
    )
  );

create policy "Buyers can add items to their orders."
  on public.order_items for insert with check (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (o.user_id = auth.uid() or o.user_id is null)
    )
  );

-- ── 4. Guard order status transitions ──────────────────────
create or replace function public.guard_order_status()
returns trigger as $$
begin
  if old.status = 'cancelled' and new.status <> 'cancelled' then
    raise exception 'A cancelled order cannot change status again';
  end if;
  if old.status = 'completed' and new.status <> 'completed' then
    raise exception 'A completed order is final';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_status_guard on public.orders;
create trigger orders_status_guard
  before update on public.orders
  for each row
  when (old.status is distinct from new.status)
  execute procedure public.guard_order_status();

-- ── 5. Stock handling ──────────────────────────────────────
-- business_products table (from the products model): decrement on order,
-- restore on cancel. Safe for the case where stock is null (made to order).
create or replace function public.apply_order_stock()
returns trigger as $$
begin
  if TG_OP = 'INSERT' and new.status <> 'cancelled' then
    update public.business_products bp
    set stock = greatest(0, bp.stock - oi.quantity),
        sold_out = (greatest(0, bp.stock - oi.quantity) <= 0)
    from public.order_items oi
    where oi.order_id = new.id
      and bp.id = oi.product_id
      and bp.stock is not null;
  elsif TG_OP = 'UPDATE' and new.status = 'cancelled' and old.status <> 'cancelled' then
    update public.business_products bp
    set stock = coalesce(bp.stock, 0) + oi.quantity,
        sold_out = false
    from public.order_items oi
    where oi.order_id = new.id
      and bp.id = oi.product_id
      and bp.stock is not null;
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- NOTE: requires the business_products table (added below if missing).
create table if not exists public.business_products (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  name text not null,
  description text,
  price_label text not null,        -- display string, e.g. "₦4,500"
  price_value numeric(12,2) not null default 0,
  stock integer,                    -- null = made to order
  image_url text,
  sold_out boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.business_products enable row level security;

create policy "Products are viewable by everyone."
  on public.business_products for select using (true);

create policy "Owners can manage their products."
  on public.business_products for all using (
    exists (
      select 1 from public.businesses
      where businesses.id = business_products.business_id
        and businesses.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.businesses
      where businesses.id = business_products.business_id
        and businesses.owner_id = auth.uid()
    )
  );

create policy "Admins can manage any products."
  on public.business_products for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

drop trigger if exists orders_stock_apply on public.orders;
create trigger orders_stock_apply
  after insert or update of status on public.orders
  for each row
  execute procedure public.apply_order_stock();

-- ── 6. Revenue view for the business dashboard ─────────────
create or replace view public.business_order_stats as
select
  o.business_id,
  count(*) as order_count,
  count(*) filter (where o.status in ('pending', 'confirmed', 'ready')) as active_orders,
  coalesce(sum(o.total) filter (where o.status <> 'cancelled'), 0) as revenue
from public.orders o
group by o.business_id;

-- ── 7. Indexes ─────────────────────────────────────────────
create index if not exists idx_orders_business on public.orders (business_id);
create index if not exists idx_orders_user on public.orders (user_id);
create index if not exists idx_orders_status on public.orders (status);
create index if not exists idx_order_items_order on public.order_items (order_id);
create index if not exists idx_products_business on public.business_products (business_id);
