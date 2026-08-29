-- TEST tenants. Reset allowed until they become the first real tenant 1 and 2.
-- No tenant name, no person name. Credentials live here and in README only.

create extension if not exists pgcrypto with schema extensions;

do $$
declare
  uid_a uuid := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  uid_b uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  tid_1 uuid := '11111111-1111-1111-1111-111111111111';
  tid_2 uuid := '22222222-2222-2222-2222-222222222222';
  email_a text := 'test-a@example.test';
  email_b text := 'test-b@example.test';
  pass_a text := 'TEST-a-routine-lock';
  pass_b text := 'TEST-b-routine-lock';
  vec_1 uuid := 'aaaaaaaa-1111-1111-1111-111111111111';
  vec_2 uuid := 'bbbbbbbb-2222-2222-2222-222222222222';
begin
  if not exists (select 1 from auth.users where id = uid_a or email = email_a) then
    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) values (
      '00000000-0000-0000-0000-000000000000',
      uid_a,
      'authenticated',
      'authenticated',
      email_a,
      extensions.crypt(pass_a, extensions.gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    insert into auth.identities (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) values (
      gen_random_uuid(),
      uid_a,
      uid_a::text,
      jsonb_build_object('sub', uid_a::text, 'email', email_a, 'email_verified', true),
      'email',
      now(),
      now(),
      now()
    );
  end if;

  if not exists (select 1 from auth.users where id = uid_b or email = email_b) then
    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) values (
      '00000000-0000-0000-0000-000000000000',
      uid_b,
      'authenticated',
      'authenticated',
      email_b,
      extensions.crypt(pass_b, extensions.gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    insert into auth.identities (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) values (
      gen_random_uuid(),
      uid_b,
      uid_b::text,
      jsonb_build_object('sub', uid_b::text, 'email', email_b, 'email_verified', true),
      'email',
      now(),
      now(),
      now()
    );
  end if;

  insert into public.tenants (id)
  values (tid_1), (tid_2)
  on conflict (id) do nothing;

  insert into public.tenant_members (tenant_id, user_id)
  values (tid_1, uid_a), (tid_2, uid_b)
  on conflict (tenant_id, user_id) do nothing;

  insert into public.profiles (id, tenant_id, display_name)
  values (uid_a, tid_1, null), (uid_b, tid_2, null)
  on conflict (id) do nothing;

  -- Tenant 1 inrichting: lock 40 → 45 → 50, one set / day.
  insert into public.vectors (id, tenant_id, user_id, domain, a, b, unit, pace_constraint)
  values (vec_1, tid_1, uid_a, 'strength', 40, 50, 'reps', null)
  on conflict (id) do nothing;

  insert into public.stages (
    tenant_id, vector_id, milestone, started_on, deadline, status, stage_type
  )
  select tid_1, vec_1, 45, current_date, current_date + 21, 'active', 'Build'
  where not exists (
    select 1 from public.stages s where s.vector_id = vec_1 and s.status = 'active'
  );

  -- Tenant 2: own empty inrichting. Not the 40/45/50 lock.
  insert into public.vectors (id, tenant_id, user_id, domain, a, b, unit, pace_constraint)
  values (vec_2, tid_2, uid_b, 'strength', 0, 1, 'reps', null)
  on conflict (id) do nothing;

  insert into public.stages (
    tenant_id, vector_id, milestone, started_on, deadline, status, stage_type
  )
  select tid_2, vec_2, 1, current_date, current_date + 21, 'active', 'Build'
  where not exists (
    select 1 from public.stages s where s.vector_id = vec_2 and s.status = 'active'
  );
end $$;

-- Re-bind the two TEST users to their durable tenants. Never mint a third one for them.
create or replace function public.ensure_own_tenant()
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
  tid uuid;
  tid_a uuid := '11111111-1111-1111-1111-111111111111';
  tid_b uuid := '22222222-2222-2222-2222-222222222222';
  uid_a uuid := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  uid_b uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;

  select tm.tenant_id into tid
  from public.tenant_members as tm
  where tm.user_id = uid
  limit 1;

  if tid is not null then
    return tid;
  end if;

  if uid = uid_a then
    insert into public.tenant_members (tenant_id, user_id)
    values (tid_a, uid)
    on conflict do nothing;
    return tid_a;
  end if;

  if uid = uid_b then
    insert into public.tenant_members (tenant_id, user_id)
    values (tid_b, uid)
    on conflict do nothing;
    return tid_b;
  end if;

  begin
    insert into public.tenants default values
    returning id into tid;

    insert into public.tenant_members (tenant_id, user_id)
    values (tid, uid);
  exception
    when unique_violation then
      select tm.tenant_id into tid
      from public.tenant_members as tm
      where tm.user_id = uid
      limit 1;
  end;

  return tid;
end;
$$;

revoke all on function public.ensure_own_tenant() from public, anon;
grant execute on function public.ensure_own_tenant() to authenticated;
