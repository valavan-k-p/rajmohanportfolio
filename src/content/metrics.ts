import type { Metric } from '@/lib/content/schema';
import {
  SRC_DECCAN_POLICY_NOTE,
  SRC_OFFICE,
  SRC_STATESMAN_BUDGET,
  SRC_WIKIPEDIA_EGMORE,
} from './sources';

/**
 * KEY FIGURES
 *
 * A number appears here only if a source can be named for it. Where the office
 * does not have a figure, the record is still written — with `value: null` — so
 * the gap is visible and dated rather than quietly omitted. `MetricStrip`
 * renders those as an em dash and the words "Awaiting verified source".
 *
 * Note what is NOT in this file: there are no Information & Publicity metrics,
 * because no verified departmental figure has been supplied. That portal
 * therefore shows no figures at all, which is the correct outcome — an empty
 * strip is better than a plausible one.
 */

export const HOME_METRICS: readonly Metric[] = [
  {
    id: 'home-office-since',
    label: { en: 'In office since', ta: 'பதவியேற்ற நாள்' },
    value: '10 May 2026',
    measures: {
      en: 'Sworn in as a Cabinet Minister, Government of Tamil Nadu.',
      ta: 'தமிழ்நாடு அரசின் அமைச்சரவை அமைச்சராகப் பதவியேற்பு.',
    },
    verification: 'reported',
    source: SRC_WIKIPEDIA_EGMORE,
  },
  {
    id: 'home-constituency',
    label: { en: 'Constituency', ta: 'தொகுதி' },
    value: 'Egmore',
    unit: { en: 'AC 16 · SC', ta: 'தொகுதி எண் 16 · தனி' },
    measures: {
      en: 'Assembly Constituency No. 16, Chennai district, reserved for Scheduled Castes.',
      ta: 'சட்டமன்றத் தொகுதி எண் 16, சென்னை மாவட்டம், தாழ்த்தப்பட்டோருக்கு ஒதுக்கப்பட்டது.',
    },
    verification: 'reported',
    source: SRC_WIKIPEDIA_EGMORE,
  },
  {
    id: 'home-school-allocation',
    label: { en: 'School Education, 2026–27', ta: 'பள்ளிக் கல்வி, 2026–27' },
    value: '₹44,527',
    unit: { en: 'crore', ta: 'கோடி' },
    measures: {
      en: 'Budget allocation to the School Education Department, as reported.',
      ta: 'செய்தி அறிக்கைகளின்படி, பள்ளிக் கல்வித் துறைக்கான நிதி ஒதுக்கீடு.',
    },
    asOf: '2026-08-05',
    verification: 'reported',
    source: SRC_STATESMAN_BUDGET,
  },
  {
    id: 'home-excavations',
    label: { en: 'Excavations, 2026–27', ta: 'அகழாய்வுகள், 2026–27' },
    value: '8',
    measures: {
      en: 'Major archaeological excavations set out in the 2026–27 policy note.',
      ta: '2026–27 கொள்கை விளக்கக் குறிப்பில் அறிவிக்கப்பட்ட முக்கிய அகழாய்வுகள்.',
    },
    asOf: '2026-08-20',
    verification: 'reported',
    source: SRC_DECCAN_POLICY_NOTE,
  },
];

