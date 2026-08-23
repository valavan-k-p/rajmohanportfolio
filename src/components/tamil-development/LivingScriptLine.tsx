'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function LivingScriptLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useIsomorphicLayoutEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    // Get total length of path for draw-on effect
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0,
    });

    // Animate opacity immediately on mount
    gsap.to(path, { opacity: 0.6, duration: 1, delay: 0.5 });

    // Scroll trigger to draw line as user scrolls down the page
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Smooth scrubbing
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg
        ref={svgRef}
        className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 opacity-0 md:left-[10%] md:w-auto"
        preserveAspectRatio="none"
        viewBox="0 0 100 10000"
      >
        <path
          ref={pathRef}
          d="M50,0 Q60,1000 40,2000 T50,4000 Q60,6000 50,8000 T50,10000"
          fill="none"
          stroke="var(--color-tamil-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
