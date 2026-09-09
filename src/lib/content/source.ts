import type { Bilingual } from './types';
import type { Locale } from '@/lib/i18n/routing';

/**
 * SOURCE SYSTEM
 *
 * Every factual record on this site carries provenance. The type makes an
 * unsourced factual claim impossible to express: `sourceType` has no "unknown"
 * member, and `hasRequiredSource` (types.ts) fails the build for a `verified`
 * record without a `sourceName`.
 *
 * The order of `SOURCE_PRIORITY` is the reconciliation rule from the brief:
 * when two sources disagree, the lower index wins and the conflict is recorded
 * in `conflictNote` rather than silently merged.
 */
export type SourceType =
  /** L1 — an official Government of Tamil Nadu / Government of India website. */
  | 'government-website'
  /** L2 — a departmental portal (tnschools, dipr, tamilvalarchithurai). */
  | 'government-portal'
  /** L3 — a numbered G.O., proceeding, or Assembly record. */
  | 'government-order'
  | 'assembly-record'
  /** L4 — an official press release or press note issued by a department. */
  | 'official-press-release'
  /** L5 — a verified official departmental social-media account. */
  | 'official-social'
  /** L6 — an established news organisation. Attribute, never state as fact. */
  | 'news-report'
  /** Framing written by this office. Carries no factual claim of its own. */
  | 'editorial';

/** Reconciliation order. Index 0 outranks every source below it. */
export const SOURCE_PRIORITY: readonly SourceType[] = [
  'government-website',
  'government-portal',
  'government-order',
  'assembly-record',
  'official-press-release',
  'official-social',
  'news-report',
  'editorial',
];

/** How each source type is labelled to the reader, in both languages. */
export const SOURCE_TYPE_LABEL: Readonly<Record<SourceType, Bilingual>> = {
  'government-website': {
    en: 'Government Website',
    ta: 'அரசு இணையதளம்',
  },
  'government-portal': {
    en: 'Government Department',
    ta: 'அரசுத் துறை',
  },
  'government-order': {
    en: 'Government Order',
    ta: 'அரசு ஆணை',
  },
  'assembly-record': {
    en: 'Assembly Record',
    ta: 'சட்டமன்றப் பதிவு',
  },
  'official-press-release': {
    en: 'Official Press Release',
    ta: 'அலுவல்முறைச் செய்திக்குறிப்பு',
  },
  'official-social': {
    en: 'Official Social Media',
    ta: 'அலுவல்முறை சமூக ஊடகம்',
  },
  'news-report': {
    en: 'News Report',
    ta: 'செய்தி அறிக்கை',
  },
  editorial: {
    en: 'Office of the Minister',
    ta: 'அமைச்சர் அலுவலகம்',
  },
};

export interface Source {
  readonly sourceType: SourceType;
  /** The organisation, exactly as it names itself. Not a paraphrase. */
  readonly sourceName: Bilingual;
  /** Canonical URL. Omitted only for offline records (a printed G.O.). */
  readonly sourceUrl?: string;
  /** ISO date the source published the claim. */
  readonly publicationDate?: string;
  /** ISO date printed on the document itself, where it differs. */
  readonly documentDate?: string;
  /** ISO date this office last checked the source. */
  readonly verificationDate?: string;
  /**
   * Set when a lower-priority source disagrees, or when a record is standing
   * on a weaker source than it eventually should. Recorded, never merged away.
   *
   * `Bilingual`, not `string`: this note is rendered to the reader in the
   * document and article metadata blocks, so an English-only value put an
   * English paragraph on a Tamil page.
   */
  readonly conflictNote?: Bilingual;
}

/**
 * Returns the source that should be believed, and records the loser when the
 * two disagree. Never merges. Returns `null` for an empty list rather than
 * inventing a fallback.
 */
export function reconcile(sources: readonly Source[]): Source | null {
  if (sources.length === 0) return null;
  const ranked = [...sources].sort(
    (a, b) => SOURCE_PRIORITY.indexOf(a.sourceType) - SOURCE_PRIORITY.indexOf(b.sourceType),
  );
  return ranked[0] ?? null;
}

/** True when a source outranks another and the two should not be blended. */
export function outranks(a: SourceType, b: SourceType): boolean {
  return SOURCE_PRIORITY.indexOf(a) < SOURCE_PRIORITY.indexOf(b);
}

/**
 * The one-line attribution shown under a card or in a document's metadata
 * block. Deliberately short: the brief forbids a large source box on every
 * card.
 */
export function sourceLine(source: Source, locale: Locale): string {
  return source.sourceName[locale];
}

/** Verified official social accounts, and only those, may render as links. */
export type SocialPlatform = 'instagram' | 'facebook' | 'x' | 'youtube' | 'website';

export interface SocialLink {
  readonly id: string;
  readonly platform: SocialPlatform;
  readonly handle: string;
  readonly label: Bilingual;
  readonly url: string;
  /**
   * False until this office has opened the account and confirmed it belongs
   * to the named department. `SocialLinks` renders nothing for `false`.
   */
  readonly verified: boolean;
  readonly verificationDate?: string;
  readonly department: string;
  /** Why an account is still unverified. Editor-facing only. */
  readonly note?: string;
}
