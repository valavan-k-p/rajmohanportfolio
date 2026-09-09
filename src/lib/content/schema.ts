import type { Bilingual, Verification } from './types';
import type { Source } from './source';
import type { PortalId } from '@/config/portals';

/**
 * CONTENT COLLECTIONS
 *
 * Every collection shares three guarantees:
 *
 *  1. Text is `Bilingual`. A single-language string cannot be expressed, so a
 *     Tamil page can never fall back to an English paragraph.
 *  2. Factual records carry a `Source` and a `Verification`. `unverified`
 *     never reaches production (see `isPublishable`).
 *  3. Numbers are `string | null`, never `number`. `null` renders an em dash,
 *     not a zero. This is the fix for the live site's counters rendering `0`.
 */

/** Department a record belongs to. Mirrors the four portals. */
export type Department = PortalId;

export interface BaseRecord {
  readonly id: string;
  readonly slug: string;
  readonly verification: Verification;
  readonly source: Source;
  readonly published: boolean;
  /** Draft → Review → Approved → Published → Archived. For the future CMS. */
  readonly workflowStatus?: 'draft' | 'review' | 'approved' | 'published' | 'archived';
}

/* -------------------------------------------------------------------------- *
 * NEWS
 * -------------------------------------------------------------------------- */

export type NewsCategory =
  | 'students'
  | 'teachers'
  | 'schools'
  | 'programmes'
  | 'department'
  | 'language'
  | 'literature'
  | 'culture'
  | 'press'
  | 'constituency'
  | 'assembly'
  | 'development';

export interface NewsItem extends BaseRecord {
  readonly title: Bilingual;
  readonly summary: Bilingual;
  /** Full body, as an ordered list of blocks. Absent for link-out items. */
  readonly body?: readonly ProseBlock[];
  /** ISO date. */
  readonly date: string;
  readonly category: NewsCategory;
  readonly department: Department;
  readonly image?: ImageRef;
  readonly featured?: boolean;
}

/** A body is composed, not a blob of HTML — so Tamil and English stay paired. */
export type ProseBlock =
  | { readonly kind: 'paragraph'; readonly text: Bilingual }
  | { readonly kind: 'heading'; readonly text: Bilingual }
  | { readonly kind: 'list'; readonly items: readonly Bilingual[] }
  | { readonly kind: 'quote'; readonly text: Bilingual; readonly attribution: Bilingual }
  | { readonly kind: 'image'; readonly image: ImageRef };

/* -------------------------------------------------------------------------- *
 * DOCUMENTS
 * One shape for every official paper. The `documentType` drives which archive
 * it appears in — /school-education/go, /documents, and so on.
 * -------------------------------------------------------------------------- */

export type DocumentType =
  | 'government-order'
  | 'proceeding'
  | 'press-release'
  | 'press-note'
  | 'announcement'
  | 'budget'
  | 'publication'
  | 'policy-note';

export const DOCUMENT_TYPE_LABEL: Readonly<Record<DocumentType, Bilingual>> = {
  'government-order': { en: 'Government Order', ta: 'அரசு ஆணை' },
  proceeding: { en: 'Proceeding', ta: 'செயல்முறை ஆணை' },
  'press-release': { en: 'Press Release', ta: 'செய்திக்குறிப்பு' },
  'press-note': { en: 'Press Note', ta: 'பத்திரிகைக் குறிப்பு' },
  announcement: { en: 'Announcement', ta: 'அறிவிப்பு' },
  budget: { en: 'Budget', ta: 'நிதிநிலை அறிக்கை' },
  publication: { en: 'Publication', ta: 'வெளியீடு' },
  'policy-note': { en: 'Policy Note', ta: 'கொள்கை விளக்கக் குறிப்பு' },
};

export interface DocumentRecord extends BaseRecord {
  readonly title: Bilingual;
  readonly documentType: DocumentType;
  /** G.O. (Ms.) No. 123 — exactly as printed. Absent if the paper is unnumbered. */
  readonly documentNumber?: string;
  /** ISO date on the document. */
  readonly date: string;
  readonly department: Department;
  readonly summary: Bilingual;
  /**
   * Path or URL to the PDF. Absent when the office holds no file — the row
   * then renders without View/Download rather than linking to nothing.
   */
  readonly documentUrl?: string;
  readonly pageCount?: number;
  /** Which languages the document itself exists in. */
  readonly languages: readonly ('en' | 'ta')[];
}

/* -------------------------------------------------------------------------- *
 * PROJECTS
 * -------------------------------------------------------------------------- */

export type ProjectStatus = 'announced' | 'in-progress' | 'completed' | 'ongoing';

