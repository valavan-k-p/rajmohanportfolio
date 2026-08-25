'use client';

import type { InfoSectionProps } from './InfoTypes';
import { Play, Youtube, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  InfoReveal,
  InfoImageReveal,
  InfoStaggerContainer,
  InfoStaggerItem,
} from './InfoMotion';

interface VideoItem {
  id: string;
  titleEn: string;
  titleTa: string;
  categoryEn: string;
  categoryTa: string;
  duration: string;
  descriptionEn: string;
  descriptionTa: string;
  url: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    titleEn: 'Information Integrity Desk: 24/7 Fact-Checking Network & SLAs',
    titleTa: 'தகவல் ஒருமைப்பாடு பிரிவு: 24 மணி நேர உண்மை சரிபார்ப்பு நெட்வொர்க் விளக்கம்',
    categoryEn: 'Governance & Media',
    categoryTa: 'நிர்வாகம் & ஊடகம்',
    duration: '14:20',
    descriptionEn: 'Minister A. Rajmohan details the ticket-based tracking system and department nodal coordination against false propaganda.',
    descriptionTa: 'தவறான பிரச்சாரங்களை முறியடிக்கும் டிக்கெட் அடிப்படையிலான உண்மை சரிபார்ப்பு முறை குறித்து அமைச்சர் ஏ. ராஜமோகன் உரை.',
    url: 'https://www.youtube.com/channel/UCPWnoINnA43mptLCQH9B9qw',
  },
  {
    id: 'vid-2',
    titleEn: 'Drug Free Tamil Nadu: Statewide Youth Pledge & Mass Campaign',
    titleTa: 'போதையற்ற தமிழ்நாடு: மாநில அளவிலான இளைஞர் உறுதிமொழி மற்றும் விழிப்புணர்வு இயக்கம்',
    categoryEn: 'Public Campaign',
    categoryTa: 'மக்கள் இயக்கம்',
    duration: '08:45',
    descriptionEn: 'Comprehensive video coverage of youth rallies, school awareness drives, and district-level felicitation ceremonies.',
    descriptionTa: 'பள்ளி, கல்லூரி மாணவர்களின் போதை எதிர்ப்பு விழிப்புணர்வு பேரணிகள் மற்றும் மாவட்ட விருது வழங்கும் விழா தொகுப்பு.',
    url: 'https://www.youtube.com/channel/UCPWnoINnA43mptLCQH9B9qw',
  },
  {
    id: 'vid-3',
    titleEn: 'Chief Minister & Cabinet Address on Historic Welfare Schemes',
    titleTa: 'வரலாற்றுச் சிறப்புமிக்க மக்கள் நலத்திட்டங்கள் குறித்த முதலமைச்சரின் சிறப்புரை',
    categoryEn: 'Cabinet Keynote',
    categoryTa: 'அமைச்சரவை உரை',
    duration: '22:15',
    descriptionEn: 'Official state event coverage detailing TASMAC closures, freedom fighter pension hike, and transparent administration.',
    descriptionTa: '717 டாஸ்மாக் கடைகள் மூடல், தியாகிகள் ஓய்வூதிய உயர்வு உள்ளிட்ட முக்கிய அரசு அறிவிப்புகளின் முழுமையான ஒளிப்பதிவு.',
    url: 'https://www.youtube.com/channel/UCPWnoINnA43mptLCQH9B9qw',
  },
  {
    id: 'vid-4',
    titleEn: 'Madras on Stage: Celebrating Chennai’s Media & Cultural Legacy',
    titleTa: 'மெட்ராஸ் ஆன் ஸ்டேஜ்: சென்னையின் ஊடக மற்றும் பண்பாட்டு பாரம்பரிய விழா',
    categoryEn: 'Culture & Heritage',
    categoryTa: 'பண்பாடு & வரலாறு',
    duration: '11:30',
    descriptionEn: 'Special documentary feature on the photo exhibition highlighting historic journalism institutions like The Hindu.',
    descriptionTa: 'சென்னையின் இதழியல் வரலாறு மற்றும் "தி இந்து" உள்ளிட்ட வரலாற்று நிறுவனங்களை போற்றும் புகைப்பட கண்காட்சி ஆவணம்.',
    url: 'https://www.youtube.com/channel/UCPWnoINnA43mptLCQH9B9qw',
  },
];

