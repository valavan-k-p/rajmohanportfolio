'use client';
import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem, MlaReveal, MlaHoverCard } from './MlaMotion';
import { motion } from 'motion/react';
import { MessageCircle, MapPin, Smartphone } from 'lucide-react';

export function GrievanceRedressal({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Rajmohan’s office serves as a first point of contact for residents with civic complaints, aiming to bridge the gap between citizens and municipal authorities.',
      meetingsTitle: 'Ward-Level Meetings & Inspections',
      meetingsBody: 'Inspections are frequently conducted following resident complaints and media reports. For example, in Arian Lane, Vepery, inspections were conducted with Greater Chennai Corporation officials, and immediate de-siltation and periodic maintenance were directed for stormwater drains.',
      digitalTitle: 'Digital Grievance Channel',
      digitalBody: 'A dedicated WhatsApp line is intended for residents to register complaints concerning garbage, streetlights, drains, and roads. The office tracks these complaints and follows up with the respective Greater Chennai Corporation departments.',
      whatsappLabel: 'WhatsApp Complaint Line',
      whatsappNumber: '99409 40405',
    },
    ta: {
      p1: 'ராஜ்மோகனின் அலுவலகம், குடிமைப் புகார்களைக் கொண்ட குடியிருப்பாளர்களுக்கான முதல் தொடர்புப் புள்ளியாகச் செயல்படுகிறது. இது குடிமக்களுக்கும் நகராட்சி அதிகாரிகளுக்கும் இடையிலான இடைவெளியைக் குறைப்பதை நோக்கமாகக் கொண்டுள்ளது.',
      meetingsTitle: 'வார்டு அளவிலான கூட்டங்கள் & ஆய்வுகள்',
      meetingsBody: 'குடியிருப்பாளர்களின் புகார்கள் மற்றும் ஊடக அறிக்கைகளைத் தொடர்ந்து அடிக்கடி ஆய்வுகள் நடத்தப்படுகின்றன. உதாரணமாக, வேப்பேரி ஆரியன் லேனில், பெருநகர சென்னை மாநகராட்சி அதிகாரிகளுடன் ஆய்வுகள் மேற்கொள்ளப்பட்டன, மேலும் மழைநீர் வடிகால்களை உடனடியாகத் தூர்வாரவும், அவ்வப்போது பராமரிக்கவும் உத்தரவிடப்பட்டது.',
      digitalTitle: 'டிஜிட்டல் குறை தீர்க்கும் வழிமுறை',
      digitalBody: 'குப்பை, தெருவிளக்குகள், வடிகால்கள் மற்றும் சாலைகள் தொடர்பான புகார்களைப் பதிவு செய்ய, குடியிருப்பாளர்களுக்காக ஒரு பிரத்யேக வாட்ஸ்அப் எண் வழங்கப்பட்டுள்ளது. அலுவலகம் இந்தப் புகார்களைக் கண்காணித்து, அந்தந்த பெருநகர சென்னை மாநகராட்சித் துறைகளுடன் பின்தொடர்கிறது.',
      whatsappLabel: 'வாட்ஸ்அப் புகார் எண்',
      whatsappNumber: '99409 40405',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-24 items-start relative">
      
      {/* 1. Background ambient blob animation */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-300/40 rounded-full blur-[80px] -z-10 pointer-events-none"
      />

      <MlaStaggerContainer className="text-charcoal-800 z-10">
        {/* 2. Slide-in entrance for the lead paragraph */}
        <MlaStaggerItem>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl leading-relaxed mb-16 font-light text-maroon-900 border-l-4 border-red-500 pl-6 bg-gradient-to-r from-red-50/50 to-transparent py-4"
          >
            {content.p1}
          </motion.p>
        </MlaStaggerItem>
        
        <div className="space-y-12">
          {/* Section 1 */}
          <MlaStaggerItem y={30}>
            {/* 3. Interactive content block with spring motion */}
            <motion.div 
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-default"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="p-3 bg-sand-100 rounded-full text-maroon-700 shadow-sm group-hover:bg-red-50 transition-colors duration-300"
                >
                  <MapPin size={24} />
                </motion.div>
                <h3 className="text-2xl font-display relative inline-block text-charcoal-900 group-hover:text-maroon-800 transition-colors">
                  {content.meetingsTitle}
                  {/* 4. Expanding underline on hover */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 transition-all duration-500 ease-out group-hover:w-full" />
                </h3>
              </div>
              <p className="text-lg text-charcoal-700 leading-relaxed pl-16">
                {content.meetingsBody}
              </p>
            </motion.div>
          </MlaStaggerItem>

          {/* Section 2 */}
          <MlaStaggerItem y={30}>
            <motion.div 
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-default"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  className="p-3 bg-sand-100 rounded-full text-maroon-700 shadow-sm group-hover:bg-red-50 transition-colors duration-300"
                >
                  <Smartphone size={24} />
                </motion.div>
                <h3 className="text-2xl font-display relative inline-block text-charcoal-900 group-hover:text-maroon-800 transition-colors">
                  {content.digitalTitle}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 transition-all duration-500 ease-out group-hover:w-full" />
                </h3>
              </div>
              <p className="text-lg text-charcoal-700 leading-relaxed pl-16">
                {content.digitalBody}
              </p>
            </motion.div>
          </MlaStaggerItem>
        </div>
      </MlaStaggerContainer>

      {/* The WhatsApp Card */}
      <MlaStaggerItem className="relative z-20 lg:sticky lg:top-32" y={40}>
        <MlaHoverCard>
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/80 backdrop-blur-md p-8 md:p-10 border border-sand-200 rounded-2xl shadow-[0_15px_40px_-10px_rgba(138,115,163,0.15)] text-center relative overflow-hidden group hover:shadow-[0_20px_50px_-10px_rgba(138,115,163,0.25)] transition-shadow duration-500"
          >
            {/* Sliding background gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-sand-100/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Top decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 group-hover:w-full group-hover:opacity-100 transition-all duration-700 ease-out" />
            
            <div className="relative z-10">
              {/* 5. Infinite floating icon */}
              <motion.div 
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 text-[#25D366] shadow-inner ring-4 ring-white"
              >
                <MessageCircle size={32} strokeWidth={2.5} />
              </motion.div>

              <div className="text-sm uppercase tracking-widest text-maroon-700 font-medium mb-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {content.whatsappLabel}
              </div>
              
              <MlaReveal scale={0.9} delay={0.2} y={10}>
                <div className="font-display text-3xl lg:text-4xl text-charcoal-900 tracking-wider font-bold group-hover:text-maroon-900 transition-colors duration-300">
                  {content.whatsappNumber}
                </div>
              </MlaReveal>

              <motion.a 
                href="https://wa.me/919940940405"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3.5 bg-charcoal-900 text-white rounded-full text-sm font-medium hover:bg-[#25D366] transition-colors duration-300 w-full flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                <span>Message Now</span>
              </motion.a>
            </div>
          </motion.div>
        </MlaHoverCard>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}
