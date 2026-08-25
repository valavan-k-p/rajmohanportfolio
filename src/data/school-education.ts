import type { Bilingual } from '@/lib/content/types';

export type EducationStatus =
  | 'VERIFIED'
  | 'OFFICIAL ORDER'
  | 'MINISTERIAL DIRECTIVE'
  | 'PILOT DEPLOYMENT'
  | 'LEGISLATIVE ASSURANCE'
  | 'POLICY PROPOSAL'
  | 'STATUTORY POSITION';

export interface EducationItem {
  readonly id: string;
  readonly status: EducationStatus;
  readonly title: Bilingual;
  readonly summary: Bilingual;
  readonly date?: Bilingual;
  readonly source: Bilingual;
  readonly category?: Bilingual;
  readonly metrics?: {
    readonly value: number;
    readonly prefix?: string;
    readonly suffix?: string;
    readonly label: Bilingual;
  };
}

export const SCHOOL_STATUS_MAP: Record<EducationStatus, Bilingual> = {
  'VERIFIED': { en: 'VERIFIED', ta: 'சரிபார்க்கப்பட்டது' },
  'OFFICIAL ORDER': { en: 'OFFICIAL ORDER', ta: 'அரசு ஆணை' },
  'MINISTERIAL DIRECTIVE': { en: 'MINISTERIAL DIRECTIVE', ta: 'அமைச்சர் வழிகாட்டுதல்' },
  'PILOT DEPLOYMENT': { en: 'PILOT DEPLOYMENT', ta: 'முன்னோடித் திட்டம்' },
  'LEGISLATIVE ASSURANCE': { en: 'LEGISLATIVE ASSURANCE', ta: 'சட்டமன்ற உறுதிமொழி' },
  'POLICY PROPOSAL': { en: 'POLICY PROPOSAL', ta: 'கொள்கை வரைவு' },
  'STATUTORY POSITION': { en: 'STATUTORY POSITION', ta: 'சட்டரீதியான நிலைப்பாடு' }
};

