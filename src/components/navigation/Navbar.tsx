import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function Navbar() {
  const t = await getTranslations('site');

  return (
    <header className="absolute left-0 top-0 z-50 w-full px-gutter pt-4 pb-2 flex items-center justify-between pointer-events-none">
      <div className="mx-auto w-full max-w-[1920px] pointer-events-auto">
        <Link 
          href="/" 
          className="font-display text-h3 text-charcoal-900 no-underline transition-opacity hover:opacity-70 drop-shadow-sm"
        >
          {t('name')}
        </Link>
      </div>
    </header>
  );
}
