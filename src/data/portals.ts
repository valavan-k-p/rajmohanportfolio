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

const v = (
  id: string,
  en: string,
  ta: string,
  layout: SectionLayout,
): PortalSection => ({ id, title: { en, ta }, layout, verification: 'editorial' });

export const PORTAL_CONTENT: Readonly<Record<PortalId, PortalContent>> = {
  'school-education': {
    id: 'school-education',
    title: { en: 'School Education', ta: 'பள்ளிக் கல்வி' },
    standfirst: {
      en: 'Learning, students, teachers and the schools of Tamil Nadu.',
      ta: 'கற்றல், மாணவர்கள், ஆசிரியர்கள் மற்றும் தமிழ்நாட்டின் பள்ளிகள்.',
    },
    sections: [
      v('vision', 'Education Vision', 'கல்விப் பார்வை', 'statement'),
      v('priorities', 'Current Priorities', 'தற்போதைய முன்னுரிமைகள்', 'numbered-list'),
      v('schools', 'Schools', 'பள்ளிகள்', 'asymmetric-left'),
      v('students', 'Students', 'மாணவர்கள்', 'full-bleed'),
      v('teachers', 'Teachers', 'ஆசிரியர்கள்', 'asymmetric-right'),
      v('curriculum', 'Curriculum', 'பாடத்திட்டம்', 'prose-columns'),
      v('infrastructure', 'Infrastructure & Budget', 'உள்கட்டமைப்பு & நிதி ஒதுக்கீடு', 'data-band'),
      v('initiatives', 'Initiatives & Governance', 'முன்முயற்சிகள் & நிர்வாகம்', 'staggered'),
      v('timeline', 'Education Timeline', 'கல்வி காலவரிசை', 'timeline'),
      v('news', 'News & Announcements', 'செய்திகள் & அறிவிப்புகள்', 'editorial-index'),
      v('resources', 'Sources & Documentation', 'ஆதாரங்கள் & ஆவணங்கள்', 'link-list'),
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
      v('latest', 'Latest Information', 'சமீபத்திய தகவல்', 'editorial-index'),
      v('press-releases', 'Press Releases', 'செய்திக் குறிப்புகள்', 'table'),
      v('statements', 'Minister Statements', 'அமைச்சர் அறிக்கைகள்', 'roll'),
      v('communication', 'Government Communication', 'அரசு தகவல் தொடர்பு', 'prose-columns'),
      v('media', 'Media', 'ஊடகம்', 'link-list'),
      v('publications', 'Publications', 'வெளியீடுகள்', 'catalogue'),
      v('video', 'Video', 'காணொளி', 'media-grid'),
      v('photo-archive', 'Photo Archive', 'புகைப்பட காப்பகம்', 'media-grid'),
      v('announcements', 'Announcements', 'அறிவிப்புகள்', 'link-list'),
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
      v('about-egmore', 'About Egmore', 'எழும்பூர் பற்றி', 'prose-columns'),
      v('mla-at-a-glance', 'MLA at a Glance', 'எம்.எல்.ஏ ஒரு பார்வை', 'statement'),
      v('constituency-priorities', 'Constituency Priorities', 'தொகுதி முன்னுரிமைகள்', 'category-grid'),
      v('neer-ezhil-palli', 'Neer Ezhil Palli', 'நீர் எழில் பள்ளி', 'full-bleed'),
      v('education-initiatives', 'Education & School Initiatives', 'கல்வி & பள்ளி முன்முயற்சிகள்', 'asymmetric-left'),
      v('assembly-experience', 'Legislative Assembly Experience', 'சட்டமன்ற அனுபவம்', 'statement'),
      v('assembly-challenges', 'Key Assembly Challenges', 'முக்கிய சட்டமன்ற சவால்கள்', 'staggered'),
      v('civic-work', 'Civic Work in Egmore', 'எழும்பூரில் குடிமைப் பணிகள்', 'prose-columns'),
      v('grievance-redressal', 'Grievance Redressal', 'குறை தீர்க்கும் பிரிவு', 'asymmetric-right'),
      v('housing-regularisation', 'Housing & Land Regularisation', 'வீட்டுவசதி & நில முறைப்படுத்தல்', 'prose-columns'),
      v('stormwater-drains', 'Stormwater Drains & Flood Mitigation', 'மழைநீர் வடிகால்கள் & வெள்ளத் தடுப்பு', 'asymmetric-left'),
      v('water-supply', 'Water Supply & Quality', 'நீர் வழங்கல் & தரம்', 'prose-columns'),
      v('constraints-criticism', 'Constraints & Criticism', 'கட்டுப்பாடுகள் & விமர்சனங்கள்', 'numbered-list'),
      v('overall-assessment', 'Overall Assessment', 'ஒட்டுமொத்த மதிப்பீடு', 'prose-columns'),
      v('further-research', 'Further Research', 'மேலும் ஆராய்ச்சி', 'statement'),
    ],
  },
};
