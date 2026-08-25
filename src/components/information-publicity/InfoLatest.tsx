'use client';

import type { InfoSectionProps } from './InfoTypes';
import { ArrowUpRight, ShieldCheck, Share2, Award } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  InfoCard,
  InfoStaggerContainer,
  InfoStaggerItem,
  InfoCounter,
  CINEMATIC_EASE,
} from './InfoMotion';

export function InfoLatest({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-8">
      {/* 3-Column Newsroom Grid with 2-Column Lead Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Lead Story: Featured focal card (Double-width) */}
        <InfoCard
          direction="up"
          delay={0.05}
          showTopLine={true}
          topLineColor="bg-maroon-700"
          className="lg:col-span-8 bg-sand-50/90 border border-sand-300 border-l-4 border-l-maroon-700 p-6 sm:p-8 md:p-10 rounded-sm flex flex-col justify-between shadow-xs hover:border-sand-400 hover:shadow-md transition-shadow"
        >
          <div className="space-y-5">
            {/* Badges & Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-maroon-700 text-white font-mono text-xs font-bold px-2.5 py-1 uppercase tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                {isTa ? 'சமீபத்திய அறிவிப்பு' : 'LATEST DISPATCH'}
              </span>
              <span className="text-xs text-charcoal-600 font-mono font-medium">
                {isTa ? 'ஆகஸ்ட் 2026' : 'AUGUST 2026'} · DIPR-IID-01
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-charcoal-950 font-bold leading-tight tracking-tight">
              {isTa
                ? 'தமிழ்நாடு உண்மை சரிபார்ப்பு பிரிவு "தகவல் ஒருமைப்பாடு பிரிவு (IID)" என மறுபெயரிடப்பட்டு மறுசீரமைப்பு'
                : 'Tamil Nadu Reconstitutes Fact Check Unit as "Information Integrity Desk (IID)"'}
            </h3>

            {/* Description */}
            <p className="text-charcoal-800 text-base sm:text-lg leading-relaxed font-sans font-normal">
              {isTa
                ? 'தவறான தகவல்கள் மற்றும் போலியான செய்திகளை முறியடிக்க, குரு (குரு தலைவா) தலைமையில் புதிய தகவல் ஒருமைப்பாடு பிரிவு அமைக்கப்பட்டுள்ளது. வெளிப்படைத்தன்மை மற்றும் கணக்குத்தன்மையை உறுதி செய்ய டிக்கெட் அடிப்படையிலான கண்காணிப்பு முறை அமல்படுத்தப்பட்டுள்ளது.'
                : 'To counter online disinformation and manipulated content, the government has overhauled its fact-checking apparatus under the leadership of Guru (Guru Thalaiva). A new ticket-based tracking mechanism guarantees time-bound verification and swift multi-departmental coordination.'}
            </p>

            {/* Metric / SLA Badges with Animated Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-sand-200">
              <div className="bg-white p-3.5 border border-sand-300 shadow-xs hover:border-maroon-700/60 transition-colors">
                <div className="text-[11px] text-charcoal-600 font-mono uppercase tracking-wider">
                  {isTa ? 'அதிமுக்கியத்துவம்' : 'High Priority'}
                </div>
                <div className="text-lg sm:text-xl font-bold text-maroon-700 font-display mt-0.5">
                  &lt; <InfoCounter value={1} /> {isTa ? 'மணி நேரம்' : 'Hour SLA'}
                </div>
              </div>

              <div className="bg-white p-3.5 border border-sand-300 shadow-xs hover:border-maroon-700/60 transition-colors">
                <div className="text-[11px] text-charcoal-600 font-mono uppercase tracking-wider">
                  {isTa ? 'நடுத்தர முன்னுரிமை' : 'Medium Priority'}
                </div>
                <div className="text-lg sm:text-xl font-bold text-charcoal-900 font-display mt-0.5">
                  &lt; <InfoCounter value={3} /> {isTa ? 'மணி நேரம்' : 'Hours SLA'}
                </div>
              </div>

              <div className="bg-white p-3.5 border border-sand-300 shadow-xs hover:border-maroon-700/60 transition-colors">
                <div className="text-[11px] text-charcoal-600 font-mono uppercase tracking-wider">
                  {isTa ? 'பொது முன்னுரிமை' : 'Standard'}
                </div>
                <div className="text-lg sm:text-xl font-bold text-charcoal-800 font-display mt-0.5">
                  &lt; <InfoCounter value={7} /> {isTa ? 'மணி நேரம்' : 'Hours SLA'}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Rule */}
          <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-sand-200">
            <div className="flex items-center gap-2 text-xs text-charcoal-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-maroon-700 shrink-0" />
              <span>
                {isTa
                  ? 'துறை ஒருங்கிணைப்பு வாட்ஸ்அப் நெட்வொர்க் இணைக்கப்பட்டது'
                  : 'Inter-Departmental Nodal WhatsApp Network Active'}
              </span>
            </div>

            <motion.a
              href="#communication"
              whileHover={prefersReducedMotion ? {} : { x: 3 }}
              transition={{ duration: 0.2, ease: CINEMATIC_EASE }}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-maroon-700 hover:text-maroon-900 font-bold transition-colors group"
            >
              <span>{isTa ? 'முழு விபரம் வாசிக்க' : 'Read Full Architecture'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>
        </InfoCard>

        {/* Secondary Column: Stacked items with Stagger Orchestration */}
        <InfoStaggerContainer className="lg:col-span-4 flex flex-col gap-6" stagger={0.12}>
          {/* Sub-item 1: Social Media Desk */}
          <InfoStaggerItem
            direction="right"
            showTopLine={true}
            topLineColor="bg-[#c5a059]"
            className="p-6 sm:p-7 bg-sand-100/90 border border-sand-300 rounded-sm flex-1 flex flex-col justify-between shadow-2xs hover:shadow-sm hover:border-sand-400 transition-all group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-maroon-700 font-bold uppercase tracking-wider">
                  {isTa ? 'அமைப்பு மாற்றம்' : 'DIPR RESTRUCTURING'}
                </span>
                <span className="text-xs text-charcoal-500 font-mono">08/2026</span>
              </div>
              <h4 className="font-display text-xl text-charcoal-900 font-bold leading-snug group-hover:text-maroon-800 transition-colors">
                {isTa
                  ? 'DIPR கீழ் 6 அடுக்கு பிரத்யேக சமூக ஊடக பிரிவு அமைப்பு'
                  : 'Dedicated 6-Tier Social Media Desk Established Under DIPR'}
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                {isTa
                  ? 'திவ்யா சிறப்பு அதிகாரியாக நியமிக்கப்பட்டு உள்ளடக்க தர பரிசோதனை மற்றும் அதிகாரப்பூர்வ சமூக ஊடக வெளியீடுகள் மேற்பார்வையிடப்படுகின்றன.'
                  : 'Special Officer Dhivya oversees quality clearance across digital platforms, supported by senior writers, designers, and coordinators.'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-sand-200 flex items-center justify-between text-xs text-charcoal-600">
              <span className="font-mono">{isTa ? '6 நிலை செயலாக்கக் கட்டமைப்பு' : '6-Tier Operational Hierarchy'}</span>
              <Share2 className="w-3.5 h-3.5 text-maroon-700 group-hover:rotate-12 transition-transform" />
            </div>
          </InfoStaggerItem>

          {/* Sub-item 2: Governance Achievements Defense */}
          <InfoStaggerItem
            direction="right"
            showTopLine={true}
            topLineColor="bg-maroon-700"
            className="p-6 sm:p-7 bg-white border border-sand-300 rounded-sm flex-1 flex flex-col justify-between shadow-xs hover:shadow-sm hover:border-sand-400 transition-all group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-charcoal-600 font-semibold uppercase tracking-wider">
                  {isTa ? 'கொள்கை & சாதனை' : 'GOVERNANCE UPDATE'}
                </span>
                <span className="text-xs text-charcoal-500 font-mono">08/2026</span>
              </div>
              <h4 className="font-display text-xl text-charcoal-900 font-bold leading-snug group-hover:text-maroon-800 transition-colors">
                {isTa
                  ? 'அரசு செயல்பாடுகள் மீதான விமர்சனங்களுக்கு அமைச்சர் ராஜமோகன் பதிலடி'
                  : 'Minister Rajmohan Rebuts Criticism with Tangible Governance Milestones'}
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                {isTa
                  ? '717 டாஸ்மாக் கடைகள் மூடல், தியாகிகள் ஓய்வூதிய உயர்வு மற்றும் ஊழல் தடுப்பு நடவடிக்கைகள் மக்கள் விரும்புவதை மெய்ப்பித்துள்ளன என திட்டவட்டம்.'
                  : 'Highlights closure of 717 TASMAC liquor shops, enhanced freedom fighters’ pensions, and aggressive anti-corruption drives.'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-sand-200 flex items-center justify-between text-xs text-charcoal-600">
              <span className="font-mono">{isTa ? 'அமைச்சர் உரை' : 'Ministerial Briefing'}</span>
              <Award className="w-3.5 h-3.5 text-maroon-700 group-hover:scale-110 transition-transform" />
            </div>
          </InfoStaggerItem>
        </InfoStaggerContainer>
      </div>
    </div>
  );
}
