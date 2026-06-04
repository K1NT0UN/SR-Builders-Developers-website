-- Create media_items table
create table public.media_items (
    id uuid default gen_random_uuid() primary key,
    type text not null check (type in ('image', 'video', 'render')),
    url text not null,
    location text not null check (location in ('hero', 'slideshow', 'scroll-section', 'gallery', 'team', 'completed-projects')),
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.media_items enable row level security;

-- Create public read policy (anyone can read media items)
create policy "Media items are viewable by everyone" 
on public.media_items for select 
using (true);

-- Insert a placeholder image for testing
-- insert into public.media_items (type, url, location, display_order) values ('image', 'https://via.placeholder.com/800x600', 'gallery', 1);
