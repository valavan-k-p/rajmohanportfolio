'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduCurriculum({ locale }: { locale: Locale }) {
  const content = {
    en: {
      col1Heading: 'Nine Revised Textbooks for Classes 1–3',
      col1P1:
        'In one of his earliest official actions in May 2026, Minister Rajmohan Arumugam released nine revised, activity-rich textbooks designed specifically for primary students in Classes 1, 2, and 3. Developed under Tamil Nadu’s revised curriculum framework, these colourful volumes mark a conscious shift away from rote memorisation toward experiential and interactive early-grade learning.',
      col1P2:
        'The curriculum integrates foundational literacy and numeracy with motor development, socio-emotional growth, moral values, and everyday life skills. The goal is to stimulate child curiosity, foster natural linguistic expression, and encourage active classroom participation from the earliest years.',
      col2Heading: 'Unwavering Commitment to the Two-Language Policy',
      col2P1:
        'Rajmohan has firmly reaffirmed Tamil Nadu’s longstanding Two-Language Policy of Tamil and English, reiterating the State’s principled position that it will not adopt the three-language formula. He has articulated that Tamil Nadu’s state-crafted educational framework is comprehensive and autonomous, publicly opposing the National Education Policy (NEP) and NEET.',
      col2P2:
        'This policy position protects the linguistic heritage and educational equity of Tamil Nadu’s students while providing competitive English language proficiency for global scientific and professional advancement.',
      statLabel: '9 Revised Textbooks Released',
      statSub: 'For Classes 1, 2 & 3 in May 2026',
      source: 'Sources: The Hindu, New Indian Express & Economic Times Education (May–June 2026)',
    },
    ta: {
      col1Heading: 'வகுப்புகள் 1–3-க்கான 9 புதிய செயல்வழிப் பாடநூல்கள்',
      col1P1:
        'மே 2026-ல் பொறுப்பேற்றதும் அமைச்சர் ராஜ்மோகன் ஆறுமுகம் 1, 2 மற்றும் 3-ஆம் வகுப்புகளுக்காக பிரத்யேகமாக வடிவமைக்கப்பட்ட 9 புதிய பாடநூல்களை வெளியிட்டார். தமிழ்நாடு பள்ளிக் கல்வித்துறையின் மாற்றியமைக்கப்பட்ட பாடத்திட்டத்தின் கீழ் உருவாக்கப்பட்ட இந்த வண்ணமயமான நூல்கள், வெறும் மனப்பாட முறையிலிருந்து விடுபட்டு செயல்வழிக் கற்றலுக்கு வழிகோலுகின்றன.',
      col1P2:
        'அடிப்படை எழுத்தறிவு மற்றும் எண்ணறிவோடு சேர்த்து, குழந்தைகளின் உடல் இயக்கம், சமூக-உணர்ச்சி மேம்பாடு, நற்பண்புகள் மற்றும் வாழ்க்கைத் திறன்களை வளர்ப்பதே இதன் நோக்கம். ஆரம்ப வகுப்புகளிலேயே குழந்தைகளின் இயல்பான மொழித்திறனையும் வகுப்பறை ஈடுபாட்டையும் இது ஊக்குவிக்கிறது.',
      col2Heading: 'இருமொழிக் கொள்கையில் உறுதியான நிலைப்பாடு',
      col2P1:
        'தமிழ்நாட்டின் வரலாற்றுச் சிறப்புமிக்க தமிழ்-ஆங்கிலம் என்ற இருமொழிக் கொள்கையில் அரசு உறுதியாக உள்ளது என்றும், மும்மொழிக் கொள்கையை ஒருபோதும் ஏற்க மாட்டோம் என்றும் அமைச்சர் திட்டவட்டமாகத் தெரிவித்தார். மாநிலக் கல்வித் திட்டம் தன்னாட்சியும் போதுமான வலிமையும் கொண்டது எனக் கூறி, தேசிய கல்விக் கொள்கை (NEP) மற்றும் நீட் தேர்வை அரசு தொடர்ந்து எதிர்க்கிறது.',
      col2P2:
        'இக்கொள்கை தமிழ் மொழிப் பண்பாட்டையும் மாணவர்களின் கல்விச் சமத்துவத்தையும் பாதுகாப்பதுடன், உலகளாவிய அறிவியல் மற்றும் தொழில் துறை வளர்ச்சிக்குத் தேவையான ஆங்கிலப் புலமையையும் உறுதி செய்கிறது.',
      statLabel: '9 புதிய பாடநூல்கள் வெளியீடு',
      statSub: '1, 2, 3-ஆம் வகுப்புகளுக்கு (மே 2026)',
      source: 'ஆதாரங்கள்: தி இந்து, நியூ இந்தியன் எக்ஸ்பிரஸ் & எகனாமிக் டைம்ஸ் (மே–ஜூன் 2026)',
    },
  }[locale];

  return (
    <div className="space-y-10">
      {/* 2-Column Prose with Lead Drop Cap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Column 1: Textbooks */}
        <EduReveal className="space-y-4">
          <h3 className="font-display text-2xl text-charcoal-900 border-b border-sand-300 pb-3">
            {content.col1Heading}
          </h3>
          <p className="text-charcoal-800 text-base leading-relaxed first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-serif first-letter:text-maroon-700 first-letter:leading-none">
            {content.col1P1}
          </p>
          <p className="text-charcoal-700 text-base leading-relaxed">
            {content.col1P2}
          </p>
        </EduReveal>

        {/* Column 2: Language Policy */}
        <EduReveal delay={0.1} className="space-y-4">
          <h3 className="font-display text-2xl text-charcoal-900 border-b border-sand-300 pb-3">
            {content.col2Heading}
          </h3>
          <p className="text-charcoal-800 text-base leading-relaxed">
            {content.col2P1}
          </p>
          <p className="text-charcoal-700 text-base leading-relaxed">
            {content.col2P2}
          </p>
        </EduReveal>
      </div>

      {/* Curriculum Summary Band */}
      <EduReveal delay={0.15} className="bg-white p-6 border border-sand-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-display text-3xl text-charcoal-900">
            {content.statLabel}
          </div>
          <div className="text-sm text-charcoal-600 font-sans">
            {content.statSub}
          </div>
        </div>
        <div className="text-xs text-charcoal-500 font-mono text-right">
          {content.source}
        </div>
      </EduReveal>
    </div>
  );
}
