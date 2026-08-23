'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function TechnicalTamilSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Flow animation
      gsap.fromTo(
        '.flow-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.flow-container',
            start: 'top 70%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="technical-tamil"
      chapterNumber="06"
      category={locale === 'ta' ? 'தொழில்நுட்பம்' : 'TECHNOLOGY'}
      title={locale === 'ta' ? 'மாறும் உலகிற்கான தமிழ்' : 'Tamil for a Changing World'}
      bgVariant="charcoal"
    >
      <div ref={containerRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <div>
          <p className="font-tamil-sans text-xl opacity-90 mb-8 leading-relaxed">
            {locale === 'ta'
              ? 'செயற்கை நுண்ணறிவு (AI), இணையப் பாதுகாப்பு, உயிரித் தொழில்நுட்பம் மற்றும் விண்வெளி அறிவியல் ஆகியவற்றிற்கான கலைச்சொற்கள் மூலம் தமிழை அடுத்த தலைமுறைக்குக் கொண்டு செல்லுதல்.'
              : 'Supporting the next generation of knowledge through technical terminology for AI, cybersecurity, biotechnology, and space science.'}
          </p>

          <div className="flow-container flex flex-col gap-4 border-l-2 border-[var(--color-tamil-gold)]/30 pl-6 mt-12">
            <FlowItem text={locale === 'ta' ? 'AI உருவாக்கம்' : 'AI Generation'} />
            <FlowItem text={locale === 'ta' ? 'மனித ஆய்வு' : 'Human Review'} />
            <FlowItem text={locale === 'ta' ? 'உண்மை சரிபார்ப்பு' : 'Fact Check'} />
            <FlowItem text={locale === 'ta' ? 'கலைச்சொல் சரிபார்ப்பு' : 'Terminology Verification'} />
            <FlowItem text={locale === 'ta' ? 'பண்பாட்டு ஆய்வு' : 'Cultural Review'} />
            <FlowItem text={locale === 'ta' ? 'வெளியீடு' : 'Publication'} isFinal />
          </div>
          
          <div className="mt-6 inline-block rounded bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-bold tracking-widest uppercase text-white/50">
            {locale === 'ta' ? 'முன்மொழியப்பட்ட கட்டமைப்பு' : 'PROPOSED FRAMEWORK'}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-lg border border-[var(--color-tamil-red)]/30 bg-black/40">
            <h4 className="font-tamil-display text-2xl mb-4 text-[var(--color-tamil-gold)]">
              {locale === 'ta' ? 'அரசு உள்ளடக்கத்தில் AI சிக்கல்கள்' : 'AI in Government Content'}
            </h4>
            <p className="font-tamil-sans opacity-80 text-sm leading-relaxed mb-6">
              {locale === 'ta'
                ? 'AI உருவாக்கும் தமிழ் உள்ளடக்கங்களில் உள்ள பிழைகள் மற்றும் பண்பாட்டுத் தவறுகளை ஆய்வு செய்து சீரமைக்கும் பணிகள் துறை அளவில் கவனிக்கப்படுகின்றன.'
                : 'Addressing the governance concern of AI-generated content accuracy. Implementing scrutiny directions to ensure technical terminology and cultural precision are maintained in digital administrative outputs.'}
            </p>
            <div className="inline-block rounded bg-[var(--color-tamil-red)]/20 border border-[var(--color-tamil-red)]/50 px-2 py-1 text-[0.65rem] font-bold tracking-wider uppercase text-[var(--color-tamil-red)]">
              {locale === 'ta' ? 'அறிவிக்கப்பட்ட கொள்கை திசை' : 'CURRENT DIRECTION'}
            </div>
          </div>
        </div>

      </div>
    </TamilSection>
  );
}

function FlowItem({ text, isFinal }: { text: string; isFinal?: boolean }) {
  return (
    <div className="flow-item relative">
      <div className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ${isFinal ? 'bg-[var(--color-tamil-red)]' : 'bg-[var(--color-tamil-gold)]/50'}`} />
      <div className={`font-tamil-sans text-lg ${isFinal ? 'text-[var(--color-tamil-red)] font-bold' : 'text-white/80'}`}>
        {text}
      </div>
    </div>
  );
}