export const SCHOOL_EDUCATION_DATA = {
  overview: {
    portfolio: {
      en: 'School Education Department',
      ta: 'பள்ளிக் கல்வித் துறை',
    },
    minister: {
      en: 'Rajmohan Arumugam',
      ta: 'ராஜ்மோகன் ஆறுமுகம்',
    },
    role: {
      en: 'Minister for School Education, Tamil Development, Information & Publicity',
      ta: 'பள்ளிக் கல்வி, தமிழ் வளர்ச்சி, செய்தி மற்றும் விளம்பரத்துறை அமைச்சர்',
    },
    tenureStart: {
      en: 'Assumed Office: May 2026',
      ta: 'பதவியேற்பு: மே 2026',
    },
    tagline: {
      en: 'Foundational learning, classroom equity, process transparency, and modern digital literacy for Tamil Nadu schools.',
      ta: 'அடிப்படை கற்றல், வகுப்பறை சமத்துவம், வெளிப்படையான நிர்வாகம் மற்றும் நவீன டிஜிட்டல் கல்வி.',
    },
  },

  keyPillars: [
    {
      id: 'foundational-curriculum',
      title: {
        en: 'Foundational Learning (Classes 1–3)',
        ta: 'அடிப்படை கற்றல் (வகுப்புகள் 1–3)',
      },
      tag: { en: 'Pedagogy Reform', ta: 'கற்பித்தல் சீர்திருத்தம்' },
      detail: {
        en: '9 revised activity-based textbooks designed to reduce rote memorisation and develop motor, cognitive, and socio-emotional skills.',
        ta: 'மனப்பாட முறையை நீக்கி, குழந்தைகளின் சிந்தனை, உடல் இயக்கம் மற்றும் சமூக உணர்வுகளை வளர்க்கும் 9 புதிய செயல்வழிப் பாடநூல்கள்.',
      },
    },
    {
      id: 'two-language-policy',
      title: {
        en: 'Tamil Nadu Two-Language Policy',
        ta: 'தமிழ்நாட்டின் இருமொழிக் கொள்கை',
      },
      tag: { en: 'Statutory Stand', ta: 'கொள்கை நிலைப்பாடு' },
      detail: {
        en: 'Reaffirmed commitment to the historic Tamil and English framework; explicit rejection of three-language NEP imposition and NEET.',
        ta: 'வரலாற்றுச் சிறப்புமிக்க தமிழ்-ஆங்கிலம் இருமொழிக் கொள்கையில் உறுதியான நிலைப்பாடு; தேசிய கல்விக் கொள்கை (NEP) மற்றும் நீட் தேர்வு நிராகரிப்பு.',
      },
    },
    {
      id: 'digital-governance',
      title: {
        en: 'Online NOC & Private School Oversight',
        ta: 'இணையவழி NOC & தனியார் பள்ளி ஒழுங்குமுறை',
      },
      tag: { en: 'Process Reform', ta: 'நிர்வாகச் சீர்திருத்தம்' },
      detail: {
        en: 'Digital approvals mechanism launched from 1 July 2026 to curb middlemen and bribery, alongside enforcement of fee-committee caps.',
        ta: 'இடைத்தரகர்களையும் லஞ்சத்தையும் ஒழிக்க ஜூலை 1 முதல் இணையவழி அனுமதி முறை; கட்டணக் குழு வரம்புகளை மீறும் பள்ளிகள் மீது நடவடிக்கை.',
      },
    },
    {
      id: 'budget-allocation',
      title: {
        en: '₹44,527 Cr Education Budget',
        ta: '₹44,527 கோடி கல்வி நிதி ஒதுக்கீடு',
      },
      tag: { en: 'Fiscal Allocation', ta: 'நிதி ஒதுக்கீடு' },
      detail: {
        en: 'Demonstrated a net real increase of ₹2,176 Cr over prior administration actual expenditure of ₹42,351 Cr.',
        ta: 'முந்தைய அரசின் உண்மையான செலவான ₹42,351 கோடியை விட ₹2,176 கோடி கூடுதல் ஒதுக்கீடு.',
      },
    },
  ],

  strategicDirectives: [
    {
      id: 'directive-1',
      status: 'OFFICIAL ORDER' as EducationStatus,
      title: {
        en: 'Activity-Rich Primary Curriculum & Educator Preparation',
        ta: 'தொடக்கக் கல்விக்கான செயல்வழிப் பாடத்திட்டம் & ஆசிரியர் பயிற்சி',
      },
      desc: {
        en: 'Released 9 newly designed textbooks for Classes 1–3 in May 2026. The reform pairs colourful, experiential classroom materials with specialized pedagogical training for primary educators.',
        ta: '1, 2, 3-ஆம் வகுப்புகளுக்கான 9 புதிய பாடநூல்கள் மே 2026-ல் வெளியீடு. வண்ணமயமான செயல்வழி கற்றல் கருவிகளுடன் ஆசிரியர்களுக்குத் தொடர் பயிற்சிகள் வழங்கப்படுகின்றன.',
      },
      impact: {
        en: 'Classes 1, 2 & 3 statewide',
        ta: 'மாநிலம் முழுவதும் 1, 2, 3 வகுப்புகள்',
      },
      source: { en: 'The Hindu & New Indian Express, May 2026', ta: 'தி இந்து & நியூ இந்தியன் எக்ஸ்பிரஸ், மே 2026' },
    },
    {
      id: 'directive-2',
      status: 'MINISTERIAL DIRECTIVE' as EducationStatus,
      title: {
        en: 'Low-Enrolment School Reopening (“10 Students Threshold”)',
        ta: 'குறைந்த சேர்க்கை கொண்ட அரசுப் பள்ளிகள் மறுதிறப்பு (“10 மாணவர்கள் விதி”)',
      },
      desc: {
        en: 'Legislative directive mandating that government schools closed due to declining enrolments can reopen once 10 children register, eliminating travel barriers for rural and underserved students.',
        ta: 'குறைந்த சேர்க்கையால் மூடப்பட்ட அரசுப் பள்ளிகளில் 10 மாணவர்கள் சேர்ந்தாலே அப்பள்ளிகளை மீண்டும் திறக்க சட்டமன்றத்தில் உத்தரவிடப்பட்டது.',
      },
      impact: {
        en: 'Proactive door-to-door teacher surveys for dropout recovery',
        ta: 'இடைநிற்றல் குழந்தைகளை மீட்க வீடு வீடாக ஆசிரியர் கணக்கெடுப்பு',
      },
      source: { en: 'Dinamalar Kalvimalar, August 2026', ta: 'தினமலர் கல்விமலர், ஆகஸ்ட் 2026' },
    },
    {
      id: 'directive-3',
      status: 'OFFICIAL ORDER' as EducationStatus,
      title: {
        en: 'Legal Protection for Anti-NEET Student Protesters',
        ta: 'நீட் எதிர்ப்புப் போராட்டத்தில் ஈடுபட்ட மாணவர்கள் மீதான வழக்குகள் வாபஸ்',
      },
      desc: {
        en: 'Under Chief Minister direction, the School Education Minister announced the formal withdrawal of all police cases registered against students who participated in democratic anti-NEET protests.',
        ta: 'நீட் தேர்வுக்கு எதிராகப் போராடிய மாணவர்கள் மீது பதியப்பட்ட அனைத்து வழக்குகளையும் ரத்து செய்வதாக முதலமைச்சரின் வழிகாட்டுதலின்படி அறிவிக்கப்பட்டது.',
      },
      impact: {
        en: 'Restored clean records and career prospects for students',
        ta: 'மாணவர்களின் கல்வி மற்றும் எதிர்காலப் பாதுகாப்பு உறுதி செய்யப்பட்டது',
      },
      source: { en: 'The Hindu, August 2026', ta: 'தி இந்து, ஆகஸ்ட் 2026' },
    },
    {
      id: 'directive-4',
      status: 'PILOT DEPLOYMENT' as EducationStatus,
      title: {
        en: 'TN SPARK — AI & Emerging Technologies Roadmap',
        ta: 'டி.என் ஸ்பார்க் — AI & நவீன தொழில்நுட்பக் கல்வி',
      },
      desc: {
        en: 'Piloting modern digital learning modules across approximately 5,000 schools, with a phased roadmap to deliver AI and technology exposure to Classes 6–8 and coding modules to Classes 9–12.',
        ta: '5,000 பள்ளிகளில் முன்னோடித் திட்டம்; 6-8 வகுப்புகளுக்கு செயற்கை நுண்ணறிவு மற்றும் 9-12 வகுப்புகளுக்கு கோடிங் பாடத்திட்டம் விரிவுபடுத்தப்படுகிறது.',
      },
      impact: {
        en: '5,000 pilot schools expanding to high-school coding labs',
        ta: '5,000 பள்ளிகளில் முன்னோடி; உயர்நிலைக் கல்வி வரை விரிவு',
      },
      source: { en: 'New Indian Express, July 2026', ta: 'நியூ இந்தியன் எக்ஸ்பிரஸ், ஜூலை 2026' },
    },
  ],

  fiscalMetrics: [
    {
      id: 'budget-total',
      value: 44527,
      prefix: '₹',
      suffix: ' Cr',
      suffixTa: ' கோடி',
      label: {
        en: 'Total Department Budget',
        ta: 'மொத்த கல்வித்துறை நிதி ஒதுக்கீடு',
      },
      context: {
        en: 'Annual budgetary allocation supporting infrastructure, staff salaries, mid-day meals, and digital labs.',
        ta: 'பள்ளி உள்கட்டமைப்பு, ஆசிரியர் ஊதியம், சத்துணவு மற்றும் ஆய்வகங்களுக்கான நிதி.',
      },
    },
    {
      id: 'budget-delta',
      value: 2176,
      prefix: '+₹',
      suffix: ' Cr',
      suffixTa: ' கோடி',
      label: {
        en: 'Net Increase over Actual Spend',
        ta: 'உண்மையான செலவினத்தை விடக் கூடுதல்',
      },
      context: {
        en: 'Higher than prior administration actual expenditure of ₹42,351 Cr, providing real funding growth.',
        ta: 'முந்தைய நிர்வாகத்தின் செலவான ₹42,351 கோடியை விட ₹2,176 கோடி கூடுதல் நிதி.',
      },
    },
    {
      id: 'smart-boards',
      value: 21,
      prefix: '',
      suffix: '',
      suffixTa: '',
      label: {
        en: 'Smart Boards Inaugurated',
        ta: 'திறக்கப்பட்ட ஸ்மார்ட் போர்டுகள்',
      },
      context: {
        en: 'Classroom digital boards inaugurated in Chennai on reopening day alongside learning kit distributions.',
        ta: 'பள்ளிகள் திறப்பு நாளில் சென்னையில் தொடங்கி வைக்கப்பட்ட ஸ்மார்ட் போர்டுகள்.',
      },
    },
  ],

  timelineEvents: [
    {
      date: { en: '19 May 2026', ta: '19 மே 2026' },
      status: 'VERIFIED' as EducationStatus,
      title: {
        en: 'Primary Textbook Rollout & Two-Language Guarantee',
        ta: '1-3 வகுப்புகளுக்கான 9 புதிய பாடநூல்கள் வெளியீடு',
      },
      desc: {
        en: 'Released 9 revised activity-rich textbooks for Classes 1–3 to reduce rote learning. Reaffirmed commitment to Tamil Nadu’s two-language formula.',
        ta: 'மனப்பாடக் கல்வியைக் குறைக்க 9 புதிய பாடநூல்கள் வெளியீடு; இருமொழிக் கொள்கையில் உறுதியான நிலைப்பாடு அறிவிப்பு.',
      },
      source: { en: 'The Hindu & New Indian Express', ta: 'தி இந்து & நியூ இந்தியன் எக்ஸ்பிரஸ்' },
    },
    {
      date: { en: '04 June 2026', ta: '04 ஜூன் 2026' },
      status: 'VERIFIED' as EducationStatus,
      title: {
        en: 'Heatwave-Adjusted Reopening & Smart Board Launch',
        ta: 'கோடை வெப்பத்திற்கேற்ப பள்ளி திறப்பு & ஸ்மார்ட் போர்டுகள்',
      },
      desc: {
        en: 'Schools reopened with comprehensive audits for water, sanitation, and kitchens. Inaugurated 21 smart boards in Chennai.',
        ta: 'குடிநீர், சுகாதார ஆய்வுகளுடன் பள்ளிகள் திறப்பு; சென்னையில் 21 ஸ்மார்ட் போர்டுகள் பயன்பாட்டிற்கு வந்தன.',
      },
      source: { en: 'Careers360 & The News Mill', ta: 'கேரியர்ஸ்360 & தி நியூஸ் மில்' },
    },
    {
      date: { en: '17 June 2026', ta: '17 ஜூன் 2026' },
      status: 'OFFICIAL ORDER' as EducationStatus,
      title: {
        en: 'Online NOC & Private School Recognition Portal',
        ta: 'தனியார் பள்ளிகளுக்கான இணையவழி NOC அனுமதி முறை',
      },
      desc: {
        en: 'Announced digital submission system from 1 July 2026 to curb middlemen and bribery in recognition approvals.',
        ta: 'இடைத்தரகர்களையும் லஞ்சத்தையும் தவிர்க்க ஜூலை 1 முதல் இணையவழி அனுமதி முறை அறிவிக்கப்பட்டது.',
      },
      source: { en: 'New Indian Express', ta: 'நியூ இந்தியன் எக்ஸ்பிரஸ்' },
    },
    {
      date: { en: '10 July 2026', ta: '10 ஜூலை 2026' },
      status: 'OFFICIAL ORDER' as EducationStatus,
      title: {
        en: 'School Campus Visitor & Neutrality Guidelines',
        ta: 'பள்ளி வளாகப் பார்வையாளர்கள் ஒழுங்குமுறை நெறிமுறை',
      },
      desc: {
        en: 'Restricted political party and unauthorised visitor access to maintain instructional sanctuary and student safety.',
        ta: 'அரசியல் தலையீடுகளற்ற அமைதியான கற்றல் சூழலை உறுதி செய்ய பார்வையாளர்கள் கட்டுப்பாடு.',
      },
      source: { en: 'New Indian Express', ta: 'நியூ இந்தியன் எக்ஸ்பிரஸ்' },
    },
    {
      date: { en: '22 July 2026', ta: '22 ஜூலை 2026' },
      status: 'PILOT DEPLOYMENT' as EducationStatus,
      title: {
        en: 'TN SPARK AI & Emerging Tech Roadmap Published',
        ta: 'டி.என் ஸ்பார்க் AI & தொழில்நுட்பக் கல்வி வரைபடம்',
      },
      desc: {
        en: 'Outlined curriculum progression covering AI and coding from pilot schools to Classes 6–8 and 9–12.',
        ta: '5,000 பள்ளிகளில் முன்னோடித் திட்டம்; உயர் வகுப்புகளுக்கு கோடிங் கல்வி விரிவு வரைபடம் வெளியீடு.',
      },
      source: { en: 'New Indian Express', ta: 'நியூ இந்தியன் எக்ஸ்பிரஸ்' },
    },
    {
      date: { en: 'August 2026', ta: 'ஆகஸ்ட் 2026' },
      status: 'LEGISLATIVE ASSURANCE' as EducationStatus,
      title: {
        en: 'Withdrawal of NEET Protest Cases & 10-Student Reopening Directive',
        ta: 'நீட் வழக்குகள் வாபஸ் & 10 மாணவர்கள் சேர்ந்தால் பள்ளிகள் திறப்பு',
      },
      desc: {
        en: 'Withdrew criminal cases against student protesters and established legislative rule to reopen closed schools with 10 students.',
        ta: 'மாணவர்கள் மீதான வழக்குகள் வாபஸ் மற்றும் குறைந்த சேர்க்கை அரசுப் பள்ளிகள் மறுதிறப்பு உத்தரவு.',
      },
      source: { en: 'The Hindu & Dinamalar Kalvimalar', ta: 'தி இந்து & தினமலர் கல்விமலர்' },
    },
  ],

  curriculumDetails: {
    booksCount: 9,
    gradesCovered: 'Classes 1, 2, and 3',
    keyFacets: [
      {
        title: { en: 'Experiential & Visual Pedagogy', ta: 'செயல்வழி & காட்சிவழிக் கற்றல்' },
        desc: {
          en: 'Activity-rich modules replace rote memorisation with interactive exploration and sensory learning.',
          ta: 'மனப்பாட முறையை நீக்கி, செயல்வழிக் கற்றல் மற்றும் காட்சி வழிக் கருவிகள் மூலம் பாடம் நடத்தப்படுகிறது.',
        },
      },
      {
        title: { en: 'Motor & Socio-Emotional Growth', ta: 'உடல் இயக்கம் & மனவெழுச்சி வளர்ச்சி' },
        desc: {
          en: 'Curriculum structured to develop fine motor coordination, interpersonal values, and classroom confidence.',
          ta: 'குழந்தைகளின் உடல் இயக்கம், நற்பண்புகள் மற்றும் வகுப்பறைத் தன்னம்பிக்கையை வளர்க்கும் வடிவமைப்பு.',
        },
      },
      {
        title: { en: 'Educator Enablement', ta: 'ஆசிரியர்களுக்குத் தொடர் பயிற்சி' },
        desc: {
          en: 'Parallel teacher preparation sessions to ensure activity-based tools are used effectively in daily lessons.',
          ta: 'புதிய பாடத்திட்டத்தை வகுப்பறையில் திறம்படக் கையாள ஆசிரியர்களுக்கு விரிவான பயிற்சிகள்.',
        },
      },
      {
        title: { en: 'Bilingual Linguistic Foundation', ta: 'வலுவான இருமொழி அடித்தளம்' },
        desc: {
          en: 'Equal emphasis on rich Tamil mother-tongue fluency and competitive global English literacy.',
          ta: 'தமிழ் தாய்மொழிப் புலமையுடன், உலகளாவிய வாய்ப்புகளுக்கான ஆங்கிலத் திறனும் ஒரே நேரத்தில் வளர்க்கப்படுகிறது.',
        },
      },
    ],
  },

  proposalsAndWelfare: [
    {
      id: 'noon-meal-biryani',
      status: 'POLICY PROPOSAL' as EducationStatus,
      title: {
        en: 'Weekly Chicken Biryani in Noon Meals',
        ta: 'வாரம் ஒரு முறை சிக்கன் பிரியாணி முன்மொழிவு',
      },
      desc: {
        en: 'A proposal to serve chicken biryani once weekly in government-school noon meals is under ministerial review and final Chief Minister consideration to bolster nutrition and attendance.',
        ta: 'அரசுப் பள்ளி மதிய உணவுத் திட்டத்தில் வாரம் ஒரு முறை சிக்கன் பிரியாணி வழங்கும் முன்மொழிவு அரசின் தீவிரப் பரிசீலனையில் உள்ளது.',
      },
      source: { en: 'New Indian Express, August 2026', ta: 'நியூ இந்தியன் எக்ஸ்பிரஸ், ஆகஸ்ட் 2026' },
    },
    {
      id: 'private-fee-caps',
      status: 'STATUTORY POSITION' as EducationStatus,
      title: {
        en: 'Strict Enforcement of Statutory Fee Caps',
        ta: 'கட்டண நிர்ணயக் குழு வரம்புகள் கட்டாயம்',
      },
      desc: {
        en: 'Official warning issued to private schools against collecting unapproved fees above the state fee-determination committee limits, protecting parents from arbitrary inflation.',
        ta: 'அரசு நிர்ணயித்த கட்டணத்தை விட கூடுதலாக வசூலிக்கும் தனியார் பள்ளிகள் மீது கடுமையான நடவடிக்கை எடுக்கப்படும் என எச்சரிக்கை.',
      },
      source: { en: 'New Indian Express, June 2026', ta: 'நியூ இந்தியன் எக்ஸ்பிரஸ், ஜூன் 2026' },
    },
  ],
};
