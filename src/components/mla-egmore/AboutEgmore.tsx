'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { SectionProps } from './SectionMapper';
import { Building2, MapPin, Users, CheckCircle, ArrowRight, Sparkles, Shield, Landmark } from 'lucide-react';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

export function AboutEgmore({ locale }: SectionProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();
  const isTa = locale === 'ta';

  const content = {
    en: {
      kicker: 'CONSTITUENCY PROFILE & MANDATE',
      title: 'Governance & Urban Transformation in Egmore',
      lead: 'Rajmohan Arumugam assumed office as the Member of Legislative Assembly for Egmore (SC) in May 2026, spearheading grassroots urban renewal, public grievance resolution, and modern educational transformation while handling statewide cabinet portfolios.',
      tabs: [
        {
          id: 'mandate',
          num: '01',
          title: 'The Mandate',
          subtitle: 'Electoral Victory & Vision',
          icon: Landmark,
          badge: 'Cabinet Leadership',
        },
        {
          id: 'priorities',
          num: '02',
          title: 'Civic Priorities',
          subtitle: 'Tenement Upgrades & Works',
          icon: MapPin,
          badge: 'Infrastructure Focus',
        },
        {
          id: 'presence',
          num: '03',
          title: 'Active Presence',
          subtitle: 'Ground Audits & Redressal',
          icon: Users,
          badge: 'Citizen Accountability',
        },
      ],
      p1: 'Rajmohan Arumugam’s tenure as the Member of the Legislative Assembly (MLA) for Egmore (SC) began in May 2026, following his decisive victory in the Tamil Nadu Assembly elections.',
      p2: 'Representing the Tamilaga Vettri Kazhagam (TVK), he assumed office amid public expectations for urban renewal, improved civic amenities, and stronger representation for a constituency that had long been a DMK stronghold.',
      p3: 'His role encompasses a strategic dual responsibility: directly addressing grassroots civic and infrastructure demands in Egmore while concurrently executing statewide responsibilities as a senior cabinet minister overseeing School Education, Information & Publicity, and Tamil Development.',
      p4: 'From the beginning of his tenure, constituency work has prioritised addressing long-standing civic concerns highlighted by residents during the 2026 election campaign.',
      concernsHeading: 'Key Focus Areas & Tenement Clusters:',
      concerns: [
        { area: 'Thattankulam', task: 'Better housing tenements & basic sanitation' },
        { area: 'Thideer Nagar', task: 'Upgraded housing facilities & drainage' },
        { area: 'Natesan Nagar', task: 'Modernised civic infrastructure & water supply' },
        { area: 'All Eligible Wards', task: 'Expedited issuance of land pattas' },
        { area: 'Otteri & Choolai', task: 'Stormwater drain modernisation & flood gates' },
        { area: 'Periamet & Vepery', task: 'Road relaying & sewer network overhauls' },
        { area: 'Egmore High Road', task: 'Pedestrian safety & commercial traffic management' },
        { area: 'Pudupet Wards', task: 'Drinking water pipeline chlorination monitoring' },
      ],
      p5: 'His MLA office coordinates on-ground inspections with Greater Chennai Corporation (GCC), Metrowater, and state nodal agencies to ensure time-bound execution.',
      presenceHeading: 'Constituency Outreach & Accountability Channels:',
      presence: [
        { title: 'Weekly Public Grievance Meetings', desc: 'Direct face-to-face hearings with constituency residents and community representatives.' },
        { title: 'Ward-Level Field Interactions', desc: 'On-site inspections of municipal works across all constituent corporation wards.' },
        { title: 'Surprise Civic & Drainage Audits', desc: 'Unannounced monitoring of desiltation and monsoon readiness works.' },
        { title: 'Follow-up on Stalled Works', desc: 'Institutional review meetings with GCC and Metrowater executive engineers.' },
        { title: 'Dedicated Citizen WhatsApp Desk', desc: 'Real-time digital logging and resolution of civic complaints with SLA tracking.' },
      ],
      sourceNote: 'Official Egmore Constituency Records & Legislative Documentation (2026)',
    },
    ta: {
      kicker: 'தொகுதி விவரக்குறிப்பு & மக்கள் ஆணை',
      title: 'எழும்பூரில் நிர்வாகம் மற்றும் நகர்ப்புற மறுமலர்ச்சி',
      lead: 'மே 2026-ல் எழும்பூர் (தனி) தொகுதி சட்டமன்ற உறுப்பினராகப் பொறுப்பேற்ற ராஜ்மோகன் ஆறுமுகம், நகர்ப்புற மேம்பாடு, மக்கள் குறைதீர்ப்பு மற்றும் நவீன பள்ளிக் கல்வி மாற்றங்களை முன்னெடுத்து வருகிறார்.',
      tabs: [
        {
          id: 'mandate',
          num: '01',
          title: 'மக்கள் ஆணை',
          subtitle: 'தேர்தல் வெற்றி & பார்வை',
          icon: Landmark,
          badge: 'அமைச்சரவைத் தலைமை',
        },
        {
          id: 'priorities',
          num: '02',
          title: 'குடிமை முன்னுரிமைகள்',
          subtitle: 'குடியிருப்புகள் & உள்கட்டமைப்பு',
          icon: MapPin,
          badge: 'திட்டப் பணிகள்',
        },
        {
          id: 'presence',
          num: '03',
          title: 'களப்பணி & அணுகல்',
          subtitle: 'நேரடி ஆய்வுகள் & குறைதீர்ப்பு',
          icon: Users,
          badge: 'மக்கள் பொறுப்புக்கூறல்',
        },
      ],
      p1: 'ராஜ்மோகன் ஆறுமுகம் மே 2026-ல் நடைபெற்ற தமிழ்நாடு சட்டமன்றத் தேர்தலில் வெற்றி பெற்று எழும்பூர் (தனி) தொகுதி சட்டமன்ற உறுப்பினராகத் தனது பணியைத் தொடங்கினார்.',
      p2: 'தமிழக வெற்றிக் கழகத்தை (TVK) பிரதிநிதித்துவப்படுத்தி, நீண்ட காலமாக திமுகவின் கோட்டையாக இருந்த தொகுதியில் நகர்ப்புற மறுமலர்ச்சி, மேம்பட்ட குடிமை வசதிகள் மற்றும் தீவிர மக்கள் பிரதிநிதித்துவத்தை முன்னெடுக்கப் பொறுப்பேற்றார்.',
      p3: 'தொகுதி அளவிலான வளர்ச்சித் தேவைகளை நிவர்த்தி செய்வதோடு, மூத்த அமைச்சரவை அமைச்சராக பள்ளிக் கல்வி, செய்தி மற்றும் விளம்பரம் மற்றும் தமிழ் வளர்ச்சித் துறைகளைக் கையாளும் இரட்டைப் பொறுப்பை அவர் கொண்டுள்ளார்.',
      p4: 'தனது பதவிக்காலத்தின் தொடக்கத்திலிருந்தே, 2026 தேர்தல் பிரச்சாரத்தின் போது எழுப்பப்பட்ட நீண்டகாலக் குடிமைக் கவலைகளைத் தீர்ப்பதில் அவர் தீவிர கவனம் செலுத்தி வருகிறார்.',
      concernsHeading: 'முக்கிய இலக்குப் பகுதிகள் & குடியிருப்புகள்:',
      concerns: [
        { area: 'தட்டன்குளம்', task: 'மேம்பட்ட வீட்டுவசதி குடியிருப்புகள் & சுகாதார வசதிகள்' },
        { area: 'திடீர் நகர்', task: 'குடியிருப்பு வசதிகள் மற்றும் வடிகால் மேம்பாடு' },
        { area: 'நடேசன் நகர்', task: 'குடியிருப்பு உட்கட்டமைப்பு & சீரான குடிநீர்' },
        { area: 'அனைத்து வார்டுகள்', task: 'தகுதியான குடும்பங்களுக்குப் பட்டா வழங்குதல்' },
        { area: 'ஓட்டேரி & சூளை', task: 'மழைநீர் வடிகால்களை நவீனமயமாக்குதல்' },
        { area: 'பெரியமேடு & வேப்பேரி', task: 'சாலைப் புனரமைப்பு & கழிவுநீர் கட்டமைப்பு' },
        { area: 'எழும்பூர் சாலை', task: 'பாதசாரிகள் பாதுகாப்பு & போக்குவரத்து ஒழுங்கு' },
        { area: 'புதுப்பேட்டை', task: 'குடிநீர்த் தரப் பரிசோதனை மற்றும் குழாய் சீரமைப்பு' },
      ],
      p5: 'சென்னை மாநகராட்சி மற்றும் குடிநீர் வழங்கல் வாரிய அதிகாரிகளுடன் நேரடியாகக் களத்தில் ஒருங்கிணைந்து உள்கட்டமைப்புப் பணிகளுக்கு முன்னுரிமை அளித்து வருகிறார்.',
      presenceHeading: 'தொகுதி மக்கள் தொடர்பு வழிமுறைகள்:',
      presence: [
        { title: 'வாராந்திர மக்கள் குறைதீர்க்கும் கூட்டங்கள்', desc: 'தொகுதி மக்களுடன் நேரடிச் சந்திப்புகள் மற்றும் மனுக்கள் மீது துரித நடவடிக்கை.' },
        { title: 'வார்டு அளவிலான மக்கள் சந்திப்புகள்', desc: 'அனைத்து மாநகராட்சி வார்டுகளிலும் களப் பணிகளின் நேரடிப் பார்வை.' },
        { title: 'திடீர் கள ஆய்வுகள் & தணிக்கை', desc: 'மழைநீர் வடிகால் தூர்வாருதல் மற்றும் பருவமழை முன்னெச்சரிக்கைப் பணிகள் ஆய்வு.' },
        { title: 'நிலுவைத் திட்டங்கள் மீதான கண்காணிப்பு', desc: 'மாநகராட்சி மற்றும் குடிநீர் வாரியப் பொறியாளர்களுடன் ஒருங்கிணைப்புக் கூட்டங்கள்.' },
        { title: 'வாட்ஸ்அப் உதவி எண் வழியாக உடனடித் தீர்வு', desc: 'குடிமைப் புகார்களைப் பதிவு செய்து காலவரையறைக்குள் தீர்வு காணும் கட்டமைப்பு.' },
      ],
      sourceNote: 'அதிகாரப்பூர்வ தொகுதி ஆவணங்கள் & சட்டமன்றப் பதிவுகள் (2026)',
    },
  }[locale];
  return (
    <div className="space-y-8">
      {/* 1. Hero Dossier Statement Card */}
      <div className="bg-maroon-800/50 backdrop-blur-sm border border-maroon-500/30 border-l-4 border-l-yellow-400 p-6 sm:p-8 md:p-10 rounded-sm shadow-lg relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-yellow-400 font-bold">
            {content.kicker}
          </span>
        </div>
        <p className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] text-white font-normal leading-[1.3] tracking-tight relative z-10">
          {content.lead}
        </p>
      </div>

      {/* 2. Three Interactive Dossier Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {content.tabs.map((tab, idx) => {
          const isActive = activeTab === idx;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              type="button"
              className={`text-left p-6 border rounded-sm transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                isActive
                  ? 'bg-white border-maroon-700 shadow-md ring-2 ring-maroon-700/10'
                  : 'bg-sand-50/60 border-sand-300/80 hover:bg-white hover:border-sand-400 shadow-2xs hover:shadow-sm'
              }`}
            >
              {/* Active / Hover Maroon Top Accent Stripe */}
              <div
                className={`absolute top-0 left-0 w-full h-[4px] transition-transform duration-300 ${
                  isActive ? 'bg-maroon-700 scale-x-100' : 'bg-sand-300 scale-x-0 group-hover:scale-x-100'
                }`}
              />

              <div className="flex items-center justify-between mb-6">
                <span
                  className={`font-mono text-xs font-bold px-2.5 py-1 border rounded-2xs transition-colors ${
                    isActive
                      ? 'bg-maroon-700 text-white border-maroon-700 shadow-2xs'
                      : 'bg-sand-100 text-maroon-700 border-sand-300'
                  }`}
                >
                  SEC · {tab.num}
                </span>

                <div
                  className={`p-2 rounded-full transition-colors ${
                    isActive ? 'bg-maroon-700/10 text-maroon-700' : 'bg-sand-100 text-charcoal-500 group-hover:text-charcoal-700'
                  }`}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-maroon-700 font-bold block mb-1">
                  {tab.badge}
                </span>
                <h3
                  className={`font-display text-2xl sm:text-3xl font-bold leading-tight transition-colors ${
                    isActive ? 'text-charcoal-900' : 'text-charcoal-700 group-hover:text-charcoal-900'
                  }`}
                >
                  {tab.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-charcoal-500 mt-1.5 leading-snug">
                  {tab.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. High-Contrast Tab Content Canvas */}
      <div className="bg-white border border-sand-300 p-6 sm:p-8 md:p-12 rounded-sm shadow-xs relative">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="tab-mandate"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
              transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
              className="space-y-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
                <span className="font-mono text-xs font-bold text-maroon-700 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-maroon-700" />
                  {isTa ? '01 · மக்கள் ஆணை & அரசியல் பின்னணி' : '01 · ELECTORAL MANDATE & POLITICAL CONTEXT'}
                </span>
                <span className="font-mono text-xs text-charcoal-500">
                  MAY 2026 GENERAL ELECTIONS
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 space-y-5 text-charcoal-700 font-sans text-base sm:text-lg leading-relaxed">
                  <p>{content.p1}</p>
                  <p>{content.p2}</p>
                </div>

                <div className="lg:col-span-5 bg-sand-50/90 border border-sand-300 border-t-2 border-t-maroon-700 p-6 sm:p-8 rounded-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-maroon-700 font-mono text-xs font-bold uppercase tracking-wider">
                      <Shield size={16} />
                      <span>{isTa ? 'இரட்டைப் பொறுப்பு' : 'Dual Responsibility Matrix'}</span>
                    </div>
                    <p className="text-charcoal-700 text-sm sm:text-base leading-relaxed pt-1">
                      {content.p3}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-sand-200 text-xs font-mono text-charcoal-500 flex items-center justify-between">
                    <span>STATUS: ACTIVE MANDATE</span>
                    <span className="font-bold text-maroon-700">16TH TN ASSEMBLY</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="tab-priorities"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
              transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
              className="space-y-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
                <span className="font-mono text-xs font-bold text-maroon-700 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-maroon-700" />
                  {isTa ? '02 · குடியிருப்பு உள்கட்டமைப்பு & குடிமைப் பணிகள்' : '02 · TENEMENT UPGRADES & INFRASTRUCTURE PRIORITIES'}
                </span>
                <span className="font-mono text-xs text-charcoal-500">
                  WARD-LEVEL CAPITAL WORKS
                </span>
              </div>

              <p className="text-charcoal-700 font-sans text-base sm:text-lg leading-relaxed max-w-3xl">
                {content.p4}
              </p>

              <div>
                <h4 className="font-mono text-xs font-bold text-maroon-700 uppercase tracking-widest mb-4">
                  {content.concernsHeading}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {content.concerns.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-sand-50/80 p-5 border border-sand-300 rounded-xs flex flex-col justify-between hover:border-maroon-700/60 hover:bg-white transition-all shadow-2xs group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-maroon-700 uppercase tracking-wide">
                            {item.area}
                          </span>
                          <span className="text-charcoal-400 font-medium">0{idx + 1}</span>
                        </div>
                        <p className="text-sm font-sans text-charcoal-700 leading-snug pt-1">
                          {item.task}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-sand-200 text-[11px] font-mono text-emerald-800 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>{isTa ? 'செயல்பாட்டில்' : 'In Progress'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="tab-presence"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
              transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
              className="space-y-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
                <span className="font-mono text-xs font-bold text-maroon-700 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-maroon-700" />
                  {isTa ? '03 · நேரடிக் கள ஆய்வுகள் & மக்கள் தொடர்பு' : '03 · ACTIVE FIELD INSPECTIONS & PUBLIC ACCOUNTABILITY'}
                </span>
                <span className="font-mono text-xs text-charcoal-500">
                  REAL-TIME CITIZEN ACCESS
                </span>
              </div>

              <p className="text-charcoal-800 font-sans text-base sm:text-lg leading-relaxed max-w-3xl">
                {content.p5}
              </p>

              <div>
                <h4 className="font-mono text-xs font-bold text-maroon-700 uppercase tracking-widest mb-4">
                  {content.presenceHeading}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.presence.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-sand-50/90 p-5 sm:p-6 border border-sand-300 rounded-xs flex flex-col justify-between hover:border-maroon-700/60 hover:bg-white transition-all shadow-2xs"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 text-maroon-700">
                          <CheckCircle size={18} className="shrink-0 text-maroon-700" />
                          <h5 className="font-display text-lg sm:text-xl font-bold text-charcoal-950 leading-snug">
                            {item.title}
                          </h5>
                        </div>
                        <p className="text-sm font-sans text-charcoal-700 leading-relaxed pl-7">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-sand-200 pl-7 text-[11px] font-mono text-charcoal-500">
                        MONITORED WEEKLY
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sourcing Footnote */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal-500 font-mono border-t border-sand-300">
        <span>{content.sourceNote}</span>
        <span className="text-maroon-700 font-bold uppercase tracking-wider">
          {isTa ? 'எழும்பூர் சட்டமன்ற உறுப்பினர் அலுவலகம்' : 'Egmore MLA Office · Public Ledger'}
        </span>
      </div>
    </div>
  );
}

