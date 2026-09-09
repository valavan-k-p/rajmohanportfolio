import type { Bilingual } from '@/lib/content/types';
import type { Source } from '@/lib/content/source';
import { SRC_CAREERS360_PORTFOLIO, SRC_OFFICE, SRC_WIKIPEDIA_EGMORE } from './sources';
import { WIKIPEDIA_SOURCE } from '@/config/site';

/**
 * ABOUT
 *
 * Written to the brief's standard for this page: factual, no promotional
 * exaggeration, no "historic", no "unprecedented". Where a claim is a matter of
 * public record it is stated and sourced; where it would be an assessment, it
 * is not made at all.
 *
 * Everything here currently rests on secondary sources. When the official
 * portfolio notification is supplied, these records move to `verified` and the
 * conflict notes come off.
 */

export interface AboutSection {
  readonly id: string;
  readonly heading: Bilingual;
  readonly body: readonly Bilingual[];
  readonly source: Source;
}

export const ABOUT_SECTIONS: readonly AboutSection[] = [
  {
    id: 'profile',
    heading: { en: 'Profile', ta: 'சுயவிவரம்' },
    body: [
      {
        en: 'Rajmohan Arumugam is a Cabinet Minister in the Government of Tamil Nadu and the Member of the Legislative Assembly for Egmore. He took office as an MLA on 4 May 2026 and was sworn in as a minister on 10 May 2026, in the government headed by Chief Minister C. Joseph Vijay.',
        ta: 'ராஜ்மோகன் ஆறுமுகம் தமிழ்நாடு அரசின் அமைச்சரவை அமைச்சரும், எழும்பூர் தொகுதியின் சட்டமன்ற உறுப்பினரும் ஆவார். 2026 மே 4 அன்று சட்டமன்ற உறுப்பினராகவும், மே 10 அன்று முதலமைச்சர் சி. ஜோசப் விஜய் தலைமையிலான அரசில் அமைச்சராகவும் பதவியேற்றார்.',
      },
      {
        en: 'Before entering the Assembly he worked in Tamil television and film as an actor, anchor and director, and in digital media. He is the propaganda secretary of Tamilaga Vettri Kazhagam.',
        ta: 'சட்டமன்றத்திற்கு வருவதற்கு முன், தமிழ்த் தொலைக்காட்சி மற்றும் திரைப்படத் துறையில் நடிகராகவும், தொகுப்பாளராகவும், இயக்குநராகவும், மேலும் இணைய ஊடகத்திலும் பணியாற்றினார். தமிழக வெற்றிக் கழகத்தின் பரப்புரைச் செயலாளராக உள்ளார்.',
      },
    ],
    source: WIKIPEDIA_SOURCE,
  },
  {
    id: 'responsibilities',
    heading: { en: 'Areas of responsibility', ta: 'பொறுப்புத் துறைகள்' },
    body: [
      {
        en: 'The portfolio covers School Education, and Tamil Development and Information. Reporting on the 2026–27 policy note records art and culture, archaeology and museums as being within the same charge.',
        ta: 'பள்ளிக் கல்வி, தமிழ் வளர்ச்சி மற்றும் செய்தித் துறை ஆகியவை இவரது துறைப் பொறுப்பில் அடங்கும். 2026–27 கொள்கை விளக்கக் குறிப்பு குறித்த செய்தி அறிக்கைகளின்படி, கலை பண்பாடு, தொல்லியல் மற்றும் அருங்காட்சியகங்களும் இதே பொறுப்பில் உள்ளன.',
      },
      {
        en: 'Each department has its own portal on this site, and each portal links to the department’s own official website, which remains the authoritative source for its services, orders and announcements.',
        ta: 'ஒவ்வொரு துறைக்கும் இத்தளத்தில் தனிப் பகுதி உள்ளது; ஒவ்வொரு பகுதியும் அத்துறையின் அதிகாரப்பூர்வ இணையதளத்துடன் இணைக்கப்பட்டுள்ளது. அத்துறையின் சேவைகள், ஆணைகள், அறிவிப்புகளுக்கு அந்த இணையதளமே இறுதி ஆதாரம்.',
      },
    ],
    source: SRC_CAREERS360_PORTFOLIO,
  },
  {
    id: 'constituency',
    heading: { en: 'The constituency', ta: 'தொகுதி' },
    body: [
      {
        en: 'Egmore is Assembly Constituency No. 16 in Chennai district, reserved for candidates from the Scheduled Castes, and falls within the Chennai Central parliamentary constituency. At the 2026 general election the seat returned 53,901 votes for the winning candidate — a 45.02 per cent share and a margin of 10,804 over the runner-up, Tamilan Prasanna of the DMK, who polled 43,097. The previous member was I. Paranthamen.',
        ta: 'எழும்பூர், சென்னை மாவட்டத்தில் அமைந்த 16ஆவது சட்டமன்றத் தொகுதி; தாழ்த்தப்பட்டோருக்கு ஒதுக்கப்பட்டது; சென்னை மத்திய நாடாளுமன்றத் தொகுதிக்குள் அடங்கும். 2026 பொதுத் தேர்தலில் வெற்றி பெற்ற வேட்பாளர் 53,901 வாக்குகள் — 45.02 விழுக்காடு — பெற்றார்; 43,097 வாக்குகள் பெற்ற திமுகவின் தமிழன் பிரசன்னாவை விட 10,804 வாக்குகள் அதிகம். முந்தைய உறுப்பினர் இ. பரந்தாமன்.',
      },
    ],
    source: SRC_WIKIPEDIA_EGMORE,
  },
  {
    id: 'this-site',
    heading: { en: 'About this site', ta: 'இத்தளம் குறித்து' },
    body: [
      {
        en: 'This site is a public information record maintained by the office. It is not an official Government of Tamil Nadu website, and it does not present itself as one. Where it reports a fact, it names the source; where a source is a news organisation rather than a government paper, it says so on the item itself.',
        ta: 'இத்தளம் அலுவலகத்தால் பராமரிக்கப்படும் பொதுத் தகவல் பதிவு. இது தமிழ்நாடு அரசின் அலுவல்முறை இணையதளம் அல்ல; அவ்வாறு காட்டிக்கொள்ளவும் இல்லை. ஒரு தகவலைத் தெரிவிக்கும்போது அதன் ஆதாரத்தைக் குறிப்பிடுகிறது; அந்த ஆதாரம் அரசு ஆவணமாக இல்லாமல் செய்தி நிறுவனமாக இருந்தால், அதையும் அந்தப் பதிவிலேயே தெரிவிக்கிறது.',
      },
      {
        en: 'Where a figure or a record is not held, the site shows that gap rather than filling it. Government orders, proceedings, press releases and ward information will appear here as the source documents are supplied — and not before.',
        ta: 'ஒரு எண்ணோ பதிவோ கிடைக்காதபோது, அதை நிரப்பாமல் அந்த இடைவெளியையே இத்தளம் காட்டுகிறது. அரசு ஆணைகள், செயல்முறை ஆணைகள், செய்திக்குறிப்புகள், வார்டு விவரங்கள் ஆகியவை ஆதார ஆவணங்கள் கிடைத்த பிறகே இங்கு இடம்பெறும் — அதற்கு முன் அல்ல.',
      },
    ],
    source: SRC_OFFICE,
  },
];
