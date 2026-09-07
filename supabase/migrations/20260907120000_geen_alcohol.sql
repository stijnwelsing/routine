-- Add missing eat/drink leefregel by label. Never rename or delete existing rows.
insert into public.items (
  tenant_id, type, label, unit, a, b, milestone, weekdays, times_per_week, sort
)
select
  '11111111-1111-1111-1111-111111111111',
  'leefregel',
  'Geen alcohol',
  null,
  null,
  null,
  null,
  '{}',
  null,
  9
where not exists (
  select 1
  from public.items i
  where i.tenant_id = '11111111-1111-1111-1111-111111111111'
    and i.label = 'Geen alcohol'
);
