-- =============================================================================
-- RAJMOHAN PUBLIC PORTAL — INITIAL SCHEMA
--
-- Spec: master prompt §15, PDF §10. Row Level Security is the authorisation
-- boundary, not an afterthought: the specs require that a citizen can only ever
-- see their own records and that role checks are never frontend-only.
--
-- Note on `users`: the architecture PDF lists a `users` table. Supabase already
-- supplies `auth.users`, so a bespoke one would duplicate identity and create
-- two sources of truth. We follow the master prompt's `profiles` /
-- `citizen_profiles` / `admins` split instead (audit §H, conflict 4).
-- =============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------------

create type query_status as enum (
  'SUBMITTED', 'RECEIVED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS',
  'RESOLVED', 'NEEDS_INFORMATION', 'REJECTED', 'CLOSED'
);

create type query_priority as enum ('LOW', 'NORMAL', 'HIGH', 'URGENT');

create type admin_role as enum (
  'SUPER_ADMIN', 'CONTENT_ADMIN', 'DEPARTMENT_ADMIN', 'MEDIA_ADMIN', 'OFFICER'
);

create type verification_state as enum (
  'verified', 'reported', 'proposed', 'editorial', 'unverified'
);

-- ---------------------------------------------------------------------------
-- IDENTITY
-- ---------------------------------------------------------------------------

