import type { Bilingual } from '@/lib/content/types';
import type { DocumentType } from '@/lib/content/schema';
import type { PortalId } from '@/config/portals';
import type { Source } from '@/lib/content/source';
import {
  SRC_DECCAN_POLICY_NOTE,
  SRC_DIPR,
  SRC_OFFICE,
  SRC_TAMILVALARCHI,
  SRC_TNARCH,
  SRC_TNSCHOOLS,
} from './sources';

/**
 * PORTAL PAGES
 *
 * The four portals share one page template and one design system, and differ in
 * their sections and their accent — which is how they get "a different
 * editorial personality while sharing the design system" (brief §32) without
 * becoming four unrelated sites.
 *
 * The overview paragraphs describe the DEPARTMENT, and are attributed to the
 * department's own site. They deliberately do not describe the minister's
 * achievements: the departments existed before this office and the site should
 * not blur the two.
 */

export interface OverviewBlock {
  readonly heading: Bilingual;
  readonly body: Bilingual;
  readonly source: Source;
}

/** An archive the portal exposes. Empty ones still render, honestly. */
export interface ArchiveLink {
  readonly slug: string;
  readonly title: Bilingual;
  readonly description: Bilingual;
  /** Document types this archive draws from. Empty for a news archive. */
  readonly documentTypes: readonly DocumentType[];
}

export interface PortalPage {
  readonly id: PortalId;
  readonly overview: readonly OverviewBlock[];
  readonly archives: readonly ArchiveLink[];
  /** Extra editorial sections particular to this portal. */
  readonly features: readonly OverviewBlock[];
}

const A = (
  slug: string,
  en: string,
  ta: string,
  descEn: string,
  descTa: string,
  documentTypes: readonly DocumentType[],
): ArchiveLink => ({
  slug,
  title: { en, ta },
  description: { en: descEn, ta: descTa },
  documentTypes,
});

