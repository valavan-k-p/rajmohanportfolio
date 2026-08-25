'use client';

import { useState } from 'react';
import type { InfoSectionProps } from './InfoTypes';
import { Camera, Image as ImageIcon, X as CloseIcon, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  InfoReveal,
  InfoImageReveal,
  InfoStaggerContainer,
  InfoStaggerItem,
  CINEMATIC_EASE,
} from './InfoMotion';

interface PhotoItem {
  id: string;
  titleEn: string;
  titleTa: string;
  categoryEn: string;
  categoryTa: string;
  dateEn: string;
  dateTa: string;
  captionEn: string;
  captionTa: string;
  aspect: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 'ph-1',
    titleEn: '"Madras on Stage" Media & Cultural Photo Exhibition',
    titleTa: '"மெட்ராஸ் ஆன் ஸ்டேஜ்" ஊடக மற்றும் பண்பாட்டு புகைப்பட கண்காட்சி',
    categoryEn: 'Cultural Exhibit',
    categoryTa: 'பண்பாட்டுக் கண்காட்சி',
    dateEn: 'August 2026',
    dateTa: 'ஆகஸ்ட் 2026',
    captionEn: 'Minister A. Rajmohan inaugurating the retrospective photography exhibition honoring historic news institutions and photojournalists in Chennai.',
    captionTa: 'சென்னையின் இதழியல் வரலாறு மற்றும் பத்திரிகை புகைப்படக் கலைஞர்களை போற்றும் வரலாற்று கண்காட்சியை அமைச்சர் ஏ. ராஜமோகன் தொடங்கி வைத்த காட்சி.',
    aspect: 'aspect-4/3',
  },
  {
    id: 'ph-2',
    titleEn: 'Information Integrity Desk Operational Review',
    titleTa: 'தகவல் ஒருமைப்பாடு பிரிவு செயல்பாட்டு ஆய்வு கூட்டம்',
    categoryEn: 'Governance & Media',
    categoryTa: 'நிர்வாகம் & ஊடகம்',
    dateEn: 'August 2026',
    dateTa: 'ஆகஸ்ட் 2026',
    captionEn: 'High-level departmental review with IID Head Guru and nodal officers on 1-hour high-priority response SLA adherence.',
    captionTa: 'IID தலைவர் குரு மற்றும் துறை ஒருங்கிணைப்பாளர்களுடன் அதிமுக்கிய உண்மை சரிபார்ப்பு பணிகள் குறித்த உயர்நிலைக் கூட்டம்.',
    aspect: 'aspect-16/9',
  },
  {
    id: 'ph-3',
    titleEn: 'Drug Free Tamil Nadu Statewide Youth Rally & Pledge Drive',
    titleTa: 'போதையற்ற தமிழ்நாடு: மாநில அளவிலான இளைஞர் பேரணி மற்றும் உறுதிமொழி',
    categoryEn: 'Public Campaign',
    categoryTa: 'மக்கள் இயக்கம்',
    dateEn: 'July 2026',
    dateTa: 'ஜூலை 2026',
    captionEn: 'Thousands of school and college students taking the de-addiction pledge alongside cabinet dignitaries across districts.',
    captionTa: 'மாவட்டங்கள் தோறும் லட்சக்கணக்கான பள்ளி, கல்லூரி மாணவர்கள் போதை எதிர்ப்பு உறுதிமொழி ஏற்கும் மாபெரும் விழிப்புணர்வு நிகழ்வு.',
    aspect: 'aspect-16/9',
  },
  {
    id: 'ph-4',
    titleEn: 'Secretariat Press Conference on Educational Policy & Autonomy',
    titleTa: 'கல்விக் கொள்கை மற்றும் மாநில உரிமை குறித்த தலைமைச் செயலக செய்தியாளர் சந்திப்பு',
    categoryEn: 'Press Briefing',
    categoryTa: 'செய்தியாளர் சந்திப்பு',
    dateEn: 'July 2026',
    dateTa: 'ஜூலை 2026',
    captionEn: 'Ministerial briefing explaining the state’s two-language policy and fee monitoring committee at the Secretariat Media Centre.',
    captionTa: 'தலைமைச் செயலக ஊடக மையத்தில் இருமொழிக் கொள்கை மற்றும் கல்விக் கட்டண ஒழுங்குமுறை குறித்து அளிக்கப்பட்ட விளக்கம்.',
    aspect: 'aspect-4/3',
  },
];

