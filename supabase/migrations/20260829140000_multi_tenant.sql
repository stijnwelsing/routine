-- Multi-tenant from day 1. Membership via auth.uid(), not a hardcoded user_id.
-- No tenant name in this schema. First signed-up user gets the first tenant.

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create table public.tenant_members (
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

create unique index tenant_members_one_tenant_per_user
  on public.tenant_members (user_id);

create index tenant_members_tenant_id_idx on public.tenant_members (tenant_id);

create schema if not exists private;

create or replace function private.current_tenant_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select tm.tenant_id
  from public.tenant_members as tm
  where tm.user_id = (select auth.uid())
  limit 1;
$$;

revoke all on function private.current_tenant_id() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.current_tenant_id() to authenticated;

-- First login creates a tenant and membership for auth.uid() only.
create or replace function public.ensure_own_tenant()
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
  tid uuid;
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;

  select tm.tenant_id into tid
  from public.tenant_members as tm
  where tm.user_id = uid
  limit 1;

  if tid is not null then
    return tid;
  end if;

  begin
    insert into public.tenants default values
    returning id into tid;

    insert into public.tenant_members (tenant_id, user_id)
    values (tid, uid);
  exception
    when unique_violation then
      select tm.tenant_id into tid
      from public.tenant_members as tm
      where tm.user_id = uid
      limit 1;
  end;

  return tid;
end;
$$;

revoke all on function public.ensure_own_tenant() from public, anon;
grant execute on function public.ensure_own_tenant() to authenticated;

alter table public.profiles
  add column if not exists tenant_id uuid references public.tenants (id) on delete cascade;

alter table public.vectors
  add column if not exists tenant_id uuid references public.tenants (id) on delete cascade;

alter table public.stages
  add column if not exists tenant_id uuid references public.tenants (id) on delete cascade;

alter table public.events
  add column if not exists tenant_id uuid references public.tenants (id) on delete cascade;

do $$
declare
  tid uuid;
begin
  if exists (
    select 1
    from public.profiles
    where tenant_id is null
  ) or exists (
    select 1
    from public.vectors
    where tenant_id is null
  ) or exists (
    select 1
    from public.events
    where tenant_id is null
  ) or exists (
    select 1
    from public.stages
    where tenant_id is null
  ) then
    insert into public.tenants default values
    returning id into tid;

    insert into public.tenant_members (tenant_id, user_id)
    select tid, p.id
    from public.profiles as p
    where p.tenant_id is null
    on conflict do nothing;

    insert into public.tenant_members (tenant_id, user_id)
    select tid, v.user_id
    from public.vectors as v
    where v.tenant_id is null
    on conflict do nothing;

    insert into public.tenant_members (tenant_id, user_id)
    select tid, e.user_id
    from public.events as e
    where e.tenant_id is null
    on conflict do nothing;

    update public.profiles set tenant_id = tid where tenant_id is null;
    update public.vectors set tenant_id = tid where tenant_id is null;
    update public.events set tenant_id = tid where tenant_id is null;
    update public.stages as s
    set tenant_id = v.tenant_id
    from public.vectors as v
    where s.vector_id = v.id
      and s.tenant_id is null;
  end if;
end $$;

alter table public.profiles
  alter column tenant_id set not null;

alter table public.vectors
  alter column tenant_id set not null;

alter table public.stages
  alter column tenant_id set not null;

alter table public.events
  alter column tenant_id set not null;

create index profiles_tenant_id_idx on public.profiles (tenant_id);
create index vectors_tenant_id_idx on public.vectors (tenant_id);
create index stages_tenant_id_idx on public.stages (tenant_id);
create index events_tenant_id_date_idx on public.events (tenant_id, date desc);

drop index if exists public.vectors_one_strength_per_user;
create unique index vectors_one_strength_per_tenant
  on public.vectors (tenant_id)
  where domain = 'strength';

drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
drop policy if exists vectors_select on public.vectors;
drop policy if exists vectors_insert on public.vectors;
drop policy if exists vectors_update on public.vectors;
drop policy if exists stages_select on public.stages;
drop policy if exists stages_insert on public.stages;
drop policy if exists stages_update on public.stages;
drop policy if exists events_select on public.events;
drop policy if exists events_insert on public.events;

alter table public.tenants enable row level security;
alter table public.tenant_members enable row level security;
alter table public.tenants force row level security;
alter table public.tenant_members force row level security;

create policy tenants_select on public.tenants
  for select to authenticated
  using (id = (select private.current_tenant_id()));

create policy tenant_members_select on public.tenant_members
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy profiles_select on public.profiles
  for select to authenticated
  using (tenant_id = (select private.current_tenant_id()));

create policy profiles_insert on public.profiles
  for insert to authenticated
  with check (
    id = (select auth.uid())
    and tenant_id = (select private.current_tenant_id())
  );

create policy profiles_update on public.profiles
  for update to authenticated
  using (
    id = (select auth.uid())
    and tenant_id = (select private.current_tenant_id())
  )
  with check (
    id = (select auth.uid())
    and tenant_id = (select private.current_tenant_id())
  );

create policy vectors_select on public.vectors
  for select to authenticated
  using (tenant_id = (select private.current_tenant_id()));

create policy vectors_insert on public.vectors
  for insert to authenticated
  with check (tenant_id = (select private.current_tenant_id()));

create policy vectors_update on public.vectors
  for update to authenticated
  using (tenant_id = (select private.current_tenant_id()))
  with check (tenant_id = (select private.current_tenant_id()));

create policy stages_select on public.stages
  for select to authenticated
  using (tenant_id = (select private.current_tenant_id()));

create policy stages_insert on public.stages
  for insert to authenticated
  with check (tenant_id = (select private.current_tenant_id()));

create policy stages_update on public.stages
  for update to authenticated
  using (tenant_id = (select private.current_tenant_id()))
  with check (tenant_id = (select private.current_tenant_id()));

create policy events_select on public.events
  for select to authenticated
  using (tenant_id = (select private.current_tenant_id()));

create policy events_insert on public.events
  for insert to authenticated
  with check (
    tenant_id = (select private.current_tenant_id())
    and user_id = (select auth.uid())
  );

grant select on table public.tenants to authenticated;
grant select on table public.tenant_members to authenticated;
