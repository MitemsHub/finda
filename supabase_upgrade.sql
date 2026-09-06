-- ═══════════════════════════════════════════════════════════
-- finda — schema upgrade (run AFTER supabase_schema.sql)
-- Adds: business_services table, rating aggregation trigger,
-- RLS gap fixes, analytics columns, and seed categories.
-- ═══════════════════════════════════════════════════════════

-- ── 1. Services offered by businesses ──────────────────────
create table if not exists public.business_services (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  name text not null,
  description text,
  price_label text,        -- e.g. "$95", "Free", "From $500"
  duration text,           -- e.g. "60 min"
  position integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.business_services enable row level security;

create policy "Services are viewable by everyone."
  on public.business_services for select using (true);

create policy "Owners can manage their services."
  on public.business_services for all using (
    exists (
      select 1 from public.businesses
      where businesses.id = business_services.business_id
        and businesses.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.businesses
      where businesses.id = business_services.business_id
        and businesses.owner_id = auth.uid()
    )
  );

create policy "Admins can manage any services."
  on public.business_services for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── 2. Analytics columns for business dashboard ────────────
alter table public.businesses
  add column if not exists profile_views integer default 0,
  add column if not exists booking_count integer default 0,
  add column if not exists neighborhood text,
  add column if not exists price_level smallint default 2,
  add column if not exists tags text[] default '{}';

-- ── 3. Rating aggregation trigger ──────────────────────────
-- Keeps businesses.rating and review_count in sync with reviews.
create or replace function public.refresh_business_rating()
returns trigger as $$
declare
  bid uuid;
begin
  bid := coalesce(new.business_id, old.business_id);

  update public.businesses b
  set
    rating = coalesce((
      select round(avg(r.rating)::numeric, 2)
      from public.reviews r
      where r.business_id = bid
    ), 0),
    review_count = (
      select count(*)
      from public.reviews r
      where r.business_id = bid
    ),
    updated_at = now()
  where b.id = bid;

  return coalesce(new, old);
end;
$$ language plpgsql security definer;

drop trigger if exists reviews_rating_refresh on public.reviews;
create trigger reviews_rating_refresh
  after insert or update or delete on public.reviews
  for each row execute procedure public.refresh_business_rating();

-- Backfill existing businesses from review history
update public.businesses b
set
  rating = coalesce(stats.avg_rating, 0),
  review_count = coalesce(stats.cnt, 0)
from (
  select business_id, round(avg(rating)::numeric, 2) as avg_rating, count(*) as cnt
  from public.reviews
  group by business_id
) stats
where stats.business_id = b.id
  and (b.rating = 0 or b.review_count = 0);

-- ── 4. Booking status transitions guard ────────────────────
-- Prevents illegal status jumps (e.g. cancelled -> confirmed).
create or replace function public.guard_booking_status()
returns trigger as $$
begin
  if old.status = 'cancelled' and new.status <> 'cancelled' then
    raise exception 'A cancelled booking cannot change status again';
  end if;
  if old.status = 'completed' and new.status <> 'completed' then
    raise exception 'A completed booking is final';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists bookings_status_guard on public.bookings;
create trigger bookings_status_guard
  before update on public.bookings
  for each row
  when (old.status is distinct from new.status)
  execute procedure public.guard_booking_status();

-- ── 5. RLS gap fixes ───────────────────────────────────────
-- Review edits: users may update their own review within 48h (app-enforced),
-- and admins may moderate.
drop policy if exists "Users can update own reviews." on public.reviews;
create policy "Users can update own reviews."
  on public.reviews for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Admins can moderate reviews."
  on public.reviews for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Admins need to read profiles for moderation UIs (email/role).
drop policy if exists "Admins can view all profiles." on profiles;
create policy "Admins can view all profiles."
  on profiles for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Bookings: admins can view all for support purposes.
create policy "Admins can view all bookings."
  on bookings for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── 6. Seed categories ─────────────────────────────────────
insert into public.categories (name, slug, icon) values
  ('Restaurants', 'restaurants', 'utensils'),
  ('Cafés', 'cafes', 'mug-hot'),
  ('Beauty & Spas', 'beauty-spas', 'spa'),
  ('Health & Fitness', 'health-fitness', 'dumbbell'),
  ('Shopping', 'shopping', 'bag-shopping'),
  ('Automotive', 'automotive', 'car'),
  ('Home Services', 'home-services', 'screwdriver-wrench'),
  ('Nightlife', 'nightlife', 'martini-glass'),
  ('Health & Medical', 'health-medical', 'briefcase-medical')
on conflict (name) do nothing;

-- ── 7. Indexes for search performance ──────────────────────
create index if not exists idx_businesses_status on public.businesses (status);
create index if not exists idx_businesses_category on public.businesses (category_id);
create index if not exists idx_businesses_rating on public.businesses (rating desc);
create index if not exists idx_businesses_name_search on public.businesses using gin (to_tsvector('english', name));
create index if not exists idx_reviews_business on public.reviews (business_id);
create index if not exists idx_bookings_user on public.bookings (user_id);
create index if not exists idx_bookings_business on public.bookings (business_id);
create index if not exists idx_bookings_date on public.bookings (booking_date);
create index if not exists idx_favorites_user on public.favorites (user_id);
