import type { Bilingual } from '@/lib/content/types';

/**
 * THE FOUR PORTALS
 *
 * This is the signature architecture of the site. Everything else — news,
 * documents, media, services — is a cross-cut of these four.
 *
 * The previous version positioned the portals as absolute percentage boxes
 * over a photograph. The client asked for that to go (handwritten note 1.3:
 * "NO Need Nos. — change to Vertical"), so there are no coordinates here and
 * no ordinal numerals. Order is document order; the list is vertical.
 */

export const PORTAL_IDS = [
  'school-education',
  'tamil-development',
  'information-publicity',
  'mla-egmore',
] as const;

export type PortalId = (typeof PORTAL_IDS)[number];

export interface PortalDefinition {
  readonly id: PortalId;
  /** URL segment under /[locale]/. Note: `mla-egmore` is addressed as `egmore`. */
  readonly slug: string;
  readonly title: Bilingual;
  /** Four words, the portal's remit. Replaces the old "01 —" numeral. */
  readonly facets: readonly Bilingual[];
  readonly standfirst: Bilingual;
  /**
   * The one Tailwind colour token this portal is allowed to use, as a 2px
   * rule and an eyebrow. Nothing else in the portal is coloured.
   */
  readonly accentVar: string;
  /** Cover image. One per portal — the brief forbids reusing a single photo. */
  readonly cover: string;
  /** The department this portal reports on, where one exists. */
  readonly officialSite?: string;
}

export const PORTALS: readonly PortalDefinition[] = [
  {
    id: 'school-education',
    slug: 'school-education',
    title: { en: 'School Education', ta: 'பள்ளிக் கல்வி' },
    facets: [
      { en: 'Schools', ta: 'பள்ளிகள்' },
      { en: 'Students', ta: 'மாணவர்கள்' },
      { en: 'Teachers', ta: 'ஆசிரியர்கள்' },
      { en: 'Learning', ta: 'கற்றல்' },
    ],
    standfirst: {
      en: 'Departmental news, proceedings, government orders, budget papers and programmes for the schools of Tamil Nadu.',
      ta: 'தமிழ்நாட்டுப் பள்ளிகளுக்கான துறைச் செய்திகள், செயல்முறை ஆணைகள், அரசு ஆணைகள், நிதிநிலை ஆவணங்கள் மற்றும் திட்டங்கள்.',
    },
    accentVar: 'var(--color-portal-education)',
    cover: '/images/portals/school-education-cover.webp',
    officialSite: 'https://tnschools.gov.in/welcome',
  },
  {
    id: 'tamil-development',
    slug: 'tamil-development',
    title: { en: 'Tamil Development', ta: 'தமிழ் வளர்ச்சி' },
    facets: [
      { en: 'Language', ta: 'மொழி' },
      { en: 'Literature', ta: 'இலக்கியம்' },
      { en: 'Culture', ta: 'பண்பாடு' },
      { en: 'Heritage', ta: 'பாரம்பரியம்' },
    ],
    standfirst: {
      en: 'The language, its literature and the institutions that carry them — books, publications, awards, research and cultural programmes.',
      ta: 'மொழி, அதன் இலக்கியம், அவற்றைச் சுமக்கும் நிறுவனங்கள் — நூல்கள், வெளியீடுகள், விருதுகள், ஆய்வு மற்றும் பண்பாட்டுத் திட்டங்கள்.',
    },
    accentVar: 'var(--color-portal-tamil)',
    cover: '/images/portals/tamil-development-cover.webp',
    officialSite: 'https://tamilvalarchithurai.tn.gov.in/',
  },
  {
    id: 'information-publicity',
    slug: 'information-publicity',
    title: { en: 'Information & Publicity', ta: 'தகவல் மற்றும் விளம்பரம்' },
    facets: [
      { en: 'News', ta: 'செய்திகள்' },
      { en: 'Press', ta: 'பத்திரிகை' },
      { en: 'Announcements', ta: 'அறிவிப்புகள்' },
      { en: 'Media', ta: 'ஊடகம்' },
    ],
    standfirst: {
      en: 'Press releases, press notes, announcements and the photo and video record of government events.',
      ta: 'செய்திக்குறிப்புகள், பத்திரிகைக் குறிப்புகள், அறிவிப்புகள் மற்றும் அரசு நிகழ்வுகளின் ஒளிப்பட, காணொலிப் பதிவுகள்.',
    },
    accentVar: 'var(--color-portal-information)',
    cover: '/images/portals/information-publicity-cover.webp',
    officialSite: 'https://dipr.tn.gov.in/',
  },
  {
    id: 'mla-egmore',
    slug: 'egmore',
    title: { en: 'MLA · Egmore', ta: 'சட்டமன்ற உறுப்பினர் · எழும்பூர்' },
    facets: [
      { en: 'People', ta: 'மக்கள்' },
      { en: 'Constituency', ta: 'தொகுதி' },
      { en: 'Development', ta: 'மேம்பாடு' },
      { en: 'Representation', ta: 'பிரதிநிதித்துவம்' },
    ],
    standfirst: {
      en: 'The constituency and its representation — wards, development works, Assembly business and citizen services.',
      ta: 'தொகுதியும் அதன் பிரதிநிதித்துவமும் — வார்டுகள், மேம்பாட்டுப் பணிகள், சட்டமன்றப் பணிகள் மற்றும் குடிமக்கள் சேவைகள்.',
    },
    accentVar: 'var(--color-portal-egmore)',
    cover: '/images/portals/egmore-cover.webp',
  },
] as const;

const BY_ID = new Map(PORTALS.map((p) => [p.id, p] as const));
const BY_SLUG = new Map(PORTALS.map((p) => [p.slug, p] as const));

export function getPortal(id: PortalId): PortalDefinition {
  const portal = BY_ID.get(id);
  // Unreachable via the type system; thrown so a bad dynamic lookup fails loudly.
  if (!portal) throw new Error(`Unknown portal: ${id}`);
  return portal;
}

export function getPortalBySlug(slug: string): PortalDefinition | undefined {
  return BY_SLUG.get(slug);
}
