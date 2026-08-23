'use client';

import type { InfoSectionProps } from './InfoTypes';
import { Quote, Calendar, UserCheck } from 'lucide-react';

interface StatementItem {
  id: string;
  topicEn: string;
  topicTa: string;
  dateEn: string;
  dateTa: string;
  quoteEn: string;
  quoteTa: string;
  contextEn: string;
  contextTa: string;
  speakerEn: string;
  speakerTa: string;
}

const STATEMENTS: StatementItem[] = [
  {
    id: 'stmt-1',
    topicEn: 'Tamil Thai Vaazhthu Protocol',
    topicTa: 'தமிழ்த்தாய் வாழ்த்து நெறிமுறை',
    dateEn: 'July 2026',
    dateTa: 'ஜூலை 2026',
    quoteEn:
      'Tamil Thai Vaazhthu holds the foremost place of honour at all state government events. While past precedents at Annamalai University and Lok Bhavan showed procedural variations, our commitment to our state song and cultural primacy remains absolute and non-negotiable.',
    quoteTa:
      'அனைத்து தமிழ்நாடு அரசு நிகழ்வுகளிலும் தமிழ்த்தாய் வாழ்த்தே முதலிடம் பெறும். அண்ணாமலை பல்கலைக்கழகம் மற்றும் ஆளுநர் மாளிகை நிகழ்வுகளில் கடந்த காலங்களில் சில மாற்றங்கள் நிகழ்ந்திருந்தாலும், தாய்மொழிக்கான முதன்மை மரியாதை எக்காலத்திலும் விட்டுக் கொடுக்கப்படாது.',
    contextEn:
      'Reiterating official protocol following discussions on dignitary precedence during university convocations.',
    contextTa:
      'பல்கலைக்கழக பட்டமளிப்பு விழாக்களின் போது நெறிமுறை குறித்த விவாதங்களுக்குப் பின் தெளிவுபடுத்தப்பட்ட உரை.',
    speakerEn: 'A. Rajmohan · Minister for School Education, Tamil Development & DIPR',
    speakerTa: 'ஏ. ராஜமோகன் · பள்ளிக் கல்வி, தமிழ் வளர்ச்சி மற்றும் செய்தித்துறை அமைச்சர்',
  },
  {
    id: 'stmt-2',
    topicEn: 'Response to "Reels" Criticism & Governance Record',
    topicTa: 'விமர்சனங்களுக்கான பதிலடி & அரசு சாதனைகள்',
    dateEn: 'August 2026',
    dateTa: 'ஆகஸ்ட் 2026',
    quoteEn:
      'It is the people who are creating reels because they see genuine hope, change, and accountability. Our work is not in slogans but in tangible governance: the closure of 717 TASMAC shops, historic hike in freedom fighters’ pensions, and uncompromising anti-corruption audits across departments.',
    quoteTa:
      'மக்கள் உண்மையான மாற்றத்தையும், நம்பிக்கையையும் காண்பதால் அவர்களே ரீல்ஸ்களை உருவாக்குகிறார்கள். நமது பணிகள் வெற்று விளம்பரத்தில் இல்லை, மாறாக 717 டாஸ்மாக் கடைகள் மூடல், தியாகிகளுக்கான ஓய்வூதிய உயர்வு மற்றும் கடுமையான ஊழல் தடுப்பு சோதனைகள் மூலம் களத்தில் நிலைநிறுத்தப்பட்டுள்ளன.',
    contextEn:
      'Responding to opposition claims regarding social media communication and government delivery.',
    contextTa:
      'சமூக ஊடக பயன்பாடு குறித்த எதிர்க்கட்சிகளின் விமர்சனத்திற்கு கள சாதனைகளை முன்வைத்து அளிக்கப்பட்ட விளக்கம்.',
    speakerEn: 'A. Rajmohan · Minister for School Education, Tamil Development & DIPR',
    speakerTa: 'ஏ. ராஜமோகன் · பள்ளிக் கல்வி, தமிழ் வளர்ச்சி மற்றும் செய்தித்துறை அமைச்சர்',
  },
  {
    id: 'stmt-3',
    topicEn: 'Integrity Desk & Defence Against Disinformation',
    topicTa: 'தவறான பிரச்சாரங்களுக்கு எதிரான தடுப்பு நடவடிக்கை',
    dateEn: 'August 2026',
    dateTa: 'ஆகஸ்ட் 2026',
    quoteEn:
      'Deliberate, orchestrated smear campaigns aimed at misleading the public will be met with transparent facts. Through the Information Integrity Desk, every citizen and media outlet receives verified data with institutional accountability.',
    quoteTa:
      'திட்டமிட்டு பரப்பப்படும் உண்மைக்கு மாறான அவதூறுகள் வெளிப்படையான ஆதாரங்கள் கொண்டு முறியடிக்கப்படும். தகவல் ஒருமைப்பாடு பிரிவு மூலமாக ஒவ்வொரு குடிமகனுக்கும் உண்மையான தரவுகள் உரிய நேரத்தில் வழங்கப்படும்.',
    contextEn:
      'Addressing malicious disinformation targeting cabinet ministers and public policies.',
    contextTa:
      'அமைச்சர்கள் மற்றும் அரசு திட்டங்கள் குறித்து பரப்பப்படும் தவறான தகவல்களை எதிர்கொள்வது குறித்த உரை.',
    speakerEn: 'A. Rajmohan · Minister for School Education, Tamil Development & DIPR',
    speakerTa: 'ஏ. ராஜமோகன் · பள்ளிக் கல்வி, தமிழ் வளர்ச்சி மற்றும் செய்தித்துறை அமைச்சர்',
  },
  {
    id: 'stmt-4',
    topicEn: 'Two-Language Policy & School Fee Regulation',
    topicTa: 'இருமொழிக் கொள்கை & கட்டண ஒழுங்குமுறை',
    dateEn: 'August 2026',
    dateTa: 'ஆகஸ்ட் 2026',
    quoteEn:
      'Tamil Nadu stands resolutely by its time-tested Two-Language Policy (Tamil and English) and firmly opposes any imposition of three languages. Simultaneously, we are instituting a retired judges panel to safeguard parents against arbitrary private school fee hikes.',
    quoteTa:
      'தமிழ்நாடு தனது காலத்தால் நிரூபிக்கப்பட்ட இருமொழிக் கொள்கையில் (தமிழ் - ஆங்கிலம்) உறுதியாக உள்ளது. அதே சமயம், தனியார் பள்ளிகளின் அதீத கட்டண வசூலை முறைப்படுத்த ஓய்வுபெற்ற நீதிபதிகள் அடங்கிய குழு அமைக்கப்படுகிறது.',
    contextEn:
      'Aligning language rights with equitable education governance across the state.',
    contextTa:
      'மொழி உரிமை மற்றும் மாணவர் நலன் சார்ந்த கல்வி ஒழுங்குமுறை குறித்த விரிவான விளக்கம்.',
    speakerEn: 'A. Rajmohan · Minister for School Education, Tamil Development & DIPR',
    speakerTa: 'ஏ. ராஜமோகன் · பள்ளிக் கல்வி, தமிழ் வளர்ச்சி மற்றும் செய்தித்துறை அமைச்சர்',
  },
];

