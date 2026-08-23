'use client';

import type { InfoSectionProps } from './InfoTypes';
import { ShieldCheck, MessageSquare, Clock, Users, Building, Layers } from 'lucide-react';

export function InfoGovCommunication({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';

  return (
    <div className="space-y-12">
      {/* 2-Column Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Column 1: Institutional Mandate */}
        <div className="bg-white p-6 sm:p-8 border border-sand-300 rounded-sm space-y-6">
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
            <ul className="space-y-2 text-sm text-charcoal-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'அதிகாரப்பூர்வ அரசு செய்திக் குறிப்புகள் மற்றும் ஊடக ஒருங்கிணைப்பு' : 'Official government press releases & media briefings'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'மக்கள் நலத்திட்டங்களுக்கான விழிப்புணர்வு பிரச்சாரங்கள்' : 'Public information & behavioural welfare campaigns'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'தவறான தகவல்கள் மற்றும் போலிச் செய்திகளை சரிபார்த்தல்' : 'Misinformation containment & evidence-based fact-checking'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'அரசு அச்சகம், எழுதுபொருள் மற்றும் செய்தி அச்சு ஒழுங்குமுறை' : 'Government stationery, press, printing, and newsprint control'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-2 shrink-0" />
                <span>{isTa ? 'திரைப்படத் தொழில்நுட்பம் மற்றும் ஒளிப்பதிவு ஒழுங்குமுறை' : 'Cinematograph regulations and film technology vertical'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 2: Information Integrity Desk (IID) */}
        <div className="bg-white p-6 sm:p-8 border border-sand-300 rounded-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-sand-200">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-maroon-700" />
              <h3 className="font-display text-2xl text-charcoal-900 font-medium">
                {isTa ? 'தகவல் ஒருமைப்பாடு பிரிவு (IID)' : 'Information Integrity Desk (IID)'}
              </h3>
            </div>
            <span className="font-mono text-xs bg-yellow-400 text-charcoal-950 font-bold px-2 py-0.5 uppercase">
              2026 Restructure
            </span>
          </div>

          <p className="text-charcoal-700 leading-relaxed font-sans text-sm sm:text-base">
            {isTa
              ? 'ஆகஸ்ட் 2026-இல் உருவாக்கப்பட்ட தகவல் ஒருமைப்பாடு பிரிவு, குரு (குரு தலைவா) தலைமையில் செயல்படுகிறது. சமூக வலைதளங்கள் மற்றும் ஊடகங்களில் பரவும் தவறான தகவல்களைக் கண்டறிந்து, அரசுத் துறைகளுடன் இணைந்து ஆதாரப்பூர்வமான உண்மை நிலவரத்தை வெளியிடுகிறது.'
              : 'Renamed and restructured in August 2026 under the leadership of Guru (Guru Thalaiva), the IID tracks misinformation, verifies claims against official data, and rapidly halts panic or false narratives before widespread dissemination.'}
          </p>

          {/* Ticket System & SLAs */}
          <div className="bg-sand-50 p-4 border border-sand-200 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-charcoal-800 uppercase">
              <Clock className="w-4 h-4 text-maroon-700" />
              <span>{isTa ? 'டிக்கெட் கண்காணிப்பு & காலவரம்பு (SLAs)' : 'Ticket-Based Tracking & SLAs'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-white border border-sand-200">
                <div className="text-red-700 font-bold text-base">&lt; 1h</div>
                <div className="text-charcoal-500 font-mono">{isTa ? 'அதிமுக்கியம்' : 'High'}</div>
              </div>
              <div className="p-2 bg-white border border-sand-200">
                <div className="text-amber-700 font-bold text-base">&lt; 3h</div>
                <div className="text-charcoal-500 font-mono">{isTa ? 'நடுத்தரம்' : 'Medium'}</div>
              </div>
              <div className="p-2 bg-white border border-sand-200">
                <div className="text-charcoal-800 font-bold text-base">&lt; 7h</div>
                <div className="text-charcoal-500 font-mono">{isTa ? 'பொதுவானது' : 'Low'}</div>
              </div>
            </div>
            <p className="text-xs text-charcoal-600 font-sans">
              {isTa
                ? 'ஒவ்வொரு துறைக்கும் நியமிக்கப்பட்டுள்ள சிறப்பு ஒருங்கிணைப்பு அதிகாரிகளுடன் 24 மணி நேரமும் வாட்ஸ்அப் நெட்வொர்க் மூலம் இணைக்கப்பட்டுள்ளது.'
                : 'Linked to dedicated nodal officers in every government department via a dedicated instant-response WhatsApp cluster.'}
            </p>
          </div>
        </div>
      </div>

      {/* 6-Tier Social Media Desk Hierarchy */}
      <div className="bg-charcoal-900 text-white p-6 sm:p-8 md:p-10 rounded-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-charcoal-800">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-yellow-400" />
            <h3 className="font-display text-2xl text-white font-medium">
              {isTa ? 'DIPR சமூக ஊடக பிரிவின் 6 அடுக்கு கட்டமைப்பு' : 'DIPR Social Media Desk: 6-Tier Operational Hierarchy'}
            </h3>
          </div>
          <span className="font-mono text-xs text-charcoal-300">
            {isTa ? 'உள்ளடக்க தர ஒப்புதல்: திவ்யா (சிறப்பு அதிகாரி)' : 'Quality Clearance: Dhivya (Special Officer)'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 font-mono text-xs">
          <div className="bg-charcoal-800/80 p-4 border-t-2 border-yellow-400 space-y-2">
            <span className="text-yellow-400 font-bold">TIER 01</span>
            <h5 className="text-white font-sans text-sm font-semibold">{isTa ? 'DIPR இயக்குநர்' : 'DIPR Director'}</h5>
            <p className="text-charcoal-400 font-sans text-xs">{isTa ? 'கொள்கை மற்றும் நிர்வாகத் தலைமை' : 'Executive governance'}</p>
          </div>

          <div className="bg-charcoal-800/80 p-4 border-t-2 border-yellow-400 space-y-2">
            <span className="text-yellow-400 font-bold">TIER 02</span>
            <h5 className="text-white font-sans text-sm font-semibold">{isTa ? 'இணை இயக்குநர்' : 'Joint Director'}</h5>
            <p className="text-charcoal-400 font-sans text-xs">{isTa ? 'சமூக ஊடக ஒருங்கிணைப்பு' : 'Social media oversight'}</p>
          </div>

          <div className="bg-charcoal-800/80 p-4 border-t-2 border-yellow-400 space-y-2">
            <span className="text-yellow-400 font-bold">TIER 03</span>
            <h5 className="text-white font-sans text-sm font-semibold">{isTa ? 'மக்கள் தொடர்பு அதிகாரி' : 'Public Relations Officer'}</h5>
            <p className="text-charcoal-400 font-sans text-xs">{isTa ? 'ஊடக தொடர்பு மற்றும் வெளியீடுகள்' : 'Press liaison & notices'}</p>
          </div>

          <div className="bg-charcoal-800/80 p-4 border-t-2 border-yellow-400 space-y-2">
            <span className="text-yellow-400 font-bold">TIER 04</span>
            <h5 className="text-white font-sans text-sm font-semibold">{isTa ? 'சிறப்பு அதிகாரி (திவ்யா)' : 'Special Officer (Dhivya)'}</h5>
            <p className="text-charcoal-400 font-sans text-xs">{isTa ? 'வெளியீட்டு தர ஒப்புதல் புள்ளி' : 'Quality clearance clearance'}</p>
          </div>

          <div className="bg-charcoal-800/80 p-4 border-t-2 border-yellow-400 space-y-2">
            <span className="text-yellow-400 font-bold">TIER 05</span>
            <h5 className="text-white font-sans text-sm font-semibold">{isTa ? 'மூத்த ஒருங்கிணைப்பாளர்கள்' : 'Senior Coordinators'}</h5>
            <p className="text-charcoal-400 font-sans text-xs">{isTa ? 'உள்ளடக்க எழுத்தாளர்கள் & திட்டமிடல்' : 'Editorial scripting & planning'}</p>
          </div>

          <div className="bg-charcoal-800/80 p-4 border-t-2 border-yellow-400 space-y-2">
            <span className="text-yellow-400 font-bold">TIER 06</span>
            <h5 className="text-white font-sans text-sm font-semibold">{isTa ? 'தொழில்நுட்ப உதவியாளர்கள்' : 'Technical & Graphics'}</h5>
            <p className="text-charcoal-400 font-sans text-xs">{isTa ? 'விளக்கப்படங்கள் & வடிவமைப்பு' : 'Infographics & multimedia'}</p>
          </div>
        </div>
      </div>

      {/* Flagship Behavioural & Awareness Campaigns */}
      <div className="bg-sand-100/70 p-6 sm:p-8 border border-sand-300 rounded-sm space-y-6">
        <h3 className="font-display text-2xl text-charcoal-900 font-medium">
          {isTa ? 'முக்கிய மக்கள் விழிப்புணர்வு பிரச்சாரங்கள்' : 'Flagship Public Information & Awareness Campaigns'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-sand-300">
            <span className="text-maroon-700 font-mono text-xs font-bold uppercase">CAMPAIGN 01</span>
            <h4 className="font-display text-lg text-charcoal-900 mt-1 mb-2">
              {isTa ? 'போதையற்ற தமிழ்நாடு' : 'Drug Free Tamil Nadu'}
            </h4>
            <p className="text-xs text-charcoal-600 font-sans">
              {isTa ? 'மாநிலம் தழுவிய பள்ளி, கல்லூரி மாணவர் விழிப்புணர்வு மற்றும் போதை எதிர்ப்பு உறுதிமொழி இயக்கம்.' : 'Statewide youth de-addiction drives, student pledges, and community mobilization.'}
            </p>
          </div>

          <div className="bg-white p-4 border border-sand-300">
            <span className="text-maroon-700 font-mono text-xs font-bold uppercase">CAMPAIGN 02</span>
            <h4 className="font-display text-lg text-charcoal-900 mt-1 mb-2">
              {isTa ? 'மக்கள் தொகை கணக்கெடுப்பு' : 'Digital Census Drive'}
            </h4>
            <p className="text-xs text-charcoal-600 font-sans">
              {isTa ? 'பொதுமக்கள் சுய பதிவேற்றம் மற்றும் வழிகாட்டுதலுக்கான டிஜிட்டல் விழிப்புணர்வு பிரச்சாரங்கள்.' : 'Public education campaigns on digital self-enumeration and civic participation.'}
            </p>
          </div>

          <div className="bg-white p-4 border border-sand-300">
            <span className="text-maroon-700 font-mono text-xs font-bold uppercase">CAMPAIGN 03</span>
            <h4 className="font-display text-lg text-charcoal-900 mt-1 mb-2">
              {isTa ? 'கல்வி & மாணவர் நலம்' : 'Education Reforms & Welfare'}
            </h4>
            <p className="text-xs text-charcoal-600 font-sans">
              {isTa ? 'நீட் தேர்வு எதிர்ப்பு நிலைப்பாடு, அரசுப் பள்ளி மாணவர் உதவித்தொகை மற்றும் கல்வி வழிகாட்டல்.' : 'Student counseling, NEET opposition awareness, and scholarship dissemination.'}
            </p>
          </div>

          <div className="bg-white p-4 border border-sand-300">
            <span className="text-maroon-700 font-mono text-xs font-bold uppercase">CAMPAIGN 04</span>
            <h4 className="font-display text-lg text-charcoal-900 mt-1 mb-2">
              {isTa ? 'சென்னை & பண்பாட்டுப் பெருமை' : 'Heritage & Cultural Showcase'}
            </h4>
            <p className="text-xs text-charcoal-600 font-sans">
              {isTa ? '"மெட்ராஸ் ஆன் ஸ்டேஜ்" புகைப்பட கண்காட்சி மற்றும் வரலாற்று ஊடக ஆவணப்படுத்தல் நிகழ்வுகள்.' : '"Madras on Stage" exhibition and celebrating legendary state media institutions.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
