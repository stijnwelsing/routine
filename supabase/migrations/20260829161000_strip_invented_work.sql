-- A for squat / plank / hang was given. Only etappe/B stay empty.
update public.items
set a = 30, unit = 'reps', b = null, milestone = null
where label = 'Squats';

update public.items
set a = 60, unit = 'sec', b = null, milestone = null
where label = 'Plank';

update public.items
set a = 45, unit = 'sec', b = null, milestone = null
where label = 'Dead hang';
