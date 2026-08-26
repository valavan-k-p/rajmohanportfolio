'use client';

import { useRef, useMemo } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';
import { geoEquirectangular, geoPath } from 'd3-geo';
import worldData from '@/data/world.json';

// Coordinates: [Longitude, Latitude]
const ORIGIN = { name: "Chennai", coords: [80.2707, 13.0827], label: "CHENNAI", labelOffset: [0, -15] };

const GLOBAL_NODES = [
  { name: "Sri Lanka", coords: [79.8612, 6.9271], label: "COLOMBO", labelOffset: [20, 10] },
  { name: "Singapore", coords: [103.8198, 1.3521], label: "SINGAPORE", labelOffset: [25, 0] },
  { name: "Malaysia", coords: [101.6869, 3.1390], label: "KUALA LUMPUR", labelOffset: [0, -20] },
  { name: "Mauritius", coords: [57.5012, -20.1609] },
  { name: "Réunion", coords: [55.4504, -20.8732] },
  { name: "UAE", coords: [55.2708, 25.2048], label: "DUBAI", labelOffset: [-10, -20] },
  { name: "UK", coords: [-0.1276, 51.5074], label: "LONDON", labelOffset: [-25, -15] },
  { name: "France", coords: [2.3522, 48.8566], label: "PARIS", labelOffset: [20, 15] },
  { name: "Canada", coords: [-79.3832, 43.6532], label: "TORONTO", labelOffset: [-35, -10] },
  { name: "US", coords: [-74.0060, 40.7128], label: "NEW YORK", labelOffset: [25, 10] },
  { name: "Australia", coords: [151.2093, -33.8688], label: "SYDNEY", labelOffset: [20, 15] },
  { name: "South Africa", coords: [31.0218, -29.8587] }
];

