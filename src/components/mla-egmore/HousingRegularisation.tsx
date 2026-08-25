'use client';
import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function HousingRegularisation({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Housing remains a central civic demand in Egmore. The constituency profile details ongoing policy-level commitments aimed at addressing settlement issues rather than completed large-scale projects at this stage.',
      listHeading: 'Key Policy Commitments:',
      list: [
        'Regularisation of settlements where feasible.',
        'Allotment of tenements within or near the constituency to avoid relocating residents to distant suburbs.',
        'Enumeration of eligible families.',
        'Issuance of pattas where possible.',
        'Advocacy for additional housing board and slum clearance tenements.',
      ],
      locationsHeading: 'Focus Areas:',
      locations: [
        'Thattankulam',
        'Thideer Nagar',
        'Natesan Nagar',
      ],
      note: 'Note: The source explicitly describes these interventions primarily as policy-level commitments and ongoing processes rather than completed infrastructure projects.',
    },
    ta: {
      p1: 'வீட்டுவசதி என்பது எழும்பூரில் ஒரு முக்கிய குடிமைத் தேவையாகத் தொடர்கிறது. நிறைவடைந்த பெரிய அளவிலான திட்டங்களைக் காட்டிலும், தற்போதைய நிலையில் குடியிருப்புகள் தொடர்பான பிரச்சினைகளைத் தீர்ப்பதை நோக்கமாகக் கொண்ட கொள்கை அளவிலான அர்ப்பணிப்புகளைத் தொகுதி விவரக்குறிப்பு விவரிக்கிறது.',
      listHeading: 'முக்கிய கொள்கை அர்ப்பணிப்புகள்:',
      list: [
        'சாத்தியமான இடங்களில் குடியிருப்புகளை முறைப்படுத்துதல்.',
        'குடியிருப்பாளர்களைத் தொலைதூரப் புறநகர்ப் பகுதிகளுக்கு மாற்றுவதைத் தவிர்க்க, தொகுதிக்கு உள்ளேயோ அல்லது அருகிலோ குடியிருப்புகளை ஒதுக்குதல்.',
        'தகுதியான குடும்பங்களைக் கணக்கெடுத்தல்.',
        'சாத்தியமான இடங்களில் பட்டா வழங்குதல்.',
        'கூடுதல் வீட்டு வசதி வாரியம் மற்றும் குடிசை மாற்று வாரிய குடியிருப்புகளுக்கான பரிந்துரை.',
      ],
      locationsHeading: 'கவனம் செலுத்தும் பகுதிகள்:',
      locations: [
        'தட்டான் குளம்',
        'திடீர் நகர்',
        'நடேசன் நகர்',
      ],
      note: 'குறிப்பு: ஆதாரமானது இந்தத் தலையீடுகளை நிறைவடைந்த உள்கட்டமைப்புத் திட்டங்களை விட, முதன்மையாகக் கொள்கை அளவிலான அர்ப்பணிப்புகள் மற்றும் தொடர்ச்சியான செயல்முறைகளாக வெளிப்படையாக விவரிக்கிறது.',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="prose prose-lg text-charcoal-800 prose-headings:font-display prose-headings:font-normal space-y-6">
      <MlaStaggerItem><p>{content.p1}</p></MlaStaggerItem>
      
      <MlaStaggerItem><h3 className="text-xl mt-8 mb-4">{content.listHeading}</h3></MlaStaggerItem>
      <ul className="space-y-4 not-prose">
        {content.list.map((item, index) => (
          <MlaStaggerItem key={index} y={15} x={0}>
            <motion.li 
              initial="rest"
              whileHover="hover"
              className="flex items-start gap-4 text-lg group cursor-default"
            >
              <motion.div
                variants={{
                  rest: { rotate: 0, scale: 1, opacity: 0.7 },
                  hover: { rotate: 180, scale: 1.25, opacity: 1 }
                }}
                transition={{ duration: 0.4, type: "spring" }}
                className="mt-1 shrink-0 text-red-600"
              >
                <Star size={18} fill="currentColor" strokeWidth={1} />
              </motion.div>
              <motion.span
                variants={{
                  rest: { x: 0 },
                  hover: { x: 6 }
                }}
                transition={{ duration: 0.3 }}
                className="leading-snug transition-colors group-hover:text-charcoal-900"
              >
                {item}
              </motion.span>
            </motion.li>
          </MlaStaggerItem>
        ))}
      </ul>

      <MlaStaggerItem><h3 className="text-xl mt-10 mb-4">{content.locationsHeading}</h3></MlaStaggerItem>
      <ul className="space-y-4 not-prose">
        {content.locations.map((item, index) => (
          <MlaStaggerItem key={index} y={15} x={0}>
            <motion.li 
              initial="rest"
              whileHover="hover"
              className="flex items-start gap-4 text-lg group cursor-default"
            >
              <motion.div
                variants={{
                  rest: { rotate: 0, scale: 1, opacity: 0.7 },
                  hover: { rotate: 180, scale: 1.25, opacity: 1 }
                }}
                transition={{ duration: 0.4, type: "spring" }}
                className="mt-1 shrink-0 text-red-600"
              >
                <Star size={18} fill="currentColor" strokeWidth={1} />
              </motion.div>
              <motion.span
                variants={{
                  rest: { x: 0 },
                  hover: { x: 6 }
                }}
                transition={{ duration: 0.3 }}
                className="leading-snug transition-colors group-hover:text-charcoal-900"
              >
                {item}
              </motion.span>
            </motion.li>
          </MlaStaggerItem>
        ))}
      </ul>

      <MlaStaggerItem>
        <div className="mt-10 p-5 bg-sand-100 border-l-4 border-red-400 text-base italic text-charcoal-700 shadow-sm rounded-r-md">
          {content.note}
        </div>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}

