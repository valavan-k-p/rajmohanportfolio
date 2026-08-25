'use client';
import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function FurtherResearch({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'The source material identifies specific areas requiring further documentation to present a complete constituency profile:',
      item1: 'Infrastructure projects Rajmohan has announced for Egmore.',
      item2: 'How Egmore residents have reacted to his education initiatives.',
      note: 'Further documentation required. Research pending.',
    },
    ta: {
      p1: 'முழுமையான தொகுதி விவரக்குறிப்பை வழங்குவதற்கு, மேலும் ஆவணப்படுத்தல் தேவைப்படும் குறிப்பிட்ட பகுதிகளை ஆதாரப் பொருள் அடையாளம் காட்டுகிறது:',
      item1: 'எழும்பூருக்காக ராஜ்மோகன் அறிவித்துள்ள உள்கட்டமைப்புத் திட்டங்கள்.',
      item2: 'அவரது கல்வி முன்முயற்சிகளுக்கு எழும்பூர் குடியிருப்பாளர்கள் எவ்வாறு பதிலளித்துள்ளனர்.',
      note: 'மேலும் ஆவணப்படுத்தல் தேவை. ஆராய்ச்சி நிலுவையில் உள்ளது.',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="max-w-4xl mx-auto text-center">
      <MlaStaggerItem>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl text-charcoal-800 mb-10 font-light"
        >
          {content.p1}
        </motion.p>
      </MlaStaggerItem>
      
      <MlaStaggerItem>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative text-lg text-charcoal-700 mb-16 text-left bg-white p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-sand-200 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-maroon-900 pointer-events-none">
            <Sparkles size={120} />
          </div>
          
          <div className="space-y-8 relative z-10">
            {[content.item1, content.item2].map((item, idx) => (
              <motion.div 
                key={idx}
                initial="rest"
                whileHover="hover"
                className="flex items-start gap-6 group/item cursor-default p-4 rounded-xl hover:bg-sand-50 transition-colors duration-300"
              >
                <motion.div 
                  variants={{
                    rest: { rotate: 0, scale: 1, backgroundColor: '#fdfbf7', color: '#9b2c2c' },
                    hover: { rotate: 10, scale: 1.1, backgroundColor: '#fff5f5', color: '#c53030' }
                  }}
                  className="shrink-0 w-12 h-12 rounded-full border border-red-100 flex items-center justify-center font-display text-xl shadow-sm"
                >
                  {idx + 1}
                </motion.div>
                <motion.div
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 6 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 mt-2 flex items-center gap-4"
                >
                  <span className="group-hover/item:text-charcoal-900 transition-colors">{item}</span>
                  <motion.div
                    variants={{
                      rest: { opacity: 0, x: -10 },
                      hover: { opacity: 1, x: 0 }
                    }}
                    className="text-red-500"
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </MlaStaggerItem>

      <MlaStaggerItem>
        <motion.div 
          animate={{ 
            boxShadow: ["0 0 0 0 rgba(220, 38, 38, 0)", "0 0 0 8px rgba(220, 38, 38, 0.1)", "0 0 0 0 rgba(220, 38, 38, 0)"] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block px-8 py-4 border border-red-200 text-maroon-700 uppercase tracking-widest text-sm font-medium rounded-full bg-white relative overflow-hidden group"
        >
          <motion.div 
            className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className="relative z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {content.note}
          </span>
        </motion.div>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}