export function InfoVideo({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-8">
      {/* Official Channel Header with Animated Red Accent & Glow */}
      <InfoReveal direction="up" delay={0.05} showTopLine={false}>
        <div className="p-6 sm:p-8 bg-charcoal-900 text-white border-l-4 border-red-600 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
            }}
          />

          <div className="flex items-center gap-4 relative z-10">
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
              transition={{ duration: 0.2 }}
              className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-red-600 flex items-center justify-center shrink-0 shadow-md"
            >
              <Youtube className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {isTa ? 'தமிழ்நாடு செய்தித்துறை அதிகாரப்பூர்வ யூடியூப் தளம்' : 'TN DIPR Official Video Channel'}
                </h3>
                <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-charcoal-300 font-sans mt-0.5 leading-relaxed">
                {isTa
                  ? 'அரசு செய்தியாளர் சந்திப்புகள், நலத்திட்ட வெளியீடுகள் மற்றும் பிரச்சார காணொளிகளின் அதிகாரப்பூர்வ களஞ்சியம்.'
                  : 'Direct official repository for Chief Minister addresses, campaign films, and DIPR press briefings.'}
              </p>
            </div>
          </div>

          <motion.a
            href="https://www.youtube.com/channel/UCPWnoINnA43mptLCQH9B9qw"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xs transition-colors whitespace-nowrap shadow-sm"
          >
            <span>{isTa ? 'யூடியூப் சேனல் காண்க' : 'Visit TN DIPR YouTube'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </InfoReveal>

      {/* 16:9 Facade-Loaded Video Grid with Staggered Motion */}
      <InfoStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
        {VIDEOS.map((vid) => (
          <InfoStaggerItem
            key={vid.id}
            direction="up"
            showTopLine={false}
            className="group block bg-white border border-sand-300 rounded-sm overflow-hidden hover:border-maroon-700 hover:shadow-md transition-all"
          >
            <a
              href={vid.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* 16:9 Poster Facade with Mask Reveal */}
              <InfoImageReveal delay={0.1} hoverZoom={true} className="aspect-video bg-charcoal-950 border-b border-sand-200">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Pattern Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40 group-hover:scale-105 transition-transform duration-500" />

                  {/* Center Play Button Facade */}
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.15 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:bg-red-500 transition-colors"
                  >
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </motion.div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="font-mono text-xs font-bold uppercase bg-charcoal-900/90 text-white px-2.5 py-0.5 border border-charcoal-700 backdrop-blur-xs">
                      {isTa ? vid.categoryTa : vid.categoryEn}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="font-mono text-xs font-semibold bg-black/85 text-yellow-400 px-2 py-0.5 border border-white/10">
                      {vid.duration}
                    </span>
                  </div>
                </div>
              </InfoImageReveal>

              {/* Video Metadata */}
              <div className="p-5 space-y-2">
                <h4 className="font-display text-lg text-charcoal-900 font-semibold leading-snug group-hover:text-maroon-700 transition-colors">
                  {isTa ? vid.titleTa : vid.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-600 font-sans line-clamp-2 leading-relaxed">
                  {isTa ? vid.descriptionTa : vid.descriptionEn}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-maroon-700 font-bold">
                  <span>{isTa ? 'DIPR அதிகாரப்பூர்வ ஒளிபரப்பு' : 'TN DIPR Official Broadcast'}</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {isTa ? 'காண்க' : 'Watch Broadcast'} →
                  </span>
                </div>
              </div>
            </a>
          </InfoStaggerItem>
        ))}
      </InfoStaggerContainer>
    </div>
  );
}
