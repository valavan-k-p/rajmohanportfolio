'use client';

import Link from 'next/link';
import type { PortalId } from '@/config/portals';
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { cormorant } from './MlaTypography';
import { useState, useEffect, useRef } from 'react';
import { MlaScrollProgress } from './MlaMotion';
import { MlaStickyNav } from './MlaStickyNav';

const treatment = {
  ground: 'bg-sand-50',
  title: 'text-charcoal-900',
  standfirst: 'text-charcoal-700',
  align: 'text-left items-start',
  eyebrow: 'text-maroon-600',
};

export interface MlaHeroProps {
  readonly portal: PortalId; 
  readonly index: string;
  readonly title: string;
  readonly standfirst: string;
  readonly backLabel: string;
}

const EASE = [0.16, 1, 0.3, 1];

function MlaPreloader({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${treatment.ground} ${cormorant.variable}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE } }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-maroon-600 u-eyebrow mb-4"
      >
        04
      </motion.div>
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          className="font-display text-4xl text-charcoal-900 tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          MLA · Egmore
        </motion.h1>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
        className="h-[1px] bg-charcoal-200 mt-8 w-32"
        style={{ transformOrigin: 'center' }}
      />
    </motion.div>
  );
}

export function MlaHero({ index, title, standfirst, backLabel }: MlaHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [showPreloader, setShowPreloader] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yPortrait = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setShowPreloader(false), 2000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [showPreloader]);

  return (
    <>
      <MlaScrollProgress />
      <MlaStickyNav title={title} />
      <AnimatePresence>
        {showPreloader && <MlaPreloader onComplete={() => { document.body.style.overflow = ''; }} />}
      </AnimatePresence>

      <header 
        ref={heroRef}
        className={`relative min-h-[85vh] flex flex-col justify-center px-gutter py-24 ${treatment.ground} ${cormorant.variable} overflow-hidden`}
      >
        {/* Parallax Layers */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              style={{ y: yBackground }}
              className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-maroon-900 via-transparent to-transparent scale-150"
            />
            {/* Abstract portrait placeholder */}
            <motion.div 
              style={{ y: yPortrait }}
              className="absolute right-[-10%] bottom-[-10%] w-[60%] h-[80%] bg-gradient-to-tr from-sand-200 to-transparent rounded-full opacity-40 blur-3xl"
            />
          </div>
        )}

        <motion.div 
          className={`relative z-10 mx-auto flex w-full max-w-[76rem] flex-col gap-8 ${treatment.align}`}
          style={{ y: prefersReducedMotion ? 0 : yText, opacity: prefersReducedMotion ? 1 : opacityText }}
        >
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2, ease: EASE }}
          >
            <Link
              href="/"
              className={[
                'u-eyebrow inline-flex items-center gap-2 no-underline group',
                'transition-opacity duration-[160ms] hover:opacity-70',
                'text-charcoal-700',
              ].join(' ')}
            >
              <motion.span
                aria-hidden="true"
                whileHover={prefersReducedMotion ? {} : { x: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="inline-block"
              >
                &larr;
              </motion.span>
              <motion.span
                whileHover={prefersReducedMotion ? {} : { x: 2 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-charcoal-700 after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left"
              >
                {backLabel}
              </motion.span>
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4, ease: EASE }}
            aria-hidden="true"
            className={`u-eyebrow ${treatment.eyebrow}`}
          >
            {index}
          </motion.span>

          <div className="overflow-hidden py-2">
            <motion.h1
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : '100%' }}
              animate={{ opacity: 1, y: '0%' }}
              transition={{ duration: 1.2, delay: 2.5, ease: EASE }}
              className={`font-display text-[4rem] leading-[1.1] md:text-[6rem] lg:text-[7rem] ${treatment.title}`}
              style={{ 
                fontFamily: 'var(--font-cormorant)',
                letterSpacing: '0.015em',
                textShadow: '0 0 30px rgba(138, 115, 163, 0.15)'
              }}
            >
              {title}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.7, ease: EASE }}
            className={`u-measure text-xl md:text-2xl font-light leading-relaxed ${treatment.standfirst}`}
          >
            {standfirst}
          </motion.p>
        </motion.div>
      </header>
    </>
  );
}
