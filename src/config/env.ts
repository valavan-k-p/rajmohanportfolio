import { z } from 'zod';

/**
 * Environment contract.
 *
 * Parsed once, at module load, so a missing or malformed variable fails the
 * build rather than surfacing as a runtime 500 in front of a citizen.
 *
 * The split matters: anything named NEXT_PUBLIC_* is compiled into the browser
 * bundle. Secrets must never carry that prefix — spec §13/§18 and §33 require
 * that service-role keys, database passwords and Turnstile secrets never reach
 * browser code.
 */

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  SENTRY_DSN: z.string().url().optional(),
});

/**
 * During `next build` on CI the deployment secrets are not necessarily present,
 * and the build must still succeed. Placeholders keep type-safety without
 * pretending a real connection exists; `assertRuntimeEnv` is what enforces the
 * real requirement at boot.
 */
const BUILD_PLACEHOLDER = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://placeholder.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'placeholder-anon-key',
} as const;

function parseEnv() {
  const rawPublic = {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || BUILD_PLACEHOLDER.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      BUILD_PLACEHOLDER.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  };

  const rawServer = {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
  };

  return {
    ...publicSchema.parse(rawPublic),
    ...serverSchema.parse(rawServer),
  };
}

export const env = parseEnv();

/** True when Supabase is only a build placeholder — used to disable live features. */
export const isSupabaseConfigured =
  env.NEXT_PUBLIC_SUPABASE_URL !== BUILD_PLACEHOLDER.NEXT_PUBLIC_SUPABASE_URL;

/**
 * Called from instrumentation at server boot. Refuses to start a production
 * server that is missing the credentials citizen-facing features depend on,
 * rather than failing later in front of a user mid-submission.
 */
export function assertRuntimeEnv(): void {
  if (process.env.NODE_ENV !== 'production') return;

  // The E2E suite runs a PRODUCTION build to exercise the public surface, which
  // needs no backend. The opt-out is deliberately explicit and verbose so it
  // cannot be set by accident, and it announces itself in the logs — an
  // operator seeing this line on a real server knows something is wrong.
  if (process.env.ALLOW_UNCONFIGURED_PRODUCTION_BOOT === 'e2e-public-surface-only') {
    console.warn(
      '[env] Booting production WITHOUT backend credentials (E2E harness). ' +
        'Citizen authentication, query submission and admin are non-functional.',
    );
    return;
  }

  const missing: string[] = [];
  if (!isSupabaseConfigured) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!env.TURNSTILE_SECRET_KEY) missing.push('TURNSTILE_SECRET_KEY');

  if (missing.length > 0) {
    throw new Error(
      `Refusing to start in production without: ${missing.join(', ')}. ` +
        'Citizen authentication and query submission cannot work without these.',
    );
  }
}
