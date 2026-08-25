'use client';

import type { InfoSectionProps } from './InfoTypes';
import { Calendar, ExternalLink, Globe } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  InfoReveal,
  InfoStaggerContainer,
  InfoStaggerItem,
} from './InfoMotion';

interface AnnouncementItem {
  id: string;
  monthEn: string;
  monthTa: string;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  badgeEn: string;
  badgeTa: string;
  highlight?: boolean;
}

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    monthEn: 'August 2026',
    monthTa: 'ஆகஸ்ட் 2026',
    titleEn: 'Restructuring of Fact Check Unit into Information Integrity Desk (IID)',
    titleTa: 'உண்மை சரிபார்ப்பு பிரிவு தகவல் ஒருமைப்பாடு பிரிவாக (IID) மறுசீரமைப்பு',
    descriptionEn:
      'Guru (Guru Thalaiva) appointed as Head of IID with mandate for rapid containment of online misinformation and ticket-based departmental response SLAs.',
    descriptionTa:
      'தவறான தகவல்கள் மற்றும் பொய் செய்திகளைத் தடுக்க குரு (குரு தலைவா) தலைமையில் புதிய தகவல் ஒருமைப்பாடு பிரிவு மற்றும் டிக்கெட் முறை அறிமுகம்.',
    badgeEn: 'Institutional Order',
    badgeTa: 'அரசு ஆணை',
    highlight: true,
  },
  {
    id: 'ann-2',
    monthEn: 'August 2026',
    monthTa: 'ஆகஸ்ட் 2026',
    titleEn: 'Establishment of 6-Tier Social Media Desk Under DIPR',
    titleTa: 'DIPR கீழ் 6 அடுக்கு பிரத்யேக சமூக ஊடகப் பிரிவு உருவாக்கம்',
    descriptionEn:
      'Dhivya appointed Special Officer for quality clearance, overseeing official digital broadcasts across platforms.',
    descriptionTa:
      'திவ்யா சிறப்பு அதிகாரியாக நியமிக்கப்பட்டு அனைத்து டிஜிட்டல் தளங்களின் அதிகாரப்பூர்வ வெளியீட்டு தர ஒப்புதல் மேற்பார்வை.',
    badgeEn: 'Administrative Notification',
    badgeTa: 'நிர்வாக அறிவிப்பு',
  },
  {
    id: 'ann-3',
    monthEn: 'August 2026',
    monthTa: 'ஆகஸ்ட் 2026',
    titleEn: 'Assembly Resolution on FCRA Amendment Bill 2026 Moved',
    titleTa: '2026 FCRA சட்டத்திருத்த மசோதாவுக்கு எதிராக சட்டமன்ற தீர்மானம்',
    descriptionEn:
      'Minister A. Rajmohan moved resolution urging protection of grassroots non-profits and welfare societies.',
    descriptionTa:
      'அமைச்சர் ஏ. ராஜமோகன் அவர்களால் தன்னார்வ தொண்டு நிறுவனங்களின் நலனைப் பாதுகாக்க சட்டமன்றத்தில் சிறப்புத் தீர்மானம்.',
    badgeEn: 'Legislative Action',
    badgeTa: 'சட்டமன்ற நடவடிக்கை',
  },
  {
    id: 'ann-4',
    monthEn: 'July 2026',
    monthTa: 'ஜூலை 2026',
    titleEn: 'Reaffirmation of "Tamil Thai Vaazhthu" Primacy Protocol',
    titleTa: 'அரசு நிகழ்வுகளில் தமிழ்த்தாய் வாழ்த்தின் முதன்மை நெறிமுறை உறுதி',
    descriptionEn:
      'Formal policy reaffirmation that the state song shall be rendered first at all state functions and convocations.',
    descriptionTa:
      'அனைத்து அரசு மற்றும் பல்கலைக்கழக பட்டமளிப்பு விழாக்களிலும் தமிழ்த்தாய் வாழ்த்தே முதலாவதாக பாடப்பட வேண்டும் என உறுதி.',
    badgeEn: 'Protocol Directive',
    badgeTa: 'நெறிமுறை ஆணை',
  },
  {
    id: 'ann-5',
    monthEn: 'July 2026',
    monthTa: 'ஜூலை 2026',
    titleEn: 'Statewide Digital Census Self-Enumeration & Citizen Outreach',
    titleTa: 'மாநில அளவிலான டிஜிட்டல் மக்கள் தொகை கணக்கெடுப்பு விழிப்புணர்வு இயக்கம்',
    descriptionEn:
      'Citizen guidance framework published across urban local bodies and rural panchayats for accurate demographic records.',
    descriptionTa:
      'நகர்ப்புற மற்றும் கிராமப்புற உள்ளாட்சி அமைப்புகளில் பொதுமக்கள் சுய கணக்கெடுப்புக்கான விழிப்புணர்வு வழிகாட்டல் வெளியீடு.',
    badgeEn: 'Public Service Notice',
    badgeTa: 'பொது சேவை அறிவிப்பு',
  },
];

