import { PendingContent } from '@/components/content/PendingContent';
import type { Locale } from '@/lib/i18n/routing';

import { EduVision } from './EduVision';
import { EduPriorities } from './EduPriorities';
import { EduSchools } from './EduSchools';
import { EduStudents } from './EduStudents';
import { EduTeachers } from './EduTeachers';
import { EduCurriculum } from './EduCurriculum';
import { EduInfrastructure } from './EduInfrastructure';
import { EduInitiatives } from './EduInitiatives';
import { EduTimeline } from './EduTimeline';
import { EduNews } from './EduNews';
import { EduResources } from './EduResources';

export interface EduSectionProps {
  readonly locale: Locale;
  readonly inverted?: boolean;
}

export function EduSectionMapper({
  id,
  locale,
  inverted,
}: { id: string } & EduSectionProps) {
  switch (id) {
    case 'vision':
      return <EduVision locale={locale} />;
    case 'priorities':
      return <EduPriorities locale={locale} />;
    case 'schools':
      return <EduSchools locale={locale} />;
    case 'students':
      return <EduStudents locale={locale} />;
    case 'teachers':
      return <EduTeachers locale={locale} />;
    case 'curriculum':
      return <EduCurriculum locale={locale} />;
    case 'infrastructure':
      return <EduInfrastructure locale={locale} />;
    case 'initiatives':
      return <EduInitiatives locale={locale} />;
    case 'timeline':
      return <EduTimeline locale={locale} />;
    case 'news':
      return <EduNews locale={locale} />;
    case 'resources':
      return <EduResources locale={locale} />;
    default:
      return <PendingContent inverted={inverted} />;
  }
}