export const PROJECT_STATUS_LABEL: Readonly<Record<ProjectStatus, Bilingual>> = {
  announced: { en: 'Announced', ta: 'அறிவிக்கப்பட்டது' },
  'in-progress': { en: 'In progress', ta: 'பணி நடைபெறுகிறது' },
  completed: { en: 'Completed', ta: 'நிறைவடைந்தது' },
  ongoing: { en: 'Ongoing', ta: 'தொடர்ந்து நடைபெறுகிறது' },
};

export type ProjectCategory =
  | 'roads'
  | 'water'
  | 'drainage'
  | 'schools'
  | 'public-spaces'
  | 'infrastructure'
  | 'environment'
  | 'housing';

export interface ProjectRecord extends BaseRecord {
  readonly title: Bilingual;
  readonly location: Bilingual;
  readonly department: Department;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly summary: Bilingual;
  /** Case-study fields. Present on flagship projects, absent on routine works. */
  readonly problem?: Bilingual;
  readonly intervention?: Bilingual;
  readonly impact?: Bilingual;
  readonly images: readonly ImageRef[];
  readonly date: string;
  readonly featured?: boolean;
}

/* -------------------------------------------------------------------------- *
 * MEDIA
 * -------------------------------------------------------------------------- */

export interface ImageRef {
  readonly src: string;
  /** Intrinsic size, so every <Image> reserves its box and never shifts. */
  readonly width: number;
  readonly height: number;
  readonly alt: Bilingual;
  readonly blurDataURL?: string;
}

export type GalleryCategory =
  | 'schools'
  | 'students'
  | 'teachers'
  | 'infrastructure'
  | 'events'
  | 'programmes'
  | 'official-visits'
  | 'books'
  | 'literary'
  | 'awards'
  | 'cultural'
  | 'conferences'
  | 'research'
  | 'archival'
  | 'press-conferences'
  | 'government-events'
  | 'public-events'
  | 'media'
  | 'constituency'
  | 'development-works'
  | 'community';

export interface GalleryImage extends BaseRecord {
  readonly title: Bilingual;
  readonly image: ImageRef;
  readonly date?: string;
  readonly location?: Bilingual;
  readonly category: GalleryCategory;
  readonly department: Department;
  readonly album?: string;
}

export interface GalleryAlbum {
  readonly id: string;
  readonly slug: string;
  readonly title: Bilingual;
  readonly description?: Bilingual;
  readonly department: Department;
  readonly cover: ImageRef;
  readonly date?: string;
}

export interface VideoRecord extends BaseRecord {
  readonly title: Bilingual;
  readonly summary?: Bilingual;
  readonly date: string;
  readonly department: Department;
  /** Canonical watch URL on the official channel. Never an embed-only id. */
  readonly url: string;
  readonly thumbnail?: ImageRef;
  readonly duration?: string;
}

/* -------------------------------------------------------------------------- *
 * PUBLICATIONS — the client's "Book design content"
 * -------------------------------------------------------------------------- */

export type PublicationCategory =
  | 'classical'
  | 'literature'
  | 'research'
  | 'reference'
  | 'translation'
  | 'lexicon'
  | 'department';

export interface Publication extends BaseRecord {
  readonly title: Bilingual;
  readonly author?: Bilingual;
  readonly year?: string;
  readonly category: PublicationCategory;
  readonly description: Bilingual;
  readonly publisher?: Bilingual;
  readonly cover?: ImageRef;
  readonly documentUrl?: string;
}

/* -------------------------------------------------------------------------- *
 * CONSTITUENCY
 * -------------------------------------------------------------------------- */

export interface Ward {
  readonly id: string;
  /** Ward number as the corporation numbers it. String — never arithmetic. */
  readonly number: string;
  readonly name?: Bilingual;
  readonly zone?: Bilingual;
  readonly areas: readonly Bilingual[];
  readonly councillor?: Councillor;
  readonly verification: Verification;
  readonly source?: Source;
}

export interface Councillor {
  readonly name: Bilingual;
  readonly party?: Bilingual;
  readonly office?: Bilingual;
  readonly verification: Verification;
  readonly source?: Source;
}

/* -------------------------------------------------------------------------- *
 * METRICS
 *
 * The single most dangerous content type on the site. `value` is a string so
 * "44,527" stays formatted as its source formats it, and `null` is a first
 * class state meaning "we do not have this number" — rendered as an em dash,
 * never as 0.
 * -------------------------------------------------------------------------- */

export interface Metric {
  readonly id: string;
  readonly label: Bilingual;
  readonly value: string | null;
  readonly unit?: Bilingual;
  /** What the number actually counts. Required — a bare number is not a fact. */
  readonly measures: Bilingual;
  readonly asOf?: string;
  readonly verification: Verification;
  readonly source?: Source;
}

/* -------------------------------------------------------------------------- *
 * PEOPLE
 * -------------------------------------------------------------------------- */

export interface Person {
  readonly id: string;
  readonly name: Bilingual;
  readonly designation: Bilingual;
  readonly portrait?: ImageRef;
  readonly verification: Verification;
  readonly source?: Source;
}
