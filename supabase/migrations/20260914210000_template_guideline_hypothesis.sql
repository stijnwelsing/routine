-- Complete the lock tag set. Fill only. No deletes, no wipe.

update public.items
set template = 'guideline'
where lower(label) = 'vitamine d'
  and (template is null or template is distinct from 'guideline');

update public.items
set template = 'hypothesis'
where lower(label) = 'koud douchen'
  and (template is null or template is distinct from 'hypothesis');
