-- Tenant items. Types only: daily / weekly / leefregel.
-- No catalog, no person name. Etappe/B stay null unless given.

create table public.items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  type text not null,
  label text not null,
  unit text,
  a numeric(6, 1),
  b numeric(6, 1),
  milestone numeric(6, 1),
  weekdays int[] not null default '{}',
  times_per_week int,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  constraint items_type_check check (type in ('daily', 'weekly', 'leefregel')),
  constraint items_unit_check check (unit is null or unit in ('reps', 'sec'))
);

create index items_tenant_id_idx on public.items (tenant_id, sort);

alter table public.events
  add column if not exists item_id uuid references public.items (id) on delete set null;

alter table public.items enable row level security;
alter table public.items force row level security;

create policy items_select on public.items
  for select to authenticated
  using (tenant_id = (select private.current_tenant_id()));

create policy items_insert on public.items
  for insert to authenticated
  with check (tenant_id = (select private.current_tenant_id()));

create policy items_update on public.items
  for update to authenticated
  using (tenant_id = (select private.current_tenant_id()))
  with check (tenant_id = (select private.current_tenant_id()));

grant select, insert, update on table public.items to authenticated;

-- Test tenant 1 inrichting. Tenant 2 stays empty of these rows.
insert into public.items (
  tenant_id, type, label, unit, a, b, milestone, weekdays, times_per_week, sort
)
select
  '11111111-1111-1111-1111-111111111111',
  x.type,
  x.label,
  x.unit,
  x.a,
  x.b,
  x.milestone,
  x.weekdays,
  x.times_per_week,
  x.sort
from (
  values
    ('daily'::text, 'Push-ups'::text, 'reps'::text, 40::numeric, 50::numeric, 45::numeric, '{}'::int[], null::int, 0),
    ('daily', 'Squats', null, null, null, null, '{}', null, 1),
    ('daily', 'Plank', null, null, null, null, '{}', null, 2),
    ('daily', 'Dead hang', null, null, null, null, '{}', null, 3),
    ('weekly', 'Gerichte kracht', null, null, null, null, '{}', 2, 4),
    ('leefregel', 'Koud douchen', null, null, null, null, '{}', null, 5),
    ('leefregel', 'Niet snoepen', null, null, null, null, '{}', null, 6),
    ('leefregel', 'Low carb', null, null, null, null, '{}', null, 7),
    ('leefregel', 'Intermittent fasting', null, null, null, null, '{}', null, 8)
) as x(type, label, unit, a, b, milestone, weekdays, times_per_week, sort)
where not exists (
  select 1
  from public.items i
  where i.tenant_id = '11111111-1111-1111-1111-111111111111'
    and i.label = x.label
);
