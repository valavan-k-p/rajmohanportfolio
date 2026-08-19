import type { PortalId } from '@/config/portals';

/**
 * Query reference numbers, e.g. `EDU-2026-000184` (spec §17, §12).
 *
 * Generation is server-side only — `assign_reference_number()` in
 * 0001_init.sql. This module is the shared FORMAT contract: it validates and
 * parses what the database produced, so the tracker, the URL parser and the
 * admin search all agree on what a reference looks like.
 */

export const DEPARTMENT_CODES: Readonly<Record<PortalId, string>> = {
  'school-education': 'EDU',
  'tamil-development': 'TML',
  'information-publicity': 'INF',
  'mla-egmore': 'MLA',
};

const CODE_TO_PORTAL: Readonly<Record<string, PortalId>> = Object.fromEntries(
  Object.entries(DEPARTMENT_CODES).map(([portal, code]) => [code, portal as PortalId]),
) as Readonly<Record<string, PortalId>>;

/** `<CODE>-<YYYY>-<6 digits>` */
export const REFERENCE_PATTERN = /^(EDU|TML|INF|MLA)-(\d{4})-(\d{6})$/;

export interface ParsedReference {
  readonly code: string;
  readonly portal: PortalId;
  readonly year: number;
  readonly sequence: number;
}

export function isValidReference(value: string): boolean {
  return REFERENCE_PATTERN.test(value.trim().toUpperCase());
}

export function parseReference(value: string): ParsedReference | null {
  const match = REFERENCE_PATTERN.exec(value.trim().toUpperCase());
  if (!match) return null;

  const [, code, year, sequence] = match;
  const portal = CODE_TO_PORTAL[code!];
  if (!portal) return null;

  return {
    code: code!,
    portal,
    year: Number.parseInt(year!, 10),
    sequence: Number.parseInt(sequence!, 10),
  };
}

/**
 * Normalises citizen input before lookup. People retype references from SMS
 * and paper with lowercase letters, spaces, en-dashes and stray whitespace;
 * rejecting those would be a usability failure, not a security control.
 */
export function normaliseReference(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[‐-―\s_]+/g, '-')
    .replace(/-+/g, '-');
}

/** Format helper used only by tests and seed data — never in request paths. */
export function formatReference(portal: PortalId, year: number, sequence: number): string {
  const code = DEPARTMENT_CODES[portal];
  return `${code}-${year}-${String(sequence).padStart(6, '0')}`;
}
