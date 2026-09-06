-- ═══════════════════════════════════════════════════════════
-- finda — social schema (run AFTER supabase_schema.sql and upgrades)
-- Adds: follows + business_updates tables, RLS, and indexes.
-- Matches the demo social model:
--   business_updates.type:  offer | event | product | news
--   business_updates.scope: followers | public
-- ═══════════════════════════════════════════════════════════

-- ── 1. Follows ─────────────────────────────────────────────
create table if not exists public.follows (
  user_id uuid references public.profiles(id) on delete cascade not null,
  business_id uuid references public.businesses(id) on delete cascade not null,
  followed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, business_id)
);

alter table public.follows enable row level security;

create policy "Follows are visible to everyone."
  on public.follows for select using (true);

create policy "Users can follow businesses."
  on public.follows for insert with check (auth.uid() = user_id);

create policy "Users can unfollow businesses."
  on public.follows for delete using (auth.uid() = user_id);

-- ── 2. Business updates ────────────────────────────────────
create table if not exists public.business_updates (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  type text check (type in ('offer', 'event', 'product', 'news')) not null default 'news',
  text text not null,
  image_url text,
  scope text check (scope in ('followers', 'public')) not null default 'public',
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.business_updates enable row level security;

-- Public updates are visible to everyone; follower-only updates
-- are enforced in the query layer (join on follows) so this RLS
-- lets all rows through to the service client, which filters.
create policy "Updates are readable."
  on public.business_updates for select using (
    scope = 'public'
    or exists (
      select 1 from public.follows f
      where f.business_id = business_updates.business_id
        and f.user_id = auth.uid()
    )
    or exists (
      select 1 from public.businesses b
      where b.id = business_updates.business_id
        and b.owner_id = auth.uid()
    )
  );

create policy "Owners can post updates."
  on public.business_updates for insert with check (
    exists (
      select 1 from public.businesses b
      where b.id = business_updates.business_id
        and b.owner_id = auth.uid()
    )
  );

create policy "Owners can manage their updates."
  on public.business_updates for update using (
    exists (
      select 1 from public.businesses b
      where b.id = business_updates.business_id
        and b.owner_id = auth.uid()
    )
  );

create policy "Owners can delete their updates."
  on public.business_updates for delete using (
    exists (
      select 1 from public.businesses b
      where b.id = business_updates.business_id
        and b.owner_id = auth.uid()
    )
  );

create policy "Admins can manage all updates."
  on public.business_updates for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── 3. Indexes ─────────────────────────────────────────────
create index if not exists idx_follows_user on public.follows (user_id);
create index if not exists idx_follows_business on public.follows (business_id);
create index if not exists idx_updates_business on public.business_updates (business_id);
create index if not exists idx_updates_scope on public.business_updates (scope, created_at desc);
create index if not exists idx_updates_expires on public.business_updates (expires_at);
