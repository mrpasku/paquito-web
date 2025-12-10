-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Affiliate Links Table
create table if not exists affiliate_links (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  affiliate_url text not null,
  image_url text,              -- New: Main product image
  price decimal(10, 2),        -- New: Product price
  currency text default 'EUR', -- New: Currency
  video_url text,              -- New: YouTube/Vimeo URL
  preview_data jsonb,          -- New: OpenGraph data
  click_count integer default 0,
  created_at timestamp with time zone default now()
);

-- Affiliate Clicks Tracking
create table if not exists affiliate_clicks (
  id uuid primary key default uuid_generate_v4(),
  link_id uuid references affiliate_links(id),
  ip_address text,
  user_agent text,
  referer text,
  clicked_at timestamp with time zone default now()
);

-- Blog Posts (Simple CMS)
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text,
  published boolean default false,
  created_at timestamp with time zone default now()
);
