/**
 * The four public portals.
 *
 * `position` values are percentages against the navigation IMAGE, not the
 * viewport — they were derived from measured analysis of
 * public/images/navigation.jpg (docs/PHASE-0-AUDIT.md §F) and keep the portals
 * locked to the composition at every width instead of drifting off it.
 *
 * The subject occupies x 38–63%; every portal here clears that band.
 */

export const PORTAL_IDS = [
  'school-education',
  'tamil-development',
  'information-publicity',
  'mla-egmore',
] as const;

export type PortalId = (typeof PORTAL_IDS)[number];

/** Translation key for each portal, in `messages/*.json` under `nav.portals`. */
export type PortalMessageKey =
  | 'schoolEducation'
  | 'tamilDevelopment'
  | 'informationPublicity'
  | 'mlaEgmore';

export interface PortalDefinition {
  readonly id: PortalId;
  readonly messageKey: PortalMessageKey;
  /** Path segment appended to /[locale]/ */
  readonly slug: PortalId;
  /** Department key used by the shared Citizen Service Engine (Phase 9). */
  readonly department: PortalId;
  /** Which flanking stack this portal sits in — drives arrow-key navigation. */
  readonly column: 'left' | 'right';
  /** Row within its stack, 0 = upper. */
  readonly row: 0 | 1;
  /** Percentage box against the image. Verified clear of the subject. */
  readonly position: {
    readonly left: `${number}%`;
    readonly top: `${number}%`;
    readonly width: `${number}%`;
  };
}

export const PORTALS: readonly PortalDefinition[] = [
  {
    id: 'school-education',
    messageKey: 'schoolEducation',
    slug: 'school-education',
    department: 'school-education',
    column: 'left',
    row: 0,
    position: { left: '4%', top: '12%', width: '28%' },
  },
  {
    id: 'tamil-development',
    messageKey: 'tamilDevelopment',
    slug: 'tamil-development',
    department: 'tamil-development',
    column: 'left',
    row: 1,
    position: { left: '4%', top: '31%', width: '28%' },
  },
  {
    id: 'information-publicity',
    messageKey: 'informationPublicity',
    slug: 'information-publicity',
    department: 'information-publicity',
    column: 'right',
    row: 0,
    position: { left: '68%', top: '12%', width: '28%' },
  },
  {
    id: 'mla-egmore',
    messageKey: 'mlaEgmore',
    slug: 'mla-egmore',
    department: 'mla-egmore',
    column: 'right',
    row: 1,
    position: { left: '68%', top: '31%', width: '28%' },
  },
] as const;

/**
 * Spatial map for roving-tabindex arrow navigation. Returns the portal index
 * reached by pressing `key` from `from`, or null if the move is a no-op.
 */
export function resolveArrowTarget(from: number, key: string): number | null {
  const current = PORTALS[from];
  if (!current) return null;

  const wantColumn =
    key === 'ArrowLeft' ? 'left' : key === 'ArrowRight' ? 'right' : current.column;
  const wantRow =
    key === 'ArrowUp' ? 0 : key === 'ArrowDown' ? 1 : current.row;

  const target = PORTALS.findIndex((p) => p.column === wantColumn && p.row === wantRow);
  return target === -1 || target === from ? null : target;
}