export const SCHOOL_EDUCATION_METRICS: readonly Metric[] = [
  {
    id: 'se-allocation',
    label: { en: 'Allocation, 2026–27', ta: 'ஒதுக்கீடு, 2026–27' },
    value: '₹44,527',
    unit: { en: 'crore', ta: 'கோடி' },
    measures: {
      en: 'The department’s allocation in the 2026–27 state budget — the largest of any department, as reported.',
      ta: '2026–27 மாநில நிதிநிலை அறிக்கையில் இத்துறையின் ஒதுக்கீடு — செய்தி அறிக்கைகளின்படி, அனைத்துத் துறைகளிலும் மிக அதிகம்.',
    },
    asOf: '2026-08-05',
    verification: 'reported',
    source: SRC_STATESMAN_BUDGET,
  },
  {
    id: 'se-modernisation-schools',
    label: { en: 'Schools in modernisation', ta: 'நவீனமயமாக்கலில் பள்ளிகள்' },
    value: '3,734',
    measures: {
      en: 'State-run schools covered by the ₹2,132 crore modernisation programme.',
      ta: '₹2,132 கோடி நவீனமயமாக்கல் திட்டத்தின் கீழ் வரும் அரசுப் பள்ளிகள்.',
    },
    asOf: '2026-08-05',
    verification: 'reported',
    source: SRC_STATESMAN_BUDGET,
  },
  {
    id: 'se-super-campus',
    label: { en: 'Super Clean, Super Campus', ta: 'சூப்பர் கிளீன், சூப்பர் கேம்பஸ்' },
    value: '10,000',
    unit: { en: 'schools, phase one', ta: 'பள்ளிகள், முதற் கட்டம்' },
    measures: {
      en: 'Government schools in the first phase of the campus programme, with ₹139 crore allocated.',
      ta: '₹139 கோடி ஒதுக்கீட்டுடன், வளாகத் திட்டத்தின் முதற் கட்டத்தில் உள்ள அரசுப் பள்ளிகள்.',
    },
    asOf: '2026-08-05',
    verification: 'reported',
    source: SRC_STATESMAN_BUDGET,
  },
  {
    id: 'se-total-schools',
    label: { en: 'Schools in the state', ta: 'மாநிலத்தில் பள்ளிகள்' },
    // No departmental figure has been supplied. This renders as an em dash.
    value: null,
    measures: {
      en: 'Total schools under the department.',
      ta: 'துறையின் கீழ் உள்ள மொத்தப் பள்ளிகள்.',
    },
    verification: 'unverified',
  },
];

export const TAMIL_DEVELOPMENT_METRICS: readonly Metric[] = [
  {
    id: 'td-excavations',
    label: { en: 'Excavations, 2026–27', ta: 'அகழாய்வுகள், 2026–27' },
    value: '8',
    measures: {
      en: 'Major excavations set out in the policy note, including an eleventh season at Keeladi.',
      ta: 'கீழடியில் பதினொன்றாவது கட்டம் உள்ளிட்ட, கொள்கைக் குறிப்பில் அறிவிக்கப்பட்ட முக்கிய அகழாய்வுகள்.',
    },
    asOf: '2026-08-20',
    verification: 'reported',
    source: SRC_DECCAN_POLICY_NOTE,
  },
  {
    id: 'td-folk-artistes',
    label: { en: 'Registered folk artistes', ta: 'பதிவு செய்யப்பட்ட நாட்டுப்புறக் கலைஞர்கள்' },
    value: '61,097',
    measures: {
      en: 'Artistes registered with the Tamil Nadu Folk Artistes Welfare Board.',
      ta: 'தமிழ்நாடு நாட்டுப்புறக் கலைஞர் நல வாரியத்தில் பதிவு செய்யப்பட்டுள்ள கலைஞர்கள்.',
    },
    asOf: '2026-08-20',
    verification: 'reported',
    source: SRC_DECCAN_POLICY_NOTE,
  },
  {
    id: 'td-porunai-museum',
    label: { en: 'Porunai Museum', ta: 'பொருநை அருங்காட்சியகம்' },
    value: '₹56.36',
    unit: { en: 'crore · Tirunelveli', ta: 'கோடி · திருநெல்வேலி' },
    measures: {
      en: 'Project value of the Porunai Museum at Tirunelveli.',
      ta: 'திருநெல்வேலியில் அமையவுள்ள பொருநை அருங்காட்சியகத் திட்ட மதிப்பு.',
    },
    asOf: '2026-08-20',
    verification: 'reported',
    source: SRC_DECCAN_POLICY_NOTE,
  },
  {
    id: 'td-chola-museum',
    label: { en: 'Grand Chola Museum', ta: 'பேரரசு சோழர் அருங்காட்சியகம்' },
    value: '₹56.41',
    unit: { en: 'crore · Thanjavur', ta: 'கோடி · தஞ்சாவூர்' },
    measures: {
      en: 'Project value of the Grand Chola Museum at Thanjavur.',
      ta: 'தஞ்சாவூரில் அமையவுள்ள பேரரசு சோழர் அருங்காட்சியகத் திட்ட மதிப்பு.',
    },
    asOf: '2026-08-20',
    verification: 'reported',
    source: SRC_DECCAN_POLICY_NOTE,
  },
];

/**
 * The 2026 Egmore result.
 *
 * Recorded at `reported` tier, not `verified`, because these figures were
 * transcribed from a secondary compilation rather than from the Election
 * Commission's own return. The source note on each says so, and the
 * constituency page links to results.eci.gov.in.
 */
