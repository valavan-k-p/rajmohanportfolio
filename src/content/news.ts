import type { NewsItem } from '@/lib/content/schema';
import { media } from './media/generated';
import {
  SRC_DECCAN_POLICY_NOTE,
  SRC_DTNEXT_ALLOCATION,
  SRC_KALVISEITHI_SCHOOLS,
  SRC_STATESMAN_BUDGET,
} from './sources';

/**
 * NEWS
 *
 * Every item here is a report by an established news organisation about
 * something the minister or a department did, and every item says so. None is
 * presented as an official record, because none is one — no departmental press
 * release PDF has been supplied to this office yet.
 *
 * The distinction matters and is visible to the reader: these cards carry
 * "Source: The Statesman", not "Official Press Release". When the department
 * supplies its own releases, those become `DocumentRecord`s with a
 * `press-release` type and appear in the archives, and these stay here as
 * coverage.
 */
export const NEWS: readonly NewsItem[] = [
  {
    id: 'news-budget-2026-27-school-education',
    slug: 'school-education-allocation-2026-27',
    title: {
      en: 'School Education receives the largest departmental allocation in the 2026–27 budget',
      ta: '2026–27 நிதிநிலை அறிக்கையில் மிக அதிக ஒதுக்கீட்டைப் பெற்ற துறையாக பள்ளிக் கல்வி',
    },
    summary: {
      en: 'The 2026–27 state budget allocates ₹44,527 crore to the School Education Department — the highest allocation to any department. Higher Education is allocated ₹8,393 crore.',
      ta: '2026–27 மாநில நிதிநிலை அறிக்கையில் பள்ளிக் கல்வித் துறைக்கு ₹44,527 கோடி ஒதுக்கப்பட்டுள்ளது; இது எந்த ஒரு துறைக்கும் அளிக்கப்பட்ட மிக அதிக ஒதுக்கீடு ஆகும். உயர்கல்வித் துறைக்கு ₹8,393 கோடி ஒதுக்கப்பட்டுள்ளது.',
    },
    body: [
      {
        kind: 'paragraph',
        text: {
          en: 'The School Education Department was allocated ₹44,527 crore in the 2026–27 Tamil Nadu budget, the largest single departmental allocation in the budget as reported.',
          ta: '2026–27 தமிழ்நாடு நிதிநிலை அறிக்கையில் பள்ளிக் கல்வித் துறைக்கு ₹44,527 கோடி ஒதுக்கப்பட்டது. செய்தி அறிக்கைகளின்படி, இதுவே நிதிநிலை அறிக்கையில் ஒரு துறைக்கு அளிக்கப்பட்ட மிகப் பெரிய ஒதுக்கீடு.',
        },
      },
      {
        kind: 'list',
        items: [
          {
            en: 'A school modernisation programme of ₹2,132 crore covering 3,734 state-run schools, of which ₹300 crore is allocated for the current financial year.',
            ta: '3,734 அரசுப் பள்ளிகளை உள்ளடக்கிய ₹2,132 கோடி மதிப்பிலான பள்ளி நவீனமயமாக்கல் திட்டம்; இதில் நடப்பு நிதியாண்டுக்கு ₹300 கோடி ஒதுக்கப்பட்டுள்ளது.',
          },
          {
            en: '"Super Clean, Super Campus", to be introduced in 10,000 government schools in its first phase, with ₹139 crore allocated.',
            ta: 'முதல் கட்டமாக 10,000 அரசுப் பள்ளிகளில் அறிமுகப்படுத்தப்படவுள்ள "சூப்பர் கிளீன், சூப்பர் கேம்பஸ்" திட்டம்; இதற்கு ₹139 கோடி ஒதுக்கப்பட்டுள்ளது.',
          },
        ],
      },
    ],
    date: '2026-08-05',
    category: 'department',
    department: 'school-education',
    image: media('edu-department-office'),
    source: SRC_STATESMAN_BUDGET,
    verification: 'reported',
    published: true,
    featured: true,
    workflowStatus: 'published',
  },

  {
    id: 'news-allocation-explained',
    slug: 'school-education-allocation-explained',
    title: {
      en: 'Minister sets out how the school education allocation compares with the previous year',
      ta: 'முந்தைய ஆண்டுடன் ஒப்பிடும்போது பள்ளிக் கல்வி ஒதுக்கீடு குறித்து அமைச்சர் விளக்கம்',
    },
    summary: {
      en: 'Responding in the Assembly, the minister said the 2025–26 budget had earmarked ₹46,767 crore for school education against actual expenditure of ₹42,351 crore, and that the ₹44,527 crore now allocated represents a real increase of about ₹2,176 crore over that actual spend.',
      ta: 'சட்டமன்றத்தில் பதிலளித்த அமைச்சர், 2025–26 நிதிநிலை அறிக்கையில் பள்ளிக் கல்விக்கு ₹46,767 கோடி ஒதுக்கப்பட்டிருந்தாலும் உண்மையான செலவு ₹42,351 கோடியே என்றும், தற்போது ஒதுக்கப்பட்டுள்ள ₹44,527 கோடி அந்த உண்மையான செலவை விட சுமார் ₹2,176 கோடி அதிகம் என்றும் தெரிவித்தார்.',
    },
    date: '2026-08-06',
    category: 'department',
    department: 'school-education',
    source: SRC_DTNEXT_ALLOCATION,
    verification: 'reported',
    published: true,
    workflowStatus: 'published',
  },

  {
    id: 'news-policy-note-2026-27',
    slug: 'policy-note-art-culture-archaeology-museums',
    title: {
      en: 'Policy note for art and culture, archaeology and museums presented for 2026–27',
      ta: '2026–27ஆம் ஆண்டுக்கான கலை பண்பாடு, தொல்லியல் மற்றும் அருங்காட்சியகக் கொள்கை விளக்கக் குறிப்பு தாக்கல்',
    },
    summary: {
      en: 'The policy note covers three departments and sets out eight major excavations for the year, including an eleventh season at Keeladi, alongside museum projects at Tirunelveli and Thanjavur.',
      ta: 'மூன்று துறைகளை உள்ளடக்கிய இக்கொள்கைக் குறிப்பு, கீழடியில் பதினொன்றாவது கட்டம் உள்ளிட்ட எட்டு முக்கிய அகழாய்வுகளையும், திருநெல்வேலி மற்றும் தஞ்சாவூரில் அருங்காட்சியகத் திட்டங்களையும் அறிவிக்கிறது.',
    },
    body: [
      {
        kind: 'list',
        items: [
          {
            en: 'Porunai Museum, Tirunelveli — ₹56.36 crore.',
            ta: 'பொருநை அருங்காட்சியகம், திருநெல்வேலி — ₹56.36 கோடி.',
          },
          {
            en: 'Grand Chola Museum, Thanjavur — ₹56.41 crore.',
            ta: 'பேரரசு சோழர் அருங்காட்சியகம், தஞ்சாவூர் — ₹56.41 கோடி.',
          },
          {
            en: 'The Tamil Nadu Folk Artistes Welfare Board has 61,097 registered artistes.',
            ta: 'தமிழ்நாடு நாட்டுப்புறக் கலைஞர் நல வாரியத்தில் 61,097 கலைஞர்கள் பதிவு செய்யப்பட்டுள்ளனர்.',
          },
        ],
      },
    ],
    date: '2026-08-20',
    category: 'culture',
    department: 'tamil-development',
    image: media('td-excavation-aerial'),
    source: SRC_DECCAN_POLICY_NOTE,
    verification: 'reported',
    published: true,
    featured: true,
    workflowStatus: 'published',
  },

  {
    id: 'news-government-schools-not-closing',
    slug: 'no-plan-to-close-government-schools',
    title: {
      en: 'No plan to close government schools where enrolment has fallen, minister says',
      ta: 'மாணவர் சேர்க்கை குறைந்த அரசுப் பள்ளிகளை மூடும் திட்டம் இல்லை என்று அமைச்சர் தெரிவிப்பு',
    },
    summary: {
      en: 'The minister stated that government schools with declining enrolment will not be closed, and that the department will instead work on strengthening them.',
      ta: 'மாணவர் சேர்க்கை குறைந்துவரும் அரசுப் பள்ளிகள் மூடப்படமாட்டா என்றும், அவற்றை வலுப்படுத்தும் பணியில் துறை ஈடுபடும் என்றும் அமைச்சர் தெரிவித்தார்.',
    },
    date: '2026-07-15',
    category: 'schools',
    department: 'school-education',
    image: media('edu-classroom-students'),
    source: SRC_KALVISEITHI_SCHOOLS,
    verification: 'reported',
    published: true,
    workflowStatus: 'published',
  },
];
