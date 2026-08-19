import { type NextRequest } from 'next/server';
import { createQuerySchema } from '@/lib/queries/schema';
import { verifyTurnstile } from '@/lib/security/turnstile';
import { clientIp, rateLimit, RULES } from '@/lib/security/rate-limit';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/config/env';
import { fail, failInternal, ok } from '@/lib/api/respond';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/queries — create a citizen query.
 *
 * The ONE Citizen Service Engine (spec §11). All four portals post here; the
 * department is a field, not a separate system.
 *
 * Note what is NOT accepted from the client: reference_number, status,
 * priority, assigned_to, citizen_id. Reference and status are set by database
 * triggers, and citizen_id comes from the session — an RLS policy additionally
 * requires citizen_id = auth.uid(), so even a forged body cannot file a query
 * as someone else.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail('VALIDATION_FAILED');
  }

  const parsed = createQuerySchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.') || 'form';
      fields[key] ??= issue.message;
    }
    return fail('VALIDATION_FAILED', { fields });
  }

  const input = parsed.data;
  const ip = clientIp(request.headers);

  const turnstile = await verifyTurnstile(input.turnstileToken, ip);
  if (!turnstile.success) return fail('TURNSTILE_FAILED');

  if (!isSupabaseConfigured) return fail('SERVICE_UNAVAILABLE');

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Spec §12: a query cannot exist without a verified mobile number.
    if (!user) return fail('UNAUTHORIZED');

    const limited = await rateLimit(`query:create:${user.id}`, RULES.querySubmitPerUser);
    if (!limited.allowed) {
      return fail('RATE_LIMITED', { retryAfterSeconds: limited.retryAfterSeconds });
    }

    const { data: department, error: deptError } = await supabase
      .from('departments')
      .select('id')
      .eq('slug', input.department)
      .single();

    if (deptError || !department) return fail('NOT_FOUND');

    const { data: created, error: insertError } = await supabase
      .from('queries')
      .insert({
        citizen_id: user.id,
        department_id: department.id,
        category_id: input.categoryId ?? null,
        subject: input.subject,
        description: input.description,
        location: input.location ?? null,
        // status omitted — defaults to SUBMITTED, and the RLS insert policy
        // refuses any other value.
      })
      .select('id, reference_number, status, created_at')
      .single();

    if (insertError || !created) return failInternal('queries/create', insertError);

    return ok({
      id: created.id,
      referenceNumber: created.reference_number,
      status: created.status,
      department: input.department,
      submittedAt: created.created_at,
    });
  } catch (cause) {
    return failInternal('queries/create', cause);
  }
}
