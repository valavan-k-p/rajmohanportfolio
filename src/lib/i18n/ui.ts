import type { Locale } from './routing';

/**
 * INTERFACE STRINGS
 *
 * Chrome copy — labels, headings, empty states — kept in one typed table rather
 * than as inline `locale === 'ta' ? … : …` ternaries scattered through the
 * pages. Two reasons: a missing Tamil string becomes a type error instead of an
 * English word leaking onto a Tamil page, and a translator can read the whole
 * interface in one file.
 *
 * Content strings do NOT live here. Those are `Bilingual` fields on the content
 * records themselves, next to the source that vouches for them.
 */
const STRINGS = {
  common: {
    readMore: { en: 'Read more', ta: 'மேலும் படிக்க' },
    viewAll: { en: 'View all', ta: 'அனைத்தையும் பார்' },
    all: { en: 'All', ta: 'அனைத்தும்' },
    home: { en: 'Home', ta: 'முகப்பு' },
    search: { en: 'Search', ta: 'தேடு' },
    close: { en: 'Close', ta: 'மூடு' },
    previous: { en: 'Previous', ta: 'முந்தையது' },
    next: { en: 'Next', ta: 'அடுத்தது' },
    date: { en: 'Date', ta: 'நாள்' },
    year: { en: 'Year', ta: 'ஆண்டு' },
    category: { en: 'Category', ta: 'பிரிவு' },
    department: { en: 'Department', ta: 'துறை' },
    source: { en: 'Source', ta: 'ஆதாரம்' },
    officialSite: { en: 'Official website', ta: 'அலுவல்முறை இணையதளம்' },
    newTab: { en: 'opens in a new tab', ta: 'புதிய தாவலில் திறக்கும்' },
  },

  home: {
    exploreOffice: { en: 'Explore the office', ta: 'அலுவலகத்தை அறிக' },
    portalsTitle: { en: 'Four portals', ta: 'நான்கு துறைகள்' },
    portalsStandfirst: {
      en: 'Three departments and one constituency. Each has its own record of news, documents, programmes and photographs.',
      ta: 'மூன்று துறைகள், ஒரு தொகுதி. ஒவ்வொன்றுக்கும் அதற்கான செய்திகள், ஆவணங்கள், திட்டங்கள், புகைப்படங்களின் தனிப் பதிவு உண்டு.',
    },
    latestTitle: { en: 'Latest updates', ta: 'சமீபத்திய புதுப்பிப்புகள்' },
    latestStandfirst: {
      en: 'Reported activity across the three departments and the constituency, newest first, each with its source.',
      ta: 'மூன்று துறைகள் மற்றும் தொகுதி தொடர்பான செய்திகள், புதியவை முதலில், ஒவ்வொன்றும் அதன் ஆதாரத்துடன்.',
    },
    figuresTitle: { en: 'Key figures', ta: 'முக்கிய எண்ணிக்கைகள்' },
    figuresStandfirst: {
      en: 'Only figures with a named source appear here. Where the office does not hold a number, the entry shows a dash rather than a zero.',
      ta: 'ஆதாரம் குறிப்பிடப்பட்ட எண்கள் மட்டுமே இங்கு இடம்பெறும். எண் கிடைக்காத இடங்களில் பூஜ்ஜியத்திற்குப் பதிலாகக் கோடு காட்டப்படும்.',
    },
    channelsTitle: { en: 'Official channels', ta: 'அலுவல்முறை தளங்கள்' },
    channelsStandfirst: {
      en: 'Departmental accounts and websites this office has opened and confirmed. Accounts that could not be confirmed are not listed.',
      ta: 'இவ்வலுவலகம் நேரில் பார்த்து உறுதிசெய்த துறைக் கணக்குகளும் இணையதளங்களும். உறுதிசெய்ய முடியாத கணக்குகள் இங்கு பட்டியலிடப்படவில்லை.',
    },
  },

  news: {
    title: { en: 'News', ta: 'செய்திகள்' },
    standfirst: {
      en: 'Reported activity across the three departments and the Egmore constituency. Each item names the organisation that reported it.',
      ta: 'மூன்று துறைகள் மற்றும் எழும்பூர் தொகுதி தொடர்பான செய்திகள். ஒவ்வொன்றும் அதைத் தெரிவித்த நிறுவனத்தைக் குறிப்பிடுகிறது.',
    },
    filterLabel: { en: 'Filter news by portal', ta: 'துறை வாரியாகச் செய்திகளை வடிகட்டு' },
    empty: { en: 'No news items match this filter', ta: 'இந்த வடிகட்டலுக்குப் பொருந்தும் செய்திகள் இல்லை' },
    related: { en: 'Related', ta: 'தொடர்புடையவை' },
  },

  documents: {
    title: { en: 'Documents', ta: 'ஆவணங்கள்' },
    standfirst: {
      en: 'Government orders, proceedings, press releases, press notes, budget papers and publications, searchable in one place.',
      ta: 'அரசு ஆணைகள், செயல்முறை ஆணைகள், செய்திக்குறிப்புகள், பத்திரிகைக் குறிப்புகள், நிதிநிலை ஆவணங்கள் மற்றும் வெளியீடுகள் — ஒரே இடத்தில் தேடக்கூடிய வகையில்.',
    },
    typeFilter: { en: 'Document type', ta: 'ஆவண வகை' },
    caption: { en: 'Documents, newest first', ta: 'ஆவணங்கள், புதியவை முதலில்' },
    view: { en: 'View', ta: 'பார்' },
    download: { en: 'Download', ta: 'பதிவிறக்கு' },
    noFile: {
      en: 'This office does not hold a copy of the document file. The summary above is drawn from the source named below.',
      ta: 'இந்த ஆவணக் கோப்பின் நகல் இவ்வலுவலகத்திடம் இல்லை. மேலே உள்ள சுருக்கம், கீழே குறிப்பிடப்பட்டுள்ள ஆதாரத்திலிருந்து எடுக்கப்பட்டது.',
    },
    documentNumber: { en: 'Document number', ta: 'ஆவண எண்' },
    languages: { en: 'Languages', ta: 'மொழிகள்' },
  },

  media: {
    title: { en: 'Media', ta: 'ஊடகம்' },
    standfirst: {
      en: 'Photographs from departmental work and constituency visits, grouped by portal.',
      ta: 'துறைப் பணிகள் மற்றும் தொகுதி வருகைகளின் புகைப்படங்கள், துறை வாரியாகத் தொகுக்கப்பட்டவை.',
    },
    galleryLabel: { en: 'Photo gallery', ta: 'புகைப்படக் காட்சியகம்' },
    videosTitle: { en: 'Videos', ta: 'காணொலிகள்' },
    videosEmpty: {
      en: 'No videos have been published yet.',
      ta: 'இதுவரை காணொலிகள் எதுவும் வெளியிடப்படவில்லை.',
    },
  },

  search: {
    title: { en: 'Search', ta: 'தேடல்' },
    standfirst: {
      en: 'Search across pages, news, documents and photographs.',
      ta: 'பக்கங்கள், செய்திகள், ஆவணங்கள், புகைப்படங்கள் அனைத்திலும் தேடுங்கள்.',
    },
    placeholder: { en: 'Search this site', ta: 'இத்தளத்தில் தேடு' },
    submit: { en: 'Search', ta: 'தேடு' },
    resultsFor: { en: 'Results for', ta: 'தேடல் முடிவுகள்' },
    noResults: { en: 'Nothing matched that search', ta: 'அந்தத் தேடலுக்கு எதுவும் பொருந்தவில்லை' },
    noResultsHint: {
      en: 'Try a shorter phrase, or browse the portals from the header.',
      ta: 'குறுகிய சொற்றொடரை முயற்சிக்கவும், அல்லது மேற்பகுதியிலிருந்து துறைகளை உலாவவும்.',
    },
    prompt: {
      en: 'Enter a word or phrase to search.',
      ta: 'தேட ஒரு சொல்லையோ சொற்றொடரையோ உள்ளிடவும்.',
    },
  },

  portal: {
    overview: { en: 'Overview', ta: 'கண்ணோட்டம்' },
    latestNews: { en: 'Latest news', ta: 'சமீபத்திய செய்திகள்' },
    documentsHere: { en: 'Documents', ta: 'ஆவணங்கள்' },
    gallery: { en: 'Gallery', ta: 'படக் காட்சியகம்' },
    officialLinks: { en: 'Official links', ta: 'அலுவல்முறை இணைப்புகள்' },
    figures: { en: 'Key figures', ta: 'முக்கிய எண்ணிக்கைகள்' },
    archives: { en: 'Archives', ta: 'ஆவணக் காப்பகங்கள்' },
    archivesStandfirst: {
      en: 'Each archive below is filled only from a source document the office holds. Where an archive is empty, the official departmental site is linked instead.',
      ta: 'கீழ்க்காணும் ஒவ்வொரு காப்பகமும், அலுவலகத்திடம் உள்ள ஆதார ஆவணங்களிலிருந்து மட்டுமே நிரப்பப்படுகிறது. காப்பகம் காலியாக இருக்கும்போது, அலுவல்முறைத் துறை இணையதளம் இணைக்கப்படுகிறது.',
    },
  },

  services: {
    title: { en: 'Citizen services', ta: 'குடிமக்கள் சேவைகள்' },
    standfirst: {
      en: 'Submit a request or a grievance to the constituency office, and track one already submitted.',
      ta: 'தொகுதி அலுவலகத்திற்கு ஒரு கோரிக்கையையோ குறையையோ சமர்ப்பிக்கலாம்; ஏற்கெனவே சமர்ப்பித்த ஒன்றின் நிலையைக் காணலாம்.',
    },
  },

  a11y: {
    /**
     * A template, not a function. Strings cross the server/client boundary;
     * functions do not, and this label is consumed by the gallery lightbox,
     * which is a client component.
     */
    galleryPosition: {
      en: 'Photograph {index} of {total}',
      ta: 'புகைப்படம் {index} / {total}',
    },
  },
} as const;

type Table = typeof STRINGS;

/**
 * Read the string table in one locale.
 *
 * `ui(locale).news.title` returns a plain string. Every leaf is a string, so
 * the result can be handed straight to a client component.
 */
export function ui<L extends Locale>(locale: L): Localised<Table, L> {
  return localise(STRINGS, locale) as Localised<Table, L>;
}

type Bi<T> = { readonly en: T; readonly ta: T };

type Localised<T, L extends Locale> = T extends Bi<infer V>
  ? V
  : { readonly [K in keyof T]: Localised<T[K], L> };

function localise(node: unknown, locale: Locale): unknown {
  if (node === null || typeof node !== 'object') return node;

  const record = node as Record<string, unknown>;
  if ('en' in record && 'ta' in record) return record[locale];

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    out[key] = localise(value, locale);
  }
  return out;
}