export function GlobalTamilMap({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width, height, pathString, projectedOrigin, projectedNodes } = useMemo(() => {
    const w = 1000;
    const h = 500;
    // We adjust scale and translate to fit nicely in 1000x500
    const projection = geoEquirectangular().scale(160).translate([w / 2, h / 2 + 30]);
    const pathGen = geoPath().projection(projection);
    
    const pathStr = pathGen(worldData as any) || '';
    const pOrigin = projection(ORIGIN.coords as [number, number]) || [0, 0];
    
    const pNodes = GLOBAL_NODES.map(node => {
      const p = projection(node.coords as [number, number]) || [0, 0];
      
      // Calculate elegant curved connection path
      const midX = (pOrigin[0] + p[0]) / 2;
      const dist = Math.abs(pOrigin[0] - p[0]);
      const dirY = pOrigin[1] > p[1] ? -1 : 1;
      const midY = (pOrigin[1] + p[1]) / 2 - dist * 0.25;
      
      const curve = `M ${pOrigin[0]},${pOrigin[1]} Q ${midX},${midY} ${p[0]},${p[1]}`;
      return { ...node, point: p, curve };
    });

    return { width: w, height: h, pathString: pathStr, projectedOrigin: pOrigin, projectedNodes: pNodes };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });

      tl.fromTo('.world-outline',
        { strokeDasharray: 4000, strokeDashoffset: 4000, opacity: 0 },
        { strokeDashoffset: 0, opacity: 0.3, duration: 2.5, ease: 'power2.out' }
      )
      .fromTo('.origin-node', 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, 
        "-=1.0"
      )
      .fromTo('.connection-path',
        { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 },
        { strokeDashoffset: 0, opacity: 0.6, duration: 1.5, stagger: 0.08, ease: 'power2.out' },
        "-=0.5"
      )
      .fromTo('.global-node',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' },
        "-=1.2"
      )
      .fromTo('.node-label',
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power1.out' },
        "-=1.0"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="global"
      chapterNumber="10"
      category={locale === 'ta' ? 'உலகத் தமிழ்' : 'GLOBAL TAMIL'}
      title={locale === 'ta' ? 'தமிழுக்கு எல்லைகள் இல்லை' : 'Tamil Has No Borders'}
      bgVariant="dark"
      className="text-center"
    >
      <div ref={containerRef} className="mt-8 flex flex-col items-center relative w-full">
        <p className="font-sans text-lg md:text-xl max-w-2xl text-[var(--color-tamil-gold-soft)]/90 mb-12 text-balance leading-relaxed">
          {locale === 'ta' 
            ? 'தமிழர்கள் எங்கெல்லாம் வாழ்கிறார்களோ, அங்கெல்லாம் தமிழ் தலைமுறைகளையும், கலாச்சாரங்களையும், சமூகங்களையும் தொடர்ந்து இணைக்கிறது.' 
            : 'Wherever Tamils live, Tamil continues to connect generations, cultures and communities.'}
        </p>
        
        {/* Geographically Accurate World Map */}
        <div className="relative w-full max-w-5xl aspect-[2.2/1] my-4 flex items-center justify-center overflow-visible">
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
            
            {/* World Map Base */}
            <path 
              className="world-outline" 
              d={pathString} 
              stroke="var(--color-tamil-gold)" 
              strokeWidth="0.8" 
              fill="none" 
              vectorEffect="non-scaling-stroke"
            />

            {/* Connection Lines */}
            <g stroke="var(--color-tamil-gold)" strokeWidth="1.2" fill="none" opacity="0.8" vectorEffect="non-scaling-stroke">
              {projectedNodes.map((node, i) => (
                <path key={`path-${i}`} className="connection-path" d={node.curve} />
              ))}
            </g>

            <g>
              {/* Origin Point */}
              {projectedOrigin && (
                <>
                  <circle className="origin-node" cx={projectedOrigin![0]} cy={projectedOrigin![1]} r="4" fill="var(--color-tamil-red)" stroke="var(--color-tamil-gold)" strokeWidth="1.5" />
                  <circle className="origin-node animate-ping" cx={projectedOrigin![0]} cy={projectedOrigin![1]} r="10" fill="var(--color-tamil-red)" opacity="0.3" style={{ transformOrigin: `${projectedOrigin![0]}px ${projectedOrigin![1]}px` }} />
                  
                  <text className="node-label font-sans text-[8px] md:text-[10px] font-bold tracking-widest fill-[var(--color-tamil-gold)]" x={projectedOrigin![0] + (ORIGIN.labelOffset[0] || 0)} y={projectedOrigin![1] + (ORIGIN.labelOffset[1] || 0)} textAnchor="middle">
                    {ORIGIN.label}
                  </text>
                </>
              )}

              {/* Global Tamil Hub Nodes */}
              {projectedNodes.map((node, i) => (
                <g key={`node-${i}`}>
                  <circle className="global-node" cx={node.point[0]} cy={node.point[1]} r="2.5" fill="var(--color-tamil-gold)" />
                  <circle className="global-node animate-pulse" cx={node.point[0]} cy={node.point[1]} r="6" fill="var(--color-tamil-gold)" opacity="0.3" style={{ transformOrigin: `${node.point[0]}px ${node.point[1]}px` }} />
                  
                  {node.label && (
                    <text 
                      className="node-label font-sans text-[7px] md:text-[9px] font-semibold tracking-[0.15em] fill-white/85" 
                      x={node.point[0] + (node.labelOffset?.[0] || 0)} 
                      y={node.point[1] + (node.labelOffset?.[1] || 0)} 
                      textAnchor={node.labelOffset?.[0] && node.labelOffset[0] > 0 ? "start" : node.labelOffset?.[0] && node.labelOffset[0] < 0 ? "end" : "middle"}
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-12 relative z-10">
          <Stat text={locale === 'ta' ? 'உலகத் தமிழ்ச் சங்கம்' : 'World Tamil Sangam'} />
          <Stat text={locale === 'ta' ? 'புலம்பெயர் அறிஞர்கள்' : 'Diaspora Scholars'} />
          <Stat text={locale === 'ta' ? 'மாநாடுகள்' : 'Conferences'} />
          <div className="flex flex-col items-center justify-center p-4">
            <span className="font-sans font-medium text-white text-lg">{locale === 'ta' ? 'உலகத் தமிழ் மாநாடு' : 'World Tamil Conference'}</span>
            <span className="text-[0.55rem] bg-white/10 px-2 py-0.5 rounded mt-1 font-bold tracking-widest text-[var(--color-tamil-gold)]">{locale === 'ta' ? 'முன்மொழியப்பட்டது / அறிக்கப்பட்டது' : 'PROPOSED / REPORTED'}</span>
          </div>
        </div>
      </div>
    </TamilSection>
  );
}

function Stat({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span className="font-sans font-medium text-white text-lg">{text}</span>
    </div>
  );
}
