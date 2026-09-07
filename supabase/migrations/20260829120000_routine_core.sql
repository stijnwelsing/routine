-- Routine core: profile, one strength vector, build stages, event log.
-- RLS is auth.uid() from day 1. No hardcoded user_id.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  identity_anti text,
  identity_new text,
  identity_constraint text,
  updated_at timestamptz not null default now()
);

create table public.vectors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  domain text not null default 'strength',
  a numeric(6, 1) not null,
  b numeric(6, 1) not null,
  unit text not null default 'reps',
  pace_constraint text,
  updated_at timestamptz not null default now(),
  constraint vectors_domain_check check (domain in ('strength')),
  constraint vectors_unit_check check (unit in ('reps')),
  constraint vectors_ab_check check (b >= a)
);

create unique index vectors_one_strength_per_user
  on public.vectors (user_id)
  where domain = 'strength';

create index vectors_user_id_idx on public.vectors (user_id);

create table public.stages (
  id uuid primary key default gen_random_uuid(),
  vector_id uuid not null references public.vectors (id) on delete cascade,
  milestone numeric(6, 1) not null,
  started_on date not null,
  deadline date,
  status text not null,
  stage_type text not null default 'Build',
  updated_at timestamptz not null default now(),
  constraint stages_status_check
    check (status in ('active', 'extended', 'lowered', 'replaced', 'done')),
  constraint stages_type_check check (stage_type in ('Build'))
);

create unique index stages_one_active_per_vector
  on public.stages (vector_id)
  where status = 'active';

create index stages_vector_id_idx on public.stages (vector_id);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  kind text not null,
  value numeric(6, 1),
  skip_reason text,
  created_at timestamptz not null default now(),
  constraint events_kind_check check (
    kind in (
      'body_sleep',
      'body_energy',
      'body_weight',
      'set',
      'done',
      'skip',
      'miss'
    )
  ),
  constraint events_skip_reason_check check (
    skip_reason is null
    or skip_reason in (
      'geen tijd',
      'geen energie',
      'vergeten',
      'geen zin',
      'pijn'
    )
  ),
  constraint events_skip_has_reason check (
    (kind = 'skip' and skip_reason is not null)
    or (kind <> 'skip' and skip_reason is null)
  )
);

create index events_user_id_date_idx on public.events (user_id, date desc);
create index events_user_id_kind_date_idx on public.events (user_id, kind, date desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger vectors_set_updated_at
  before update on public.vectors
  for each row execute function public.set_updated_at();

create trigger stages_set_updated_at
  before update on public.stages
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.vectors enable row level security;
alter table public.stages enable row level security;
alter table public.events enable row level security;

alter table public.profiles force row level security;
alter table public.vectors force row level security;
alter table public.stages force row level security;
alter table public.events force row level security;

create policy profiles_select on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy profiles_insert on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);

create policy profiles_update on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy vectors_select on public.vectors
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy vectors_insert on public.vectors
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy vectors_update on public.vectors
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy stages_select on public.stages
  for select to authenticated
  using (
    exists (
      select 1
      from public.vectors v
      where v.id = stages.vector_id
        and v.user_id = (select auth.uid())
    )
  );

create policy stages_insert on public.stages
  for insert to authenticated
  with check (
    exists (
      select 1
      from public.vectors v
      where v.id = vector_id
        and v.user_id = (select auth.uid())
    )
  );

create policy stages_update on public.stages
  for update to authenticated
  using (
    exists (
      select 1
      from public.vectors v
      where v.id = stages.vector_id
        and v.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.vectors v
      where v.id = vector_id
        and v.user_id = (select auth.uid())
    )
  );

create policy events_select on public.events
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy events_insert on public.events
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

grant usage on schema public to authenticated;

grant select, insert, update on table public.profiles to authenticated;
grant select, insert, update on table public.vectors to authenticated;
grant select, insert, update on table public.stages to authenticated;
grant select, insert on table public.events to authenticated;
