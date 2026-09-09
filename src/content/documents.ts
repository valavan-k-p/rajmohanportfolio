import type { DocumentRecord } from '@/lib/content/schema';
import { SRC_DECCAN_POLICY_NOTE, SRC_STATESMAN_BUDGET } from './sources';

/**
 * THE DOCUMENT ARCHIVE
 *
 * This file is nearly empty, and that is the accurate state of the archive.
 *
 * The client asked for Government Orders, Proceedings, Press Releases and Press
 * Notes on the School Education and Information & Publicity portals. Building
 * those archives is done — the routes, filters, search, table semantics and
 * document pages all exist and work. What does not exist is the content: no
 * G.O. number, proceeding number or departmental press-release PDF has been
 * supplied to this office, and the brief is explicit that none may be invented.
 *
 * Those archives therefore render their empty state, which names the official
 * departmental site that does hold the documents. The moment a real G.O. is
 * added to this array it appears in every relevant view with no further work.
 *
 * The two records below are real and dated, and both are attributed to the news
 * reports they rest on rather than being presented as official papers. Neither
 * has a `documentUrl`, so neither offers a View or Download control — the site
 * does not pretend to hold a PDF it does not have.
 */
export const DOCUMENTS: readonly DocumentRecord[] = [
  {
    id: 'doc-budget-2026-27-school-education',
    slug: 'school-education-budget-2026-27',
    title: {
      en: 'School Education allocation, State Budget 2026–27',
      ta: 'பள்ளிக் கல்வி ஒதுக்கீடு, மாநில நிதிநிலை அறிக்கை 2026–27',
    },
    documentType: 'budget',
    date: '2026-08-05',
    department: 'school-education',
    summary: {
      en: 'Allocation of ₹44,527 crore to the School Education Department, with a ₹2,132 crore modernisation programme across 3,734 schools and ₹139 crore for the first phase of Super Clean, Super Campus in 10,000 schools.',
      ta: 'பள்ளிக் கல்வித் துறைக்கு ₹44,527 கோடி ஒதுக்கீடு; 3,734 பள்ளிகளை உள்ளடக்கிய ₹2,132 கோடி நவீனமயமாக்கல் திட்டம்; 10,000 பள்ளிகளில் "சூப்பர் கிளீன், சூப்பர் கேம்பஸ்" முதற் கட்டத்திற்கு ₹139 கோடி.',
    },
    languages: ['en', 'ta'],
    source: SRC_STATESMAN_BUDGET,
    verification: 'reported',
    published: true,
    workflowStatus: 'published',
  },
  {
    id: 'doc-policy-note-2026-27-culture',
    slug: 'policy-note-2026-27-art-culture-archaeology-museums',
    title: {
      en: 'Policy Note 2026–27 — Art and Culture, Archaeology and Museums',
      ta: 'கொள்கை விளக்கக் குறிப்பு 2026–27 — கலை பண்பாடு, தொல்லியல் மற்றும் அருங்காட்சியகங்கள்',
    },
    documentType: 'policy-note',
    date: '2026-08-20',
    department: 'tamil-development',
    summary: {
      en: 'Covers three departments. Sets out eight major excavations for the year including an eleventh season at Keeladi, the Porunai Museum at Tirunelveli (₹56.36 crore) and the Grand Chola Museum at Thanjavur (₹56.41 crore).',
      ta: 'மூன்று துறைகளை உள்ளடக்கியது. கீழடியில் பதினொன்றாவது கட்டம் உள்ளிட்ட எட்டு முக்கிய அகழாய்வுகள், திருநெல்வேலி பொருநை அருங்காட்சியகம் (₹56.36 கோடி), தஞ்சாவூர் பேரரசு சோழர் அருங்காட்சியகம் (₹56.41 கோடி) ஆகியவற்றை அறிவிக்கிறது.',
    },
    languages: ['en', 'ta'],
    source: SRC_DECCAN_POLICY_NOTE,
    verification: 'reported',
    published: true,
    workflowStatus: 'published',
  },
];
