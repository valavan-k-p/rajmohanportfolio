import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function Navbar() {
  const t = await getTranslations('site');

  return (
    <header className="absolute left-0 top-0 z-50 w-full px-gutter pt-4 pb-2 flex items-center justify-between pointer-events-none">
      <div className="mx-auto w-full max-w-[1920px] pointer-events-auto flex justify-center">
        <Link 
          href="/" 
          className="flex flex-col items-center justify-center font-display text-charcoal-900 no-underline transition-opacity hover:opacity-70 drop-shadow-sm text-center"
        >
          {t('name').split('·').map((part, index) => (
            <span 
              key={index} 
              className={index === 0 ? "text-h3 leading-none text-maroon-700" : "text-2xl mt-1.5 leading-none text-yellow-600"}
            >
              {part.trim()}
            </span>
          ))}
        </Link>
      </div>
    </header>
  );
}
