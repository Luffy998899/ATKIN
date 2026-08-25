-- ============================================================
--  ATIN HEALTHCARE PVT LTD  ·  Database schema
--  Run this once in Supabase → SQL Editor.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Admin allow-list. A Supabase Auth user must have a row here
-- to write content or read enquiries.
-- ------------------------------------------------------------
create table if not exists public.admins (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  created_at  timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as 'select exists (select 1 from public.admins a where a.id = auth.uid())';

-- ------------------------------------------------------------
-- Divisions (Cardiac-Diabetic, Gynae, Derma, Ortho, ...)
-- ------------------------------------------------------------
create table if not exists public.divisions (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  name                text not null,
  tagline             text,
  description         text,
  icon                text default 'pill',
  accent              text default '#0F5FBF',
  image_url           text,
  product_count_label text,
  sort_order          int not null default 0,
  is_active           boolean not null default true,
  created_at          timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Products
-- ------------------------------------------------------------
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  division_id  uuid references public.divisions(id) on delete set null,
  composition  text,
  form         text default 'Tablet',
  packing      text,
  category     text,
  description  text,
  indications  text[] default '{}',
  mrp          numeric(10,2),
  image_url    text,
  is_featured  boolean not null default false,
  is_active    boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists products_division_idx on public.products(division_id);
create index if not exists products_featured_idx on public.products(is_featured) where is_active;

-- ------------------------------------------------------------
-- Enquiries (franchise applications + contact + product enquiry)
-- ------------------------------------------------------------
create table if not exists public.enquiries (
  id           uuid primary key default gen_random_uuid(),
  kind         text not null default 'franchise' check (kind in ('franchise','contact','product')),
  full_name    text not null,
  email        text,
  phone        text not null,
  city         text,
  state        text,
  company      text,
  division     text,
  product_name text,
  experience   text,
  message      text,
  status       text not null default 'new' check (status in ('new','contacted','qualified','closed','spam')),
  source_path  text,
  created_at   timestamptz not null default now()
);

create index if not exists enquiries_created_idx on public.enquiries(created_at desc);
create index if not exists enquiries_status_idx  on public.enquiries(status);

-- ------------------------------------------------------------
-- Testimonials
-- ------------------------------------------------------------
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  company     text,
  location    text,
  quote       text not null,
  rating      int not null default 5 check (rating between 1 and 5),
  avatar_url  text,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Certifications / compliance badges
-- ------------------------------------------------------------
create table if not exists public.certifications (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  badge_url   text,
  sort_order  int not null default 0,
  is_active   boolean not null default true
);

-- ------------------------------------------------------------
-- Head-line numbers on the landing page
-- ------------------------------------------------------------
create table if not exists public.stats (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  value       numeric not null,
  suffix      text default '+',
  sort_order  int not null default 0,
  is_active   boolean not null default true
);

-- ============================================================
--  Row Level Security
-- ============================================================
alter table public.divisions      enable row level security;
alter table public.products       enable row level security;
alter table public.enquiries      enable row level security;
alter table public.testimonials   enable row level security;
alter table public.certifications enable row level security;
alter table public.stats          enable row level security;
alter table public.admins         enable row level security;

-- Public may read active / published content ------------------
drop policy if exists "public read divisions" on public.divisions;
create policy "public read divisions" on public.divisions
  for select using (is_active);

drop policy if exists "public read products" on public.products;
create policy "public read products" on public.products
  for select using (is_active);

drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials
  for select using (is_active);

drop policy if exists "public read certifications" on public.certifications;
create policy "public read certifications" on public.certifications
  for select using (is_active);

drop policy if exists "public read stats" on public.stats;
create policy "public read stats" on public.stats
  for select using (is_active);

-- Anyone may submit an enquiry; nobody anonymous may read one --
drop policy if exists "anon insert enquiries" on public.enquiries;
create policy "anon insert enquiries" on public.enquiries
  for insert with check (true);

drop policy if exists "admin read enquiries" on public.enquiries;
create policy "admin read enquiries" on public.enquiries
  for select using (public.is_admin());

drop policy if exists "admin update enquiries" on public.enquiries;
create policy "admin update enquiries" on public.enquiries
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin delete enquiries" on public.enquiries;
create policy "admin delete enquiries" on public.enquiries
  for delete using (public.is_admin());

-- Admins may fully manage content -----------------------------
drop policy if exists "admin write divisions" on public.divisions;
create policy "admin write divisions" on public.divisions
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write products" on public.products;
create policy "admin write products" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write testimonials" on public.testimonials;
create policy "admin write testimonials" on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write certifications" on public.certifications;
create policy "admin write certifications" on public.certifications
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write stats" on public.stats;
create policy "admin write stats" on public.stats
  for all using (public.is_admin()) with check (public.is_admin());

-- Admins may see the admin list (used by the dashboard guard) --
drop policy if exists "admin read admins" on public.admins;
create policy "admin read admins" on public.admins
  for select using (public.is_admin());