export function InfoAnnouncements({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-10">
      {/* Chronological Announcements Stream with Stagger */}
      <InfoStaggerContainer className="space-y-4" stagger={0.08}>
        {ANNOUNCEMENTS.map((item) => (
          <InfoStaggerItem
            key={item.id}
            direction="up"
            showTopLine={false}
            className={`p-6 sm:p-7 border rounded-sm transition-all shadow-2xs hover:shadow-sm ${
              item.highlight
                ? 'bg-sand-50/90 border-maroon-700/60 border-l-4'
                : 'bg-white border-sand-300 hover:border-maroon-700'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold uppercase bg-charcoal-900 text-white px-2.5 py-0.5 rounded-2xs">
                  {isTa ? item.badgeTa : item.badgeEn}
                </span>
                <span className="font-mono text-xs text-charcoal-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-maroon-700" />
                  {isTa ? item.monthTa : item.monthEn}
                </span>
              </div>
              {item.highlight && (
                <span className="font-mono text-[11px] font-bold text-maroon-700 uppercase flex items-center gap-1">
                  <span className="animate-pulse text-yellow-500">★</span> {isTa ? 'முதன்மை அறிவிப்பு' : 'Key Milestone'}
                </span>
              )}
            </div>

            <h4 className="font-display text-xl text-charcoal-950 font-bold leading-snug my-2">
              {isTa ? item.titleTa : item.titleEn}
            </h4>

            <p className="text-xs sm:text-sm text-charcoal-700 font-sans leading-relaxed">
              {isTa ? item.descriptionTa : item.descriptionEn}
            </p>
          </InfoStaggerItem>
        ))}
      </InfoStaggerContainer>

      {/* Official Directory / Source Websites with Staggered Entrance */}
      <InfoReveal direction="up" delay={0.15} showTopLine={false}>
        <div className="bg-charcoal-900 text-white p-6 sm:p-8 md:p-10 rounded-sm space-y-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-charcoal-800">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-yellow-400" />
              <h3 className="font-display text-2xl text-white font-medium">
                {isTa ? 'அதிகாரப்பூர்வ தகவல் ஆதாரங்கள் மற்றும் இணையதளங்கள்' : 'Official Information Sources & Verified Portals'}
              </h3>
            </div>
            <span className="font-mono text-xs text-yellow-400">
              {isTa ? 'சரிபார்க்கப்பட்ட அரசு இணைப்புகள்' : 'VERIFIED GOVERNMENT LINKS'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <motion.a
              href="https://www.youtube.com/channel/UCPWnoINnA43mptLCQH9B9qw"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? {} : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-charcoal-800/80 border border-charcoal-700 hover:border-yellow-400/80 transition-all flex items-center justify-between group rounded-xs shadow-2xs"
            >
              <div>
                <div className="font-bold text-white text-sm font-display group-hover:text-yellow-400 transition-colors">
                  {isTa ? 'TN DIPR அதிகாரப்பூர்வ யூடியூப் சேனல்' : 'TN DIPR Official YouTube Channel'}
                </div>
                <div className="text-charcoal-400 font-mono text-[11px] mt-0.5">
                  {isTa ? 'அரசு காணொளிகள், பிரச்சார படங்கள்' : 'Government videos & press briefings'}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-charcoal-400 group-hover:text-yellow-400 shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            <motion.a
              href="https://lokbhavan.tn.gov.in/category/press-release/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? {} : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-charcoal-800/80 border border-charcoal-700 hover:border-yellow-400/80 transition-all flex items-center justify-between group rounded-xs shadow-2xs"
            >
              <div>
                <div className="font-bold text-white text-sm font-display group-hover:text-yellow-400 transition-colors">
                  {isTa ? 'லோக் பவன் (ஆளுநர் செயலகம்) செய்திக் குறிப்புகள்' : 'Lok Bhavan (Governor’s Secretariat) Releases'}
                </div>
                <div className="text-charcoal-400 font-mono text-[11px] mt-0.5">
                  lokbhavan.tn.gov.in/category/press-release
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-charcoal-400 group-hover:text-yellow-400 shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            <motion.a
              href="https://x.com/TNDIPRNEWS"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? {} : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-charcoal-800/80 border border-charcoal-700 hover:border-yellow-400/80 transition-all flex items-center justify-between group rounded-xs shadow-2xs"
            >
              <div>
                <div className="font-bold text-white text-sm font-display group-hover:text-yellow-400 transition-colors">
                  {isTa ? 'TN DIPR எக்ஸ் (Twitter) பக்கம்' : 'TN DIPR Official X (Twitter) Channel'}
                </div>
                <div className="text-charcoal-400 font-mono text-[11px] mt-0.5">@TNDIPRNEWS</div>
              </div>
              <ExternalLink className="w-4 h-4 text-charcoal-400 group-hover:text-yellow-400 shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            <motion.a
              href="https://www.facebook.com/share/1CFFTdrjUP/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? {} : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-charcoal-800/80 border border-charcoal-700 hover:border-yellow-400/80 transition-all flex items-center justify-between group rounded-xs shadow-2xs"
            >
              <div>
                <div className="font-bold text-white text-sm font-display group-hover:text-yellow-400 transition-colors">
                  {isTa ? 'TN DIPR அதிகாரப்பூர்வ முகநூல் பக்கம்' : 'TN DIPR Official Facebook Page'}
                </div>
                <div className="text-charcoal-400 font-mono text-[11px] mt-0.5">facebook.com/share/1CFFTdrjUP/</div>
              </div>
              <ExternalLink className="w-4 h-4 text-charcoal-400 group-hover:text-yellow-400 shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>
      </InfoReveal>
    </div>
  );
}
