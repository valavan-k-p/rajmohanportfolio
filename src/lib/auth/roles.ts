import 'server-only';
import { createClient } from '@/lib/supabase/server';

/**
 * Admin roles and capabilities (spec §17, §20).
 *
 * "Do not allow frontend-only role checks. Authorization must be enforced
 * server-side/database-side." Two layers implement that:
 *
 *   1. Row Level Security in 0002_rls.sql — the real boundary. Even a
 *      compromised client with a valid session cannot read another
 *      department's queries.
 *   2. This module — the server-side gate that decides what to RENDER, so a
 *      user never sees a control that would fail at the database anyway.
 *
 * This module is never the only thing standing between a user and data.
 */

export const ADMIN_ROLES = [
  'SUPER_ADMIN',
  'CONTENT_ADMIN',
  'DEPARTMENT_ADMIN',
  'MEDIA_ADMIN',
  'OFFICER',
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type Capability =
  | 'queries.viewAll'
  | 'queries.viewDepartment'
  | 'queries.assign'
  | 'queries.changeStatus'
  | 'queries.commentInternal'
  | 'content.publish'
  | 'media.manage'
  | 'citizens.view'
  | 'staff.manage'
  | 'settings.manage'
  | 'analytics.view';

/** Least privilege: a role gets exactly what its remit requires, nothing more. */
const CAPABILITIES: Readonly<Record<AdminRole, readonly Capability[]>> = {
  SUPER_ADMIN: [
    'queries.viewAll',
    'queries.viewDepartment',
    'queries.assign',
    'queries.changeStatus',
    'queries.commentInternal',
    'content.publish',
    'media.manage',
    'citizens.view',
    'staff.manage',
    'settings.manage',
    'analytics.view',
  ],
  CONTENT_ADMIN: ['content.publish', 'media.manage', 'analytics.view'],
  DEPARTMENT_ADMIN: [
    'queries.viewDepartment',
    'queries.assign',
    'queries.changeStatus',
    'queries.commentInternal',
    'analytics.view',
  ],
  MEDIA_ADMIN: ['media.manage'],
  // An officer works their own queue. Notably NOT 'queries.assign' — an
  // officer must not be able to hand their workload to someone else.
  OFFICER: ['queries.viewDepartment', 'queries.changeStatus', 'queries.commentInternal'],
};

export function can(role: AdminRole, capability: Capability): boolean {
  return CAPABILITIES[role].includes(capability);
}

export function capabilitiesFor(role: AdminRole): readonly Capability[] {
  return CAPABILITIES[role];
}

export interface AdminSession {
  readonly userId: string;
  readonly role: AdminRole;
  readonly departmentId: string | null;
}

/**
 * Resolves the caller's admin session, or null. Returns null for an ordinary
 * citizen, an inactive staff account, or no session at all — the caller must
 * treat null as "not staff" and redirect.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('admins')
    .select('role, department_id, active')
    .eq('id', user.id)
    .maybeSingle();

  if (error || !data || data.active !== true) return null;

  return {
    userId: user.id,
    role: data.role as AdminRole,
    departmentId: (data.department_id as string | null) ?? null,
  };
}

/** Guard for admin pages and routes. Throws so a missed check cannot fall through. */
export async function requireCapability(capability: Capability): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) throw new Error('UNAUTHORIZED');
  if (!can(session.role, capability)) throw new Error('FORBIDDEN');
  return session;
}
