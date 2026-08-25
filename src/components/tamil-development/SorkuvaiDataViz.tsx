'use client';

import { useRef, useState, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DATA = {
  wordsUploaded: { value: 1533669, formatted: '15,33,669' },
  technicalWords: { value: 51622, formatted: '51,622' },
  students: { value: 200, formatted: '200' },
};

const ALL_TERMINOLOGY = [
  { ta: 'தமிழ்', en: 'TAMIL' },
  { ta: 'தமிழ் மொழி', en: 'TAMIL LANGUAGE' },
  { ta: 'சொற்குவை', en: 'SORKUVAI' },
  { ta: 'அகராதி', en: 'DICTIONARY' },
  { ta: 'கலைச்சொல்லாக்கம்', en: 'TERMINOLOGY' },
  { ta: 'மொழிபெயர்ப்பு', en: 'TRANSLATION' },
  { ta: 'மொழியியல்', en: 'LINGUISTICS' },
  { ta: 'இலக்கியம்', en: 'LITERATURE' },
  { ta: 'ஆய்வு', en: 'RESEARCH' },
  { ta: 'ஆராய்ச்சி', en: 'RESEARCH' },
  { ta: 'அறிவியல்', en: 'SCIENCE' },
  { ta: 'தொழில்நுட்பம்', en: 'TECHNOLOGY' },
  { ta: 'பொறியியல்', en: 'ENGINEERING' },
  { ta: 'மருத்துவம்', en: 'MEDICINE' },
  { ta: 'சட்டம்', en: 'LAW' },
  { ta: 'நிர்வாகம்', en: 'ADMINISTRATION' },
  { ta: 'கல்வி', en: 'EDUCATION' },
  { ta: 'தகவல்', en: 'INFORMATION' },
  { ta: 'தரவுத்தளம்', en: 'DATABASE' },
  { ta: 'இயந்திரக் கற்றல்', en: 'MACHINE LEARNING' },
  { ta: 'செயற்கை நுண்ணறிவு', en: 'ARTIFICIAL INTELLIGENCE' },
  { ta: 'மொழி தொழில்நுட்பம்', en: 'LANGUAGE TECHNOLOGY' },
  { ta: 'மின்னணு ஆளுமை', en: 'DIGITAL GOVERNANCE' },
  { ta: 'கணினி', en: 'COMPUTER' },
  { ta: 'இணையம்', en: 'INTERNET' },
  { ta: 'உலகத் தமிழ்', en: 'GLOBAL TAMIL' },
  { ta: 'அறிவியல் தமிழ்', en: 'SCIENTIFIC TAMIL' },
  { ta: 'கலைச்சொற்கள்', en: 'TECHNICAL TERMS' },
  { ta: 'வளர்ச்சி', en: 'DEVELOPMENT' },
  { ta: 'அறிவு', en: 'KNOWLEDGE' }
];

type ActiveWord = {
  id: string;
  ta: string;
  en: string | null;
  x: number;
  y: number;
  duration: number;
};

// --- SPATIAL DISTRIBUTION LOGIC ---
const REGIONS = [
  { xMin: 5, xMax: 20, yMin: 5, yMax: 25 }, // Top Left
  { xMin: 80, xMax: 95, yMin: 5, yMax: 25 }, // Top Right
  { xMin: 30, xMax: 70, yMin: 2, yMax: 12 }, // Top Center (Above title)
  { xMin: 2, xMax: 15, yMin: 35, yMax: 60 }, // Mid Left
  { xMin: 85, xMax: 98, yMin: 35, yMax: 60 }, // Mid Right
  { xMin: 5, xMax: 25, yMin: 65, yMax: 80 }, // Lower Left
  { xMin: 75, xMax: 95, yMin: 65, yMax: 80 }, // Lower Right
];

// Approximate width of a word in percentage based on character count
const getWordWidthPercentage = (text: string) => {
  return Math.min(Math.max(text.length * 1.5, 12), 25);
};

const isColliding = (x: number, y: number, textTa: string, currentWords: ActiveWord[]) => {
  // Center Box (The massive 15,33,669 block)
  if (x > 18 && x < 82 && y > 22 && y < 78) return true;
  
  // Top Storyline Title
  if (x > 25 && x < 75 && y < 20) return true;
  
  // Bottom Milestones
  if (y > 80) return true;

  // Collision with other words
  const newWidth = getWordWidthPercentage(textTa);
  for (const word of currentWords) {
    const wordWidth = getWordWidthPercentage(word.ta);
    const minDx = (wordWidth + newWidth) / 2 + 3; // +3% padding for breathing room
    const minDy = 14; // Minimum 14% vertical distance

    const dx = Math.abs(word.x - x);
    const dy = Math.abs(word.y - y);

    if (dx < minDx && dy < minDy) {
      return true; // Overlap detected
    }
  }

  return false;
};

function FloatingTerminologySystem() {
  const [activeWords, setActiveWords] = useState<ActiveWord[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const regionIndexRef = useRef(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isActive = true;

    const spawnWord = () => {
      if (!isActive) return;

      setActiveWords((current) => {
        const maxWords = typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 14;
        if (current.length >= maxWords) return current;

        // DUPLICATION PREVENTION
        const currentTerms = current.map(w => w.ta);
        const availableTerms = ALL_TERMINOLOGY.filter(t => !currentTerms.includes(t.ta));
        if (availableTerms.length === 0) return current;

        const term = availableTerms[Math.floor(Math.random() * availableTerms.length)]!;
        
        let validX = 0, validY = 0, foundSpot = false;
        let selectedRegionIndex = regionIndexRef.current;

        // Try 10 times to find a safe spot that doesn't overlap
        for (let attempts = 0; attempts < 10; attempts++) {
          let testRegionIndex = Math.floor(Math.random() * REGIONS.length);
          if (testRegionIndex === regionIndexRef.current) {
            testRegionIndex = (testRegionIndex + 1) % REGIONS.length;
          }
          const region = REGIONS[testRegionIndex]!;
          
          const testX = region.xMin + Math.random() * (region.xMax - region.xMin);
          const testY = region.yMin + Math.random() * (region.yMax - region.yMin);

          if (!isColliding(testX, testY, term.ta, current)) {
            validX = testX;
            validY = testY;
            selectedRegionIndex = testRegionIndex;
            foundSpot = true;
            break;
          }
        }

        if (!foundSpot) return current; // Screen is too crowded in valid zones, skip spawning

        regionIndexRef.current = selectedRegionIndex;
        
        const showEn = Math.random() > 0.4;
        const duration = 1.2 + Math.random() * 1.5;

        const newWord: ActiveWord = {
          id: Math.random().toString(36).substr(2, 9),
          ta: term.ta,
          en: showEn ? term.en : null,
          x: validX,
          y: validY,
          duration,
        };

        return [...current, newWord];
      });

      timeoutId = setTimeout(spawnWord, 100 + Math.random() * 200);
    };

    spawnWord();

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const handleWordComplete = (id: string) => {
    setActiveWords((current) => current.filter(w => w.id !== id));
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[20]">
      {activeWords.map((word) => (
        <FloatingWord 
          key={word.id} 
          word={word} 
          onComplete={() => handleWordComplete(word.id)} 
        />
      ))}
    </div>
  );
}

function FloatingWord({ word, onComplete }: { word: ActiveWord, onComplete: () => void }) {
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;

    const tl = gsap.timeline({ onComplete });
    const animType = Math.floor(Math.random() * 4);
    const driftDuration = word.duration;
    const inOutDuration = 0.5 + Math.random() * 0.3;
    const overlap = `-=${inOutDuration * 0.4}`;

    if (animType === 0) {
      tl.fromTo(el, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: inOutDuration, ease: 'power2.out' })
        .to(el, { y: -30 - Math.random() * 15, scale: 1.02, duration: driftDuration, ease: 'sine.inOut' }, overlap)
        .to(el, { opacity: 0, y: -50, scale: 0.95, duration: inOutDuration, ease: 'power2.in' }, overlap);
    } 
    else if (animType === 1) {
      const dir = Math.random() > 0.5 ? 1 : -1;
      tl.fromTo(el, { opacity: 0, x: -20 * dir, scale: 0.98 }, { opacity: 1, x: 0, scale: 1, duration: inOutDuration, ease: 'power1.out' })
        .to(el, { x: 30 * dir, y: (Math.random() - 0.5) * 20, duration: driftDuration, ease: 'sine.inOut' }, overlap)
        .to(el, { opacity: 0, x: 50 * dir, scale: 0.98, duration: inOutDuration, ease: 'power1.in' }, overlap);
    } 
    else if (animType === 2) {
      const dirX = Math.random() > 0.5 ? 1 : -1;
      tl.fromTo(el, { opacity: 0, y: 15, x: -15 * dirX, rotation: -3 * dirX }, { opacity: 1, y: 0, x: 0, rotation: 0, duration: inOutDuration, ease: 'back.out(1.2)' })
        .to(el, { y: -20, x: 20 * dirX, rotation: 3 * dirX, duration: driftDuration, ease: 'sine.inOut' }, overlap)
        .to(el, { opacity: 0, y: -35, x: 35 * dirX, duration: inOutDuration, ease: 'power2.in' }, overlap);
    } 
    else {
      tl.fromTo(el, { opacity: 0, scale: 0.8, y: 10 }, { opacity: 1, scale: 1.05, y: -5, duration: inOutDuration, ease: 'power3.out' })
        .to(el, { scale: 1, y: -15, duration: driftDuration, ease: 'power1.inOut' }, overlap)
        .to(el, { opacity: 0, scale: 0.9, y: -25, duration: inOutDuration, ease: 'power2.in' }, overlap);
    }

    return () => {
      tl.kill();
    };
  }, [word, onComplete]);

  return (
    <div 
      ref={wordRef}
      className="absolute px-4 py-2 rounded-full border border-[var(--color-tamil-gold)]/30 bg-[var(--color-tamil-ink)]/70 backdrop-blur-md shadow-[0_0_20px_rgba(207,168,48,0.1)] flex flex-col items-center justify-center min-w-[max-content]"
      style={{ left: `${word.x}%`, top: `${word.y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <div className="font-tamil-display text-[#fcd567] drop-shadow-[0_0_8px_rgba(252,213,103,0.4)] text-sm md:text-lg whitespace-nowrap">
        {word.ta}
      </div>
      {word.en && (
        <div className="text-[0.55rem] md:text-[0.6rem] uppercase tracking-wider text-[#fcd567]/80 mt-0.5 whitespace-nowrap">
          {word.en}
        </div>
      )}
    </div>
  );
}

// --- HERITAGE BACKGROUND ENGRAVING ---
function BackgroundEngraving() {
  const svgRef = useRef<SVGSVGElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(svgRef.current, {
        x: "-=20",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return Number((x - Math.floor(x)).toFixed(4));
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-[0] overflow-hidden opacity-[0.07] mix-blend-screen">
      <svg ref={svgRef} className="w-[120%] h-full min-w-[1200px]" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 40 }).map((_, i) => (
          <line 
            key={`fiber-${i}`}
            x1="0" 
            y1={i * 20 + pseudoRandom(i + 1) * 10} 
            x2="1200" 
            y2={i * 20 + pseudoRandom(i + 2) * 10} 
            stroke="var(--color-tamil-gold)" 
            strokeWidth={0.5 + pseudoRandom(i + 3)} 
            opacity={0.3 + pseudoRandom(i + 4) * 0.5} 
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => {
          const x = 50 + pseudoRandom(i + 5) * 1100;
          const y = 50 + pseudoRandom(i + 6) * 700;
          const scale = 0.5 + pseudoRandom(i + 7) * 1.5;
          return (
            <g key={`script-${i}`} transform={`translate(${x}, ${y}) scale(${scale})`} stroke="var(--color-tamil-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.6 + pseudoRandom(i + 8) * 0.4}>
              <path d="M0,0 C5,-5 10,-5 10,0 C10,5 5,5 0,0 M15,-5 V5 M30,0 C35,-5 40,0 35,5 M50,-5 C45,0 50,5 55,0" />
              <path d="M-10,15 C-5,10 0,10 0,15 C0,20 -5,20 -10,15 M5,10 V20 M20,15 C25,10 30,15 25,20 M40,10 C35,15 40,20 45,15" />
            </g>
          );
        })}
        <line x1="200" y1="0" x2="200" y2="800" stroke="var(--color-tamil-gold)" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
        <circle cx="200" cy="400" r="15" stroke="var(--color-tamil-gold)" strokeWidth="1" fill="none" opacity="0.6" />
        
        <line x1="1000" y1="0" x2="1000" y2="800" stroke="var(--color-tamil-gold)" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
        <circle cx="1000" cy="400" r="15" stroke="var(--color-tamil-gold)" strokeWidth="1" fill="none" opacity="0.6" />
      </svg>
    </div>
  );
}

export function SorkuvaiDataViz({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  // Effect 1: One-time GSAP animations (entrance + count-up + milestones)
  // This runs ONCE and is never reverted by locale changes.
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero card entrance
      gsap.fromTo(heroRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Count-up animation
      const counter = { val: 0 };
      gsap.to(counter, {
        val: DATA.wordsUploaded.value,
        duration: 3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.innerText = Math.ceil(counter.val).toLocaleString('en-IN');
          }
        },
        onComplete: () => {
          hasAnimatedRef.current = true;
          if (countRef.current) {
            countRef.current.innerText = DATA.wordsUploaded.formatted;
          }
        }
      });

      // Milestones fade in
      gsap.fromTo('.milestone',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.milestones-container',
            start: 'top 85%',
            once: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Effect 2: On locale change, ensure the number stays correct
  useEffect(() => {
    if (hasAnimatedRef.current && countRef.current) {
      countRef.current.innerText = DATA.wordsUploaded.formatted;
    }
  }, [locale]);

  return (
    <TamilSection
      id="sorkuvai"
      chapterNumber="04"
      category={locale === 'ta' ? 'மின் தமிழ்' : 'DIGITAL TAMIL'}
      title={locale === 'ta' ? 'சொற்குவை' : 'Sorkuvai'}
      bgVariant="charcoal"
      className="relative pb-0 z-0 overflow-hidden" 
    >
      <div ref={containerRef} className="mt-16 flex flex-col items-center relative w-full">
        
        <BackgroundEngraving />

        <div className="relative z-[30] text-center mb-12 opacity-80 uppercase tracking-widest text-xs md:text-sm font-bold text-[var(--color-tamil-gold)] drop-shadow-md">
          {locale === 'ta' ? 'சொற்கள் → அறிவு → மின் தமிழ்' : 'FROM WORDS → KNOWLEDGE → DIGITAL TAMIL'}
        </div>

        <div className="relative w-full max-w-6xl h-[400px] md:h-[500px] flex items-center justify-center mb-16">
          
          <FloatingTerminologySystem />

          <div ref={heroRef} className="relative z-[30] text-center bg-gradient-to-b from-[var(--color-tamil-ink)]/90 to-[var(--color-tamil-ink)]/70 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] border border-[var(--color-tamil-gold)]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <style dangerouslySetInnerHTML={{ __html: `
              .sorkuvai-hero-number {
                font-family: var(--font-serif-editorial), var(--font-display), Georgia, serif !important;
                font-size: 6rem !important;
                font-weight: 700 !important;
                letter-spacing: -0.02em !important;
                line-height: 1 !important;
              }
              :lang(ta) .sorkuvai-hero-number,
              [lang="ta"] .sorkuvai-hero-number,
              .locale-ta .sorkuvai-hero-number {
                font-family: var(--font-noto-serif-tamil), serif !important;
              }
              @media (max-width: 768px) {
                .sorkuvai-hero-number {
                  font-size: 3rem !important;
                }
              }
            ` }} />
            <div className="text-[#fcd567] drop-shadow-[0_0_20px_rgba(252,213,103,0.15)]">
              <span ref={countRef} className="sorkuvai-hero-number">{DATA.wordsUploaded.formatted}</span>
            </div>
            <div className="mt-6 flex flex-col items-center gap-2">
              <span className="text-xl md:text-3xl text-white font-medium">
                {locale === 'ta' ? 'பதியப்பட்ட தமிழ்ச் சொற்கள்' : 'Tamil words uploaded'}
              </span>
              <span className="text-xs uppercase tracking-widest text-[var(--color-tamil-gold)]/70 border-t border-[var(--color-tamil-gold)]/20 pt-2 mt-1">
                {locale === 'ta' ? 'மார்ச் 2025 வரை' : 'up to March 2025'}
              </span>
            </div>
          </div>
        </div>

        <div className="milestones-container grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-[30]">
          <Milestone 
            value={DATA.technicalWords.formatted}
            title={locale === 'ta' ? 'உருவாக்கப்பட்ட கலைச்சொற்கள்' : 'technical words coined'}
            subtitle={locale === 'ta' ? 'தொழில்நுட்பம் → அறிவியல் → நிர்வாகம்' : 'TECHNOLOGY → SCIENCE → ADMINISTRATION'}
            context={locale === 'ta' ? '178 வல்லுநர் கூட்டங்கள் மூலம்' : 'through 178 expert meetings'}
          />
          <Milestone 
            value={DATA.students.formatted}
            title={locale === 'ta' ? 'ஆண்டுதோறும் தேர்ந்தெடுக்கப்படும் மாணவர்கள்' : 'students selected annually'}
            subtitle={locale === 'ta' ? 'இளைஞர் → கற்றல் → எதிர்காலத் தமிழ்' : 'YOUTH → LEARNING → FUTURE TAMIL'}
            context={locale === 'ta' ? 'இளைய அகராதியாளர் திட்டம்' : 'Young Lexicographer programme'}
          />
        </div>
      </div>
    </TamilSection>
  );
}

function Milestone({ value, title, subtitle, context }: { value: string, title: string, subtitle: string, context: string }) {
  return (
    <div className="milestone flex flex-col items-center text-center p-8 border-t border-[var(--color-tamil-gold)]/20 bg-[var(--color-tamil-ink)]/50 backdrop-blur-md rounded-b-2xl relative group shadow-xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#fcd567] group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(252,213,103,0.5)]" />
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">{value}</div>
      <div className="text-lg text-[#fcd567] font-medium mb-4">{title}</div>
      <div className="text-[0.65rem] font-bold tracking-widest uppercase text-white/50 mb-2">{subtitle}</div>
      <div className="text-[0.65rem] uppercase tracking-wider text-[var(--color-tamil-red)]">{context}</div>
    </div>
  );
}
