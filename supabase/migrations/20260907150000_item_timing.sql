-- Timing fields on items. Old rows stay; missing values are null.
-- Types stay daily / weekly / leefregel, plus gedrag for rules/actions.

alter table public.items drop constraint if exists items_type_check;
alter table public.items add constraint items_type_check
  check (type in ('daily', 'weekly', 'leefregel', 'gedrag'));

alter table public.items add column if not exists timing jsonb;
alter table public.items add column if not exists role text;
alter table public.items add column if not exists template text;

alter table public.items drop constraint if exists items_role_check;
alter table public.items add constraint items_role_check
  check (role is null or role in ('action', 'constraint', 'preference'));

-- Low carb stays a leefregel. Tag preference only where role is still empty.
update public.items
set role = 'preference'
where label = 'Low carb'
  and role is null;

insert into public.items (
  tenant_id, type, label, unit, a, b, milestone, weekdays, times_per_week, sort, timing, role, template
)
select
  '11111111-1111-1111-1111-111111111111',
  x.type,
  x.label,
  null,
  null,
  null,
  null,
  '{}',
  null,
  x.sort,
  x.timing,
  x.role,
  x.template
from (
  values
    (
      'gedrag'::text,
      'Cafeïne 90 min na opstaan'::text,
      10,
      '{"mode":"relative","clock":null,"anchor":"wake","offset_min":90,"window_min":null,"frequency":"daily","condition":null}'::jsonb,
      'constraint'::text,
      'public-framework'::text
    ),
    (
      'gedrag',
      'Wandelen na eten',
      11,
      '{"mode":"relative","clock":null,"anchor":"meal","offset_min":0,"window_min":null,"frequency":"daily","condition":"na eten"}'::jsonb,
      'action',
      null
    )
) as x(type, label, sort, timing, role, template)
where not exists (
  select 1
  from public.items i
  where i.tenant_id = '11111111-1111-1111-1111-111111111111'
    and i.label = x.label
);
