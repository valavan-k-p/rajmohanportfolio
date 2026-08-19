-- =============================================================================
-- ROW LEVEL SECURITY
--
-- Spec §18/§21: authorisation is enforced at the database, never frontend-only.
-- A citizen must only ever see records they are authorised to see, and that
-- guarantee has to survive a compromised client, a bug in an API route, or a
-- direct PostgREST call with a stolen anon key.
--
-- Default posture: deny. Every table gets RLS enabled with no permissive
-- policy unless one is written below.
-- =============================================================================

alter table profiles             enable row level security;
alter table citizen_profiles     enable row level security;
alter table admins               enable row level security;
alter table departments          enable row level security;
alter table query_categories     enable row level security;
alter table queries              enable row level security;
alter table query_attachments    enable row level security;
alter table query_status_history enable row level security;
alter table query_comments       enable row level security;
alter table otp_sessions         enable row level security;
alter table notifications        enable row level security;
alter table pages                enable row level security;
alter table news                 enable row level security;
alter table events               enable row level security;
alter table gallery              enable row level security;
alter table media                enable row level security;
alter table social_links         enable row level security;
alter table site_settings        enable row level security;

-- ---------------------------------------------------------------------------
-- HELPERS
-- SECURITY DEFINER so policies can consult `admins` without the caller needing
-- read access to it — otherwise checking your own role would require a policy
-- that leaks the whole staff table.
-- ---------------------------------------------------------------------------

create or replace function current_admin_role()
returns admin_role
language sql
stable
security definer
set search_path = public
as $$
  select role from admins where id = auth.uid() and active = true;
$$;

create or replace function current_admin_department()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select department_id from admins where id = auth.uid() and active = true;
$$;

create or replace function is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from admins where id = auth.uid() and active = true);
$$;