export const EGMORE_RESULT_METRICS: readonly Metric[] = [
  {
    id: 'eg-votes',
    label: { en: 'Votes', ta: 'வாக்குகள்' },
    value: '53,901',
    measures: {
      en: 'Votes polled by the winning candidate in the 2026 Assembly election.',
      ta: '2026 சட்டமன்றத் தேர்தலில் வெற்றி பெற்ற வேட்பாளர் பெற்ற வாக்குகள்.',
    },
    asOf: '2026-05-02',
    verification: 'reported',
    source: SRC_WIKIPEDIA_EGMORE,
  },
  {
    id: 'eg-share',
    label: { en: 'Vote share', ta: 'வாக்கு விழுக்காடு' },
    value: '45.02',
    unit: { en: 'per cent', ta: 'விழுக்காடு' },
    measures: {
      en: 'Share of the valid votes polled in the constituency.',
      ta: 'தொகுதியில் பதிவான செல்லுபடியாகும் வாக்குகளில் பங்கு.',
    },
    asOf: '2026-05-02',
    verification: 'reported',
    source: SRC_WIKIPEDIA_EGMORE,
  },
  {
    id: 'eg-margin',
    label: { en: 'Margin', ta: 'வாக்கு வித்தியாசம்' },
    value: '10,804',
    measures: {
      en: 'Margin over the runner-up, Tamilan Prasanna (DMK), who polled 43,097 votes.',
      ta: 'இரண்டாம் இடம் பிடித்த தமிழன் பிரசன்னா (திமுக) 43,097 வாக்குகள் பெற்ற நிலையில், அவரை விட அதிகமாகப் பெற்ற வாக்கு வித்தியாசம்.',
    },
    asOf: '2026-05-02',
    verification: 'reported',
    source: SRC_WIKIPEDIA_EGMORE,
  },
  {
    id: 'eg-turnout',
    label: { en: 'Votes polled', ta: 'பதிவான வாக்குகள்' },
    value: '119,738',
    measures: {
      en: 'Total votes polled in the constituency.',
      ta: 'தொகுதியில் பதிவான மொத்த வாக்குகள்.',
    },
    asOf: '2026-05-02',
    verification: 'reported',
    source: SRC_WIKIPEDIA_EGMORE,
  },
];

/**
 * Ward and councillor counts. The client specifically asked for these
 * (handwritten note 3: "Total count / Ward"), and no official source for the
 * Egmore ward mapping has been located. They are recorded as gaps rather than
 * estimated — inventing a ward count for a constituency would be exactly the
 * kind of fabrication the brief forbids.
 */
export const EGMORE_WARD_METRICS: readonly Metric[] = [
  {
    id: 'eg-wards',
    label: { en: 'Wards in the constituency', ta: 'தொகுதியில் உள்ள வார்டுகள்' },
    value: null,
    measures: {
      en: 'Greater Chennai Corporation wards falling within the constituency.',
      ta: 'தொகுதிக்குள் வரும் பெருநகர சென்னை மாநகராட்சி வார்டுகள்.',
    },
    verification: 'unverified',
  },
  {
    id: 'eg-councillors',
    label: { en: 'Councillors', ta: 'மன்ற உறுப்பினர்கள்' },
    value: null,
    measures: {
      en: 'Elected corporation councillors representing those wards.',
      ta: 'அந்த வார்டுகளைப் பிரதிநிதித்துவப்படுத்தும் தேர்ந்தெடுக்கப்பட்ட மாநகராட்சி உறுப்பினர்கள்.',
    },
    verification: 'unverified',
  },
  {
    id: 'eg-zones',
    label: { en: 'Corporation zones', ta: 'மாநகராட்சி மண்டலங்கள்' },
    value: null,
    measures: {
      en: 'Corporation zones the constituency falls across.',
      ta: 'தொகுதி பரவியுள்ள மாநகராட்சி மண்டலங்கள்.',
    },
    verification: 'unverified',
  },
  {
    id: 'eg-office',
    label: { en: 'Constituency office', ta: 'தொகுதி அலுவலகம்' },
    value: null,
    measures: {
      en: 'Public address and opening hours of the constituency office.',
      ta: 'தொகுதி அலுவலகத்தின் முகவரி மற்றும் பொது நேரம்.',
    },
    verification: 'unverified',
    source: SRC_OFFICE,
  },
];
