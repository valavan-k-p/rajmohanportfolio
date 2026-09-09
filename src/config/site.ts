import type { Bilingual } from '@/lib/content/types';
import type { SocialLink, Source } from '@/lib/content/source';

/**
 * IDENTITY
 *
 * Name and designation are set in the same family (client handwritten note 1.2:
 * "Rajmohan Name font size (Designation)"). The typography does that; this file
 * only guarantees they are one record and can never drift apart.
 *
 * The designation wording follows the official-source phrasing rather than the
 * previous site's, which listed the departments in a different order.
 */

export const WIKIPEDIA_SOURCE: Source = {
  sourceType: 'news-report',
  sourceName: { en: 'Wikipedia', ta: 'விக்கிப்பீடியா' },
  sourceUrl: 'https://en.wikipedia.org/wiki/Rajmohan_Arumugam',
  verificationDate: '2026-08-31',
  conflictNote: {
    en: 'Secondary source. Office and election facts are to be re-confirmed against results.eci.gov.in and the Tamil Nadu Government portfolio notification before being marked verified.',
    ta: 'இரண்டாம் நிலை ஆதாரம். பதவி மற்றும் தேர்தல் தொடர்பான தகவல்கள், results.eci.gov.in மற்றும் தமிழ்நாடு அரசின் துறை ஒதுக்கீட்டு அறிவிக்கையுடன் மீண்டும் சரிபார்க்கப்பட்ட பின்னரே சரிபார்க்கப்பட்டதாகக் குறிக்கப்படும்.',
  },
};

export const IDENTITY = {
  name: {
    en: 'Rajmohan Arumugam',
    ta: 'ராஜ்மோகன் ஆறுமுகம்',
  } satisfies Bilingual,

  /** Short form, for the header lockup on mobile. */
  shortName: {
    en: 'Rajmohan Arumugam',
    ta: 'ராஜ்மோகன் ஆறுமுகம்',
  } satisfies Bilingual,

  designation: {
    en: 'Minister for School Education, Tamil Development and Information',
    ta: 'பள்ளிக் கல்வி, தமிழ் வளர்ச்சி மற்றும் செய்தித் துறை அமைச்சர்',
  } satisfies Bilingual,

  office: {
    en: 'Government of Tamil Nadu',
    ta: 'தமிழ்நாடு அரசு',
  } satisfies Bilingual,

  constituency: {
    en: 'Member of the Legislative Assembly, Egmore',
    ta: 'சட்டமன்ற உறுப்பினர், எழும்பூர்',
  } satisfies Bilingual,

  /**
   * The single positioning line under the name on the homepage. Factual, not
   * promotional — the brief forbids "historic", "unprecedented" and the rest.
   */
  positioning: {
    en: 'A public record of the work of three departments and one constituency — published with its sources.',
    ta: 'மூன்று துறைகளின் மற்றும் ஒரு தொகுதியின் பணிகளின் பொதுப் பதிவு — அதன் ஆதாரங்களுடன் வெளியிடப்படுகிறது.',
  } satisfies Bilingual,
} as const;

/* -------------------------------------------------------------------------- *
 * NAVIGATION
 * Seven items, and no more. Sub-pages are reached from their portal, never
 * from the header (brief §10: "Do not expose every sub-page in the header").
 * -------------------------------------------------------------------------- */

export interface NavItem {
  readonly href: string;
  readonly label: Bilingual;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { href: '', label: { en: 'Home', ta: 'முகப்பு' } },
  { href: '/about', label: { en: 'About', ta: 'அறிமுகம்' } },
  { href: '/portals', label: { en: 'Portals', ta: 'துறைகள்' } },
  { href: '/news', label: { en: 'News', ta: 'செய்திகள்' } },
  { href: '/media', label: { en: 'Media', ta: 'ஊடகம்' } },
  { href: '/documents', label: { en: 'Documents', ta: 'ஆவணங்கள்' } },
  { href: '/services', label: { en: 'Services', ta: 'சேவைகள்' } },
];

export const UTILITY_NAV: readonly NavItem[] = [
  { href: '/disclaimer', label: { en: 'Disclaimer', ta: 'விவர மறுப்பு' } },
  { href: '/accessibility', label: { en: 'Accessibility', ta: 'அணுகல் தன்மை' } },
  { href: '/privacy', label: { en: 'Privacy', ta: 'தனியுரிமை' } },
];