-- Can the current user act on this department's queries?
create or replace function can_access_department(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select case current_admin_role()
    when 'SUPER_ADMIN' then true
    when 'CONTENT_ADMIN' then true
    when 'DEPARTMENT_ADMIN' then current_admin_department() = target
    when 'OFFICER' then current_admin_department() = target
    else false
  end;
$$;

-- ---------------------------------------------------------------------------
-- IDENTITY
-- ---------------------------------------------------------------------------

create policy profiles_self_read on profiles
  for select using (id = auth.uid() or is_staff());
create policy profiles_self_write on profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- A citizen reads and edits ONLY their own profile. Staff read is limited to
-- SUPER_ADMIN — phone numbers are the most sensitive column in the schema.
create policy citizen_self_read on citizen_profiles
  for select using (id = auth.uid() or current_admin_role() = 'SUPER_ADMIN');
create policy citizen_self_insert on citizen_profiles
  for insert with check (id = auth.uid());
create policy citizen_self_update on citizen_profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- Staff can see their own row only. Nobody edits roles through the API;
-- role changes are a service-role operation.
create policy admins_self_read on admins
  for select using (id = auth.uid() or current_admin_role() = 'SUPER_ADMIN');

-- ---------------------------------------------------------------------------
-- PUBLIC TAXONOMY — readable by anyone, writable by nobody through the API
-- ---------------------------------------------------------------------------

create policy departments_public_read on departments for select using (true);
create policy categories_public_read on query_categories
  for select using (active = true or is_staff());

-- ---------------------------------------------------------------------------
-- QUERIES — the core authorisation boundary
-- ---------------------------------------------------------------------------

create policy queries_citizen_read on queries
  for select using (citizen_id = auth.uid());

create policy queries_staff_read on queries
  for select using (can_access_department(department_id));

-- A citizen may create a query only as themselves, and only in SUBMITTED.
-- reference_number is left to the trigger; status cannot be self-assigned.
create policy queries_citizen_insert on queries
  for insert with check (citizen_id = auth.uid() and status = 'SUBMITTED');

-- Citizens never update queries after submission. Staff update within their
-- department only.
create policy queries_staff_update on queries
  for update using (can_access_department(department_id))
  with check (can_access_department(department_id));

-- ---------------------------------------------------------------------------
-- QUERY CHILDREN — inherit the parent's authorisation
-- ---------------------------------------------------------------------------

create policy attachments_read on query_attachments
  for select using (
    exists (select 1 from queries q where q.id = query_id
            and (q.citizen_id = auth.uid() or can_access_department(q.department_id)))
  );
create policy attachments_citizen_insert on query_attachments
  for insert with check (
    exists (select 1 from queries q where q.id = query_id and q.citizen_id = auth.uid())
  );

create policy status_history_read on query_status_history
  for select using (
    exists (select 1 from queries q where q.id = query_id
            and (q.citizen_id = auth.uid() or can_access_department(q.department_id)))
  );

-- Internal officer notes are invisible to the citizen. This is the reason
-- `is_internal` exists and why the check lives in the database.
create policy comments_read on query_comments
  for select using (
    exists (
      select 1 from queries q where q.id = query_id and (
        (q.citizen_id = auth.uid() and is_internal = false)
        or can_access_department(q.department_id)
      )
    )
  );
create policy comments_citizen_insert on query_comments
  for insert with check (
    is_internal = false
    and author_id = auth.uid()
    and exists (select 1 from queries q where q.id = query_id and q.citizen_id = auth.uid())
  );
create policy comments_staff_insert on query_comments
  for insert with check (
    author_id = auth.uid()
    and exists (select 1 from queries q where q.id = query_id
                and can_access_department(q.department_id))
  );

create policy notifications_self on notifications
  for select using (user_id = auth.uid());
create policy notifications_self_update on notifications
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- otp_sessions: no policy at all. Deliberate — OTP state is service-role only
-- and must never be readable through the anon or authenticated key.

-- ---------------------------------------------------------------------------
-- CMS CONTENT
-- Public reads are restricted to published AND verified rows. This is the
-- database half of the content-governance rule: even if a UI bug tried to
-- render an unverified claim, PostgreSQL will not return it to the public.
-- ---------------------------------------------------------------------------

create policy pages_public_read on pages
  for select using (
    (published_at is not null and verification <> 'unverified') or is_staff()
  );
create policy news_public_read on news
  for select using (
    (published_at is not null and verification <> 'unverified') or is_staff()
  );
create policy events_public_read on events
  for select using (
    (published_at is not null and verification <> 'unverified') or is_staff()
  );
create policy gallery_public_read on gallery
  for select using (
    (published_at is not null and verification <> 'unverified') or is_staff()
  );
create policy media_public_read on media for select using (true);
create policy social_links_public_read on social_links for select using (true);
create policy site_settings_public_read on site_settings for select using (true);

-- Content writes: CONTENT_ADMIN and SUPER_ADMIN for editorial tables,
-- MEDIA_ADMIN for media tables. Least privilege (spec §17).
create policy pages_write on pages for all
  using (current_admin_role() in ('SUPER_ADMIN','CONTENT_ADMIN'))
  with check (current_admin_role() in ('SUPER_ADMIN','CONTENT_ADMIN'));
create policy news_write on news for all
  using (current_admin_role() in ('SUPER_ADMIN','CONTENT_ADMIN'))
  with check (current_admin_role() in ('SUPER_ADMIN','CONTENT_ADMIN'));
create policy events_write on events for all
  using (current_admin_role() in ('SUPER_ADMIN','CONTENT_ADMIN'))
  with check (current_admin_role() in ('SUPER_ADMIN','CONTENT_ADMIN'));
create policy gallery_write on gallery for all
  using (current_admin_role() in ('SUPER_ADMIN','MEDIA_ADMIN'))
  with check (current_admin_role() in ('SUPER_ADMIN','MEDIA_ADMIN'));
create policy media_write on media for all
  using (current_admin_role() in ('SUPER_ADMIN','MEDIA_ADMIN'))
  with check (current_admin_role() in ('SUPER_ADMIN','MEDIA_ADMIN'));
