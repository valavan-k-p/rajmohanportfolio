'use client';

import { useState } from 'react';
import type { InfoSectionProps } from './InfoTypes';
import { FileText, ExternalLink, Search, Filter } from 'lucide-react';

interface PressReleaseItem {
  id: string;
  refNo: string;
  dateEn: string;
  dateTa: string;
  categoryEn: string;
  categoryTa: string;
  titleEn: string;
  titleTa: string;
  summaryEn: string;
  summaryTa: string;
  link?: string;
  isDownloadable?: boolean;
}

const RELEASES: PressReleaseItem[] = [
  {
    id: 'pr-1',
    refNo: 'PR-2026-TN-084',
    dateEn: 'August 2026',
    dateTa: 'ஆகஸ்ட் 2026',
    categoryEn: 'Legislative Resolution',
    categoryTa: 'சட்டமன்ற தீர்மானம்',
    titleEn: 'Tamil Nadu Assembly Adopts Resolution on FCRA Amendment Bill, 2026',
    titleTa: '2026 FCRA சட்டத்திருத்த மசோதாவுக்கு எதிராக தமிழ்நாடு சட்டமன்றத்தில் அரசு தீர்மானம்',
    summaryEn:
      'Moved by Minister A. Rajmohan, expressing grave concern over stringent restrictions on non-profit organisations, social trusts, and grassroots welfare bodies in Tamil Nadu.',
    summaryTa:
      'அமைச்சர் ஏ. ராஜமோகன் அவர்களால் முன்மொழியப்பட்டு, தன்னார்வ தொண்டு நிறுவனங்கள் மற்றும் சமூக நல அமைப்புகள் மீதான மத்திய அரசின் கட்டுப்பாடுகள் குறித்து ஆழ்ந்த கவலை தெரிவித்து தீர்மானம் நிறைவேற்றப்பட்டது.',
    link: 'https://lokbhavan.tn.gov.in/category/press-release/',
  },
  {
    id: 'pr-2',
    refNo: 'LB-2026-PR-112',
    dateEn: '15 August 2026',
    dateTa: '15 ஆகஸ்ட் 2026',
    categoryEn: 'Lok Bhavan Secretariat',
    categoryTa: 'ஆளுநர் செயலகம்',
    titleEn: 'Governor of Tamil Nadu Issues Independence Day 2026 State Address',
    titleTa: 'சுதந்திர தினத்தை முன்னிட்டு தமிழ்நாடு ஆளுநரின் அதிகாரப்பூர்வ வாழ்த்துச் செய்தி',
    summaryEn:
      'Official Independence Day address highlighting state heritage, national unity, and developmental priorities across districts.',
    summaryTa:
      'மாநிலத்தின் பாரம்பரியம், தேசிய ஒற்றுமை மற்றும் மாவட்ட அளவிலான வளர்ச்சிப் பணிகளை முன்னிறுத்தி வெளியிடப்பட்ட அதிகாரப்பூர்வ சுதந்திர தின உரை.',
    link: 'https://lokbhavan.tn.gov.in/category/press-release/',
  },
  {
    id: 'pr-3',
    refNo: 'PR-2026-TN-079',
    dateEn: 'August 2026',
    dateTa: 'ஆகஸ்ட் 2026',
    categoryEn: 'Public Administration',
    categoryTa: 'பொது நிர்வாகம்',
    titleEn: 'Notification on Statewide Census Self-Enumeration & Verification Protocols',
    titleTa: 'மாநில அளவிலான மக்கள் தொகை கணக்கெடுப்பு சுய பதிவேற்றம் மற்றும் வழிகாட்டு நெறிமுறைகள்',
    summaryEn:
      'Guidelines and public awareness schedule for self-enumeration through digital portals across all municipal corporations and village panchayats.',
    summaryTa:
      'அனைத்து மாநகராட்சிகள் மற்றும் கிராம ஊராட்சிகளுக்கான டிஜிட்டல் கணக்கெடுப்பு பதிவு மற்றும் விழிப்புணர்வுக்கான அதிகாரப்பூர்வ அறிவிப்பு.',
  },
  {
    id: 'pr-4',
    refNo: 'PR-2026-TN-065',
    dateEn: 'July 2026',
    dateTa: 'ஜூலை 2026',
    categoryEn: 'Protocol & Culture',
    categoryTa: 'நெறிமுறை & பண்பாடு',
    titleEn: 'Standard Protocol Framework for University Convocations & Official Functions',
    titleTa: 'பல்கலைக்கழக பட்டமளிப்பு விழாக்கள் மற்றும் அரசு நிகழ்வுகளுக்கான நெறிமுறை வரைவு',
    summaryEn:
      'DIPR and Higher Education circular reiterating the mandatory first rendition of "Tamil Thai Vaazhthu" at all state government events.',
    summaryTa:
      'அனைத்து அரசு மற்றும் பல்கலைக்கழக பட்டமளிப்பு விழாக்களிலும் தமிழ் தாய் வாழ்த்து முதலிடம் பெறுவதை உறுதி செய்யும் சுற்றறிக்கை.',
  },
  {
    id: 'pr-5',
    refNo: 'PR-2026-TN-058',
    dateEn: 'July 2026',
    dateTa: 'ஜூலை 2026',
    categoryEn: 'Public Health & Youth',
    categoryTa: 'பொது நலம் & இளைஞர் நலம்',
    titleEn: 'Drug Free Tamil Nadu: Multi-Departmental Campaign & School Pledge Drive',
    titleTa: 'போதையற்ற தமிழ்நாடு: மாநில அளவிலான பள்ளி, கல்லூரி உறுதிமொழி மற்றும் விழிப்புணர்வு இயக்கம்',
    summaryEn:
      'Mass awareness drive, student rallies, and district-level felicitation ceremonies organized under the direct coverage of DIPR.',
    summaryTa:
      'மாணவர்கள் மற்றும் இளைஞர்கள் பங்கேற்ற மாபெரும் போதை எதிர்ப்பு விழிப்புணர்வு பிரச்சாரங்கள் மற்றும் மாவட்ட விருதுகள் குறித்த அறிவிப்பு.',
  },
];

