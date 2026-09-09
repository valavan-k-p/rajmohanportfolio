import { isPublishable } from './types';
import type { BaseRecord } from './schema';

/**
 * The publication gate every list passes through.
 *
 * Nothing reaches a page without going through `publishable`. It is the single
 * place `published: false` and `verification: 'unverified'` are enforced, so a
 * new page cannot accidentally leak a draft by forgetting a filter.
 */
export function publishable<T extends BaseRecord>(items: readonly T[]): T[] {
  return items.filter((item) => item.published && isPublishable(item));
}

/** Newest first. Stable for equal dates, so ordering never jitters. */
export function byDateDesc<T extends { readonly date: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => {
    const diff = Date.parse(b.date) - Date.parse(a.date);
    return Number.isNaN(diff) ? 0 : diff;
  });
}

export interface Page<T> {
  readonly items: readonly T[];
  readonly page: number;
  readonly pageCount: number;
  readonly total: number;
  readonly pageSize: number;
}

/**
 * Clamps out-of-range pages rather than returning an empty list, so a stale
 * `?page=99` bookmark lands on the last page instead of an empty state that
 * looks like missing content.
 */
export function paginate<T>(items: readonly T[], page: number, pageSize: number): Page<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, Math.trunc(page) || 1), pageCount);
  const start = (current - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    pageCount,
    total,
    pageSize,
  };
}

/** Parse a `?page=` search param without trusting it. */
export function parsePage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

/** Narrow a search param to a known union member, or `undefined`. */
export function parseFilter<T extends string>(
  value: string | string[] | undefined,
  allowed: readonly T[],
): T | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && (allowed as readonly string[]).includes(raw) ? (raw as T) : undefined;
}

/** Trimmed, length-capped free-text query. Empty string means "no query". */
export function parseQuery(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? '').trim().slice(0, 120);
}

/** Distinct years present in a list, newest first — drives the year filter. */
export function yearsIn<T extends { readonly date: string }>(items: readonly T[]): string[] {
  const years = new Set<string>();
  for (const item of items) {
    const year = item.date.slice(0, 4);
    if (/^\d{4}$/.test(year)) years.add(year);
  }
  return [...years].sort((a, b) => b.localeCompare(a));
}
