import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '@/config/env';

/**
 * Server-side Supabase clients.
 *
 * `server-only` at the top is load-bearing: it makes the build fail if any of
 * this is ever imported into a client component, which is the mistake that
 * would leak the service-role key to the browser.
 */

/**
 * Request-scoped client carrying the user's session. Every query it makes is
 * subject to Row Level Security — this is the client that should be used for
 * essentially all application reads and writes.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // Session refresh is handled by middleware instead.
        }
      },
    },
  });
}

/**
 * Service-role client. BYPASSES Row Level Security.
 *
 * Permitted only for operations that genuinely cannot be expressed under RLS:
 * OTP session bookkeeping and the unauthenticated public tracker, which must
 * read one query row for a caller who has no session at all.
 *
 * Every call site must do its own authorisation check first — there is no
 * database safety net behind this client.
 */
export function createServiceRoleClient() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not configured. This client cannot be used.',
    );
  }

  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    cookies: { getAll: () => [], setAll: () => {} },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
