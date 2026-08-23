import type { Locale } from '@/lib/i18n/routing';
import { EduVision } from './EduVision';
import { EduPriorities } from './EduPriorities';
import { CampusReadinessDashboard } from './CampusReadinessDashboard';
import { EduStudents } from './EduStudents';
import { EduTeachers } from './EduTeachers';
import { CurriculumWorkbench } from './CurriculumWorkbench';
import { FiscalTransparencyBoard } from './FiscalTransparencyBoard';
import { TNSparkTechLab } from './TNSparkTechLab';
import { ChronologicalStream } from './ChronologicalStream';
import { EduNews } from './EduNews';
import { EduResources } from './EduResources';

export interface EduSectionMapperProps {
  readonly sectionId: string;
  readonly locale: Locale;
}

export function EduSectionMapper({ sectionId, locale }: EduSectionMapperProps) {
  switch (sectionId) {
    case 'vision':
      return <EduVision locale={locale} />;
    case 'priorities':
      return <EduPriorities locale={locale} />;
    case 'schools':
      return <CampusReadinessDashboard locale={locale} />;
    case 'students':
      return <EduStudents locale={locale} />;
    case 'teachers':
      return <EduTeachers locale={locale} />;
    case 'curriculum':
      return <CurriculumWorkbench locale={locale} />;
    case 'infrastructure':
      return <FiscalTransparencyBoard locale={locale} />;
    case 'initiatives':
      return <TNSparkTechLab locale={locale} />;
    case 'timeline':
      return <ChronologicalStream locale={locale} />;
    case 'news':
      return <EduNews locale={locale} />;
    case 'resources':
      return <EduResources locale={locale} />;
    default:
      return <EduVision locale={locale} />;
  }
}
