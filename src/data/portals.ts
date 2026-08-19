import type { PortalId } from '@/config/portals';
import type { Bilingual, Verification } from '@/lib/content/types';

/**
 * Section manifests for the four portals.
 *
 * These are the SECTION STRUCTURES mandated by the specifications (master
 * prompt §7-§10, PDF §4-§7) — headings and layout intent only.
 *
 * There is deliberately NO body copy, statistic, date, scheme name, quote or
 * achievement anywhere in this file. None was supplied, and both specs forbid
 * inventing them. Every section is marked `unverified` and renders as visible
 * structure awaiting real content.
 */

/** Layout treatments assigned per section in design-system/pages/*.md */
export type SectionLayout =
  | 'hero'
  | 'statement'
  | 'numbered-list'
  | 'asymmetric-left'
  | 'asymmetric-right'
  | 'full-bleed'
  | 'prose-columns'
  | 'data-band'
  | 'staggered'
  | 'timeline'
  | 'editorial-index'
  | 'link-list'
  | 'table'
  | 'roll'
  | 'catalogue'
  | 'feature-word'
  | 'category-grid'
  | 'media-grid'
  | 'query'
  | 'tracker'
  | 'contact';

export interface PortalSection {
  readonly id: string;
  readonly title: Bilingual;
  readonly layout: SectionLayout;
  readonly verification: Verification;
}

export interface PortalContent {
  readonly id: PortalId;
  readonly title: Bilingual;
  readonly standfirst: Bilingual;
  readonly sections: readonly PortalSection[];
}

const pending: Verification = 'unverified';

const s = (
  id: string,
  en: string,
  ta: string,
  layout: SectionLayout,
): PortalSection => ({ id, title: { en, ta }, layout, verification: pending });

