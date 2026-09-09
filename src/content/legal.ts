import type { Bilingual } from '@/lib/content/types';

/**
 * DISCLAIMER · ACCESSIBILITY · PRIVACY
 *
 * The disclaimer is a direct client requirement (handwritten note 1.4:
 * "Add · விபரம் மறுப்பு"). The other two are the brief's accessibility and
 * privacy commitments, written as statements of what the site actually does —
 * not as boilerplate. Every claim below is true of this build; nothing is
 * promised that has not been implemented.
 */

export interface LegalPage {
  readonly slug: 'disclaimer' | 'accessibility' | 'privacy';
  readonly title: Bilingual;
  readonly standfirst: Bilingual;
  readonly sections: readonly { heading: Bilingual; body: readonly Bilingual[] }[];
}

export const LEGAL_PAGES: readonly LegalPage[] = [
  {
    slug: 'disclaimer',
    title: { en: 'Disclaimer', ta: 'விவர மறுப்பு' },
    standfirst: {
      en: 'What this site is, what it is not, and how to tell one kind of statement here from another.',
      ta: 'இத்தளம் என்ன, என்ன அல்ல, இங்குள்ள ஒரு வகைத் தகவலை இன்னொன்றிலிருந்து எப்படி வேறுபடுத்துவது.',
    },
    sections: [
      {
        heading: { en: 'This is not a government website', ta: 'இது அரசு இணையதளம் அல்ல' },
        body: [
          {
            en: 'This site is maintained by the office of Rajmohan Arumugam. It is not an official website of the Government of Tamil Nadu or of any of its departments, and it should not be treated as one. Where it refers to a department, it links to that department’s own site, which is the authoritative source for the department’s services, orders and announcements.',
            ta: 'இத்தளம் ராஜ்மோகன் ஆறுமுகம் அவர்களின் அலுவலகத்தால் பராமரிக்கப்படுகிறது. இது தமிழ்நாடு அரசின் அல்லது அதன் எந்த ஒரு துறையின் அலுவல்முறை இணையதளமும் அல்ல; அவ்வாறு கருதப்படக்கூடாது. ஒரு துறையைக் குறிப்பிடும்போது, அத்துறையின் சொந்த இணையதளத்துடன் இணைக்கிறது; அத்துறையின் சேவைகள், ஆணைகள், அறிவிப்புகளுக்கு அதுவே இறுதி ஆதாரம்.',
          },
        ],
      },
      {
        heading: { en: 'How statements here are labelled', ta: 'இங்குள்ள தகவல்கள் எவ்வாறு குறிக்கப்படுகின்றன' },
        body: [
          {
            en: 'Every factual item on this site names its source. A source labelled as a government website, department, order or press release is a primary record. A source labelled as a news organisation is a report: it is attributed, and it is not presented as an official record. Text attributed to this office is framing written here, and carries no factual claim of its own.',
            ta: 'இத்தளத்தில் உள்ள ஒவ்வொரு தகவலும் அதன் ஆதாரத்தைக் குறிப்பிடுகிறது. அரசு இணையதளம், துறை, ஆணை அல்லது செய்திக்குறிப்பு எனக் குறிக்கப்பட்ட ஆதாரம் முதன்மைப் பதிவு. செய்தி நிறுவனம் எனக் குறிக்கப்பட்ட ஆதாரம் ஒரு அறிக்கை; அது ஆதாரத்துடன் தெரிவிக்கப்படுகிறது, அலுவல்முறைப் பதிவாகக் காட்டப்படவில்லை. இவ்வலுவலகத்திற்குக் கூறப்பட்ட உரை இங்கு எழுதப்பட்ட விளக்கம்; அது தானாக எந்த உண்மைக் கூற்றையும் முன்வைக்கவில்லை.',
          },
        ],
      },
      {
        heading: { en: 'Gaps are shown, not filled', ta: 'இடைவெளிகள் மறைக்கப்படுவதில்லை' },
        body: [
          {
            en: 'Where a figure or a document is not held by this office, the site shows the gap. A figure with no source is displayed as a dash, never as zero. An archive with no records says so and links to the departmental site instead. No government order, proceeding number, budget figure, ward number or councillor name is published here unless a source for it can be named.',
            ta: 'ஒரு எண்ணோ ஆவணமோ இவ்வலுவலகத்திடம் இல்லாதபோது, அந்த இடைவெளியை இத்தளம் காட்டுகிறது. ஆதாரமில்லாத எண் கோடாகக் காட்டப்படுகிறது; ஒருபோதும் பூஜ்ஜியமாக அல்ல. பதிவுகள் இல்லாத காப்பகம் அதைத் தெரிவித்து, துறை இணையதளத்தை இணைக்கிறது. ஆதாரம் குறிப்பிட முடியாத எந்த அரசு ஆணையும், செயல்முறை எண்ணும், நிதி எண்ணும், வார்டு எண்ணும், மன்ற உறுப்பினர் பெயரும் இங்கு வெளியிடப்படுவதில்லை.',
          },
        ],
      },
      {
        heading: { en: 'Corrections', ta: 'திருத்தங்கள்' },
        body: [
          {
            en: 'If something here is wrong, the office would rather know. Corrections can be sent through the citizen services page, and a corrected record carries the date it was checked.',
            ta: 'இங்கு ஏதேனும் தவறாக இருந்தால், அதை அறிவதையே அலுவலகம் விரும்புகிறது. குடிமக்கள் சேவைகள் பக்கம் வழியாகத் திருத்தங்களை அனுப்பலாம்; திருத்தப்பட்ட பதிவு, சரிபார்க்கப்பட்ட நாளைக் குறிப்பிடும்.',
          },
        ],
      },
    ],
  },

  {
    slug: 'accessibility',
    title: { en: 'Accessibility', ta: 'அணுகல் தன்மை' },
    standfirst: {
      en: 'How this site is built to be usable, and what to do if part of it is not.',
      ta: 'இத்தளம் அனைவரும் பயன்படுத்தும் வகையில் எவ்வாறு உருவாக்கப்பட்டுள்ளது; ஏதேனும் ஒரு பகுதி அவ்வாறு இல்லையெனில் என்ன செய்வது.',
    },
    sections: [
      {
        heading: { en: 'What is implemented', ta: 'செயல்படுத்தப்பட்டுள்ளவை' },
        body: [
          {
            en: 'The site targets WCAG 2.1 AA. Body text clears the AAA contrast threshold against the page background. Every page uses semantic landmarks and a single ordered heading outline; every interactive element is reachable and operable by keyboard, with a visible focus ring that is never removed. Tables are real tables with column headers. Photographs carry alternative text in both languages. Meaning is never carried by colour alone.',
            ta: 'இத்தளம் WCAG 2.1 AA தரத்தை இலக்காகக் கொண்டுள்ளது. உரை, பக்கப் பின்னணிக்கு எதிராக AAA மாறுபாட்டு அளவைத் தாண்டுகிறது. ஒவ்வொரு பக்கமும் பொருள்சார் அமைப்புக் கூறுகளையும் ஒரே வரிசைத் தலைப்பு அமைப்பையும் பயன்படுத்துகிறது; ஒவ்வொரு தொடர்பு உறுப்பும் விசைப்பலகை வழியாக அணுகக்கூடியது, அதன் கவனக் குறியீடு ஒருபோதும் நீக்கப்படுவதில்லை. அட்டவணைகள் நெடுவரிசைத் தலைப்புகளுடன் கூடிய உண்மையான அட்டவணைகள். புகைப்படங்கள் இரு மொழிகளிலும் மாற்று உரையைச் சுமக்கின்றன. பொருள் ஒருபோதும் நிறத்தால் மட்டும் தெரிவிக்கப்படுவதில்லை.',
          },
          {
            en: 'Motion is minimal by design: the only transitions are short hover, focus and dialog changes. If your system asks for reduced motion, every transition on the site is disabled. The site is authored to be correct with all animation off.',
            ta: 'அசைவு வேண்டுமென்றே குறைவாகவே வைக்கப்பட்டுள்ளது: குறுகிய சுட்டி, கவனம், உரையாடல் மாற்றங்கள் மட்டுமே உள்ளன. உங்கள் அமைப்பு குறைந்த அசைவைக் கோரினால், இத்தளத்தின் அனைத்து மாற்றங்களும் நிறுத்தப்படும். அனைத்து அசைவுகளையும் நீக்கினாலும் சரியாகச் செயல்படும் வகையிலேயே இத்தளம் உருவாக்கப்பட்டுள்ளது.',
          },
        ],
      },
      {
        heading: { en: 'Language', ta: 'மொழி' },
        body: [
          {
            en: 'The site exists fully in Tamil and in English. Every page has a counterpart in the other language at the same address, and switching language keeps you on the page you were reading. Tamil pages are written in Tamil rather than translated word for word, and Tamil text is tagged so that screen readers pronounce it with a Tamil voice.',
            ta: 'இத்தளம் தமிழிலும் ஆங்கிலத்திலும் முழுமையாக உள்ளது. ஒவ்வொரு பக்கத்திற்கும் மறு மொழியில் அதே முகவரியில் இணையான பக்கம் உண்டு; மொழியை மாற்றும்போது நீங்கள் படித்துக்கொண்டிருந்த பக்கத்திலேயே இருப்பீர்கள். தமிழ்ப் பக்கங்கள் சொல்லுக்குச் சொல் மொழிபெயர்க்கப்படாமல் தமிழிலேயே எழுதப்பட்டுள்ளன; தமிழ் உரை, திரைப் படிப்பான்கள் தமிழ் ஒலியில் வாசிக்கும் வகையில் குறியிடப்பட்டுள்ளது.',
          },
        ],
      },
      {
        heading: { en: 'If something does not work', ta: 'ஏதேனும் செயல்படாவிட்டால்' },
        body: [
          {
            en: 'If any part of this site is difficult or impossible to use, please tell the office through the citizen services page, describing the page and the difficulty. Accessibility defects are treated as defects, not as requests.',
            ta: 'இத்தளத்தின் ஏதேனும் ஒரு பகுதியைப் பயன்படுத்துவது கடினமாகவோ இயலாததாகவோ இருந்தால், குடிமக்கள் சேவைகள் பக்கம் வழியாக அப்பக்கத்தையும் சிரமத்தையும் குறிப்பிட்டு அலுவலகத்திற்குத் தெரிவிக்கவும். அணுகல் குறைபாடுகள் கோரிக்கைகளாக அல்ல, குறைபாடுகளாகவே கருதப்படும்.',
          },
        ],
      },
    ],
  },

  {
    slug: 'privacy',
    title: { en: 'Privacy', ta: 'தனியுரிமை' },
    standfirst: {
      en: 'What this site collects, and what it does not.',
      ta: 'இத்தளம் எதைச் சேகரிக்கிறது, எதைச் சேகரிப்பதில்லை.',
    },
    sections: [
      {
        heading: { en: 'Browsing this site', ta: 'இத்தளத்தை உலாவுதல்' },
        body: [
          {
            en: 'Reading this site requires no account and sets no advertising or tracking cookies. Fonts are served from this site itself, not from a third party, so opening a page makes no request to any external service.',
            ta: 'இத்தளத்தைப் படிக்கக் கணக்கு எதுவும் தேவையில்லை; விளம்பர அல்லது கண்காணிப்புக் குக்கீகள் எதுவும் அமைக்கப்படுவதில்லை. எழுத்துருக்கள் மூன்றாம் தரப்பிலிருந்து அல்லாமல் இத்தளத்திலிருந்தே வழங்கப்படுகின்றன; எனவே ஒரு பக்கத்தைத் திறப்பது எந்த வெளிச் சேவைக்கும் கோரிக்கை அனுப்புவதில்லை.',
          },
        ],
      },
      {
        heading: { en: 'Requests and grievances', ta: 'கோரிக்கைகளும் குறைகளும்' },
        body: [
          {
            en: 'If you submit a request or a grievance through the citizen services page, the details you enter are stored so that the office can act on it and so that you can track it with your reference number. That information is used for handling your request and for nothing else.',
            ta: 'குடிமக்கள் சேவைகள் பக்கம் வழியாக ஒரு கோரிக்கையையோ குறையையோ சமர்ப்பித்தால், அலுவலகம் அதன் மீது நடவடிக்கை எடுக்கவும், உங்கள் குறிப்பு எண்ணைக் கொண்டு நீங்கள் நிலையைக் காணவும் நீங்கள் அளித்த விவரங்கள் சேமிக்கப்படுகின்றன. அத்தகவல் உங்கள் கோரிக்கையைக் கையாள மட்டுமே பயன்படுத்தப்படுகிறது; வேறு எதற்கும் அல்ல.',
          },
        ],
      },
      {
        heading: { en: 'Links that leave this site', ta: 'இத்தளத்தை விட்டு வெளியேறும் இணைப்புகள்' },
        body: [
          {
            en: 'Links to government websites and to official social media accounts open on those services, which have their own privacy practices. This site has no control over what they collect.',
            ta: 'அரசு இணையதளங்களுக்கும் அலுவல்முறை சமூக ஊடகக் கணக்குகளுக்கும் உள்ள இணைப்புகள் அந்தச் சேவைகளில் திறக்கின்றன; அவற்றுக்குத் தனித் தனியுரிமைக் கொள்கைகள் உண்டு. அவை என்ன சேகரிக்கின்றன என்பதில் இத்தளத்திற்குக் கட்டுப்பாடு இல்லை.',
          },
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((page) => page.slug === slug);
}
