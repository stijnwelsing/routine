-- Optional meal clock for today. Feeds relative-to-meal timing. No wipe.
alter table public.events drop constraint if exists events_kind_check;

alter table public.events add constraint events_kind_check check (
  kind in (
    'body_sleep',
    'body_energy',
    'body_weight',
    'body_wake',
    'body_meal',
    'set',
    'done',
    'skip',
    'miss'
  )
);
