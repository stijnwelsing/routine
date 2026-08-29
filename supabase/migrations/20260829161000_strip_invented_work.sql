-- Work numbers for squat / plank / hang were not given. Strip invented A.
update public.items
set a = null, b = null, milestone = null, unit = null
where label in ('Squats', 'Plank', 'Dead hang')
  and b is null
  and milestone is null;
