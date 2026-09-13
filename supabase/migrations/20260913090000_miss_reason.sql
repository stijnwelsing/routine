-- Miss uses the same short reasons as Skip. No new vocabulary.
alter table public.events drop constraint if exists events_skip_has_reason;

alter table public.events add constraint events_skip_has_reason check (
  ((kind = 'skip' or kind = 'miss') and skip_reason is not null)
  or (kind not in ('skip', 'miss') and skip_reason is null)
);
