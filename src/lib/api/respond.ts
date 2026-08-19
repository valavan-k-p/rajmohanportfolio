import 'server-only';
import { NextResponse } from 'next/server';

/**
 * Uniform API responses.
 *
 * Error codes are stable machine strings; the UI maps them to bilingual copy.
 * Server-side detail is logged, never returned — spec §36/§18: observability
 * must not leak citizen information, and error bodies must not describe the
 * internals to an attacker.
 */

export type ApiErrorCode =
  | 'VALIDATION_FAILED'
  | 'TURNSTILE_FAILED'
  | 'RATE_LIMITED'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'OTP_INVALID'
  | 'OTP_EXPIRED'
  | 'OTP_TOO_MANY_ATTEMPTS'
  | 'UPLOAD_FAILED'
  | 'SERVICE_UNAVAILABLE'
  | 'INTERNAL';

const STATUS: Record<ApiErrorCode, number> = {
  VALIDATION_FAILED: 400,
  TURNSTILE_FAILED: 403,
  RATE_LIMITED: 429,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  OTP_INVALID: 400,
  OTP_EXPIRED: 410,
  OTP_TOO_MANY_ATTEMPTS: 429,
  UPLOAD_FAILED: 400,
  SERVICE_UNAVAILABLE: 503,
  INTERNAL: 500,
};

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true as const, data }, { status: 200, ...init });
}

export function fail(
  code: ApiErrorCode,
  options?: { readonly fields?: Record<string, string>; readonly retryAfterSeconds?: number },
) {
  const headers = new Headers();
  if (options?.retryAfterSeconds) {
    headers.set('Retry-After', String(options.retryAfterSeconds));
  }

  return NextResponse.json(
    {
      ok: false as const,
      error: { code, fields: options?.fields, retryAfterSeconds: options?.retryAfterSeconds },
    },
    { status: STATUS[code], headers },
  );
}

/**
 * Logs the real cause for operators, returns an opaque code to the caller.
 * Never pass a citizen's phone number or query body into `context`.
 */
export function failInternal(context: string, cause: unknown) {
  console.error(`[api] ${context}`, cause instanceof Error ? cause.message : cause);
  return fail('INTERNAL');
}
