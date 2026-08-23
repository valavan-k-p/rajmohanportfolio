'use client';

import type { InfoSectionProps } from './InfoTypes';
import { InfoLatest } from './InfoLatest';
import { InfoPressReleases } from './InfoPressReleases';
import { InfoMinisterStatements } from './InfoMinisterStatements';
import { InfoGovCommunication } from './InfoGovCommunication';
import { InfoMedia } from './InfoMedia';
import { InfoPublications } from './InfoPublications';
import { InfoVideo } from './InfoVideo';
import { InfoPhotoArchive } from './InfoPhotoArchive';
import { InfoAnnouncements } from './InfoAnnouncements';
import { PendingContent } from '@/components/content/PendingContent';

export function InfoSectionMapper({
  id,
  locale,
  inverted,
}: { id: string } & InfoSectionProps) {
  switch (id) {
    case 'latest':
      return <InfoLatest locale={locale} inverted={inverted} />;
    case 'press-releases':
      return <InfoPressReleases locale={locale} inverted={inverted} />;
    case 'statements':
      return <InfoMinisterStatements locale={locale} inverted={inverted} />;
    case 'communication':
      return <InfoGovCommunication locale={locale} inverted={inverted} />;
    case 'media':
      return <InfoMedia locale={locale} inverted={inverted} />;
    case 'publications':
      return <InfoPublications locale={locale} inverted={inverted} />;
    case 'video':
      return <InfoVideo locale={locale} inverted={inverted} />;
    case 'photo-archive':
      return <InfoPhotoArchive locale={locale} inverted={inverted} />;
    case 'announcements':
      return <InfoAnnouncements locale={locale} inverted={inverted} />;
    default:
      return <PendingContent inverted={inverted} />;
  }
}
