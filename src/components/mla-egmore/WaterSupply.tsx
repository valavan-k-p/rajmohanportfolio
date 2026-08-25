'use client';
import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';
import { motion } from 'motion/react';
import { Droplets } from 'lucide-react';

export function WaterSupply({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Water quality and supply remain significant everyday concerns for residents in various parts of Egmore. Addressing these issues requires continuous monitoring and incremental improvements rather than single, one-off projects.',
      p2: 'Following complaints regarding unclean drinking water, the constituency office has prioritised direct interventions to ensure water safety and reliability.',
      interventionsHeading: 'Incremental Improvements:',
      interventions: [
        'On-site checks with Metrowater officials.',
        'Addressing tests that showed chlorine levels below prescribed limits.',
        'Calls for better and more consistent chlorination.',
        'Pipeline repairs to prevent contamination.',
        'Regular water-quality monitoring across affected areas.',
      ],
      note: 'These efforts represent a response to everyday quality-of-life concerns, aiming to improve basic civic maintenance through sustained pressure on municipal bodies.',
    },
    ta: {
      p1: 'எழும்பூரின் பல்வேறு பகுதிகளில் வசிக்கும் மக்களுக்கு நீரின் தரம் மற்றும் வழங்கல் ஆகியவை அன்றாட முக்கிய கவலைகளாகத் தொடர்கின்றன. இந்தப் பிரச்சினைகளைத் தீர்ப்பதற்கு, ஒற்றை, ஒரு முறைத் திட்டங்களைக் காட்டிலும் தொடர்ச்சியான கண்காணிப்பு மற்றும் படிப்படியான மேம்பாடுகள் தேவைப்படுகின்றன.',
      p2: 'சுத்தமற்ற குடிநீர் தொடர்பான புகார்களைத் தொடர்ந்து, குடிநீர் பாதுகாப்பையும் நம்பகத்தன்மையையும் உறுதி செய்வதற்கான நேரடித் தலையீடுகளுக்குத் தொகுதி அலுவலகம் முன்னுரிமை அளித்துள்ளது.',
      interventionsHeading: 'படிப்படியான மேம்பாடுகள்:',
      interventions: [
        'குடிநீர் வழங்கல் வாரிய அதிகாரிகளுடன் கள ஆய்வுகள்.',
        'பரிந்துரைக்கப்பட்ட அளவை விடக் குறைவாக குளோரின் இருப்பதை காட்டிய சோதனைகள் மீது நடவடிக்கை.',
        'சிறந்த மற்றும் சீரான குளோரினேஷனுக்கான அழைப்புகள்.',
        'மாசுபடுவதைத் தடுக்கக் குழாய் பழுதுபார்ப்பு.',
        'பாதிக்கப்பட்ட பகுதிகளில் வழக்கமான நீர்த் தரக் கண்காணிப்பு.',
      ],
      note: 'இந்த முயற்சிகள் அன்றாட வாழ்க்கைத் தரக் கவலைகளுக்கான பதிலைக் குறிக்கின்றன, இது நகராட்சி அமைப்புகள் மீதான தொடர்ச்சியான அழுத்தத்தின் மூலம் அடிப்படை குடிமைப் பராமரிப்பை மேம்படுத்துவதை நோக்கமாகக் கொண்டுள்ளது.',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="prose prose-lg text-charcoal-800 prose-headings:font-display prose-headings:font-normal">
      <MlaStaggerItem><p>{content.p1}</p></MlaStaggerItem>
      <MlaStaggerItem><p>{content.p2}</p></MlaStaggerItem>
      
      <MlaStaggerItem><h3 className="text-2xl mt-12 mb-6 text-maroon-900">{content.interventionsHeading}</h3></MlaStaggerItem>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose mb-12">
        {content.interventions.map((item, index) => (
          <MlaStaggerItem key={index} y={30}>
            <motion.div
              initial="rest"
              whileHover="hover"
              className="group relative p-6 md:p-8 bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden flex flex-col h-full cursor-default"
            >
              {/* Blue gradient hover background tailored for water theme */}
              <motion.div 
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-br from-[#f0f9ff] to-transparent pointer-events-none"
              />
              
              <div className="relative z-10 mb-6">
                <motion.div
                  variants={{
                    rest: { scale: 1, rotate: 0, backgroundColor: '#f0f9ff', color: '#0284c7' },
                    hover: { scale: 1.15, rotate: -10, backgroundColor: '#e0f2fe', color: '#0369a1' }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center border border-[#bae6fd]"
                >
                  <Droplets size={24} />
                </motion.div>
              </div>
              
              <motion.div
                variants={{ rest: { y: 0 }, hover: { y: -4 } }}
                transition={{ duration: 0.3 }}
                className="relative z-10 mt-auto"
              >
                <p className="text-lg text-charcoal-800 leading-snug font-medium group-hover:text-charcoal-900 transition-colors break-words hyphens-auto">
                  {item}
                </p>
              </motion.div>
            </motion.div>
          </MlaStaggerItem>
        ))}
      </div>

      <MlaStaggerItem y={20}>
        <motion.div 
          whileHover={{ x: 8 }}
          className="mt-8 p-6 bg-sand-50 rounded-xl border-l-4 border-maroon-500 shadow-sm"
        >
          <p className="text-lg text-charcoal-700 italic m-0">
            {content.note}
          </p>
        </motion.div>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}

