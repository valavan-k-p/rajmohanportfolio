import type { Locale } from '@/lib/i18n/routing';

export interface InfoSectionProps {
  readonly locale: Locale;
  readonly inverted?: boolean;
}
