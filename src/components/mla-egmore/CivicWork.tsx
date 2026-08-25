'use client';
import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';
import { motion } from 'motion/react';

export function CivicWork({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Egmore’s dense population, mixed residential-commercial areas, and ageing infrastructure create ongoing urban governance challenges. As one of Chennai’s oldest and most historically significant areas, balancing modern infrastructure needs with existing constraints requires constant civic attention.',
      p2: 'The constituency office has identified several key areas that require sustained intervention and coordination with various government departments.',
      concernsHeading: 'Key Civic Concerns',
      concerns: [
        'Water supply',
        'Waste management',
        'Traffic congestion',
        'Drainage',
        'Roads',
        'Flooding',
        'Housing',
        'Land regularisation',
      ],
    },
    ta: {
      p1: 'எழும்பூரின் அடர்த்தியான மக்கள் தொகை, கலவையான குடியிருப்பு-வணிகப் பகுதிகள் மற்றும் பழமையான உள்கட்டமைப்பு ஆகியவை தொடர்ச்சியான நகர்ப்புற ஆளுகை சவால்களை உருவாக்குகின்றன. சென்னையின் பழமையான மற்றும் வரலாற்று முக்கியத்துவம் வாய்ந்த பகுதிகளில் ஒன்றாக இருப்பதால், நவீன உள்கட்டமைப்பு தேவைகளை இருக்கும் கட்டுப்பாடுகளுடன் சமநிலைப்படுத்துவதற்கு தொடர்ச்சியான குடிமை கவனம் தேவைப்படுகிறது.',
      p2: 'பல்வேறு அரசுத் துறைகளுடன் தொடர்ச்சியான தலையீடு மற்றும் ஒருங்கிணைப்பு தேவைப்படும் பல முக்கிய பகுதிகளைத் தொகுதி அலுவலகம் அடையாளம் கண்டுள்ளது.',
      concernsHeading: 'முக்கிய குடிமைப் பிரச்சினைகள்',
      concerns: [
        'நீர் வழங்கல்',
        'கழிவு மேலாண்மை',
        'போக்குவரத்து நெரிசல்',
        'வடிகால் அமைப்பு',
        'சாலைகள்',
        'வெள்ளம்',
        'வீட்டுவசதி',
        'நில முறைப்படுத்தல்',
      ],
    },
  }[locale];

  return (
    <MlaStaggerContainer className="prose prose-lg text-slate-900 prose-headings:font-display prose-headings:font-normal">
      <MlaStaggerItem><p>{content.p1}</p></MlaStaggerItem>
      <MlaStaggerItem><p className="mb-10">{content.p2}</p></MlaStaggerItem>
      
      <div className="break-inside-avoid mt-2">
        <MlaStaggerItem>
          <h3 className="text-2xl mb-6 text-slate-900 tracking-wide">
            {content.concernsHeading}
          </h3>
        </MlaStaggerItem>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
          {content.concerns.map((item, index) => (
            <MlaStaggerItem key={index} y={15} x={0}>
              <motion.div 
                whileHover="hover"
                initial="rest"
                className="relative overflow-hidden border border-slate-900/60 rounded-sm p-4 flex items-center group cursor-default bg-white/40 shadow-sm"
              >
                <motion.div 
                  variants={{
                    rest: { x: '-101%' },
                    hover: { x: 0 }
                  }}
                  transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  className="absolute inset-0 bg-slate-900 z-0"
                />
                <div className="relative z-10 w-1.5 h-1.5 rotate-45 border border-slate-900/30 bg-transparent mr-4 group-hover:border-slate-200 group-hover:bg-slate-50 transition-colors duration-300" />
                <span className="relative z-10 text-sm md:text-base font-medium text-slate-900 group-hover:text-slate-50 transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            </MlaStaggerItem>
          ))}
        </div>
      </div>
    </MlaStaggerContainer>
  );
}

