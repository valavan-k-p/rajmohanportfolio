'use client';

import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';

export function MlaStickyNav({ title }: { title: string }) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 500) {
      if (latest < lastY) {
        // Scrolling up
        setIsVisible(true);
      } else if (latest > lastY + 10) {
        // Scrolling down
        setIsVisible(false);
      }
    } else {
      setIsVisible(false);
    }
    setLastY(latest);
  });

  return (
    <motion.nav
      initial={{ y: '-100%' }}
      animate={{ y: isVisible ? '0%' : '-100%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
    >
      <div className="mx-auto max-w-[76rem] px-4 md:px-12 h-16 flex items-center justify-between">
        <span 
          className="text-slate-900 text-xl font-display tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {title}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-50 animate-pulse" />
          <span className="text-[0.65rem] uppercase tracking-widest text-slate-900 font-bold">Scrolling</span>
        </div>
      </div>
    </motion.nav>
  );
}
