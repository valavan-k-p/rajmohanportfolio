'use client';

import type { InfoSectionProps } from './InfoTypes';
import { ArrowUpRight, ShieldCheck, Share2, Award } from 'lucide-react';

export function InfoLatest({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';

  return (
    <div className="space-y-8">
      {/* 3-Column Newsroom Grid with 2-Column Lead Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Lead Story: Double-width card */}
        <div className="lg:col-span-8 bg-charcoal-950 text-white p-6 sm:p-8 md:p-10 rounded-sm flex flex-col justify-between relative overflow-hidden border-l-4 border-yellow-400">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-charcoal-950 font-mono text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                {isTa ? 'சமீபத்திய அறிவிப்பு' : 'LATEST DISPATCH'}
              </span>
              <span className="text-xs text-charcoal-300 font-mono">
                {isTa ? 'ஆகஸ்ட் 2026' : 'AUGUST 2026'} · DIPR-IID-01
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
              {isTa
                ? 'தமிழ்நாடு உண்மை சரிபார்ப்பு பிரிவு "தகவல் ஒருமைப்பாடு பிரிவு (IID)" என மறுபெயரிடப்பட்டு மறுசீரமைப்பு'
                : 'Tamil Nadu Reconstitutes Fact Check Unit as "Information Integrity Desk (IID)"'}
            </h3>

            <p className="text-charcoal-200 text-base sm:text-lg leading-relaxed font-sans">
              {isTa
                ? 'தவறான தகவல்கள் மற்றும் போலியான செய்திகளை முறியடிக்க, குரு (குரு தலைவா) தலைமையில் புதிய தகவல் ஒருமைப்பாடு பிரிவு அமைக்கப்பட்டுள்ளது. வெளிப்படைத்தன்மை மற்றும் கணக்குத்தன்மையை உறுதி செய்ய டிக்கெட் அடிப்படையிலான கண்காணிப்பு முறை அமல்படுத்தப்பட்டுள்ளது.'
                : 'To counter online disinformation and manipulated content, the government has overhauled its fact-checking apparatus under the leadership of Guru (Guru Thalaiva). A new ticket-based tracking mechanism guarantees time-bound verification and swift multi-departmental coordination.'}
            </p>

            {/* Metric / SLA badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-charcoal-800">
              <div className="bg-charcoal-900/80 p-3 border border-charcoal-800">
                <div className="text-xs text-charcoal-400 font-mono uppercase">{isTa ? 'அதிமுக்கியத்துவம்' : 'High Priority'}</div>
                <div className="text-lg font-bold text-yellow-400">&lt; 1 {isTa ? 'மணி நேரம்' : 'Hour SLA'}</div>
              </div>
              <div className="bg-charcoal-900/80 p-3 border border-charcoal-800">
                <div className="text-xs text-charcoal-400 font-mono uppercase">{isTa ? 'நடுத்தர முன்னுரிமை' : 'Medium Priority'}</div>
                <div className="text-lg font-bold text-white">&lt; 3 {isTa ? 'மணி நேரம்' : 'Hours SLA'}</div>
              </div>
              <div className="bg-charcoal-900/80 p-3 border border-charcoal-800">
                <div className="text-xs text-charcoal-400 font-mono uppercase">{isTa ? 'பொது முன்னுரிமை' : 'Standard'}</div>
                <div className="text-lg font-bold text-charcoal-300">&lt; 7 {isTa ? 'மணி நேரம்' : 'Hours SLA'}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-charcoal-800/80">
            <div className="flex items-center gap-2 text-xs text-charcoal-400">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>{isTa ? 'துறை ஒருங்கிணைப்பு வாட்ஸ்அப் நெட்வொர்க் இணைக்கப்பட்டது' : 'Inter-Departmental Nodal WhatsApp Network Active'}</span>
            </div>
            <a
              href="#communication"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
            >
              {isTa ? 'முழு விபரம் வாசிக்க' : 'Read Full Architecture'} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Secondary Column: Stacked items */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Sub-item 1: Social Media Desk */}
          <div className="p-6 bg-sand-100/80 border border-sand-300 rounded-sm flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-maroon-700 font-bold uppercase tracking-wider">
                  {isTa ? 'அமைப்பு மாற்றம்' : 'DIPR RESTRUCTURING'}
                </span>
                <span className="text-xs text-charcoal-500 font-mono">08/2026</span>
              </div>
              <h4 className="font-display text-xl text-charcoal-900 leading-snug">
                {isTa
                  ? 'DIPR கீழ் 6 அடுக்கு பிரத்யேக சமூக ஊடக பிரிவு அமைப்பு'
                  : 'Dedicated 6-Tier Social Media Desk Established Under DIPR'}
              </h4>
              <p className="text-sm text-charcoal-700 leading-normal">
                {isTa
                  ? 'திவ்யா சிறப்பு அதிகாரியாக நியமிக்கப்பட்டு உள்ளடக்க தர பரிசோதனை மற்றும் அதிகாரப்பூர்வ சமூக ஊடக வெளியீடுகள் மேற்பார்வையிடப்படுகின்றன.'
                  : 'Special Officer Dhivya oversees quality clearance across digital platforms, supported by senior writers, designers, and coordinators.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between text-xs text-charcoal-600">
              <span className="font-mono">{isTa ? '6 நிலை செயலாக்கக் கட்டமைப்பு' : '6-Tier Operational Hierarchy'}</span>
              <Share2 className="w-3.5 h-3.5 text-maroon-700" />
            </div>
          </div>

          {/* Sub-item 2: Governance Achievements Defense */}
          <div className="p-6 bg-white border border-sand-300 rounded-sm flex-1 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-charcoal-600 font-semibold uppercase tracking-wider">
                  {isTa ? 'கொள்கை & சாதனை' : 'GOVERNANCE UPDATE'}
                </span>
                <span className="text-xs text-charcoal-500 font-mono">08/2026</span>
              </div>
              <h4 className="font-display text-xl text-charcoal-900 leading-snug">
                {isTa
                  ? 'அரசு செயல்பாடுகள் மீதான விமர்சனங்களுக்கு அமைச்சர் ராஜமோகன் பதிலடி'
                  : 'Minister Rajmohan Rebuts Criticism with Tangible Governance Milestones'}
              </h4>
              <p className="text-sm text-charcoal-700 leading-normal">
                {isTa
                  ? '717 டாஸ்மாக் கடைகள் மூடல், தியாகிகள் ஓய்வூதிய உயர்வு மற்றும் ஊழல் தடுப்பு நடவடிக்கைகள் மக்கள் விரும்புவதை மெய்ப்பித்துள்ளன என திட்டவட்டம்.'
                  : 'Highlights closure of 717 TASMAC liquor shops, enhanced freedom fighters’ pensions, and aggressive anti-corruption drives.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between text-xs text-charcoal-600">
              <span className="font-mono">{isTa ? 'அமைச்சர் உரை' : 'Ministerial Briefing'}</span>
              <Award className="w-3.5 h-3.5 text-maroon-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
