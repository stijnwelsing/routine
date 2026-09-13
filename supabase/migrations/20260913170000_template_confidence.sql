-- Template-confidence tags from the lock. Fill only. No deletes, no wipe.

update public.items
set template = 'public-framework'
where lower(label) = 'cafeïne 90 min na opstaan'
  and (template is null or template is distinct from 'public-framework');

update public.items
set template = 'evidence-informed'
where lower(label) = 'wandelen na eten'
  and (template is null or template is distinct from 'evidence-informed');

update public.items
set template = 'user preference'
where lower(label) = 'low carb'
  and (template is null or template is distinct from 'user preference');
