-- Silent screen-off clock. User preference, not a guideline. Merge by label.

insert into public.items (
  tenant_id, type, label, unit, a, b, milestone, weekdays, times_per_week, sort, timing, role, template
)
select
  '11111111-1111-1111-1111-111111111111',
  'gedrag',
  'Scherm uit 22:00',
  null,
  null,
  null,
  null,
  '{}',
  null,
  16,
  '{"mode":"clock","clock":"22:00","anchor":null,"offset_min":null,"window_min":null,"frequency":"daily","condition":null}'::jsonb,
  'constraint',
  'user preference'
where not exists (
  select 1
  from public.items i
  where i.tenant_id = '11111111-1111-1111-1111-111111111111'
    and i.label = 'Scherm uit 22:00'
);

update public.items
set template = 'user preference'
where lower(label) = 'scherm uit 22:00'
  and (template is null or template is distinct from 'user preference');
