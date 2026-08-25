'use client';

import type { InfoSectionProps } from './InfoTypes';
import { ShieldCheck, Clock, Building, Layers } from 'lucide-react';
import {
  InfoCard,
  InfoReveal,
  InfoStaggerContainer,
  InfoStaggerItem,
  InfoCounter,
} from './InfoMotion';

export function InfoGovCommunication({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';

  const tiers = [
    {
      tier: 'TIER 01',
      titleEn: 'DIPR Director',
      titleTa: 'DIPR இயக்குநர்',
      descEn: 'Executive governance & state policy alignment',
      descTa: 'கொள்கை மற்றும் நிர்வாகத் தலைமை',
    },
    {
      tier: 'TIER 02',
      titleEn: 'Joint Director',
      titleTa: 'இணை இயக்குநர்',
      descEn: 'Digital media oversight & multi-channel sync',
      descTa: 'சமூக ஊடக ஒருங்கிணைப்பு',
    },
    {
      tier: 'TIER 03',
      titleEn: 'Public Relations Officer',
      titleTa: 'மக்கள் தொடர்பு அதிகாரி',
      descEn: 'Press liaison & real-time dispatch releases',
      descTa: 'ஊடக தொடர்பு மற்றும் வெளியீடுகள்',
    },
    {
      tier: 'TIER 04',
      titleEn: 'Special Officer (Dhivya)',
      titleTa: 'சிறப்பு அதிகாரி (திவ்யா)',
      descEn: 'Central clearance for content quality & facts',
      descTa: 'வெளியீட்டு தர ஒப்புதல் புள்ளி',
    },
    {
      tier: 'TIER 05',
      titleEn: 'Senior Coordinators',
      titleTa: 'மூத்த ஒருங்கிணைப்பாளர்கள்',
      descEn: 'Bilingual scripting, campaign strategy & design',
      descTa: 'உள்ளடக்க எழுத்தாளர்கள் & திட்டமிடல்',
    },
    {
      tier: 'TIER 06',
      titleEn: 'Technical & Graphics',
      titleTa: 'தொழில்நுட்ப உதவியாளர்கள்',
      descEn: 'Infographics, motion assets & video editing',
      descTa: 'விளக்கப்படங்கள் & வடிவமைப்பு',
    },
  ];

  const campaigns = [
    {
      num: 'CAMPAIGN 01',
      titleEn: 'Drug Free Tamil Nadu',
      titleTa: 'போதையற்ற தமிழ்நாடு',
      descEn: 'Statewide youth de-addiction drives, student pledges, and community mobilization.',
      descTa: 'மாநிலம் தழுவிய பள்ளி, கல்லூரி மாணவர் விழிப்புணர்வு மற்றும் போதை எதிர்ப்பு உறுதிமொழி இயக்கம்.',
    },
    {
      num: 'CAMPAIGN 02',
      titleEn: 'Digital Census Drive',
      titleTa: 'மக்கள் தொகை கணக்கெடுப்பு',
      descEn: 'Public education campaigns on digital self-enumeration and civic participation.',
      descTa: 'பொதுமக்கள் சுய பதிவேற்றம் மற்றும் வழிகாட்டுதலுக்கான டிஜிட்டல் விழிப்புணர்வு பிரச்சாரங்கள்.',
    },
    {
      num: 'CAMPAIGN 03',
      titleEn: 'Education Reforms & Welfare',
      titleTa: 'கல்வி & மாணவர் நலம்',
      descEn: 'Student counseling, NEET opposition awareness, and scholarship dissemination.',
      descTa: 'நீட் தேர்வு எதிர்ப்பு நிலைப்பாடு, அரசுப் பள்ளி மாணவர் உதவித்தொகை மற்றும் கல்வி வழிகாட்டல்.',
    },
    {
      num: 'CAMPAIGN 04',
      titleEn: 'Heritage & Cultural Showcase',
      titleTa: 'சென்னை & பண்பாட்டுப் பெருமை',
      descEn: '"Madras on Stage" exhibition and celebrating legendary state media institutions.',
      descTa: '"மெட்ராஸ் ஆன் ஸ்டேஜ்" புகைப்பட கண்காட்சி மற்றும் வரலாற்று ஊடக ஆவணப்படுத்தல் நிகழ்வுகள்.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* 2-Column Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Column 1: Institutional Mandate */}
        <InfoCard
          direction="left"
          delay={0.05}
          showTopLine={true}
          topLineColor="bg-maroon-700"
          className="bg-white p-6 sm:p-8 md:p-9 border border-sand-300 rounded-sm space-y-6 shadow-xs hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-3 pb-3 border-b border-sand-200">
            <Building className="w-5 h-5 text-maroon-700" />
            <h3 className="font-display text-2xl text-charcoal-900 font-medium">
              {isTa ? 'செய்தி மற்றும் மக்கள் தொடர்புத்துறை (DIPR)' : 'Directorate of Information & Public Relations'}
            </h3>
          </div>

          <p className="text-charcoal-700 leading-relaxed font-sans text-sm sm:text-base">
            {isTa
              ? 'தமிழ்நாடு செய்தி மற்றும் மக்கள் தொடர்புத் துறை (DIPR) அரசின் அதிகாரப்பூர்வ தகவல் பரிமாற்ற முதன்மை அமைப்பாக செயல்படுகிறது. அரசின் கொள்கைகள், நலத்திட்டங்கள், சாதனைகள் மற்றும் மக்கள் விழிப்புணர்வு தகவல்களை அனைத்து தளங்களிலும் மக்களிடம் கொண்டு சேர்ப்பதே இதன் நோக்கம்.'
              : 'The Directorate of Information and Public Relations (DIPR) serves as the apex nodal agency for all official government communications, press coordination, public information campaigns, and institutional media archiving across Tamil Nadu.'}
          </p>

          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-maroon-700 tracking-wider">
              {isTa ? 'முதன்மைப் பொறுப்புகள்' : 'Key Departmental Verticals'}
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'அதிகாரப்பூர்வ அரசு செய்திக் குறிப்புகள் மற்றும் ஊடக ஒருங்கிணைப்பு' : 'Official government press releases & media briefings'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'மக்கள் நலத்திட்டங்களுக்கான விழிப்புணர்வு பிரச்சாரங்கள்' : 'Public information & behavioural welfare campaigns'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'தவறான தகவல்கள் மற்றும் போலிச் செய்திகளை சரிபார்த்தல்' : 'Misinformation containment & evidence-based fact-checking'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'அரசு அச்சகம், எழுதுபொருள் மற்றும் செய்தி அச்சு ஒழுங்குமுறை' : 'Government stationery, press, printing, and newsprint control'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'திரைப்படத் தொழில்நுட்பம் மற்றும் ஒளிப்பதிவு ஒழுங்குமுறை' : 'Cinematograph regulations and film technology vertical'}</span>
              </li>
            </ul>
          </div>
        </InfoCard>

        {/* Column 2: Information Integrity Desk (IID) */}
        <InfoCard
          direction="right"
          delay={0.1}
          showTopLine={true}
          topLineColor="bg-[#c5a059]"
          className="bg-white p-6 sm:p-8 md:p-9 border border-sand-300 rounded-sm space-y-6 shadow-xs hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between pb-3 border-b border-sand-200">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-maroon-700" />
              <h3 className="font-display text-2xl text-charcoal-900 font-medium">
                {isTa ? 'தகவல் ஒருமைப்பாடு பிரிவு (IID)' : 'Information Integrity Desk (IID)'}
              </h3>
            </div>
            <span className="font-mono text-xs bg-yellow-400 text-charcoal-950 font-bold px-2.5 py-0.5 uppercase tracking-wider">
              2026 Restructure
            </span>
          </div>

          <p className="text-charcoal-700 leading-relaxed font-sans text-sm sm:text-base">
            {isTa
              ? 'ஆகஸ்ட் 2026-இல் உருவாக்கப்பட்ட தகவல் ஒருமைப்பாடு பிரிவு, குரு (குரு தலைவா) தலைமையில் செயல்படுகிறது. சமூக வலைதளங்கள் மற்றும் ஊடகங்களில் பரவும் தவறான தகவல்களைக் கண்டறிந்து, அரசுத் துறைகளுடன் இணைந்து ஆதாரப்பூர்வமான உண்மை நிலவரத்தை வெளியிடுகிறது.'
              : 'Renamed and restructured in August 2026 under the leadership of Guru (Guru Thalaiva), the IID tracks misinformation, verifies claims against official data, and rapidly halts panic or false narratives before widespread dissemination.'}
          </p>

          {/* Ticket System & SLAs with Counter Metrics */}
          <div className="bg-sand-50/90 p-4 sm:p-5 border border-sand-200 rounded-xs space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-charcoal-800 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-maroon-700" />
              <span>{isTa ? 'டிக்கெட் கண்காணிப்பு & காலவரம்பு (SLAs)' : 'Ticket-Based Tracking & SLAs'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-2.5 bg-white border border-sand-200 shadow-2xs">
                <div className="text-red-700 font-bold text-base sm:text-lg font-display">
                  &lt; <InfoCounter value={1} />h
                </div>
                <div className="text-charcoal-500 font-mono text-[11px]">{isTa ? 'அதிமுக்கியம்' : 'High'}</div>
              </div>
              <div className="p-2.5 bg-white border border-sand-200 shadow-2xs">
                <div className="text-amber-700 font-bold text-base sm:text-lg font-display">
                  &lt; <InfoCounter value={3} />h
                </div>
                <div className="text-charcoal-500 font-mono text-[11px]">{isTa ? 'நடுத்தரம்' : 'Medium'}</div>
              </div>
              <div className="p-2.5 bg-white border border-sand-200 shadow-2xs">
                <div className="text-charcoal-800 font-bold text-base sm:text-lg font-display">
                  &lt; <InfoCounter value={7} />h
                </div>
                <div className="text-charcoal-500 font-mono text-[11px]">{isTa ? 'பொதுவானது' : 'Low'}</div>
              </div>
            </div>
            <p className="text-xs text-charcoal-600 font-sans leading-relaxed">
              {isTa
                ? 'ஒவ்வொரு துறைக்கும் நியமிக்கப்பட்டுள்ள சிறப்பு ஒருங்கிணைப்பு அதிகாரிகளுடன் 24 மணி நேரமும் வாட்ஸ்அப் நெட்வொர்க் மூலம் இணைக்கப்பட்டுள்ளது.'
                : 'Linked to dedicated nodal officers in every government department via a dedicated instant-response WhatsApp cluster.'}
            </p>
          </div>
        </InfoCard>
      </div>

      {/* 6-Tier Social Media Desk Hierarchy with Sequenced Stagger Cascade */}
      <InfoReveal direction="up" delay={0.15} showTopLine={false}>
        <div className="bg-charcoal-900 text-white p-6 sm:p-8 md:p-10 rounded-sm space-y-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-charcoal-800">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-yellow-400" />
              <h3 className="font-display text-2xl text-white font-medium">
                {isTa ? 'DIPR சமூக ஊடக பிரிவின் 6 அடுக்கு கட்டமைப்பு' : 'DIPR Social Media Desk: 6-Tier Operational Hierarchy'}
              </h3>
            </div>
            <span className="font-mono text-xs text-yellow-400/90 font-medium">
              {isTa ? 'உள்ளடக்க தர ஒப்புதல்: திவ்யா (சிறப்பு அதிகாரி)' : 'Quality Clearance: Dhivya (Special Officer)'}
            </span>
          </div>

          <InfoStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 font-mono text-xs" stagger={0.07}>
            {tiers.map((t) => (
              <InfoStaggerItem
                key={t.tier}
                direction="up"
                showTopLine={true}
                topLineColor="bg-yellow-400"
                className="bg-charcoal-800/80 p-4 border border-charcoal-700/60 hover:border-yellow-400/60 transition-colors space-y-2 rounded-xs"
              >
                <span className="text-yellow-400 font-bold tracking-wider">{t.tier}</span>
                <h5 className="text-white font-sans text-sm font-semibold leading-snug">
                  {isTa ? t.titleTa : t.titleEn}
                </h5>
                <p className="text-charcoal-400 font-sans text-xs leading-normal">
                  {isTa ? t.descTa : t.descEn}
                </p>
              </InfoStaggerItem>
            ))}
          </InfoStaggerContainer>
        </div>
      </InfoReveal>

      {/* Flagship Behavioural & Awareness Campaigns */}
      <InfoReveal direction="up" delay={0.2} showTopLine={false}>
        <div className="bg-sand-100/80 p-6 sm:p-8 border border-sand-300 rounded-sm space-y-6 shadow-2xs">
          <h3 className="font-display text-2xl text-charcoal-900 font-medium">
            {isTa ? 'முக்கிய மக்கள் விழிப்புணர்வு பிரச்சாரங்கள்' : 'Flagship Public Information & Awareness Campaigns'}
          </h3>

          <InfoStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.08}>
            {campaigns.map((c) => (
              <InfoStaggerItem
                key={c.num}
                direction="up"
                showTopLine={true}
                topLineColor="bg-maroon-700"
                className="bg-white p-5 border border-sand-300 rounded-xs hover:shadow-xs hover:border-maroon-700/60 transition-all group"
              >
                <span className="text-maroon-700 font-mono text-xs font-bold uppercase tracking-wider">
                  {c.num}
                </span>
                <h4 className="font-display text-lg text-charcoal-900 mt-1.5 mb-2 font-bold group-hover:text-maroon-800 transition-colors">
                  {isTa ? c.titleTa : c.titleEn}
                </h4>
                <p className="text-xs text-charcoal-600 font-sans leading-relaxed">
                  {isTa ? c.descTa : c.descEn}
                </p>
              </InfoStaggerItem>
            ))}
          </InfoStaggerContainer>
        </div>
      </InfoReveal>
    </div>
  );
}
