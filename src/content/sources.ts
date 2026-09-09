import type { Source } from '@/lib/content/source';

/**
 * THE SOURCE REGISTRY
 *
 * Every source cited anywhere on the site is defined once, here. Records
 * reference these constants rather than repeating a `sourceName` inline, so a
 * publication's name cannot be spelled two different ways on two pages, and a
 * correction to a URL propagates everywhere at once.
 *
 * Nothing in this file is `government-website` or `government-order` tier yet.
 * That is deliberate and it is the honest position: the office has not yet
 * supplied the G.O. numbers, proceeding numbers or press-release PDFs that
 * would let a record be published as a primary government document. Until it
 * does, the site attributes claims to the established news organisations that
 * reported them — which is what those claims actually rest on.
 */

const CHECKED = '2026-08-31';

/* -------------------------------------------------------------------------- *
 * OFFICIAL DEPARTMENTAL PORTALS
 * -------------------------------------------------------------------------- */

export const SRC_TNSCHOOLS: Source = {
  sourceType: 'government-portal',
  sourceName: {
    en: 'School Education Department, Government of Tamil Nadu',
    ta: 'பள்ளிக் கல்வித் துறை, தமிழ்நாடு அரசு',
  },
  sourceUrl: 'https://tnschools.gov.in/welcome',
  verificationDate: CHECKED,
};

export const SRC_TAMILVALARCHI: Source = {
  sourceType: 'government-portal',
  sourceName: {
    en: 'Tamil Development Department, Government of Tamil Nadu',
    ta: 'தமிழ் வளர்ச்சித் துறை, தமிழ்நாடு அரசு',
  },
  sourceUrl: 'https://tamilvalarchithurai.tn.gov.in/',
  verificationDate: CHECKED,
};

export const SRC_DIPR: Source = {
  sourceType: 'government-portal',
  sourceName: {
    en: 'Information and Public Relations Department, Government of Tamil Nadu',
    ta: 'செய்தி – மக்கள் தொடர்புத் துறை, தமிழ்நாடு அரசு',
  },
  sourceUrl: 'https://dipr.tn.gov.in/',
  verificationDate: CHECKED,
};

export const SRC_TNARCH: Source = {
  sourceType: 'government-portal',
  sourceName: {
    en: 'Department of Archaeology, Government of Tamil Nadu',
    ta: 'தொல்லியல் துறை, தமிழ்நாடு அரசு',
  },
  sourceUrl: 'https://www.tnarch.gov.in/',
  verificationDate: CHECKED,
};

export const SRC_ECI: Source = {
  sourceType: 'government-website',
  sourceName: {
    en: 'Election Commission of India',
    ta: 'இந்தியத் தேர்தல் ஆணையம்',
  },
  sourceUrl: 'https://results.eci.gov.in/',
  verificationDate: CHECKED,
  conflictNote: {
    en: 'Figures below are transcribed from a secondary compilation of the ECI result. They must be checked against the ECI constituency return before this record is treated as primary.',
    ta: 'கீழ்க்காணும் எண்கள், தேர்தல் ஆணையத்தின் முடிவுகளின் இரண்டாம் நிலைத் தொகுப்பிலிருந்து எடுக்கப்பட்டவை. இப்பதிவு முதன்மை ஆதாரமாகக் கருதப்படுவதற்கு முன், தேர்தல் ஆணையத்தின் தொகுதி முடிவறிக்கையுடன் இவை சரிபார்க்கப்பட வேண்டும்.',
  },
};

/* -------------------------------------------------------------------------- *
 * ESTABLISHED NEWS ORGANISATIONS
 * Attribute, never state as fact. Each record that cites one of these renders
 * "Source: <publication>" beneath it.
 * -------------------------------------------------------------------------- */

export const SRC_STATESMAN_BUDGET: Source = {
  sourceType: 'news-report',
  sourceName: { en: 'The Statesman', ta: 'தி ஸ்டேட்ஸ்மேன்' },
  sourceUrl:
    'https://www.thestatesman.com/india/rs-16000-crore-revenue-plan-rs-44527-crore-for-school-education-inside-vijay-govts-tamil-nadu-budget-2026-27-1503624510.html',
  publicationDate: '2026-08-05',
  verificationDate: CHECKED,
};