export function InfoPhotoArchive({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <div className="space-y-8">
      {/* Social Media Repositories Directory */}
      <InfoReveal direction="up" delay={0.05} showTopLine={false}>
        <div className="bg-sand-100/80 p-6 sm:p-7 border border-sand-300 rounded-sm space-y-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-maroon-700" />
              <h3 className="font-display text-lg text-charcoal-900 font-bold">
                {isTa ? 'அதிகாரப்பூர்வ சமூக ஊடக புகைப்பட & காணொளி களஞ்சியங்கள்' : 'Official Social Media Photo & Video Repositories'}
              </h3>
            </div>
            <span className="font-mono text-xs text-charcoal-500 uppercase">
              {isTa ? 'நேரலை புகைப்படங்கள்' : 'Real-Time Archives'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a
              href="https://x.com/TNDIPRNEWS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 bg-white border border-sand-300 hover:border-maroon-700 hover:shadow-xs transition-all group rounded-2xs"
            >
              <Twitter className="w-4 h-4 text-sky-600 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <div className="font-mono text-xs font-bold text-charcoal-900 truncate">@TNDIPRNEWS</div>
                <div className="text-[11px] text-charcoal-500 font-sans">{isTa ? 'எக்ஸ் (Twitter)' : 'X / Twitter'}</div>
              </div>
            </a>

            <a
              href="https://www.instagram.com/tndipr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 bg-white border border-sand-300 hover:border-maroon-700 hover:shadow-xs transition-all group rounded-2xs"
            >
              <Instagram className="w-4 h-4 text-maroon-600 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <div className="font-mono text-xs font-bold text-charcoal-900 truncate">@tndipr</div>
                <div className="text-[11px] text-charcoal-500 font-sans">{isTa ? 'இன்ஸ்டாகிராம்' : 'Instagram'}</div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/share/1CFFTdrjUP/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 bg-white border border-sand-300 hover:border-maroon-700 hover:shadow-xs transition-all group rounded-2xs"
            >
              <Facebook className="w-4 h-4 text-charcoal-600 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <div className="font-mono text-xs font-bold text-charcoal-900 truncate">TN DIPR Page</div>
                <div className="text-[11px] text-charcoal-500 font-sans">{isTa ? 'ஃபேஸ்புக்' : 'Facebook'}</div>
              </div>
            </a>

            <div className="flex items-center gap-2.5 p-3 bg-white border border-sand-300 rounded-2xs">
              <MessageCircle className="w-4 h-4 text-yellow-600 shrink-0" />
              <div className="min-w-0">
                <div className="font-mono text-xs font-bold text-charcoal-900 truncate">WhatsApp Channel</div>
                <div className="text-[11px] text-charcoal-500 font-sans">{isTa ? 'வாட்ஸ்அப் சேனல்' : 'Broadcasts'}</div>
              </div>
            </div>
          </div>
        </div>
      </InfoReveal>

      {/* Curated Photographic Grid with Image Settle & Hover Zoom */}
      <InfoStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
        {PHOTOS.map((item) => (
          <InfoStaggerItem
            key={item.id}
            direction="up"
            showTopLine={false}
            className="bg-white border border-sand-300 rounded-sm overflow-hidden hover:border-maroon-700 hover:shadow-md transition-all cursor-pointer group"
          >
            <div onClick={() => setSelectedPhoto(item)}>
              {/* Visual Canvas Card with Mask Reveal */}
              <InfoImageReveal delay={0.1} hoverZoom={true} className="aspect-16/9 bg-charcoal-900 border-b border-sand-200">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:12px_12px] opacity-30 group-hover:scale-105 transition-transform duration-500" />
                  
                  <div className="relative z-10 text-center p-6 space-y-2">
                    <ImageIcon className="w-10 h-10 text-sand-300 mx-auto group-hover:text-yellow-400 transition-colors" />
                    <span className="inline-block font-mono text-xs uppercase tracking-widest text-sand-300 bg-charcoal-950/80 px-2.5 py-1 border border-charcoal-700 backdrop-blur-xs">
                      {isTa ? item.categoryTa : item.categoryEn}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="font-mono text-xs bg-black/80 text-white px-2 py-0.5 border border-white/10">
                      {isTa ? item.dateTa : item.dateEn}
                    </span>
                  </div>
                </div>
              </InfoImageReveal>

              {/* Photo Metadata */}
              <div className="p-5 space-y-2">
                <h4 className="font-display text-lg text-charcoal-900 font-bold leading-snug group-hover:text-maroon-700 transition-colors">
                  {isTa ? item.titleTa : item.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-600 font-sans line-clamp-2 leading-relaxed">
                  {isTa ? item.captionTa : item.captionEn}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-maroon-700 font-bold">
                  <span>{isTa ? 'ஆவணப் புகைப்படம்' : 'Official Archive Record'}</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    {isTa ? 'விரிவாகக் காண்க' : 'Open Preview'} ↗
                  </span>
                </div>
              </div>
            </div>
          </InfoStaggerItem>
        ))}
      </InfoStaggerContainer>

      {/* Interactive Lightbox Modal with Spring Entrance */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: CINEMATIC_EASE }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
              className="bg-white max-w-2xl w-full border border-sand-300 rounded-sm overflow-hidden shadow-2xl space-y-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-sand-200">
                <span className="font-mono text-xs font-bold text-maroon-700 uppercase bg-maroon-50 px-2.5 py-0.5 border border-maroon-200">
                  {isTa ? selectedPhoto.categoryTa : selectedPhoto.categoryEn} · {isTa ? selectedPhoto.dateTa : selectedPhoto.dateEn}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="text-charcoal-500 hover:text-charcoal-900 p-1 hover:bg-sand-100 rounded-2xs transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-16/9 bg-charcoal-950 flex items-center justify-center border border-sand-300 rounded-xs">
                <div className="text-center space-y-2 text-sand-300 p-6">
                  <Camera className="w-12 h-12 mx-auto text-yellow-400 animate-pulse" />
                  <div className="font-display text-xl text-white">
                    {isTa ? selectedPhoto.titleTa : selectedPhoto.titleEn}
                  </div>
                  <div className="font-mono text-xs text-charcoal-400">TN DIPR STATE ARCHIVE</div>
                </div>
              </div>

              <p className="text-sm text-charcoal-700 font-sans leading-relaxed">
                {isTa ? selectedPhoto.captionTa : selectedPhoto.captionEn}
              </p>

              <div className="pt-3 border-t border-sand-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-1.5 bg-charcoal-900 hover:bg-maroon-700 text-white font-mono text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  {isTa ? 'மூடுக' : 'Close Viewer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
