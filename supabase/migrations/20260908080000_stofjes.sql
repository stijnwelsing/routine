-- Reminder types only. No dose, no therapy, no prescribing.

alter table public.items drop constraint if exists items_type_check;
alter table public.items add constraint items_type_check
  check (type in ('daily', 'weekly', 'leefregel', 'gedrag', 'medicijn', 'supplement'));

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
  null
from (
  values
    (
      'medicijn'::text,
      'Medicijn ochtend'::text,
      12,
      '{"mode":null,"clock":null,"anchor":null,"offset_min":null,"window_min":null,"frequency":"daily","condition":"ochtend"}'::jsonb,
      'action'::text
    ),
    (
      'supplement',
      'Vitamine D',
      13,
      '{"mode":null,"clock":null,"anchor":null,"offset_min":null,"window_min":null,"frequency":"daily","condition":null}'::jsonb,
      'action'
    )
) as x(type, label, sort, timing, role)
where not exists (
  select 1
  from public.items i
  where i.tenant_id = '11111111-1111-1111-1111-111111111111'
    and i.label = x.label
);