export const SRC_HANSINDIA_BUDGET: Source = {
  sourceType: 'news-report',
  sourceName: { en: 'The Hans India', ta: 'தி ஹான்ஸ் இந்தியா' },
  sourceUrl:
    'https://www.thehansindia.com/tamilnadu/tamil-nadu-budget-school-edn-gets-highest-allocation-1105686',
  publicationDate: '2026-08-05',
  verificationDate: CHECKED,
};

export const SRC_DTNEXT_ALLOCATION: Source = {
  sourceType: 'news-report',
  sourceName: { en: 'DT Next', ta: 'டிடி நெக்ஸ்ட்' },
  sourceUrl:
    'https://www.dtnext.in/news/tamilnadu/dmk-unjustly-created-rs-6003-cr-rise-in-previous-budget-says-rajmohan',
  publicationDate: '2026-08-06',
  verificationDate: CHECKED,
};

export const SRC_NEWSTODAY_ALLOCATION: Source = {
  sourceType: 'news-report',
  sourceName: { en: 'News Today', ta: 'நியூஸ் டுடே' },
  sourceUrl: 'https://newstodaynet.com/2026/08/06/rajmohan-defends-school-education-allocation/',
  publicationDate: '2026-08-06',
  verificationDate: CHECKED,
};

export const SRC_CAREERS360_PORTFOLIO: Source = {
  sourceType: 'news-report',
  sourceName: { en: 'Careers360', ta: 'கரியர்ஸ்360' },
  sourceUrl:
    'https://news.careers360.com/tamil-nadu-rajmohan-new-school-education-minister-kg-arunraj-gets-charge-medical-colleges-cm-vijay-sports-infrastructure-sports',
  publicationDate: '2026-05-10',
  verificationDate: CHECKED,
};

export const SRC_DECCAN_POLICY_NOTE: Source = {
  sourceType: 'news-report',
  sourceName: { en: 'Deccan Chronicle', ta: 'டெக்கான் க்ரானிக்கிள்' },
  sourceUrl:
    'https://www.deccanchronicle.com/southern-states/tamil-nadu/tn-minister-rajmohan-presents-policy-note-for-tourism-culture-1980659',
  verificationDate: CHECKED,
};

export const SRC_KALVISEITHI_SCHOOLS: Source = {
  sourceType: 'news-report',
  sourceName: { en: 'Kalvi Seithi', ta: 'கல்விச் செய்தி' },
  sourceUrl:
    'https://www.kalviseithiofficial.com/2026/07/no-intention-to-close-government-schools.html',
  publicationDate: '2026-07-15',
  verificationDate: CHECKED,
};

export const SRC_WIKIPEDIA_EGMORE: Source = {
  sourceType: 'news-report',
  sourceName: { en: 'Wikipedia — Egmore Assembly constituency', ta: 'விக்கிப்பீடியா — எழும்பூர் தொகுதி' },
  sourceUrl: 'https://en.wikipedia.org/wiki/Egmore_Assembly_constituency',
  verificationDate: CHECKED,
  conflictNote: {
    en: 'Secondary source. Superseded by the Election Commission return once that has been transcribed directly.',
    ta: 'இரண்டாம் நிலை ஆதாரம். தேர்தல் ஆணையத்தின் முடிவறிக்கை நேரடியாகப் பதிவு செய்யப்பட்டதும் இது அதனால் மாற்றப்படும்.',
  },
};

/* -------------------------------------------------------------------------- *
 * THIS OFFICE
 * Framing and navigation copy. Carries no factual claim of its own, and is
 * never labelled "Source:" to the reader.
 * -------------------------------------------------------------------------- */

export const SRC_OFFICE: Source = {
  sourceType: 'editorial',
  sourceName: {
    en: 'Office of Rajmohan Arumugam',
    ta: 'ராஜ்மோகன் ஆறுமுகம் அலுவலகம்',
  },
  verificationDate: CHECKED,
};

/** Photographs supplied by the office for publication on this site. */
export const SRC_OFFICE_PHOTO: Source = {
  sourceType: 'editorial',
  sourceName: {
    en: 'Photograph supplied by the office',
    ta: 'அலுவலகத்தால் வழங்கப்பட்ட புகைப்படம்',
  },
  verificationDate: CHECKED,
};
