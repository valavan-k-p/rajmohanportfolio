import { isSupabaseConfigured } from '@/config/env';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/health — ALB target-group health check (PDF §13, spec §19).
 *
 * Must be cheap and must not touch the database on every poll: an ALB checks
 * every few seconds across three instances, and a health check that queries
 * Postgres becomes a self-inflicted load problem. It reports process liveness
 * plus whether configuration is present, which is what "should this instance
 * receive traffic" actually depends on.
 *
 * Returns 503 when required configuration is missing so the ALB drains the
 * instance instead of serving broken pages.
 */
export async function GET() {
  const healthy = process.env.NODE_ENV !== 'production' || isSupabaseConfigured;

  return Response.json(
    {
      status: healthy ? 'ok' : 'degraded',
      uptimeSeconds: Math.round(process.uptime()),
      supabase: isSupabaseConfigured ? 'configured' : 'missing',
      timestamp: new Date().toISOString(),
    },
    {
      status: healthy ? 200 : 503,
      headers: { 'cache-control': 'no-store' },
    },
  );
}
