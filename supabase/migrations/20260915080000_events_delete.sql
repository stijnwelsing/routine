-- Undo today's last Done / +1 / Skip. Other events stay.
create policy events_delete on public.events
  for delete to authenticated
  using (
    tenant_id = (select private.current_tenant_id())
    and user_id = (select auth.uid())
  );

grant delete on table public.events to authenticated;