export const PORTAL_CONTENT: Readonly<Record<PortalId, PortalContent>> = {
  'school-education': {
    id: 'school-education',
    title: { en: 'School Education', ta: 'பள்ளிக் கல்வி' },
    standfirst: {
      en: 'Learning, students, teachers and the schools of Tamil Nadu.',
      ta: 'கற்றல், மாணவர்கள், ஆசிரியர்கள் மற்றும் தமிழ்நாட்டின் பள்ளிகள்.',
    },
    sections: [
      s('vision', 'Education Vision', 'கல்விப் பார்வை', 'statement'),
      s('priorities', 'Current Priorities', 'தற்போதைய முன்னுரிமைகள்', 'numbered-list'),
      s('schools', 'Schools', 'பள்ளிகள்', 'asymmetric-left'),
      s('students', 'Students', 'மாணவர்கள்', 'full-bleed'),
      s('teachers', 'Teachers', 'ஆசிரியர்கள்', 'asymmetric-right'),
      s('curriculum', 'Curriculum', 'பாடத்திட்டம்', 'prose-columns'),
      s('infrastructure', 'Infrastructure', 'உள்கட்டமைப்பு', 'data-band'),
      s('initiatives', 'Initiatives', 'முன்முயற்சிகள்', 'staggered'),
      s('timeline', 'Education Timeline', 'கல்வி காலவரிசை', 'timeline'),
      s('news', 'News & Announcements', 'செய்திகள் & அறிவிப்புகள்', 'editorial-index'),
      s('resources', 'Resources', 'ஆதாரங்கள்', 'link-list'),
    ],
  },

  'tamil-development': {
    id: 'tamil-development',
    title: { en: 'Tamil Development', ta: 'தமிழ் வளர்ச்சி' },
    standfirst: {
      en: 'Language, literature, heritage and the knowledge of Tamil.',
      ta: 'மொழி, இலக்கியம், பாரம்பரியம் மற்றும் தமிழ் அறிவு.',
    },
    sections: [
      s('vision', 'Tamil Vision', 'தமிழ்ப் பார்வை', 'statement'),
      s('official-language', 'Official Language', 'ஆட்சி மொழி', 'prose-columns'),
      s('literature', 'Literature', 'இலக்கியம்', 'editorial-index'),
      s('awards', 'Awards', 'விருதுகள்', 'roll'),
      s('nationalised-books', 'Nationalised Books', 'நாட்டுடைமை நூல்கள்', 'catalogue'),
      s('sorkuvai', 'Sorkuvai', 'சொற்குவை', 'feature-word'),
      s('students-youth', 'Students & Youth', 'மாணவர்கள் & இளையோர்', 'asymmetric-left'),
      s('institutions', 'Tamil Institutions', 'தமிழ் நிறுவனங்கள்', 'link-list'),
      s('research', 'Research', 'ஆராய்ச்சி', 'table'),
      s('culture-heritage', 'Culture & Heritage', 'பண்பாடு & பாரம்பரியம்', 'full-bleed'),
      s('global-tamil', 'Global Tamil Engagement', 'உலகத் தமிழ் ஈடுபாடு', 'link-list'),
      s('news', 'News', 'செய்திகள்', 'editorial-index'),
    ],
  },

  'information-publicity': {
    id: 'information-publicity',
    title: { en: 'Information & Publicity', ta: 'தகவல் மற்றும் விளம்பரம்' },
    standfirst: {
      en: 'Government communication, press and public access to information.',
      ta: 'அரசு தகவல் தொடர்பு, ஊடகம் மற்றும் தகவல் பொது அணுகல்.',
    },
    sections: [
      s('latest', 'Latest Information', 'சமீபத்திய தகவல்', 'editorial-index'),
      s('press-releases', 'Press Releases', 'செய்திக் குறிப்புகள்', 'table'),
      s('statements', 'Minister Statements', 'அமைச்சர் அறிக்கைகள்', 'roll'),
      s('communication', 'Government Communication', 'அரசு தகவல் தொடர்பு', 'prose-columns'),
      s('media', 'Media', 'ஊடகம்', 'link-list'),
      s('publications', 'Publications', 'வெளியீடுகள்', 'catalogue'),
      s('video', 'Video', 'காணொளி', 'media-grid'),
      s('photo-archive', 'Photo Archive', 'புகைப்பட காப்பகம்', 'media-grid'),
      s('announcements', 'Announcements', 'அறிவிப்புகள்', 'link-list'),
    ],
  },

  'mla-egmore': {
    id: 'mla-egmore',
    title: { en: 'MLA · Egmore', ta: 'சட்டமன்ற உறுப்பினர் · எழும்பூர்' },
    standfirst: {
      en: 'The constituency office for Egmore. Raise a concern, track its progress.',
      ta: 'எழும்பூர் தொகுதி அலுவலகம். கவலையைத் தெரிவியுங்கள், அதன் நிலையைக் கண்காணியுங்கள்.',
    },
    sections: [
      s('about-egmore', 'About Egmore', 'எழும்பூர் பற்றி', 'prose-columns'),
      s('representation', 'My Representation', 'எனது பிரதிநிதித்துவம்', 'statement'),
      s('development', 'Constituency Development', 'தொகுதி மேம்பாடு', 'table'),
      s('public-issues', 'Public Issues', 'பொதுப் பிரச்சினைகள்', 'category-grid'),
      s('initiatives', 'Local Initiatives', 'உள்ளூர் முன்முயற்சிகள்', 'staggered'),
      s('events', 'Events', 'நிகழ்வுகள்', 'editorial-index'),
      s('services', 'Citizen Services', 'குடிமக்கள் சேவைகள்', 'numbered-list'),
      s('news', 'News', 'செய்திகள்', 'editorial-index'),
      s('track', 'Track Your Query', 'உங்கள் கோரிக்கையைக் கண்காணிக்கவும்', 'tracker'),
      s('contact', 'Contact', 'தொடர்பு', 'contact'),
    ],
  },
};
