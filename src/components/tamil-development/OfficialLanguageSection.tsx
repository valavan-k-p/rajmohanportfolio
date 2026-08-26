'use client';

import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function OfficialLanguageSection({ locale }: { locale: Locale }) {
  return (
    <TamilSection
      id="official-language"
      chapterNumber="03"
      category={locale === 'ta' ? 'அரசு நிர்வாகம்' : 'ADMINISTRATION'}
      title={locale === 'ta' ? 'ஆட்சி மொழியாக தமிழ்' : 'Tamil as an Official Language'}
      description={
        locale === 'ta' 
          ? 'தமிழ்நாடு ஆட்சி மொழி சட்டம், 1956 அடிப்படையில் நிர்வாகத்தில் தமிழ். அரசு அலுவலக ஆய்வுகள், ஊழியர் விழிப்புணர்வு, மற்றும் நிர்வாக கலைச்சொற்கள்.' 
          : 'Rooted in the Tamil Nadu Official Language Act, 1956. Driving implementation through government office inspections, employee training, and administrative terminology.'
      }
      bgVariant="cream"
    >
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Image block with hover zoom */}
        <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-2xl">
          <img 
            src="/images/tamil-development/kalvettu.png" 
            alt="Official Language Inscription"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out hover:scale-105"
          />
        </div>

        {/* Content Details */}
        <div className="flex flex-col gap-8">
          <InfoBlock 
            title={locale === 'ta' ? 'ஆய்வுகள்' : 'Inspections'}
            text={locale === 'ta' ? 'அரசு அலுவலகங்களில் தமிழ் பயன்பாட்டை உறுதி செய்தல்.' : 'Ensuring the use of Tamil in government offices and boards.'}
          />
          <InfoBlock 
            title={locale === 'ta' ? 'பயிற்சி' : 'Training & Awareness'}
            text={locale === 'ta' ? 'அரசு ஊழியர்களுக்கு ஆட்சி மொழி சட்டப் பயிற்சி.' : 'Equipping employees with administrative terminology and Official Language Act awareness.'}
          />
          <InfoBlock 
            title={locale === 'ta' ? 'மொழிபெயர்ப்பு' : 'Translation'}
            text={locale === 'ta' ? 'சட்டங்கள், விதிகள் மற்றும் அரசு ஆணைகளை மொழிபெயர்த்தல்.' : 'Translating central acts, state rules, and ordinances into accessible Tamil.'}
          />
        </div>
      </div>
    </TamilSection>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-l-2 border-[var(--color-tamil-red)] pl-6">
      <h3 className="font-tamil-sans text-xl font-bold mb-2">{title}</h3>
      <p className="opacity-75">{text}</p>
    </div>
  );
}
