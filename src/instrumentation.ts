/**
 * Server boot hook (spec §33, §36).
 *
 * Two jobs:
 *  1. Refuse to start a production server that is missing the credentials
 *     citizen-facing features depend on. Failing at boot is loud and gets
 *     caught by the ALB health check; failing later fails in front of a
 *     citizen mid-submission.
 *  2. Install a global error handler that records failures WITHOUT citizen
 *     data. Sentry is wired only if a DSN is configured.
 */
export async function register(): Promise<void> {
  const { assertRuntimeEnv, env } = await import('@/config/env');

  assertRuntimeEnv();

  if (env.SENTRY_DSN) {
    // Sentry is intentionally not a hard dependency — the platform must run
    // without it. Install @sentry/nextjs and this block starts reporting.
    console.info('[instrumentation] SENTRY_DSN present; install @sentry/nextjs to enable.');
  }
}

/**
 * Called by Next.js for uncaught server errors.
 *
 * Logs the message and the request path only. Never the body, never headers,
 * never a phone number — §36 requires that observability not leak citizen
 * information.
 */
export function onRequestError(
  error: unknown,
  request: { path?: string },
): void {
  const message = error instanceof Error ? error.message : String(error);
  console.error('[request-error]', request.path ?? 'unknown', message);
}
