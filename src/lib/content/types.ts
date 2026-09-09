import type { Locale } from '@/lib/i18n/routing';

/**
 * CONTENT GOVERNANCE — binding across the whole platform.
 *
 * The brief forbids inventing achievements, statistics, schemes, quotes, dates,
 * awards, orders or ministerial actions. Every content record therefore carries
 * its provenance, and the renderer enforces it.
 *
 * `unverified` never reaches production. That is a build-level guarantee, not
 * an editorial convention — see `isPublishable` and `npm run validate:content`.
 */
export type Verification =
  /** Confirmed against a primary official source recorded in `source`. */
  | 'verified'
  /** Reported by a credible third party. Attribute; never state as fact. */
  | 'reported'
  /** Announced or planned. Must not be presented as delivered. */
  | 'proposed'
  /** Framing written by this office. Carries no factual claim of its own. */
  | 'editorial'
  /** A known gap. Structure without content. Blocked from production. */
  | 'unverified';

/** A string that exists in both locales. A single-language string cannot be expressed. */
export type Bilingual = Readonly<Record<Locale, string>>;

/**
 * The minimum any record must state about itself.
 *
 * Deliberately structural rather than a base class: `NewsItem`, `Metric` and
 * `Ward` all satisfy it without sharing an inheritance chain, so the gate below
 * applies uniformly to collections that otherwise have nothing in common.
 */
export interface Provenance {
  readonly verification: Verification;
}

export const PUBLISHABLE: readonly Verification[] = [
  'verified',
  'reported',
  'proposed',
  'editorial',
];

/**
 * The single gate every content renderer passes through.
 *
 * In production, `unverified` is withheld. In development and staging it
 * renders behind a visible marker so authors can see the structure that still
 * needs filling.
 */
export function isPublishable(
  item: Provenance,
  env: string | undefined = process.env.NODE_ENV,
): boolean {
  if (PUBLISHABLE.includes(item.verification)) return true;
  return env !== 'production';
}

/** True when the item must be rendered with a visible "pending" marker. */
export function needsVerificationMarker(item: Provenance): boolean {
  return item.verification === 'unverified';
}

/**
 * Guards against a `verified` or `reported` record shipping without a named
 * source — an unsourced factual claim wearing a badge that says it was checked.
 * Run by `npm run validate:content` in CI.
 */
export function hasRequiredSource(item: {
  readonly verification: Verification;
  readonly source?: { readonly sourceName: Bilingual } | undefined;
}): boolean {
  if (item.verification !== 'verified' && item.verification !== 'reported') return true;
  const name = item.source?.sourceName;
  return Boolean(name?.en?.trim() && name?.ta?.trim());
}
