import type { Bilingual } from '@/lib/content/types';

// The strict labels requested by the UI/UX Prompt
export type ContentStatus = 
  | 'VERIFIED'
  | 'OFFICIAL SOURCE'
  | 'MINISTERIAL STATEMENT'
  | 'REPORTED'
  | 'PROPOSED'
  | 'INHERITED DEPARTMENTAL PROGRAMME'
  | 'UNDER HIS TENURE'
  | 'PUBLICLY ANNOUNCED'
  | 'SUPPORTED GOVERNMENT / ASSEMBLY ACTION'
  | 'EDITORIAL ROADMAP';

export interface BaseContent {
  readonly id: string;
  readonly status: ContentStatus;
  readonly title: Bilingual;
  readonly description?: Bilingual;
  readonly date?: string;
  readonly source?: string;
}

export interface Scheme extends BaseContent {
  readonly beneficiaryCount?: string;
  readonly allocatedBudget?: string;
  readonly year?: string;
}

export interface TimelineEvent extends BaseContent {
  readonly importance: 'primary' | 'secondary';
}

export const TAMIL_DEVELOPMENT_DATA = {
  ecosystemNodes: [
    { id: 'language', label: { en: 'Language', ta: 'மொழி' } },
    { id: 'literature', label: { en: 'Literature', ta: 'இலக்கியம்' } },
    { id: 'translation', label: { en: 'Translation', ta: 'மொழிபெயர்ப்பு' } },
    { id: 'lexicography', label: { en: 'Lexicography', ta: 'அகராதியியல்' } },
    { id: 'research', label: { en: 'Research', ta: 'ஆராய்ச்சி' } },
    { id: 'students', label: { en: 'Students', ta: 'மாணவர்கள்' } },
    { id: 'culture', label: { en: 'Culture', ta: 'பண்பாடு' } },
    { id: 'global-tamil', label: { en: 'Global Tamil', ta: 'உலகத் தமிழ்' } },
    { id: 'digital-tamil', label: { en: 'Digital Tamil', ta: 'மின் தமிழ்' } }
  ],

  tenureTimeline: [
    {
      id: 'cabinet-entry',
      status: 'VERIFIED',
      date: '10 May 2026',
      title: { en: 'Entered Tamil Nadu cabinet', ta: 'தமிழக அமைச்சரவையில் நுழைந்தார்' },
      importance: 'primary'
    },
    {
      id: 'portfolio-allocation',
      status: 'VERIFIED',
      date: '16 May 2026',
      title: { en: 'Portfolio allocation', ta: 'பொருப்பு ஒதுக்கீடு' },
      importance: 'primary'
    },
    {
      id: 'department-review',
      status: 'REPORTED',
      date: '17 May 2026',
      title: { en: 'Reported departmental review', ta: 'அறிவிக்கப்பட்ட துறை ஆய்வு' },
      importance: 'secondary'
    },
    {
      id: 'tamil-thaai-vaazhthu-priority',
      status: 'MINISTERIAL STATEMENT',
      date: '21 May 2026',
      title: { en: 'Tamil Thaai Vaazhthu priority statement', ta: 'தமிழ்த் தாய் வாழ்த்து முன்னுரிமை அறிக்கை' },
      importance: 'primary'
    },
    {
      id: 'coimbatore-visit',
      status: 'REPORTED',
      date: '11–12 June 2026',
      title: { en: 'Coimbatore exhibition, AI-content review & awards discussion', ta: 'கோவை கண்காட்சி, AI உள்ளடக்க ஆய்வு மற்றும் விருதுகள் விவாதம்' },
      importance: 'secondary'
    },
    {
      id: 'us-consultations',
      status: 'REPORTED',
      date: '1–7 July 2026',
      title: { en: 'US consultations connected to proposed World Tamil Conference', ta: 'முன்மொழியப்பட்ட உலகத் தமிழ் மாநாடு தொடர்பான அமெரிக்க ஆலோசனைகள்' },
      importance: 'secondary'
    },
    {
      id: 'tamil-nadu-day',
      status: 'VERIFIED',
      date: '18 July 2026',
      title: { en: 'Tamil Nadu Day celebration at IITS', ta: 'ஐ.ஐ.டி.எஸ்-இல் தமிழ்நாடு நாள் கொண்டாட்டம்' },
      importance: 'primary'
    },
    {
      id: 'assembly-resolution',
      status: 'SUPPORTED GOVERNMENT / ASSEMBLY ACTION',
      date: 'August 2026',
      title: { en: 'Supported Assembly resolution on Tamil Thaai Vaazhthu', ta: 'தமிழ்த் தாய் வாழ்த்து தொடர்பான சட்டமன்ற தீர்மானத்திற்கு ஆதரவு' },
      importance: 'primary'
    },
    {
      id: 'arivasanam-release',
      status: 'VERIFIED',
      date: '11 August 2026',
      title: { en: 'Released “Arivasanam” at Anna Centenary Library', ta: 'அண்ணா நூற்றாண்டு நூலகத்தில் “அறிவாசனம்” வெளியீடு' },
      importance: 'secondary'
    }
  ] as TimelineEvent[],

  departmentalContinuity: [
    { id: 'c1', title: { en: 'Official language implementation', ta: 'ஆட்சி மொழி அமலாக்கம்' }, status: 'INHERITED DEPARTMENTAL PROGRAMME' },
    { id: 'c2', title: { en: 'Awards distribution', ta: 'விருதுகள் வழங்கல்' }, status: 'INHERITED DEPARTMENTAL PROGRAMME' },
    { id: 'c3', title: { en: 'Nationalised books', ta: 'நாட்டுடைமையாக்கப்பட்ட நூல்கள்' }, status: 'INHERITED DEPARTMENTAL PROGRAMME' },
    { id: 'c4', title: { en: 'Dream House scheme', ta: 'கனவு இல்லம் திட்டம்' }, status: 'INHERITED DEPARTMENTAL PROGRAMME' },
    { id: 'c5', title: { en: 'Sorkuvai project', ta: 'சொற்குவை திட்டம்' }, status: 'INHERITED DEPARTMENTAL PROGRAMME' },
    { id: 'c6', title: { en: 'Research institutions', ta: 'ஆராய்ச்சி நிறுவனங்கள்' }, status: 'INHERITED DEPARTMENTAL PROGRAMME' },
    { id: 'c7', title: { en: 'Student programmes', ta: 'மாணவர் திட்டங்கள்' }, status: 'INHERITED DEPARTMENTAL PROGRAMME' }
  ] as Partial<BaseContent>[],

  rajmohanTenureActions: [
    { id: 'r1', title: { en: 'Departmental review', ta: 'துறை ஆய்வு' }, status: 'UNDER HIS TENURE' },
    { id: 'r2', title: { en: 'AI content scrutiny direction', ta: 'AI உள்ளடக்க ஆய்வு வழிகாட்டுதல்' }, status: 'UNDER HIS TENURE' },
    { id: 'r3', title: { en: 'Attention to pending awards', ta: 'நிலுவையிலுள்ள விருதுகள் மீதான கவனம்' }, status: 'UNDER HIS TENURE' },
    { id: 'r4', title: { en: 'Tamil Thaai Vaazhthu position/support', ta: 'தமிழ்த் தாய் வாழ்த்து நிலைப்பாடு/ஆதரவு' }, status: 'UNDER HIS TENURE' },
    { id: 'r5', title: { en: 'Tamil Nadu Day participation', ta: 'தமிழ்நாடு நாள் பங்கேற்பு' }, status: 'UNDER HIS TENURE' },
    { id: 'r6', title: { en: 'Literary engagement', ta: 'இலக்கிய ஈடுபாடு' }, status: 'UNDER HIS TENURE' },
    { id: 'r7', title: { en: 'World Tamil Conference consultations', ta: 'உலகத் தமிழ் மாநாடு ஆலோசனைகள்' }, status: 'REPORTED' }
  ] as Partial<BaseContent>[],

  sorkuvaiStats: {
    wordsUploaded: { value: '15,33,669', label: { en: 'Tamil words uploaded', ta: 'பதியப்பட்ட தமிழ்ச் சொற்கள்' }, context: 'up to March 2025' },
    technicalWords: { value: '51,622', label: { en: 'technical words coined', ta: 'உருவாக்கப்பட்ட கலைச்சொற்கள்' }, context: 'through 178 expert meetings' },
    students: { value: '200', label: { en: 'students selected annually', ta: 'ஆண்டுதோறும் தேர்ந்தெடுக்கப்படும் மாணவர்கள்' }, context: 'Young Lexicographer programme' }
  },
  
  financials: {
    baseline: { value: '₹129.03 crore', label: { en: '2025–26 departmental baseline', ta: '2025–26 துறை சார் அடிப்படை நிதி' }, context: 'Not a live 2026–27 budget' }
  }
};
