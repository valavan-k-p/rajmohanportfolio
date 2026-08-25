'use client';

import { motion, useReducedMotion, useScroll, useSpring, useInView, animate } from 'motion/react';
import { type ReactNode, useEffect, useRef } from 'react';

// Common easing (elegant, slow, subtle ease-out)
const EASE = [0.16, 1, 0.3, 1] as const;

export function MlaReveal({
  children,
  delay = 0,
  y = 25,
  x = 0,
  scale = 1,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : y, x: prefersReducedMotion ? 0 : x, scale: prefersReducedMotion ? 1 : scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MlaStaggerContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.07,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MlaStaggerItem({ children, className = '', y = 20, x = 0 }: { children: ReactNode; className?: string; y?: number; x?: number }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y, x: prefersReducedMotion ? 0 : x },
        visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.8, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MlaLineReveal({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ transformOrigin: 'left' }}
      className={className}
    />
  );
}

export function MlaVerticalLineReveal({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ transformOrigin: 'top' }}
      className={className}
    />
  );
}

export function MlaHoverCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MlaImageReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.0, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function MlaTextReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: prefersReducedMotion ? 0 : '100%', opacity: prefersReducedMotion ? 0 : 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function MlaScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 w-1 bg-slate-900/20 origin-top z-50"
      style={{ scaleY }}
    >
      <motion.div className="w-full h-full bg-slate-900" />
    </motion.div>
  );
}

export function MlaCounter({ value, className = '', format = 'number' }: { value: number, className?: string, format?: 'number' | 'decimal' }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion) {
      if (format === 'decimal') {
        ref.current.textContent = value.toFixed(2);
      } else {
        ref.current.textContent = value.toLocaleString('en-IN');
      }
      return;
    }

    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: EASE,
        onUpdate: (v) => {
          if (ref.current) {
            if (format === 'decimal') {
              ref.current.textContent = v.toFixed(2);
            } else {
              ref.current.textContent = Math.floor(v).toLocaleString('en-IN');
            }
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, prefersReducedMotion, format]);

  return <span ref={ref} className={className}>0</span>;
}