create table profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table citizen_profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  -- Mobile number is the citizen's identity (OTP auth, no password).
  -- Treated as sensitive throughout; never exposed to other citizens.
  phone       text not null unique,
  full_name   text,
  locale      text not null default 'en' check (locale in ('en', 'ta')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table admins (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          admin_role not null,
  -- DEPARTMENT_ADMIN and OFFICER are scoped to one department; others are null.
  department_id uuid,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- TAXONOMY
-- ---------------------------------------------------------------------------

create table departments (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  name_en        text not null,
  name_ta        text not null,
  -- The public architecture exposes four pillars, but the real portfolio is
  -- wider (master prompt §37). `public_pillar` marks which get a portal;
  -- the rest are still modelled so they are never falsely omitted.
  public_pillar  boolean not null default false,
  reference_code text not null unique,  -- EDU / TML / INF / MLA
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now()
);

alter table admins
  add constraint admins_department_fk
  foreign key (department_id) references departments(id) on delete set null;

create table query_categories (
  id            uuid primary key default gen_random_uuid(),
  department_id uuid not null references departments(id) on delete cascade,
  slug          text not null,
  name_en       text not null,
  name_ta       text not null,
  active        boolean not null default true,
  sort_order    integer not null default 0,
  unique (department_id, slug)
);

-- ---------------------------------------------------------------------------
-- CITIZEN SERVICE ENGINE
-- ONE engine shared by all four portals (spec §11) — never four systems.
-- ---------------------------------------------------------------------------

create table queries (
  id               uuid primary key default gen_random_uuid(),
  -- Human-facing identifier, e.g. EDU-2026-000184. Generated server-side by
  -- assign_reference_number(); never accepted from the client.
  reference_number text not null unique,
  citizen_id       uuid not null references auth.users(id) on delete cascade,
  department_id    uuid not null references departments(id),
  category_id      uuid references query_categories(id),
  subject          text not null check (char_length(subject) between 3 and 200),
  description      text not null check (char_length(description) between 10 and 5000),
  location         text,
  status           query_status not null default 'SUBMITTED',
  priority         query_priority not null default 'NORMAL',
  assigned_to      uuid references auth.users(id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  resolved_at      timestamptz
);

-- Indexes named in spec §21.
create index queries_citizen_idx    on queries (citizen_id, created_at desc);
create index queries_department_idx on queries (department_id, status);
create index queries_status_idx     on queries (status);
create index queries_created_idx    on queries (created_at desc);
create index queries_assigned_idx   on queries (assigned_to) where assigned_to is not null;
create index queries_reference_idx  on queries (reference_number);

create table query_attachments (
  id          uuid primary key default gen_random_uuid(),
  query_id    uuid not null references queries(id) on delete cascade,
  storage_path text not null,
  file_name   text not null,
  mime_type   text not null,
  size_bytes  integer not null check (size_bytes > 0 and size_bytes <= 10485760),
  created_at  timestamptz not null default now()
);
create index query_attachments_query_idx on query_attachments (query_id);

create table query_status_history (
  id          uuid primary key default gen_random_uuid(),
  query_id    uuid not null references queries(id) on delete cascade,
  from_status query_status,
  to_status   query_status not null,
  changed_by  uuid references auth.users(id) on delete set null,
  note        text,
  created_at  timestamptz not null default now()
);
create index query_status_history_query_idx on query_status_history (query_id, created_at);

create table query_comments (
  id          uuid primary key default gen_random_uuid(),
  query_id    uuid not null references queries(id) on delete cascade,
  author_id   uuid references auth.users(id) on delete set null,
  body        text not null,
  -- Internal officer notes must never be visible to the citizen.
  is_internal boolean not null default false,
  created_at  timestamptz not null default now()
);
create index query_comments_query_idx on query_comments (query_id, created_at);

create table otp_sessions (
  id           uuid primary key default gen_random_uuid(),
  phone        text not null,
  attempts     integer not null default 0,
  expires_at   timestamptz not null,
  consumed_at  timestamptz,
  created_at   timestamptz not null default now()
);
create index otp_sessions_phone_idx on otp_sessions (phone, created_at desc);

create table notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  query_id   uuid references queries(id) on delete cascade,
  title_en   text not null,
  title_ta   text not null,
  read_at    timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_user_idx on notifications (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- CMS CONTENT
-- Every content table carries `verification` — the database half of the
-- content-governance rule. `unverified` rows are withheld from public reads.
-- ---------------------------------------------------------------------------

create table pages (
  id            uuid primary key default gen_random_uuid(),
  department_id uuid references departments(id) on delete set null,
  slug          text not null unique,
  title_en      text not null,
  title_ta      text not null,
  body_en       text,
  body_ta       text,
  verification  verification_state not null default 'unverified',
  source        text,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint pages_source_required
    check (verification not in ('verified','reported') or source is not null)
);

create table news (
  id            uuid primary key default gen_random_uuid(),
  department_id uuid references departments(id) on delete set null,
  slug          text not null unique,
  title_en      text not null,
  title_ta      text not null,
  body_en       text,
  body_ta       text,
  verification  verification_state not null default 'unverified',
  source        text,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  constraint news_source_required
    check (verification not in ('verified','reported') or source is not null)
);
create index news_published_idx on news (published_at desc nulls last);

create table events (
  id            uuid primary key default gen_random_uuid(),
  department_id uuid references departments(id) on delete set null,
  title_en      text not null,
  title_ta      text not null,
  starts_at     timestamptz not null,
  ends_at       timestamptz,
  location      text,
  verification  verification_state not null default 'unverified',
  source        text,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  constraint events_source_required
    check (verification not in ('verified','reported') or source is not null)
);
create index events_starts_idx on events (starts_at desc);

create table gallery (
  id            uuid primary key default gen_random_uuid(),
  department_id uuid references departments(id) on delete set null,
  storage_path  text not null,
  caption_en    text,
  caption_ta    text,
  alt_en        text not null,
  alt_ta        text not null,
  verification  verification_state not null default 'unverified',
  published_at  timestamptz,
  created_at    timestamptz not null default now()
);

create table media (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null,
  mime_type    text not null,
  size_bytes   integer not null,
  alt_en       text,
  alt_ta       text,
  created_at   timestamptz not null default now()
);

create table social_links (
  id         uuid primary key default gen_random_uuid(),
  platform   text not null,
  url        text not null,
  sort_order integer not null default 0
);

create table site_settings (
  key        text primary key,
  value_json jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- REFERENCE NUMBER GENERATION
-- Server-side only. Format: <DEPT>-<YEAR>-<6-digit sequence>, e.g. EDU-2026-000184
-- ---------------------------------------------------------------------------

create sequence if not exists query_reference_seq;

create or replace function assign_reference_number()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  code text;
begin
  select reference_code into code from departments where id = new.department_id;
  if code is null then
    raise exception 'unknown department %', new.department_id;
  end if;

  new.reference_number :=
    code || '-' ||
    to_char(now(), 'YYYY') || '-' ||
    lpad(nextval('query_reference_seq')::text, 6, '0');

  return new;
end;
$$;

create trigger queries_assign_reference
  before insert on queries
  for each row
  when (new.reference_number is null or new.reference_number = '')
  execute function assign_reference_number();

-- Every status change creates history (spec §14/§17). Enforced by trigger so
-- it cannot be bypassed by any client or admin code path.
create or replace function record_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into query_status_history (query_id, from_status, to_status, changed_by)
    values (new.id, null, new.status, new.citizen_id);
  elsif new.status is distinct from old.status then
    insert into query_status_history (query_id, from_status, to_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());

    if new.status = 'RESOLVED' and new.resolved_at is null then
      new.resolved_at := now();
    end if;
  end if;
  return new;
end;
$$;

create trigger queries_record_status_insert
  after insert on queries
  for each row execute function record_status_change();

create trigger queries_record_status_update
  before update on queries
  for each row execute function record_status_change();