export const PORTAL_PAGES: Readonly<Record<PortalId, PortalPage>> = {
  /* ====================================================================== *
   * SCHOOL EDUCATION
   * Client note 2: News · Proceedings · G.O. · Updates · Press Release ·
   * Gallery · Budget · SMC
   * ====================================================================== */
  'school-education': {
    id: 'school-education',
    overview: [
      {
        heading: { en: 'The department', ta: 'துறை' },
        body: {
          en: 'The School Education Department of the Government of Tamil Nadu administers government, aided and recognised private schools across the state, together with the services, examinations and teacher administration that support them. Its own portal at tnschools.gov.in is the authoritative source for departmental services and announcements.',
          ta: 'தமிழ்நாடு அரசின் பள்ளிக் கல்வித் துறை, மாநிலம் முழுவதும் உள்ள அரசு, அரசு உதவி பெறும் மற்றும் அங்கீகரிக்கப்பட்ட தனியார் பள்ளிகளையும், அவற்றுக்கான சேவைகள், தேர்வுகள், ஆசிரியர் நிர்வாகம் ஆகியவற்றையும் நிர்வகிக்கிறது. துறையின் சேவைகள் மற்றும் அறிவிப்புகளுக்கு tnschools.gov.in என்ற துறையின் இணையதளமே அதிகாரப்பூர்வ ஆதாரம்.',
        },
        source: SRC_TNSCHOOLS,
      },
      {
        heading: { en: 'What this portal holds', ta: 'இப்பகுதியில் உள்ளவை' },
        body: {
          en: 'This portal collects the record of the department’s work as it is reported and published: news, proceedings, government orders, press releases, budget papers and photographs. Each item names its source. Where an archive is empty, it says so and points to the departmental site rather than filling the gap.',
          ta: 'துறையின் பணிகள் குறித்து வெளியிடப்படும் பதிவுகளை — செய்திகள், செயல்முறை ஆணைகள், அரசு ஆணைகள், செய்திக்குறிப்புகள், நிதிநிலை ஆவணங்கள், புகைப்படங்கள் — இப்பகுதி ஒன்றுதிரட்டுகிறது. ஒவ்வொன்றும் அதன் ஆதாரத்தைக் குறிப்பிடுகிறது. காப்பகம் காலியாக இருந்தால், அதை மறைக்காமல் தெரிவித்து, துறை இணையதளத்தை இணைக்கிறது.',
        },
        source: SRC_OFFICE,
      },
    ],
    archives: [
      A('news', 'News', 'செய்திகள்', 'Reported departmental activity.', 'செய்தி அறிக்கைகளின்படி துறையின் நடவடிக்கைகள்.', []),
      A('go', 'Government Orders', 'அரசு ஆணைகள்', 'Numbered orders issued by the department.', 'துறையால் வெளியிடப்பட்ட எண்ணிடப்பட்ட ஆணைகள்.', ['government-order']),
      A('proceedings', 'Proceedings', 'செயல்முறை ஆணைகள்', 'Proceedings issued by the Directorate.', 'இயக்ககத்தால் வெளியிடப்பட்ட செயல்முறை ஆணைகள்.', ['proceeding']),
      A('press-releases', 'Press Releases', 'செய்திக்குறிப்புகள்', 'Releases issued by the department.', 'துறையால் வெளியிடப்பட்ட செய்திக்குறிப்புகள்.', ['press-release', 'press-note']),
      A('budget', 'Budget', 'நிதிநிலை அறிக்கை', 'Allocations, demand for grants and policy notes.', 'ஒதுக்கீடுகள், மான்யக் கோரிக்கை மற்றும் கொள்கை விளக்கக் குறிப்புகள்.', ['budget', 'policy-note']),
      A('updates', 'Updates', 'புதுப்பிப்புகள்', 'Short operational notices — admissions, examinations, school opening.', 'குறுகிய நிர்வாக அறிவிப்புகள் — சேர்க்கை, தேர்வுகள், பள்ளித் திறப்பு.', ['announcement']),
    ],
    features: [
      {
        heading: {
          en: 'School Management Committees',
          ta: 'பள்ளி மேலாண்மைக் குழுக்கள்',
        },
        body: {
          en: 'School Management Committees are the statutory bodies through which parents and the local community take part in running a school. The current guidelines on their composition, their meeting cycle and their powers are issued by the department, and this office does not yet hold that material. Describing an SMC’s duties from memory would risk telling a parent the wrong thing about a body they have a right to sit on, so the departmental portal is the source until the guidelines are published here.',
          ta: 'பள்ளி மேலாண்மைக் குழுக்கள் என்பவை, ஒரு பள்ளியை நடத்துவதில் பெற்றோரும் உள்ளூர்ச் சமூகமும் பங்கேற்பதற்கான சட்டப்பூர்வ அமைப்புகள். அவற்றின் அமைப்பு, கூட்ட அட்டவணை, அதிகாரங்கள் குறித்த தற்போதைய வழிகாட்டுதல்களைத் துறையே வெளியிடுகிறது; அவ்வாவணங்கள் இவ்வலுவலகத்திடம் இன்னும் இல்லை. தாம் இடம்பெற உரிமையுள்ள ஒரு குழுவைப் பற்றிப் பெற்றோருக்குத் தவறான தகவலைத் தருவது ஆபத்தானது. எனவே அவ்வழிகாட்டுதல்கள் இங்கு வெளியாகும் வரை துறை இணையதளமே ஆதாரம்.',
        },
        source: SRC_TNSCHOOLS,
      },
    ],
  },

  /* ====================================================================== *
   * TAMIL DEVELOPMENT
   * Client note 2: தமிழ் வளர்ச்சி · தொல்லியல் · கலைப் பண்பாடு · வெளியீடு,
   * all bracketed to "gallery". Book design content is note 1.7.
   * ====================================================================== */
  'tamil-development': {
    id: 'tamil-development',
    overview: [
      {
        heading: { en: 'The department', ta: 'துறை' },
        body: {
          en: 'The Tamil Development Department works on the use of Tamil as the official language of the state, on Tamil scholarship and literature, and on the awards, publications and district-level programmes that support them. Its portal lists the department’s awards, documents and district offices.',
          ta: 'தமிழ் வளர்ச்சித் துறை, மாநில ஆட்சிமொழியாகத் தமிழைப் பயன்படுத்துவது, தமிழ் ஆய்வு மற்றும் இலக்கியம், அவற்றை ஊக்குவிக்கும் விருதுகள், வெளியீடுகள், மாவட்ட அளவிலான திட்டங்கள் ஆகியவற்றில் செயல்படுகிறது. துறையின் விருதுகள், ஆவணங்கள், மாவட்ட அலுவலகங்கள் அதன் இணையதளத்தில் பட்டியலிடப்பட்டுள்ளன.',
        },
        source: SRC_TAMILVALARCHI,
      },
    ],
    archives: [
      A('news', 'News', 'செய்திகள்', 'Reported departmental activity.', 'செய்தி அறிக்கைகளின்படி துறையின் நடவடிக்கைகள்.', []),
      A('publications', 'Publications', 'வெளியீடுகள்', 'Books and departmental publications.', 'நூல்களும் துறை வெளியீடுகளும்.', ['publication']),
      A('policy', 'Policy notes', 'கொள்கைக் குறிப்புகள்', 'Annual policy notes laid before the Assembly.', 'சட்டமன்றத்தில் தாக்கல் செய்யப்படும் ஆண்டுக் கொள்கை விளக்கக் குறிப்புகள்.', ['policy-note', 'budget']),
      A('go', 'Government Orders', 'அரசு ஆணைகள்', 'Numbered orders issued by the department.', 'துறையால் வெளியிடப்பட்ட எண்ணிடப்பட்ட ஆணைகள்.', ['government-order']),
    ],
    features: [
      {
        heading: { en: 'Archaeology', ta: 'தொல்லியல்' },
        body: {
          en: 'The 2026–27 policy note sets out eight major excavations for the year, including an eleventh season at Keeladi. It also records the museum projects under way: the Porunai Museum at Tirunelveli at ₹56.36 crore and the Grand Chola Museum at Thanjavur at ₹56.41 crore. Excavation findings and site reports are published by the Department of Archaeology.',
          ta: '2026–27 கொள்கை விளக்கக் குறிப்பு, கீழடியில் பதினொன்றாவது கட்டம் உள்ளிட்ட எட்டு முக்கிய அகழாய்வுகளை அந்த ஆண்டுக்கு அறிவிக்கிறது. நடைபெற்று வரும் அருங்காட்சியகத் திட்டங்களையும் அது பதிவு செய்கிறது: திருநெல்வேலியில் ₹56.36 கோடியில் பொருநை அருங்காட்சியகம், தஞ்சாவூரில் ₹56.41 கோடியில் பேரரசு சோழர் அருங்காட்சியகம். அகழாய்வு முடிவுகளும் கள அறிக்கைகளும் தொல்லியல் துறையால் வெளியிடப்படுகின்றன.',
        },
        source: SRC_DECCAN_POLICY_NOTE,
      },
      {
        heading: { en: 'Art and culture', ta: 'கலையும் பண்பாடும்' },
        body: {
          en: 'The 2026–27 policy note records 61,097 artistes registered with the Tamil Nadu Folk Artistes Welfare Board, and describes the state’s four government music colleges and three fine arts colleges, where students receive subsidised training and a monthly stipend.',
          ta: '2026–27 கொள்கை விளக்கக் குறிப்பின்படி, தமிழ்நாடு நாட்டுப்புறக் கலைஞர் நல வாரியத்தில் 61,097 கலைஞர்கள் பதிவு செய்யப்பட்டுள்ளனர். மாணவர்களுக்கு மானியக் கல்வியும் மாதாந்திர உதவித்தொகையும் வழங்கப்படும் நான்கு அரசு இசைக் கல்லூரிகள் மற்றும் மூன்று நுண்கலைக் கல்லூரிகள் குறித்தும் அது விவரிக்கிறது.',
        },
        source: SRC_DECCAN_POLICY_NOTE,
      },
      {
        heading: { en: 'Books and publications', ta: 'நூல்களும் வெளியீடுகளும்' },
        body: {
          en: 'The Tamil Development Department publishes works of its own, and makes annual awards for the best book and the best publisher. A catalogue of those titles — with authors, years and covers — has not yet reached this office. A books page filled with volumes that may not be the department’s would be worse than none, so the departmental documents page remains the list of record until that catalogue is published here.',
          ta: 'தமிழ் வளர்ச்சித் துறை தனது சொந்த நூல்களை வெளியிடுகிறது; சிறந்த நூல், சிறந்த பதிப்பாளர் ஆகியோருக்கு ஆண்டுதோறும் விருதுகளும் வழங்குகிறது. ஆசிரியர், ஆண்டு, அட்டைப் படம் ஆகிய விவரங்களுடன் கூடிய அந்நூல்களின் பட்டியல் இன்னும் இவ்வலுவலகத்தை வந்தடையவில்லை. துறைக்கு உரியவை அல்லாத நூல்களைக் கொண்டு ஒரு நூல் பக்கத்தை நிரப்புவது, அப்பக்கமே இல்லாததை விடத் தவறானது. எனவே அப்பட்டியல் இங்கு வெளியாகும் வரை துறையின் ஆவணப் பக்கமே அதிகாரப்பூர்வப் பட்டியலாக இருக்கும்.',
        },
        source: SRC_TAMILVALARCHI,
      },
    ],
  },

  /* ====================================================================== *
   * INFORMATION & PUBLICITY
   * Client note 3: Updates · Announcements · Gallery. IA follows dipr.tn.gov.in.
   * ====================================================================== */
  'information-publicity': {
    id: 'information-publicity',
    overview: [
      {
        heading: { en: 'The department', ta: 'துறை' },
        body: {
          en: 'The Information and Public Relations Department is the state government’s communications department. It issues press releases and press notes, maintains the official photographic and video record of government events, and publishes government orders and departmental forms on its own portal.',
          ta: 'செய்தி – மக்கள் தொடர்புத் துறை என்பது மாநில அரசின் தகவல் தொடர்புத் துறை. இது செய்திக்குறிப்புகளையும் பத்திரிகைக் குறிப்புகளையும் வெளியிடுகிறது; அரசு நிகழ்வுகளின் அலுவல்முறை ஒளிப்பட, காணொலிப் பதிவுகளைப் பராமரிக்கிறது; அரசு ஆணைகளையும் துறைப் படிவங்களையும் தனது இணையதளத்தில் வெளியிடுகிறது.',
        },
        source: SRC_DIPR,
      },
      {
        heading: { en: 'How this newsroom is organised', ta: 'இச்செய்திப் பகுதியின் அமைப்பு' },
        body: {
          en: 'The sections below follow the department’s own information architecture — press releases and press notes kept apart, government orders in their own archive, and photographs and video separated from both. What this office republishes is a copy; dipr.tn.gov.in remains the place of record.',
          ta: 'கீழ்க்காணும் பிரிவுகள் துறையின் சொந்தத் தகவல் அமைப்பைப் பின்பற்றுகின்றன — செய்திக்குறிப்புகளும் பத்திரிகைக் குறிப்புகளும் தனித்தனியே, அரசு ஆணைகள் தனிக் காப்பகத்தில், ஒளிப்படங்களும் காணொலிகளும் இரண்டிலிருந்தும் பிரித்து. இவ்வலுவலகம் மறுவெளியீடு செய்வது ஒரு நகல் மட்டுமே; அதிகாரப்பூர்வப் பதிவிடம் dipr.tn.gov.in ஆகும்.',
        },
        source: SRC_OFFICE,
      },
    ],
    archives: [
      A('press-releases', 'Press Releases', 'செய்திக்குறிப்புகள்', 'Releases issued by the department.', 'துறையால் வெளியிடப்பட்ட செய்திக்குறிப்புகள்.', ['press-release']),
      A('press-notes', 'Press Notes', 'பத்திரிகைக் குறிப்புகள்', 'Notes issued to the press.', 'பத்திரிகைக்கு வெளியிடப்பட்ட குறிப்புகள்.', ['press-note']),
      A('announcements', 'Announcements', 'அறிவிப்புகள்', 'Public announcements and notices.', 'பொது அறிவிப்புகளும் அறிவிக்கைகளும்.', ['announcement']),
      A('go', 'Government Orders', 'அரசு ஆணைகள்', 'Numbered orders issued by the department.', 'துறையால் வெளியிடப்பட்ட எண்ணிடப்பட்ட ஆணைகள்.', ['government-order']),
      A('publications', 'Publications', 'வெளியீடுகள்', 'Departmental publications.', 'துறை வெளியீடுகள்.', ['publication']),
    ],
    features: [],
  },

  /* ====================================================================== *
   * MLA · EGMORE
   * Client note 3: Gallery · Total count / Ward.
   * ====================================================================== */
  'mla-egmore': {
    id: 'mla-egmore',
    overview: [
      {
        heading: { en: 'The constituency', ta: 'தொகுதி' },
        body: {
          en: 'Egmore is Assembly Constituency No. 16, in Chennai district, and is reserved for candidates from the Scheduled Castes. It falls within the Chennai Central parliamentary constituency. The seat was won at the 2026 general election to the Tamil Nadu Legislative Assembly.',
          ta: 'எழும்பூர், சென்னை மாவட்டத்தில் அமைந்த 16ஆவது சட்டமன்றத் தொகுதி; இது தாழ்த்தப்பட்டோருக்கு ஒதுக்கப்பட்ட தொகுதி. இது சென்னை மத்திய நாடாளுமன்றத் தொகுதிக்குள் அடங்கும். 2026ஆம் ஆண்டு தமிழ்நாடு சட்டமன்றப் பொதுத் தேர்தலில் இத்தொகுதி வெல்லப்பட்டது.',
        },
        source: SRC_OFFICE,
      },
    ],
    archives: [
      A('news', 'News', 'செய்திகள்', 'Reported constituency activity.', 'செய்தி அறிக்கைகளின்படி தொகுதி நடவடிக்கைகள்.', []),
      A('announcements', 'Announcements', 'அறிவிப்புகள்', 'Notices for residents of the constituency.', 'தொகுதி மக்களுக்கான அறிவிக்கைகள்.', ['announcement']),
      A('assembly', 'Assembly', 'சட்டமன்றம்', 'Questions, speeches and issues raised in the Assembly.', 'சட்டமன்றத்தில் எழுப்பப்பட்ட கேள்விகள், உரைகள், பிரச்சினைகள்.', []),
    ],
    features: [
      {
        heading: { en: 'Wards and councillors', ta: 'வார்டுகளும் மன்ற உறுப்பினர்களும்' },
        body: {
          en: 'A resident looking for their councillor needs the ward mapping to be right. No official document has been located that assigns Greater Chennai Corporation wards to this Assembly constituency, so the directory below is empty rather than estimated. A wrong ward number sends someone to the wrong office, and a wrong name against a ward is a more serious error still — until the corporation’s own notification is in hand, neither is published here.',
          ta: 'தமது மன்ற உறுப்பினரைத் தேடும் ஒருவருக்கு வார்டு விவரம் சரியாக இருப்பது அவசியம். பெருநகர சென்னை மாநகராட்சி வார்டுகளை இச்சட்டமன்றத் தொகுதியுடன் இணைக்கும் அதிகாரப்பூர்வ ஆவணம் எதுவும் கிடைக்கவில்லை; எனவே கீழ்க்காணும் அட்டவணை ஊகிக்கப்படாமல் காலியாகவே உள்ளது. தவறான வார்டு எண் ஒருவரைத் தவறான அலுவலகத்திற்கு அனுப்பிவிடும்; ஒரு வார்டுக்கு எதிரே தவறான பெயர் இடம்பெறுவது அதைவிடப் பெரிய தவறு. மாநகராட்சியின் அறிவிக்கை கிடைக்கும் வரை இரண்டுமே இங்கு வெளியிடப்படமாட்டா.',
        },
        source: SRC_OFFICE,
      },
    ],
  },
};

/** The archaeology source, cited on the Tamil Development portal. */
export const ARCHAEOLOGY_SOURCE = SRC_TNARCH;
