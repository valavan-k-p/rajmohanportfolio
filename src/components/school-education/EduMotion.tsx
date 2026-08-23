'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

// Refined easing curve for education portal (clean, decisive, orderly)
const EASE = [0.16, 1, 0.3, 1] as const;

export function EduReveal({
  children,
  delay = 0,
  y = 12,
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
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : y,
        x: prefersReducedMotion ? 0 : x,
        scale: prefersReducedMotion ? 1 : scale,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function EduStaggerContainer({
  children,
  className = '',
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function EduStaggerItem({
  children,
  className = '',
  y = 12,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: prefersReducedMotion ? 0 : y,
          x: prefersReducedMotion ? 0 : x,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.4, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function EduHairline({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ transformOrigin: 'left' }}
      className={`h-[1px] bg-sand-300 ${className}`}
    />
  );
}

export function EduCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
