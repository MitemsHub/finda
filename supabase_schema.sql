-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  first_name text,
  last_name text,
  avatar_url text,
  role text check (role in ('user', 'business', 'admin')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories Table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Businesses Table
create table public.businesses (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) not null,
  name text not null,
  slug text unique,
  description text,
  category_id uuid references public.categories(id),
  category text, -- fallback or denormalized
  address text,
  phone text,
  email text,
  website text,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  rating numeric default 0,
  review_count integer default 0,
  verified boolean default false,
  image_url text,
  gallery text[], -- Array of image URLs
  features text[], -- Array of features
  latitude double precision,
  longitude double precision,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Reviews Table
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  business_id uuid references public.businesses(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, business_id) -- One review per user per business
);

-- 5. Bookings Table
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  business_id uuid references public.businesses(id) not null,
  service_name text not null,
  booking_date timestamp with time zone not null,
  status text check (status in ('pending', 'confirmed', 'completed', 'cancelled')) default 'pending',
  notes text,
  price numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Favorites Table
create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  business_id uuid references public.businesses(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, business_id)
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.reviews enable row level security;
alter table public.bookings enable row level security;
alter table public.favorites enable row level security;
alter table public.categories enable row level security;

-- RLS Policies

-- Profiles
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Categories
create policy "Categories are viewable by everyone." on categories for select using (true);
create policy "Only admins can insert/update categories." on categories for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Businesses
create policy "Businesses are viewable by everyone." on businesses for select using (true);
create policy "Business owners can update their own business." on businesses for update using (auth.uid() = owner_id);
create policy "Business owners can insert their own business." on businesses for insert with check (auth.uid() = owner_id);
create policy "Admins can update any business." on businesses for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Reviews
create policy "Reviews are viewable by everyone." on reviews for select using (true);
create policy "Authenticated users can create reviews." on reviews for insert with check (auth.role() = 'authenticated');
create policy "Users can delete their own reviews." on reviews for delete using (auth.uid() = user_id);

-- Bookings
create policy "Users can view their own bookings." on bookings for select using (auth.uid() = user_id);
create policy "Business owners can view bookings for their business." on bookings for select using (
  exists (select 1 from businesses where businesses.id = bookings.business_id and businesses.owner_id = auth.uid())
);
create policy "Users can create bookings." on bookings for insert with check (auth.uid() = user_id);
create policy "Users/Owners can update bookings." on bookings for update using (
  auth.uid() = user_id or 
  exists (select 1 from businesses where businesses.id = bookings.business_id and businesses.owner_id = auth.uid())
);

-- Favorites
create policy "Users can view their own favorites." on favorites for select using (auth.uid() = user_id);
create policy "Users can manage their own favorites." on favorites for all using (auth.uid() = user_id);

-- Storage (if not already enabled, this usually requires setup in dashboard, but policies help)
-- Create storage buckets logic is usually done via UI, but policies for 'storage.objects' can be defined here if needed.

-- Triggers

-- 1. Auto-update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_profiles_updated_at before update on profiles for each row execute procedure update_updated_at_column();
create trigger update_businesses_updated_at before update on businesses for each row execute procedure update_updated_at_column();
create trigger update_bookings_updated_at before update on bookings for each row execute procedure update_updated_at_column();

-- 2. Handle New User Signup (Auto-create Profile)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, avatar_url, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name', -- simplistic split for now, or just use full name
    '',
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
