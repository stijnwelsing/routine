-- Goals and age band on profile. Later flag on items.
-- Existing rows stay. No wipe, no seed replace.

alter table public.profiles add column if not exists age_band text;
alter table public.profiles add column if not exists goals text[] not null default '{}';

alter table public.profiles drop constraint if exists profiles_age_band_check;
alter table public.profiles add constraint profiles_age_band_check
  check (age_band is null or age_band in ('18–29', '30–39', '40–49', '50–59', '60+'));

alter table public.items add column if not exists later boolean not null default false;
