import { type ReactNode } from 'react';
import clsx from 'clsx';

export interface TamilSectionProps {
  id: string;
  chapterNumber?: string;
  category?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  bgVariant?: 'paper' | 'cream' | 'red' | 'dark' | 'charcoal';
}

const BG_VARIANTS = {
  paper: 'bg-[var(--color-tamil-paper)] text-[var(--color-tamil-ink)]',
  cream: 'bg-[var(--color-tamil-white)] text-[var(--color-tamil-ink)]',
  red: 'bg-[var(--color-tamil-red)] text-white',
  dark: 'bg-[var(--color-tamil-red-deep)] text-[var(--color-tamil-paper)]',
  charcoal: 'bg-[var(--color-tamil-ink)] text-[var(--color-tamil-gold-soft)]'
};

export function TamilSection({
  id,
  chapterNumber,
  category,
  title,
  description,
  children,
  className,
  bgVariant = 'paper'
}: TamilSectionProps) {
  return (
    <section 
      id={id} 
      className={clsx(
        'relative w-full py-14 md:py-24 px-4 md:px-8 lg:px-12 overflow-hidden',
        BG_VARIANTS[bgVariant],
        className
      )}
    >
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Removed chapterNumber and category as requested */}
        
        {title && (
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-balance leading-tight">
            {title}
          </h2>
        )}
        
        {description && (
          <p className="text-lg md:text-xl max-w-2xl opacity-80 mb-12 text-pretty">
            {description}
          </p>
        )}
        
        <div className="mt-8">
          {children}
        </div>
      </div>
    </section>
  );
}