/* -------------------------------------------------------------------------- *
 * OFFICIAL SOCIAL ACCOUNTS
 *
 * `verified: false` renders NOTHING. The two Facebook links supplied by the
 * project owner were `/share/` redirect URLs; no canonical page could be
 * confirmed for either, so both are held back rather than published as
 * "official". See docs/REDESIGN-PLAN.md §5.
 * -------------------------------------------------------------------------- */

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: 'se-instagram',
    platform: 'instagram',
    handle: 'tnschoolsedu',
    label: { en: 'School Education Department', ta: 'பள்ளிக் கல்வித் துறை' },
    url: 'https://www.instagram.com/tnschoolsedu/',
    verified: true,
    verificationDate: '2026-08-31',
    department: 'school-education',
  },
  {
    id: 'se-x',
    platform: 'x',
    handle: 'tnschoolsedu',
    label: { en: 'School Education Department', ta: 'பள்ளிக் கல்வித் துறை' },
    url: 'https://x.com/tnschoolsedu',
    verified: true,
    verificationDate: '2026-08-31',
    department: 'school-education',
  },
  {
    id: 'se-website',
    platform: 'website',
    handle: 'tnschools.gov.in',
    label: { en: 'School Education Department', ta: 'பள்ளிக் கல்வித் துறை' },
    url: 'https://tnschools.gov.in/welcome',
    verified: true,
    verificationDate: '2026-08-31',
    department: 'school-education',
  },
  {
    id: 'se-facebook',
    platform: 'facebook',
    handle: 'tnschoolsedu',
    label: { en: 'School Education Department', ta: 'பள்ளிக் கல்வித் துறை' },
    url: 'https://www.facebook.com/share/18oDrRmoNK/',
    verified: false,
    department: 'school-education',
    note: 'Supplied as a /share/ redirect. No canonical page confirmed — withheld.',
  },

  {
    id: 'dipr-instagram',
    platform: 'instagram',
    handle: 'tndipr',
    label: {
      en: 'Information and Public Relations Department',
      ta: 'செய்தி – மக்கள் தொடர்புத் துறை',
    },
    url: 'https://www.instagram.com/tndipr/',
    verified: false,
    department: 'information-publicity',
    note: 'Handle supplied by the project owner. Awaiting direct confirmation that the account is departmental.',
  },
  {
    id: 'dipr-x',
    platform: 'x',
    handle: 'TNDIPRNEWS',
    label: {
      en: 'Information and Public Relations Department',
      ta: 'செய்தி – மக்கள் தொடர்புத் துறை',
    },
    url: 'https://x.com/TNDIPRNEWS',
    verified: false,
    department: 'information-publicity',
    note: 'Handle supplied by the project owner. Awaiting direct confirmation.',
  },
  {
    id: 'dipr-website',
    platform: 'website',
    handle: 'dipr.tn.gov.in',
    label: {
      en: 'Information and Public Relations Department',
      ta: 'செய்தி – மக்கள் தொடர்புத் துறை',
    },
    url: 'https://dipr.tn.gov.in/',
    verified: true,
    verificationDate: '2026-08-31',
    department: 'information-publicity',
  },
  {
    id: 'dipr-facebook',
    platform: 'facebook',
    handle: 'tndipr',
    label: {
      en: 'Information and Public Relations Department',
      ta: 'செய்தி – மக்கள் தொடர்புத் துறை',
    },
    url: 'https://www.facebook.com/share/1PzUzxgvvZ/',
    verified: false,
    department: 'information-publicity',
    note: 'Supplied as a /share/ redirect. No canonical page confirmed — withheld.',
  },

  {
    id: 'td-instagram',
    platform: 'instagram',
    handle: 'tamilvalarchithurai.tn',
    label: { en: 'Tamil Development Department', ta: 'தமிழ் வளர்ச்சித் துறை' },
    url: 'https://www.instagram.com/tamilvalarchithurai.tn/',
    verified: false,
    department: 'tamil-development',
    note: 'Handle supplied by the project owner. Awaiting direct confirmation.',
  },
  {
    id: 'td-website',
    platform: 'website',
    handle: 'tamilvalarchithurai.tn.gov.in',
    label: { en: 'Tamil Development Department', ta: 'தமிழ் வளர்ச்சித் துறை' },
    url: 'https://tamilvalarchithurai.tn.gov.in/',
    verified: true,
    verificationDate: '2026-08-31',
    department: 'tamil-development',
  },
];

/** Only accounts this office has actually opened and confirmed. */
export function verifiedSocialLinks(department?: string): SocialLink[] {
  return SOCIAL_LINKS.filter(
    (link) => link.verified && (department === undefined || link.department === department),
  );
}

/* -------------------------------------------------------------------------- *
 * OFFICIAL GOVERNMENT LINKS
 * These leave the site. They are labelled as departmental sites, never
 * presented as though this site were one of them.
 * -------------------------------------------------------------------------- */

export interface OfficialLink {
  readonly label: Bilingual;
  readonly url: string;
  readonly description: Bilingual;
}

export const OFFICIAL_LINKS: readonly OfficialLink[] = [
  {
    label: { en: 'School Education Department', ta: 'பள்ளிக் கல்வித் துறை' },
    url: 'https://tnschools.gov.in/welcome',
    description: {
      en: 'Official departmental portal — schools, services and announcements.',
      ta: 'அலுவல்முறைத் துறை இணையதளம் — பள்ளிகள், சேவைகள், அறிவிப்புகள்.',
    },
  },
  {
    label: { en: 'Tamil Development Department', ta: 'தமிழ் வளர்ச்சித் துறை' },
    url: 'https://tamilvalarchithurai.tn.gov.in/',
    description: {
      en: 'Official departmental portal — awards, documents and district offices.',
      ta: 'அலுவல்முறைத் துறை இணையதளம் — விருதுகள், ஆவணங்கள், மாவட்ட அலுவலகங்கள்.',
    },
  },
  {
    label: {
      en: 'Information and Public Relations Department',
      ta: 'செய்தி – மக்கள் தொடர்புத் துறை',
    },
    url: 'https://dipr.tn.gov.in/',
    description: {
      en: 'Official departmental portal — press releases, press notes and government orders.',
      ta: 'அலுவல்முறைத் துறை இணையதளம் — செய்திக்குறிப்புகள், பத்திரிகைக் குறிப்புகள், அரசு ஆணைகள்.',
    },
  },
  {
    label: { en: 'Government of Tamil Nadu', ta: 'தமிழ்நாடு அரசு' },
    url: 'https://www.tn.gov.in/',
    description: {
      en: 'State government portal.',
      ta: 'மாநில அரசு இணையதளம்.',
    },
  },
  {
    label: { en: 'Election Commission of India', ta: 'இந்தியத் தேர்தல் ஆணையம்' },
    url: 'https://results.eci.gov.in/',
    description: {
      en: 'Primary source for all election result data on this site.',
      ta: 'இத்தளத்தில் உள்ள அனைத்துத் தேர்தல் முடிவுத் தரவுகளுக்கும் முதன்மை ஆதாரம்.',
    },
  },
];