export function InfoMinisterStatements({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';

  return (
    <div className="space-y-8">
      {STATEMENTS.map((stmt) => (
        <article
          key={stmt.id}
          className="relative bg-white border border-sand-300 p-6 sm:p-8 md:p-10 shadow-xs hover:border-maroon-700 transition-colors"
        >
          {/* Decorative Quote Mark */}
          <div className="absolute top-6 right-6 text-sand-200 pointer-events-none">
            <Quote className="w-12 h-12 stroke-1" />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase px-2.5 py-1 bg-maroon-50 text-maroon-800 font-bold border border-maroon-200">
              {isTa ? stmt.topicTa : stmt.topicEn}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-charcoal-500 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {isTa ? stmt.dateTa : stmt.dateEn}
            </span>
          </div>

          {/* Pull Quote */}
          <blockquote className="font-display text-xl sm:text-2xl md:text-2xl text-charcoal-900 leading-snug tracking-tight my-4">
            “{isTa ? stmt.quoteTa : stmt.quoteEn}”
          </blockquote>

          {/* Attribution & Context */}
          <div className="mt-6 pt-4 border-t border-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-maroon-700 shrink-0" />
              <span className="font-semibold text-charcoal-800 font-sans">
                {isTa ? stmt.speakerTa : stmt.speakerEn}
              </span>
            </div>
            <span className="text-charcoal-500 font-sans italic">
              {isTa ? stmt.contextTa : stmt.contextEn}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
