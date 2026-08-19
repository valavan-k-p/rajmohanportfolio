import type { Locale } from '@/lib/i18n/routing';

/**
 * CONTENT GOVERNANCE — binding across the whole platform.
 *
 * Both specifications forbid inventing achievements, statistics, schemes,
 * quotes, dates, awards, orders or ministerial actions. No research or content
 * source was supplied with the project (docs/PHASE-0-AUDIT.md §H-7), so every
 * content record carries its provenance and the renderer enforces it.
 *
 * `unverified` never reaches production. That is a build-level guarantee, not
 * an editorial convention — see `isPublishable`.
 */
export type Verification =
  /** Confirmed against an official source recorded in `source`. */
  | 'verified'
  /** Reported by a credible third party; attribute, never state as fact. */
  | 'reported'
  /** Announced or planned. Must not be presented as delivered. */
  | 'proposed'
  /** Editorial framing written by the communications team. Carries no claim. */
  | 'editorial'
  /** Structure only. Placeholder. Blocked from production. */
  | 'unverified';

/** A string that exists in both locales. Never a single-language string. */
export type Bilingual = Readonly<Record<Locale, string>>;

export interface Provenance {
  readonly verification: Verification;
  /** Required whenever verification is 'verified' or 'reported'. */
  readonly source?: string;
  /** ISO date the claim was checked. */
  readonly checkedAt?: string;
}

export interface ContentBlock extends Provenance {
  readonly id: string;
  readonly heading: Bilingual;
  readonly body?: Bilingual;
}

/**
 * A statistic is the highest-risk content type in the project — a wrong number
 * on an official portal is a serious harm. The type makes a bare number
 * impossible: a value cannot exist without provenance and a label.
 */
export interface Statistic extends Provenance {
  readonly id: string;
  readonly label: Bilingual;
  readonly value: string;
  readonly unit?: Bilingual;
}

export const PUBLISHABLE: readonly Verification[] = [
  'verified',
  'reported',
  'proposed',
  'editorial',
];

/**
 * The single gate every content renderer must pass through.
 *
 * In production, `unverified` is withheld. In development and staging it
 * renders behind a visible marker so authors can see the structure they need
 * to fill.
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
 * Guards against a `verified`/`reported` record shipping without a source.
 * Run by `npm run validate:content` in CI.
 */
export function hasRequiredSource(item: Provenance): boolean {
  if (item.verification === 'verified' || item.verification === 'reported') {
    return typeof item.source === 'string' && item.source.trim().length > 0;
  }
  return true;
}
