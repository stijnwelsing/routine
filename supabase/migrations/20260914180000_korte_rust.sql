-- Window + condition on one seed item. Merge by label. No wipe.

insert into public.items (
  tenant_id, type, label, unit, a, b, milestone, weekdays, times_per_week, sort, timing, role, template
)
select
  '11111111-1111-1111-1111-111111111111',
  'gedrag',
  'Korte rust',
  null,
  null,
  null,
  null,
  '{}',
  null,
  17,
  '{"mode":"clock","clock":"08:00","anchor":null,"offset_min":null,"window_min":840,"frequency":"daily","condition":"body"}'::jsonb,
  'action',
  'user preference'
where not exists (
  select 1
  from public.items i
  where i.tenant_id = '11111111-1111-1111-1111-111111111111'
    and i.label = 'Korte rust'
);

update public.items
set
  timing = '{"mode":"clock","clock":"08:00","anchor":null,"offset_min":null,"window_min":840,"frequency":"daily","condition":"body"}'::jsonb,
  role = 'action',
  template = 'user preference'
where lower(label) = 'korte rust'
  and (
    timing is null
    or timing->>'window_min' is null
    or timing->>'condition' is distinct from 'body'
  );
