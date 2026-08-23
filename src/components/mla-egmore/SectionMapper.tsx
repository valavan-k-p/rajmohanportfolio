import { PendingContent } from '@/components/content/PendingContent';
import { AboutEgmore } from './AboutEgmore';
import { MlaAtAGlance } from './MlaAtAGlance';
import { ConstituencyPriorities } from './ConstituencyPriorities';
import { NeerEzhilPalli } from './NeerEzhilPalli';
import { EducationInitiatives } from './EducationInitiatives';
import { AssemblyExperience } from './AssemblyExperience';
import { AssemblyChallenges } from './AssemblyChallenges';
import { CivicWork } from './CivicWork';
import { GrievanceRedressal } from './GrievanceRedressal';
import { HousingRegularisation } from './HousingRegularisation';
import { StormwaterDrains } from './StormwaterDrains';
import { WaterSupply } from './WaterSupply';
import { ConstraintsCriticism } from './ConstraintsCriticism';
import { OverallAssessment } from './OverallAssessment';
import { FurtherResearch } from './FurtherResearch';
import type { Locale } from '@/lib/i18n/routing';

export interface SectionProps {
  readonly locale: Locale;
  readonly inverted?: boolean;
}

export function SectionMapper({ id, locale, inverted }: { id: string } & SectionProps) {
  switch (id) {
    case 'about-egmore':
      return <AboutEgmore locale={locale} inverted={inverted} />;
    case 'mla-at-a-glance':
      return <MlaAtAGlance locale={locale} inverted={inverted} />;
    case 'constituency-priorities':
      return <ConstituencyPriorities locale={locale} inverted={inverted} />;
    case 'neer-ezhil-palli':
      return <NeerEzhilPalli locale={locale} inverted={inverted} />;
    case 'education-initiatives':
      return <EducationInitiatives locale={locale} inverted={inverted} />;
    case 'assembly-experience':
      return <AssemblyExperience locale={locale} inverted={inverted} />;
    case 'assembly-challenges':
      return <AssemblyChallenges locale={locale} inverted={inverted} />;
    case 'civic-work':
      return <CivicWork locale={locale} inverted={inverted} />;
    case 'grievance-redressal':
      return <GrievanceRedressal locale={locale} inverted={inverted} />;
    case 'housing-regularisation':
      return <HousingRegularisation locale={locale} inverted={inverted} />;
    case 'stormwater-drains':
      return <StormwaterDrains locale={locale} inverted={inverted} />;
    case 'water-supply':
      return <WaterSupply locale={locale} inverted={inverted} />;
    case 'constraints-criticism':
      return <ConstraintsCriticism locale={locale} inverted={inverted} />;
    case 'overall-assessment':
      return <OverallAssessment locale={locale} inverted={inverted} />;
    case 'further-research':
      return <FurtherResearch locale={locale} inverted={inverted} />;
    default:
      return <PendingContent inverted={inverted} />;
  }
}
