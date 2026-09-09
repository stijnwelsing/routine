-- Free-form training themes on profile. Existing rows stay. No wipe.

alter table public.profiles add column if not exists themes text[] not null default '{}';
alter table public.profiles add column if not exists theme_step boolean not null default false;
