'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion, useInView, useScroll, useSpring, useReducedMotion } from 'motion/react';

// Apple / Vercel grade cubic-bezier easing curves
export const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;
export const MOTION_EASE = CINEMATIC_EASE;
export const SMOOTH_EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * 1. EduScrollProgressBar: Ultra-luxury global scroll progress indicator
 */
export function EduScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-maroon-700 via-yellow-500 to-maroon-700 origin-left z-50 pointer-events-none shadow-[0_0_10px_rgba(122,16,11,0.4)]"
    />
  );
}

/**
 * 2. EduReveal: Cinematic Blur-to-Sharp + Pop/Slide Viewport Reveal
 */
export function EduReveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  scale = 0.96,
  blur = 8,
  showTopLine = false,
  topLineColor = 'bg-maroon-700',
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  blur?: number;
  showTopLine?: boolean;
  topLineColor?: string;
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
        filter: prefersReducedMotion ? 'none' : `blur(${blur}px)`,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: CINEMATIC_EASE }}
      className={`relative ${className}`}
    >
      {/* Synchronized Left-to-Right Animated Top Line Accent */}
      {showTopLine && (
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, delay: delay + 0.08, ease: CINEMATIC_EASE }}
          style={{ transformOrigin: 'left' }}
          className={`absolute top-0 inset-x-0 h-[1.5px] ${topLineColor} pointer-events-none z-10 shadow-[0_0_8px_rgba(122,16,11,0.3)]`}
        />
      )}
      {children}
    </motion.div>
  );
}

/**
 * 3. EduTopLineBox: High-Impact Card with Pop/Slide + Blur-to-Sharp + Left-to-Right Animated Top Line
 */
export function EduTopLineBox({
  children,
  delay = 0,
  className = '',
  topLineColor = 'bg-maroon-700',
  hoverEffect = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  topLineColor?: string;
  hoverEffect?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 26,
        scale: prefersReducedMotion ? 1 : 0.95,
        filter: prefersReducedMotion ? 'none' : 'blur(8px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: CINEMATIC_EASE }}
      whileHover={
        hoverEffect && !prefersReducedMotion
          ? {
              y: -5,
              scale: 1.008,
              transition: { duration: 0.25, ease: CINEMATIC_EASE },
            }
          : undefined
      }
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Animated Top Line from Left to Right with Glow */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, delay: delay + 0.1, ease: CINEMATIC_EASE }}
        style={{ transformOrigin: 'left' }}
        className={`absolute top-0 inset-x-0 h-[2px] ${topLineColor} pointer-events-none z-20 shadow-[0_0_10px_rgba(122,16,11,0.35)]`}
      />
      {children}
    </motion.div>
  );
}

/**
 * 4. EduStaggerContainer: Orchestrated Staggered Entrance for Grids and Lists
 */
export function EduStaggerContainer({
  children,
  className = '',
  stagger = 0.1,
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
      viewport={{ once: true, amount: 0.08 }}
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

/**
 * 5. EduStaggerItem: Pop/Slide Child Item with Blur Reduction and Animated Top Line
 */
export function EduStaggerItem({
  children,
  className = '',
  y = 20,
  scale = 0.96,
  blur = 6,
  showTopLine = true,
  topLineColor = 'bg-sand-300',
  hoverEffect = false,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
  blur?: number;
  showTopLine?: boolean;
  topLineColor?: string;
  hoverEffect?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: prefersReducedMotion ? 0 : y,
          scale: prefersReducedMotion ? 1 : scale,
          filter: prefersReducedMotion ? 'none' : `blur(${blur}px)`,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.55, ease: CINEMATIC_EASE },
        },
      }}
      whileHover={
        hoverEffect && !prefersReducedMotion
          ? { y: -4, transition: { duration: 0.22, ease: CINEMATIC_EASE } }
          : undefined
      }
      className={`relative ${className}`}
    >
      {/* Animated Top Line on Staggered Elements */}
      {showTopLine && (
        <motion.div
          aria-hidden="true"
          variants={{
            hidden: { scaleX: prefersReducedMotion ? 1 : 0 },
            visible: {
              scaleX: 1,
              transition: { duration: 0.7, ease: CINEMATIC_EASE },
            },
          }}
          style={{ transformOrigin: 'left' }}
          className={`absolute top-0 inset-x-0 h-[1.5px] ${topLineColor} pointer-events-none shadow-[0_0_6px_rgba(122,16,11,0.2)]`}
        />
      )}
      {children}
    </motion.div>
  );
}

/**
 * 6. EduHairline: Animated Full-Width Left-to-Right Hairline Divider
 */
export function EduHairline({
  className = '',
  color = 'bg-sand-300',
  duration = 0.75,
}: {
  className?: string;
  color?: string;
  duration?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: CINEMATIC_EASE }}
      style={{ transformOrigin: 'left' }}
      className={`h-[1px] w-full ${color} ${className}`}
    />
  );
}

/**
 * 7. EduCounter: Animated Numerical Increment with Deceleration Easing
 */
export interface EduCounterProps {
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly duration?: number;
  readonly className?: string;
}

export function EduCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className = '',
}: EduCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    // Smooth easeOutQuart curve for organic deceleration
    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = easeOutQuart(progress);

      const current = Math.round(easedProgress * value);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, duration, prefersReducedMotion]);

  const formattedNumber = displayValue.toLocaleString('en-IN');

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