export function InfoPressReleases({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredReleases = RELEASES.filter((item) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleTa.includes(searchTerm) ||
      item.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summaryEn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === 'all' || item.categoryEn.toLowerCase() === filterCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Control Bar: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-sand-100/70 border border-sand-300 rounded-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isTa ? 'செய்திக் குறிப்புகள் / குறியீட்டு எண் தேடுக...' : 'Search releases by keyword, topic or reference ID...'}
            className="w-full pl-9 pr-4 py-2 bg-white border border-sand-300 text-sm font-sans text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-maroon-700 rounded-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-charcoal-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-white border border-sand-300 text-xs font-mono uppercase px-3 py-2 text-charcoal-800 focus:outline-none focus:border-maroon-700"
          >
            <option value="all">{isTa ? 'அனைத்து பிரிவுகள்' : 'All Categories'}</option>
            <option value="legislative resolution">{isTa ? 'சட்டமன்ற தீர்மானம்' : 'Legislative Resolution'}</option>
            <option value="lok bhavan secretariat">{isTa ? 'ஆளுநர் செயலகம்' : 'Lok Bhavan Secretariat'}</option>
            <option value="public administration">{isTa ? 'பொது நிர்வாகம்' : 'Public Administration'}</option>
            <option value="protocol & culture">{isTa ? 'நெறிமுறை & பண்பாடு' : 'Protocol & Culture'}</option>
            <option value="public health & youth">{isTa ? 'பொது நலம் & இளைஞர் நலம்' : 'Public Health & Youth'}</option>
          </select>
        </div>
      </div>

      {/* Reverse-Chronological Table / List */}
      <div className="overflow-hidden border border-sand-300 bg-white rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-charcoal-900 text-white font-mono text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-medium w-28">{isTa ? 'தேதி' : 'Date'}</th>
                <th className="py-3 px-4 font-medium w-36">{isTa ? 'குறிப்பு எண்' : 'Ref. Code'}</th>
                <th className="py-3 px-4 font-medium w-40">{isTa ? 'பிரிவு' : 'Department / Tag'}</th>
                <th className="py-3 px-4 font-medium">{isTa ? 'தலைப்பு & சுருக்கம்' : 'Title & Dispatch Summary'}</th>
                <th className="py-3 px-4 font-medium text-right w-28">{isTa ? 'இணைப்பு' : 'Source'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 font-sans text-sm text-charcoal-800">
              {filteredReleases.map((item) => (
                <tr key={item.id} className="hover:bg-sand-50 transition-colors group">
                  <td className="py-4 px-4 font-mono text-xs text-charcoal-600 align-top whitespace-nowrap">
                    {isTa ? item.dateTa : item.dateEn}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs font-semibold text-maroon-700 align-top whitespace-nowrap">
                    {item.refNo}
                  </td>
                  <td className="py-4 px-4 align-top whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 text-xs font-mono bg-sand-200/70 text-charcoal-800 rounded-xs">
                      {isTa ? item.categoryTa : item.categoryEn}
                    </span>
                  </td>
                  <td className="py-4 px-4 align-top space-y-1">
                    <div className="font-display text-base sm:text-lg text-charcoal-950 font-medium leading-snug group-hover:text-maroon-800 transition-colors">
                      {isTa ? item.titleTa : item.titleEn}
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                      {isTa ? item.summaryTa : item.summaryEn}
                    </p>
                  </td>
                  <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-maroon-700 hover:text-maroon-900 font-bold underline underline-offset-4"
                      >
                        {isTa ? 'ஆதாரம்' : 'Official Portal'} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-charcoal-400">
                        <FileText className="w-3.5 h-3.5" /> DIPR Note
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Repository Notice */}
      <div className="p-4 bg-sand-100/60 border border-sand-300 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal-600 font-sans">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-maroon-700" />
          <span>
            {isTa
              ? 'முழுமையான முந்தைய ஆளுநர் மற்றும் அரசு செய்திக் குறிப்புகளுக்கு லோக் பவன் இணையதளத்தை அணுகவும்.'
              : 'For complete archived Governor and state press notes, access the official Lok Bhavan repository.'}
          </span>
        </div>
        <a
          href="https://lokbhavan.tn.gov.in/category/press-release/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-maroon-700 hover:text-maroon-900 font-bold uppercase inline-flex items-center gap-1"
        >
          lokbhavan.tn.gov.in <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
