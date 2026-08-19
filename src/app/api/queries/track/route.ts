import { type NextRequest } from 'next/server';
import { trackQuerySchema } from '@/lib/queries/schema';
import { clientIp, rateLimit, RULES } from '@/lib/security/rate-limit';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { isSupabaseConfigured, env } from '@/config/env';
import { fail, failInternal, ok } from '@/lib/api/respond';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/queries/track — public status lookup, no login required.
 *
 * The MLA portal requires this (pages/mla-egmore.md §11): the people most
 * likely to need it are least likely to still have a session.
 *
 * Security shape:
 *   - Reference ALONE is not enough. It is sequential and therefore
 *     enumerable — EDU-2026-000001 upward would read strangers' grievances.
 *     The last four digits of the filing phone number are also required.
 *   - Service-role is used because the caller has no session and RLS would
 *     correctly deny them. Authorisation is therefore this route's own
 *     responsibility, which is why the phone check is not optional.
 *   - The response carries status only. No description, no attachments, no
 *     officer notes, no full phone number.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail('VALIDATION_FAILED');
  }

  const parsed = trackQuerySchema.safeParse(body);
  if (!parsed.success) return fail('VALIDATION_FAILED');

  const ip = clientIp(request.headers);
  const limited = await rateLimit(`track:${ip}`, RULES.trackPerIp);
  if (!limited.allowed) {
    return fail('RATE_LIMITED', { retryAfterSeconds: limited.retryAfterSeconds });
  }

  if (!isSupabaseConfigured || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return fail('SERVICE_UNAVAILABLE');
  }

  const { reference, phoneLast4 } = parsed.data;

  try {
    const supabase = createServiceRoleClient();

    const { data, error } = await supabase
      .from('queries')
      .select(
        'reference_number, status, created_at, updated_at, resolved_at, ' +
          'departments(slug), citizen_profiles!queries_citizen_id_fkey(phone)',
      )
      .eq('reference_number', reference)
      .maybeSingle();

    if (error) return failInternal('queries/track', error);

    // Same response for "no such reference" and "wrong phone digits" —
    // distinguishing them would confirm which references exist.
    const record = data as
      | { citizen_profiles?: { phone?: string } | null; [k: string]: unknown }
      | null;

    const phone = record?.citizen_profiles?.phone;
    if (!record || !phone || !phone.endsWith(phoneLast4)) {
      return fail('NOT_FOUND');
    }

    const departments = record.departments as { slug?: string } | null;

    return ok({
      referenceNumber: record.reference_number,
      status: record.status,
      department: departments?.slug ?? null,
      submittedAt: record.created_at,
      updatedAt: record.updated_at,
      resolvedAt: record.resolved_at,
    });
  } catch (cause) {
    return failInternal('queries/track', cause);
  }
}
