/**
 * The photographs used on the site, and where each one comes from.
 *
 * `from` paths point at the project owner's supplied library in
 * `reference/Pictures/`, which is NOT committed — it is ~3 GB of raw camera
 * files. `npm run images` reads that library and writes the optimised, committed
 * derivatives into `public/images/`.
 *
 * Every entry needs an `alt` in both languages. A photograph with no alt text
 * cannot be added here, because the type used downstream requires one.
 */

/** @typedef {{ id: string, from: string, to: string, width: number, fit?: 'cover'|'inside', aspect?: [number, number], position?: string, alt: { en: string, ta: string } }} ImageJob */

/** @type {ImageJob[]} */
export const IMAGES = [
  /* ---------------------------------------------------------------- *
   * IDENTITY — the front cover the client asked to change (note 1.1)
   * ---------------------------------------------------------------- */
  {
    id: 'hero-office',
    from: 'Individual/_LJ15543.JPG',
    to: 'hero/office.webp',
    width: 1800,
    aspect: [4, 5],
    position: 'attention',
    alt: {
      en: 'Rajmohan Arumugam at his desk in the ministerial office, with departmental files and a bookshelf behind him.',
      ta: 'அமைச்சர் அலுவலகத்தில் தமது மேசையில் ராஜ்மோகன் ஆறுமுகம் — துறை ஆவணங்களும், பின்னால் நூல் அலமாரியும்.',
    },
  },
  {
    id: 'about-desk',
    from: 'Individual/6N3A0303.JPG',
    to: 'about/desk.webp',
    width: 1600,
    aspect: [3, 2],
    alt: {
      en: 'Rajmohan Arumugam signing departmental files at his desk while an official waits.',
      ta: 'அலுவலர் ஒருவர் அருகில் நிற்க, தமது மேசையில் துறை ஆவணங்களில் கையொப்பமிடும் ராஜ்மோகன் ஆறுமுகம்.',
    },
  },

  /* ---------------------------------------------------------------- *
   * PORTAL COVERS — one per portal, never reused (brief §25)
   * ---------------------------------------------------------------- */
  {
    id: 'cover-school-education',
    from: 'EDU/6N3A0427.JPG',
    to: 'portals/school-education-cover.webp',
    width: 1800,
    aspect: [16, 9],
    alt: {
      en: 'A school library, with students and staff at the shelves during a departmental visit.',
      ta: 'துறை ஆய்வின்போது நூல் அலமாரிகளின் அருகில் மாணவர்களும் பணியாளர்களும் — ஒரு பள்ளி நூலகம்.',
    },
  },
  {
    id: 'cover-tamil-development',
    from: 'TD/6N3A0525.JPG',
    to: 'portals/tamil-development-cover.webp',
    width: 1800,
    aspect: [16, 9],
    alt: {
      en: 'Bronze and stone sculptures on display in a museum gallery during a Tamil Development visit.',
      ta: 'தமிழ் வளர்ச்சித் துறை ஆய்வின்போது அருங்காட்சியகக் கூடத்தில் காட்சிக்கு வைக்கப்பட்டுள்ள வெண்கல, கல் சிற்பங்கள்.',
    },
  },
  {
    id: 'cover-information-publicity',
    from: 'Tndipr/MLJ10153.JPG',
    to: 'portals/information-publicity-cover.webp',
    width: 1800,
    aspect: [16, 9],
    alt: {
      en: 'A government press briefing in progress, with journalists seated before the departmental backdrop.',
      ta: 'துறை பின்னணித் திரையின் முன் செய்தியாளர்கள் அமர்ந்திருக்க நடைபெறும் அரசு செய்தியாளர் சந்திப்பு.',
    },
  },
  {
    id: 'cover-egmore',
    from: 'EGMORE/_LJ15356.JPG',
    to: 'portals/egmore-cover.webp',
    width: 1800,
    aspect: [16, 9],
    alt: {
      en: 'Walking a residential lane in the Egmore constituency, meeting residents at their doorsteps.',
      ta: 'எழும்பூர் தொகுதியின் குடியிருப்புத் தெரு ஒன்றில் நடந்து, வீட்டு வாசல்களில் மக்களைச் சந்திக்கும் காட்சி.',
    },
  },

  /* ---------------------------------------------------------------- *
   * SCHOOL EDUCATION GALLERY
   * ---------------------------------------------------------------- */
  {
    id: 'edu-classroom-students',
    from: 'EDU/6N3A0345.JPG',
    to: 'gallery/school-education/classroom-students.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Government school students gathered around a table with the minister during a classroom visit.',
      ta: 'வகுப்பறை ஆய்வின்போது அமைச்சருடன் மேசையைச் சுற்றி அமர்ந்திருக்கும் அரசுப் பள்ளி மாணவர்கள்.',
    },
  },
  {
    id: 'edu-primary-classroom',
    from: 'EDU/6N3A0814.JPG',
    to: 'gallery/school-education/primary-classroom.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'A primary classroom decorated with the alphabet, during a visit to a government school.',
      ta: 'அரசுப் பள்ளி ஆய்வின்போது எழுத்துகளால் அலங்கரிக்கப்பட்ட ஒரு தொடக்கப் பள்ளி வகுப்பறை.',
    },
  },
  {
    id: 'edu-kit-distribution',
    from: 'EDU/6N3A0615.JPG',
    to: 'gallery/school-education/kit-distribution.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'School kits being handed to students at a School Education Department event.',
      ta: 'பள்ளிக் கல்வித் துறை நிகழ்வில் மாணவர்களுக்கு வழங்கப்படும் பள்ளிப் பொருள் தொகுப்புகள்.',
    },
  },
  {
    id: 'edu-certificates',
    from: 'EDU/6N3A0342.JPG',
    to: 'gallery/school-education/certificates.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Students and teachers seated with certificates at a school ceremony.',
      ta: 'பள்ளி விழா ஒன்றில் சான்றிதழ்களுடன் அமர்ந்திருக்கும் மாணவர்களும் ஆசிரியர்களும்.',
    },
  },
  {
    id: 'edu-infrastructure',
    from: 'EDU/6N3A0723.JPG',
    to: 'gallery/school-education/infrastructure.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Opening of a new school building block built under a school infrastructure programme.',
      ta: 'பள்ளிக் கட்டமைப்புத் திட்டத்தின் கீழ் கட்டப்பட்ட புதிய பள்ளிக் கட்டிடத் தொகுதி திறப்பு.',
    },
  },
  {
    id: 'edu-foundation-stone',
    from: 'EDU/6N3A0147.JPG',
    to: 'gallery/school-education/foundation-stone.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'A foundation stone being laid for a school construction project.',
      ta: 'பள்ளிக் கட்டுமானப் பணிக்கான அடிக்கல் நாட்டு விழா.',
    },
  },
  {
    id: 'edu-smart-classroom',
    from: 'EDU/6N3A0302.JPG',
    to: 'gallery/school-education/smart-classroom.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'A digital display in a government school classroom during a departmental visit.',
      ta: 'துறை ஆய்வின்போது அரசுப் பள்ளி வகுப்பறையில் உள்ள மின்னணுத் திரைக் காட்சி.',
    },
  },
  {
    id: 'edu-department-office',
    from: 'EDU/6N3A0792.JPG',
    to: 'gallery/school-education/department-office.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'At the School Education Department office, in front of the departmental nameboard.',
      ta: 'பள்ளிக் கல்வித் துறை அலுவலகத்தில், துறையின் பெயர்ப் பலகையின் முன்.',
    },
  },

  /* ---------------------------------------------------------------- *
   * TAMIL DEVELOPMENT GALLERY
   * ---------------------------------------------------------------- */
  {
    id: 'td-excavation-aerial',
    from: 'TD/DJI_20260719192418_0108_D_DPR.JPG',
    to: 'gallery/tamil-development/excavation-aerial.webp',
    width: 1600,
    aspect: [3, 2],
    alt: {
      en: 'Aerial view of an archaeological excavation, showing the exposed trenches and structures.',
      ta: 'அகழாய்வுக் களத்தின் வான்வழிக் காட்சி — வெளிப்படுத்தப்பட்ட அகழிகளும் கட்டமைப்புகளும்.',
    },
  },
  {
    id: 'td-excavation-site',
    from: 'TD/DJI_20260719192221_0097_D_DPR.JPG',
    to: 'gallery/tamil-development/excavation-site.webp',
    width: 1600,
    aspect: [3, 2],
    alt: {
      en: 'Visitors at an archaeological excavation site, walking the edge of the trenches.',
      ta: 'அகழாய்வுக் களத்தில் அகழிகளின் ஓரமாக நடந்து செல்லும் பார்வையாளர்கள்.',
    },
  },
  {
    id: 'td-rock-shelter',
    from: 'TD/IMG_0225.JPG',
    to: 'gallery/tamil-development/rock-shelter.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Inspecting a rock shelter at a heritage site with departmental officials.',
      ta: 'துறை அலுவலர்களுடன் பாரம்பரியக் களத்தில் ஒரு பாறை அடைவைப் பார்வையிடுதல்.',
    },
  },
  {
    id: 'td-inscriptions',
    from: 'TD/IMG_0322.JPG',
    to: 'gallery/tamil-development/inscriptions.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'A gallery of Tamil inscriptions on display, with explanatory panels.',
      ta: 'விளக்கப் பலகைகளுடன் காட்சிக்கு வைக்கப்பட்டுள்ள தமிழ்க் கல்வெட்டுகளின் கூடம்.',
    },
  },
  {
    id: 'td-museum-artefact',
    from: 'TD/6N3A0521.JPG',
    to: 'gallery/tamil-development/museum-artefact.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Examining a carved artefact on display in a museum gallery.',
      ta: 'அருங்காட்சியகக் கூடத்தில் காட்சிக்கு வைக்கப்பட்டுள்ள செதுக்கப்பட்ட தொல்பொருளை ஆய்தல்.',
    },
  },
  {
    id: 'td-cultural-programme',
    from: 'TD/6N3A0464.JPG',
    to: 'gallery/tamil-development/cultural-programme.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Performers in traditional dress at a cultural programme, photographed with officials.',
      ta: 'பண்பாட்டு நிகழ்ச்சி ஒன்றில் பாரம்பரிய உடையணிந்த கலைஞர்கள், அலுவலர்களுடன்.',
    },
  },
  {
    id: 'td-awards',
    from: 'TD/6N3A0350.JPG',
    to: 'gallery/tamil-development/awards.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'A certificate being presented at a Tamil Development Department function.',
      ta: 'தமிழ் வளர்ச்சித் துறை நிகழ்வில் சான்றிதழ் வழங்கப்படும் காட்சி.',
    },
  },
  {
    id: 'td-heritage-walk',
    from: 'TD/IMG_0191.JPG',
    to: 'gallery/tamil-development/heritage-walk.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Officials walking a heritage site during a field inspection.',
      ta: 'கள ஆய்வின்போது பாரம்பரியக் களத்தில் நடந்து செல்லும் அலுவலர்கள்.',
    },
  },

  /* ---------------------------------------------------------------- *
   * INFORMATION & PUBLICITY GALLERY
   * ---------------------------------------------------------------- */
  {
    id: 'dipr-press-microphones',
    from: 'Tndipr/MLJ10101.JPG',
    to: 'gallery/information-publicity/press-microphones.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Speaking to reporters at a bank of television news microphones.',
      ta: 'தொலைக்காட்சி செய்தி ஒலிவாங்கிகளின் முன் செய்தியாளர்களிடம் பேசுதல்.',
    },
  },
  {
    id: 'dipr-press-scrum',
    from: 'Tndipr/6N3A1200.JPG',
    to: 'gallery/information-publicity/press-scrum.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'A press interaction with reporters and camera crews gathered closely around.',
      ta: 'செய்தியாளர்களும் ஒளிப்பதிவுக் குழுவினரும் சூழ்ந்திருக்க நடைபெறும் பத்திரிகைச் சந்திப்பு.',
    },
  },
  {
    id: 'dipr-photo-archive',
    from: 'Tndipr/6N3A1074.JPG',
    to: 'gallery/information-publicity/photo-archive.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Viewing framed archival photographs displayed along a departmental corridor.',
      ta: 'துறை நடைபாதையில் காட்சிப்படுத்தப்பட்டுள்ள சட்டமிட்ட ஆவணப் புகைப்படங்களைப் பார்வையிடுதல்.',
    },
  },
  {
    id: 'dipr-archival-display',
    from: 'Tndipr/6N3A1082.JPG',
    to: 'gallery/information-publicity/archival-display.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'An archival photographic display being examined during a departmental visit.',
      ta: 'துறை ஆய்வின்போது பார்வையிடப்படும் ஆவணப் புகைப்படக் காட்சி.',
    },
  },
  {
    id: 'dipr-book-exhibition',
    from: 'Tndipr/6N3A3610.JPG',
    to: 'gallery/information-publicity/book-exhibition.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Books on display at a public exhibition stall.',
      ta: 'பொதுக் கண்காட்சி அரங்கில் காட்சிக்கு வைக்கப்பட்டுள்ள நூல்கள்.',
    },
  },
  {
    id: 'dipr-book-stall',
    from: 'Tndipr/6N3A3566.JPG',
    to: 'gallery/information-publicity/book-stall.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Visiting a bookstall at a public event, with shelves of Tamil titles.',
      ta: 'தமிழ் நூல்கள் அடுக்கப்பட்ட அலமாரிகளுடன், பொது நிகழ்வில் ஒரு நூல் அரங்கைப் பார்வையிடுதல்.',
    },
  },
  {
    id: 'dipr-press-conference',
    from: 'Tndipr/MLJ10902.JPG',
    to: 'gallery/information-publicity/press-conference.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'A seated press conference with officials behind a table of microphones.',
      ta: 'ஒலிவாங்கிகள் நிறைந்த மேசையின் பின் அலுவலர்கள் அமர்ந்திருக்கும் செய்தியாளர் சந்திப்பு.',
    },
  },
  {
    id: 'dipr-media-gathering',
    from: 'Tndipr/IMG_0546.JPG',
    to: 'gallery/information-publicity/media-gathering.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Media crews assembled under a canopy ahead of an official announcement.',
      ta: 'அலுவல்முறை அறிவிப்புக்கு முன் பந்தலின் கீழ் திரண்டிருக்கும் ஊடகக் குழுவினர்.',
    },
  },

  /* ---------------------------------------------------------------- *
   * EGMORE GALLERY
   * ---------------------------------------------------------------- */
  {
    id: 'egmore-site-review',
    from: 'EGMORE/IMG_0108.JPG',
    to: 'gallery/egmore/site-review.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Reviewing plans with officials on a constituency street during a works inspection.',
      ta: 'பணி ஆய்வின்போது தொகுதித் தெருவில் அலுவலர்களுடன் வரைபடங்களைப் பரிசீலித்தல்.',
    },
  },
  {
    id: 'egmore-public-facility',
    from: 'EGMORE/IMG_0042.JPG',
    to: 'gallery/egmore/public-facility.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Inside a newly built public sanitation facility in the constituency.',
      ta: 'தொகுதியில் புதிதாகக் கட்டப்பட்ட பொதுக் கழிப்பிட வசதியின் உட்புறம்.',
    },
  },
  {
    id: 'egmore-petitions',
    from: 'EGMORE/AJ001716.JPG',
    to: 'gallery/egmore/petitions.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Receiving written petitions from residents during a constituency visit.',
      ta: 'தொகுதி வருகையின்போது மக்களிடமிருந்து எழுத்துப்பூர்வ மனுக்களைப் பெறுதல்.',
    },
  },
  {
    id: 'egmore-doorstep',
    from: 'EGMORE/_LJ15306.JPG',
    to: 'gallery/egmore/doorstep.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Kneeling to speak with an elderly resident at the roadside.',
      ta: 'சாலையோரத்தில் முதியவர் ஒருவருடன் மண்டியிட்டு உரையாடுதல்.',
    },
  },
  {
    id: 'egmore-community-meal',
    from: 'EGMORE/MLJ10183.JPG',
    to: 'gallery/egmore/community-meal.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Serving food to residents at a community meal in the constituency.',
      ta: 'தொகுதியில் நடைபெற்ற சமூக உணவு வழங்கல் நிகழ்வில் மக்களுக்கு உணவு பரிமாறுதல்.',
    },
  },
  {
    id: 'egmore-inauguration',
    from: 'EGMORE/IMG_0031.JPG',
    to: 'gallery/egmore/inauguration.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Cutting the ribbon at the opening of a completed civic work.',
      ta: 'நிறைவடைந்த பொதுப்பணி ஒன்றின் திறப்பு விழாவில் நாடா வெட்டுதல்.',
    },
  },
  {
    id: 'egmore-street-meeting',
    from: 'EGMORE/_LJ15362.JPG',
    to: 'gallery/egmore/street-meeting.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'Meeting residents in a narrow residential lane in the constituency.',
      ta: 'தொகுதியின் குறுகிய குடியிருப்புத் தெருவில் மக்களைச் சந்தித்தல்.',
    },
  },
  {
    id: 'egmore-public-gathering',
    from: 'EGMORE/AJ001706.JPG',
    to: 'gallery/egmore/public-gathering.webp',
    width: 1400,
    aspect: [3, 2],
    alt: {
      en: 'A crowd of residents gathered during a walk through the constituency.',
      ta: 'தொகுதி வலம் வரும்போது திரண்டிருக்கும் பொதுமக்கள்.',
    },
  },
];
