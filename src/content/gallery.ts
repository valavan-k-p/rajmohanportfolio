import type { GalleryImage } from '@/lib/content/schema';
import type { PortalId } from '@/config/portals';
import { MEDIA, type MediaId } from './media/generated';
import { SRC_OFFICE_PHOTO } from './sources';

/**
 * THE GALLERIES
 *
 * The client asked for a gallery on every portal (handwritten notes 2 and 3).
 * These are built from the photograph library the project owner supplied, so
 * every image here is cleared for publication — nothing is scraped.
 *
 * Alt text lives with the photograph in `scripts/image-manifest.mjs` and is
 * carried through the generated media file, which is why it cannot be
 * forgotten: `ImageRef` has no optional-alt form.
 *
 * Dates and locations are omitted rather than guessed. The photographs' file
 * timestamps are not a reliable record of when an event happened, so a date is
 * only shown where the office has confirmed one.
 */

interface Entry {
  readonly media: MediaId;
  readonly title: { en: string; ta: string };
  readonly category: GalleryImage['category'];
  readonly album?: string;
}

const ENTRIES: Readonly<Record<PortalId, readonly Entry[]>> = {
  'school-education': [
    {
      media: 'cover-school-education',
      title: { en: 'School library', ta: 'பள்ளி நூலகம்' },
      category: 'schools',
      album: 'school-visits',
    },
    {
      media: 'edu-classroom-students',
      title: { en: 'Classroom visit', ta: 'வகுப்பறை ஆய்வு' },
      category: 'students',
      album: 'school-visits',
    },
    {
      media: 'edu-primary-classroom',
      title: { en: 'Primary classroom', ta: 'தொடக்கப் பள்ளி வகுப்பறை' },
      category: 'students',
      album: 'school-visits',
    },
    {
      media: 'edu-kit-distribution',
      title: { en: 'School kit distribution', ta: 'பள்ளிப் பொருள் வழங்கல்' },
      category: 'programmes',
      album: 'programmes',
    },
    {
      media: 'edu-certificates',
      title: { en: 'Certificate ceremony', ta: 'சான்றிதழ் வழங்கும் விழா' },
      category: 'events',
      album: 'programmes',
    },
    {
      media: 'edu-infrastructure',
      title: { en: 'New school block', ta: 'புதிய பள்ளிக் கட்டிடத் தொகுதி' },
      category: 'infrastructure',
      album: 'infrastructure',
    },
    {
      media: 'edu-foundation-stone',
      title: { en: 'Foundation stone laying', ta: 'அடிக்கல் நாட்டுதல்' },
      category: 'infrastructure',
      album: 'infrastructure',
    },
    {
      media: 'edu-smart-classroom',
      title: { en: 'Digital classroom', ta: 'மின்னணு வகுப்பறை' },
      category: 'programmes',
      album: 'programmes',
    },
    {
      media: 'edu-department-office',
      title: { en: 'At the department office', ta: 'துறை அலுவலகத்தில்' },
      category: 'official-visits',
      album: 'department',
    },
  ],

  'tamil-development': [
    {
      media: 'cover-tamil-development',
      title: { en: 'Museum gallery', ta: 'அருங்காட்சியகக் கூடம்' },
      category: 'cultural',
      album: 'museums',
    },
    {
      media: 'td-excavation-aerial',
      title: { en: 'Excavation site from the air', ta: 'அகழாய்வுக் களம் — வான்வழிக் காட்சி' },
      category: 'research',
      album: 'archaeology',
    },
    {
      media: 'td-excavation-site',
      title: { en: 'At the excavation trenches', ta: 'அகழாய்வு அகழிகளில்' },
      category: 'research',
      album: 'archaeology',
    },
    {
      media: 'td-rock-shelter',
      title: { en: 'Rock shelter inspection', ta: 'பாறை அடைவு ஆய்வு' },
      category: 'archival',
      album: 'archaeology',
    },
    {
      media: 'td-inscriptions',
      title: { en: 'Inscription gallery', ta: 'கல்வெட்டுக் கூடம்' },
      category: 'archival',
      album: 'museums',
    },
    {
      media: 'td-museum-artefact',
      title: { en: 'Museum artefact', ta: 'அருங்காட்சியகத் தொல்பொருள்' },
      category: 'archival',
      album: 'museums',
    },
    {
      media: 'td-cultural-programme',
      title: { en: 'Cultural programme', ta: 'பண்பாட்டு நிகழ்ச்சி' },
      category: 'cultural',
      album: 'culture',
    },
    {
      media: 'td-awards',
      title: { en: 'Departmental function', ta: 'துறை நிகழ்வு' },
      category: 'awards',
      album: 'culture',
    },
    {
      media: 'td-heritage-walk',
      title: { en: 'Heritage site inspection', ta: 'பாரம்பரியக் கள ஆய்வு' },
      category: 'research',
      album: 'archaeology',
    },
  ],

  'information-publicity': [
    {
      media: 'cover-information-publicity',
      title: { en: 'Press briefing', ta: 'செய்தியாளர் சந்திப்பு' },
      category: 'press-conferences',
      album: 'press',
    },
    {
      media: 'dipr-press-microphones',
      title: { en: 'Media interaction', ta: 'ஊடகச் சந்திப்பு' },
      category: 'press-conferences',
      album: 'press',
    },
    {
      media: 'dipr-press-scrum',
      title: { en: 'Reporters at an event', ta: 'நிகழ்வில் செய்தியாளர்கள்' },
      category: 'media',
      album: 'press',
    },
    {
      media: 'dipr-press-conference',
      title: { en: 'Departmental press conference', ta: 'துறை செய்தியாளர் சந்திப்பு' },
      category: 'press-conferences',
      album: 'press',
    },
    {
      media: 'dipr-photo-archive',
      title: { en: 'Photographic archive', ta: 'புகைப்பட ஆவணக் காப்பகம்' },
      category: 'government-events',
      album: 'archive',
    },
    {
      media: 'dipr-archival-display',
      title: { en: 'Archival display', ta: 'ஆவணக் காட்சி' },
      category: 'government-events',
      album: 'archive',
    },
    {
      media: 'dipr-book-exhibition',
      title: { en: 'Book exhibition', ta: 'நூல் கண்காட்சி' },
      category: 'public-events',
      album: 'events',
    },
    {
      media: 'dipr-book-stall',
      title: { en: 'Bookstall visit', ta: 'நூல் அரங்கு வருகை' },
      category: 'public-events',
      album: 'events',
    },
    {
      media: 'dipr-media-gathering',
      title: { en: 'Media at an official event', ta: 'அலுவல்முறை நிகழ்வில் ஊடகங்கள்' },
      category: 'media',
      album: 'events',
    },
  ],

  'mla-egmore': [
    {
      media: 'cover-egmore',
      title: { en: 'Walking the constituency', ta: 'தொகுதி வலம்' },
      category: 'constituency',
      album: 'constituency',
    },
    {
      media: 'egmore-site-review',
      title: { en: 'Works inspection', ta: 'பணி ஆய்வு' },
      category: 'development-works',
      album: 'works',
    },
    {
      media: 'egmore-public-facility',
      title: { en: 'New public facility', ta: 'புதிய பொது வசதி' },
      category: 'development-works',
      album: 'works',
    },
    {
      media: 'egmore-inauguration',
      title: { en: 'Opening a completed work', ta: 'நிறைவடைந்த பணியின் திறப்பு' },
      category: 'development-works',
      album: 'works',
    },
    {
      media: 'egmore-petitions',
      title: { en: 'Receiving petitions', ta: 'மனுக்கள் பெறுதல்' },
      category: 'community',
      album: 'people',
    },
    {
      media: 'egmore-doorstep',
      title: { en: 'Meeting a resident', ta: 'மக்களைச் சந்தித்தல்' },
      category: 'community',
      album: 'people',
    },
    {
      media: 'egmore-community-meal',
      title: { en: 'Community meal', ta: 'சமூக உணவு வழங்கல்' },
      category: 'community',
      album: 'people',
    },
    {
      media: 'egmore-street-meeting',
      title: { en: 'In a residential lane', ta: 'குடியிருப்புத் தெருவில்' },
      category: 'constituency',
      album: 'constituency',
    },
    {
      media: 'egmore-public-gathering',
      title: { en: 'Public gathering', ta: 'பொதுமக்கள் கூட்டம்' },
      category: 'events',
      album: 'constituency',
    },
  ],
};

function build(department: PortalId): GalleryImage[] {
  return ENTRIES[department].map((entry) => ({
    id: entry.media,
    slug: entry.media,
    title: entry.title,
    image: MEDIA[entry.media],
    category: entry.category,
    department,
    album: entry.album,
    source: SRC_OFFICE_PHOTO,
    verification: 'editorial',
    published: true,
    workflowStatus: 'published' as const,
  }));
}

export const GALLERY: readonly GalleryImage[] = [
  ...build('school-education'),
  ...build('tamil-development'),
  ...build('information-publicity'),
  ...build('mla-egmore'),
];

export function galleryFor(department: PortalId): GalleryImage[] {
  return GALLERY.filter((image) => image.department === department);
}
