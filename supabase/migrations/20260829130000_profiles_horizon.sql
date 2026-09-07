-- Optional 1-year B on the profile. Identity fields stay empty-allowed.
-- Length caps match the Koers Ik-blok. No seed text.

alter table public.profiles
  add column if not exists horizon_1y text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_identity_anti_len'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_identity_anti_len
      check (identity_anti is null or char_length(identity_anti) <= 280);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_identity_new_len'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_identity_new_len
      check (identity_new is null or char_length(identity_new) <= 140);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_identity_constraint_len'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_identity_constraint_len
      check (identity_constraint is null or char_length(identity_constraint) <= 140);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_horizon_1y_len'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_horizon_1y_len
      check (horizon_1y is null or char_length(horizon_1y) <= 140);
  end if;
end $$;
