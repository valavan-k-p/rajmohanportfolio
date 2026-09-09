import { cn } from '@/lib/cn';
import { IDENTITY } from '@/config/site';
import type { Locale } from '@/lib/i18n/routing';

/**
 * THE NAME LOCKUP
 *
 * Client handwritten note 1.2 — "Rajmohan Name font size (Designation)" — asks
 * for the name and the designation to belong to one typographic system. They
 * are therefore both set in `--font-display` and differ only in size, weight
 * and tracking. Nothing here may introduce a second family.
 *
 * Because they are one record in `IDENTITY`, they also cannot drift apart as
 * the designation is revised.
 */
export function Lockup({
  locale,
  size = 'md',
  showDesignation = true,
  className,
}: {
  locale: Locale;
  size?: 'sm' | 'md' | 'lg';
  showDesignation?: boolean;
  className?: string;
}) {
  const name = size === 'sm' ? IDENTITY.shortName[locale] : IDENTITY.name[locale];

  return (
    <span className={cn('flex flex-col justify-center', className)}>
      <span
        className={cn(
          'font-display font-semibold leading-tight tracking-[-0.015em]',
          size === 'sm' && 'text-[1.0625rem]',
          size === 'md' && 'text-[1.25rem]',
          size === 'lg' && 'text-display',
        )}
      >
        {name}
      </span>

      {showDesignation ? (
        <span
          className={cn(
            // Same family as the name — only the weight, size and tracking change.
            'font-display font-normal text-ink-muted',
            size === 'lg'
              ? 'mt-md text-lead leading-snug'
              : 'mt-[0.15rem] text-caption leading-tight',
          )}
        >
          {IDENTITY.designation[locale]}
        </span>
      ) : null}
    </span>
  );
}
