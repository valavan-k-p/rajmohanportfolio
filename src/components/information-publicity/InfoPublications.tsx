'use client';

import type { InfoSectionProps } from './InfoTypes';
import { BookOpen, FileDown, Layers, MapPin, CheckCircle2 } from 'lucide-react';

interface PublicationItem {
  id: string;
  titleEn: string;
  titleTa: string;
  categoryEn: string;
  categoryTa: string;
  pages: number;
  size: string;
  languageEn: string;
  languageTa: string;
  distributionEn: string;
  distributionTa: string;
}

const PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-1',
    titleEn: 'Government of Tamil Nadu: Welfare Schemes Handbook 2026',
    titleTa: 'தமிழ்நாடு அரசு: மக்கள் நலத்திட்டங்கள் கையேடு 2026',
    categoryEn: 'Public Schemes & Eligibility',
    categoryTa: 'அரசு நலத்திட்டங்கள் & தகுதிகள்',
    pages: 148,
    size: '4.2 MB',
    languageEn: 'Bilingual (Tamil & English)',
    languageTa: 'இருமொழி (தமிழ் & ஆங்கிலம்)',
    distributionEn: 'District Collectorates, Taluk Offices, Public Libraries',
    distributionTa: 'மாவட்ட ஆட்சியர் அலுவலகங்கள், வட்டாட்சியர் அலுவலகங்கள், நூலகங்கள்',
  },
  {
    id: 'pub-2',
    titleEn: 'Information Integrity Desk: Standard Operating Procedures & Verification Manual',
    titleTa: 'தகவல் ஒருமைப்பாடு பிரிவு (IID): வழிகாட்டு நெறிமுறைகள் மற்றும் உண்மை சரிபார்ப்பு கையேடு',
    categoryEn: 'Administrative Framework',
    categoryTa: 'நிர்வாக நெறிமுறை',
    pages: 42,
    size: '1.8 MB',
    languageEn: 'Bilingual (Tamil & English)',
    languageTa: 'இருமொழி (தமிழ் & ஆங்கிலம்)',
    distributionEn: 'DIPR Media Desk, Department Nodal Officers, Press Clubs',
    distributionTa: 'செய்தித்துறை ஊடக பிரிவு, துறை ஒருங்கிணைப்பாளர்கள், பத்திரிகையாளர் மன்றங்கள்',
  },
  {
    id: 'pub-3',
    titleEn: 'Drug Free Tamil Nadu: Statewide Awareness & Youth Mobilization Action Plan',
    titleTa: 'போதையற்ற தமிழ்நாடு: மாநில அளவிலான விழிப்புணர்வு மற்றும் இளைஞர் செயல் திட்டம்',
    categoryEn: 'Social Welfare & Public Health',
    categoryTa: 'சமூக நலம் & பொது நலம்',
    pages: 64,
    size: '3.1 MB',
    languageEn: 'Bilingual (Tamil & English)',
    languageTa: 'இருமொழி (தமிழ் & ஆங்கிலம்)',
    distributionEn: 'Schools, Colleges, Universities, Youth Clubs',
    distributionTa: 'பள்ளிகள், கல்லூரிகள், பல்கலைக்கழகங்கள், இளைஞர் மன்றங்கள்',
  },
  {
    id: 'pub-4',
    titleEn: 'Two-Language Policy of Tamil Nadu: Cultural Heritage & Legal Precedents',
    titleTa: 'தமிழ்நாட்டின் இருமொழிக் கொள்கை: வரலாற்று அடித்தளம் மற்றும் சட்டபூர்வ முன்னுதாரணங்கள்',
    categoryEn: 'Language & Constitutional Rights',
    categoryTa: 'மொழி & அரசியல் சாசன உரிமைகள்',
    pages: 86,
    size: '2.4 MB',
    languageEn: 'Bilingual (Tamil & English)',
    languageTa: 'இருமொழி (தமிழ் & ஆங்கிலம்)',
    distributionEn: 'Educational Institutions, Research Centers, Media Kits',
    distributionTa: 'கல்வி நிறுவனங்கள், ஆராய்ச்சி மையங்கள், ஊடக தொகுப்புகள்',
  },
];

export function InfoPublications({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';

  return (
    <div className="space-y-8">
      {/* Overview Banner: Stationery & Printing Vertical */}
      <div className="bg-sand-100/80 p-6 border border-sand-300 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-maroon-700 font-mono text-xs font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            <span>{isTa ? 'அரசு அச்சகம் மற்றும் எழுதுபொருள் பிரிவு' : 'Stationery & Printing Vertical'}</span>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-700 font-sans">
            {isTa
              ? 'அனைத்து அரசு பிரசுரங்கள், கையேடுகள், அறிக்கைகள் மற்றும் செய்தித் தொகுப்புகள் தகவல் துறையின் கீழ் உள்ள அரசு அச்சகத்தால் வெளியிடப்பட்டு மாநிலம் முழுவதும் விநியோகிக்கப்படுகின்றன.'
              : 'Official brochures, pamphlets, and reports on schemes and policies are produced under the Stationery and Printing vertical linked to the Information portfolio.'}
          </p>
        </div>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PUBLICATIONS.map((pub) => (
          <div
            key={pub.id}
            className="bg-white p-6 border border-sand-300 rounded-sm flex flex-col justify-between hover:border-maroon-700 transition-colors shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-maroon-700 uppercase bg-maroon-50 px-2 py-0.5 border border-maroon-200">
                  {isTa ? pub.categoryTa : pub.categoryEn}
                </span>
                <span className="font-mono text-xs text-charcoal-500">{pub.size}</span>
              </div>

              <h4 className="font-display text-xl text-charcoal-900 font-medium leading-snug">
                {isTa ? pub.titleTa : pub.titleEn}
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-charcoal-600 pt-2 border-t border-sand-200">
                <div>
                  <span className="text-charcoal-400 block">{isTa ? 'பக்கங்கள்' : 'Pages'}:</span>
                  <span className="font-bold text-charcoal-800">{pub.pages} {isTa ? 'பக்கங்கள்' : 'Pages'}</span>
                </div>
                <div>
                  <span className="text-charcoal-400 block">{isTa ? 'மொழி' : 'Language'}:</span>
                  <span className="font-bold text-charcoal-800">{isTa ? pub.languageTa : pub.languageEn}</span>
                </div>
              </div>

              <div className="text-xs text-charcoal-600 font-sans flex items-start gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-maroon-700 shrink-0 mt-0.5" />
                <span>
                  <strong>{isTa ? 'விநியோகம்:' : 'Distribution:'}</strong>{' '}
                  {isTa ? pub.distributionTa : pub.distributionEn}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-charcoal-500 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {isTa ? 'அரசு ஆவணம்' : 'Verified Official Record'}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-900 text-white hover:bg-maroon-700 font-mono text-xs font-semibold rounded-xs transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" />
                {isTa ? 'பதிவிறக்கம்' : 'DIPR Release'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
