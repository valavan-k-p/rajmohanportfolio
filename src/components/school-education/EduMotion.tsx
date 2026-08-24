'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'motion/react';

// Apple / Editorial grade cubic-bezier easing curves
export const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;
export const MOTION_EASE = CINEMATIC_EASE;
export const SMOOTH_EASE = [0.25, 0.1, 0.25, 1] as const;

// Viewport settings for replaying animations on every scroll pass
export const VIEWPORT_CONFIG = { once: false, amount: 0.12 } as const;
export const VIEWPORT_STRICT = { once: false, amount: 0.25 } as const;

/**
 * 1. EduScrollProgressBar: Global Luxury Scroll Progress Indicator
 */
export function EduScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
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
 * 2. EduHeadingMask: Editorial Typography Mask Reveal
 * Emerges gracefully from behind an overflow-hidden mask with slight vertical lift
 */
export function EduHeadingMask({
  children,
  id,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden">
      <motion.div
        id={id}
        initial={{
          y: prefersReducedMotion ? '0%' : '110%',
          opacity: prefersReducedMotion ? 1 : 0,
        }}
        whileInView={{
          y: '0%',
          opacity: 1,
        }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.75, delay, ease: CINEMATIC_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * 3. EduHorizontalLine: Signature Left-to-Right Drawing Divider
 */
export function EduHorizontalLine({
  className = '',
  color = 'bg-sand-300',
  duration = 0.75,
  delay = 0.05,
  thickness = 'h-[1px]',
}: {
  className?: string;
  color?: string;
  duration?: number;
  delay?: number;
  thickness?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration, delay, ease: CINEMATIC_EASE }}
      style={{ transformOrigin: 'left' }}
      className={`w-full ${thickness} ${color} ${className}`}
    />
  );
}

/**
 * 4. EduVerticalLine: Top-to-Bottom Drawing Rule
 */
export function EduVerticalLine({
  className = '',
  color = 'bg-maroon-700',
  duration = 0.65,
  delay = 0,
  thickness = 'w-[2px]',
}: {
  className?: string;
  color?: string;
  duration?: number;
  delay?: number;
  thickness?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration, delay, ease: CINEMATIC_EASE }}
      style={{ transformOrigin: 'top' }}
      className={`h-full ${thickness} ${color} ${className}`}
    />
  );
}

/**
 * 5. EduReveal: Multi-Variant Viewport Entrance (Up, Left, Right, Scale, Blur)
 */
export type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'fade';

export function EduReveal({
  children,
  delay = 0,
  direction = 'up',
  showTopLine = false,
  topLineColor = 'bg-maroon-700',
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  showTopLine?: boolean;
  topLineColor?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const getInitialState = () => {
    if (prefersReducedMotion) return { opacity: 1, x: 0, y: 0, scale: 1, filter: 'none' };
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -28, y: 0, scale: 1, filter: 'blur(4px)' };
      case 'right':
        return { opacity: 0, x: 28, y: 0, scale: 1, filter: 'blur(4px)' };
      case 'scale':
        return { opacity: 0, x: 0, y: 16, scale: 0.94, filter: 'blur(6px)' };
      case 'fade':
        return { opacity: 0, x: 0, y: 0, scale: 1, filter: 'none' };
      case 'up':
      default:
        return { opacity: 0, x: 0, y: 24, scale: 0.97, filter: 'blur(6px)' };
    }
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.65, delay, ease: CINEMATIC_EASE }}
      className={`relative ${className}`}
    >
      {showTopLine && (
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.75, delay: delay + 0.08, ease: CINEMATIC_EASE }}
          style={{ transformOrigin: 'left' }}
          className={`absolute top-0 inset-x-0 h-[1.5px] ${topLineColor} pointer-events-none z-10`}
        />
      )}
      {children}
    </motion.div>
  );
}

/**
 * 6. EduTopLineBox: Editorial Container with Left-to-Right Top Line & Directional Entrance
 */
export function EduTopLineBox({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  topLineColor = 'bg-maroon-700',
  hoverEffect = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  className?: string;
  topLineColor?: string;
  hoverEffect?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  const getInitialState = () => {
    if (prefersReducedMotion) return { opacity: 1, x: 0, y: 0, scale: 1, filter: 'none' };
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -24, y: 0, scale: 0.97, filter: 'blur(6px)' };
      case 'right':
        return { opacity: 0, x: 24, y: 0, scale: 0.97, filter: 'blur(6px)' };
      case 'scale':
        return { opacity: 0, x: 0, y: 16, scale: 0.93, filter: 'blur(8px)' };
      case 'up':
      default:
        return { opacity: 0, x: 0, y: 24, scale: 0.96, filter: 'blur(6px)' };
    }
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.65, delay, ease: CINEMATIC_EASE }}
      whileHover={
        hoverEffect && !prefersReducedMotion
          ? {
              y: -4,
              scale: 1.006,
              transition: { duration: 0.22, ease: CINEMATIC_EASE },
            }
          : undefined
      }
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Animated Top Line from Left to Right */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.75, delay: delay + 0.08, ease: CINEMATIC_EASE }}
        style={{ transformOrigin: 'left' }}
        className={`absolute top-0 inset-x-0 h-[2px] ${topLineColor} pointer-events-none z-20`}
      />
      {children}
    </motion.div>
  );
}

/**
 * 7. EduStaggerContainer & EduStaggerItem: Sequential Typesetting Orchestration
 */
export function EduStaggerContainer({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function EduStaggerItem({
  children,
  className = '',
  direction = 'up',
  showTopLine = true,
  topLineColor = 'bg-sand-300',
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  showTopLine?: boolean;
  topLineColor?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const getHiddenTransform = () => {
    if (prefersReducedMotion) return { opacity: 0 };
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -20, y: 0, scale: 0.98, filter: 'blur(4px)' };
      case 'right':
        return { opacity: 0, x: 20, y: 0, scale: 0.98, filter: 'blur(4px)' };
      case 'scale':
        return { opacity: 0, x: 0, y: 12, scale: 0.94, filter: 'blur(4px)' };
      case 'up':
      default:
        return { opacity: 0, x: 0, y: 18, scale: 0.97, filter: 'blur(4px)' };
    }
  };

  const itemVariants: Variants = {
    hidden: getHiddenTransform(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: CINEMATIC_EASE },
    },
  };

  return (
    <motion.div variants={itemVariants} className={`relative ${className}`}>
      {showTopLine && (
        <motion.div
          aria-hidden="true"
          variants={{
            hidden: { scaleX: prefersReducedMotion ? 1 : 0 },
            visible: {
              scaleX: 1,
              transition: { duration: 0.65, ease: CINEMATIC_EASE },
            },
          }}
          style={{ transformOrigin: 'left' }}
          className={`absolute top-0 inset-x-0 h-[1px] ${topLineColor} pointer-events-none`}
        />
      )}
      {children}
    </motion.div>
  );
}

/**
 * 8. EduQuoteBlock: Editorial Quotation with Vertical Line Drawing & Progressive Text Reveal
 */
export function EduQuoteBlock({
  quote,
  attribution,
  className = '',
}: {
  quote: string;
  attribution?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative pl-6 py-1 ${className}`}>
      {/* Top-to-Bottom Drawing Vertical Line */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
        style={{ transformOrigin: 'top' }}
        className="absolute left-0 inset-y-0 w-[2.5px] bg-maroon-700 pointer-events-none"
      />

      {/* Quote Text */}
      <motion.p
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.6, delay: 0.15, ease: CINEMATIC_EASE }}
        className="font-serif italic text-lg sm:text-xl text-charcoal-800 leading-relaxed"
      >
        {quote}
      </motion.p>

      {/* Attribution */}
      {attribution && (
        <motion.p
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.5, delay: 0.28, ease: CINEMATIC_EASE }}
          className="text-xs font-mono text-charcoal-500 uppercase tracking-wider mt-2.5"
        >
          — {attribution}
        </motion.p>
      )}
    </div>
  );
}

/**
 * 9. EduCounter: Animated Numerical Increment (Replays on Viewport Enter)
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
  duration = 1.6,
  className = '',
}: EduCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) {
      setDisplayValue(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

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

/**
 * 10. EduDataBar: Animated Expanding Data Bar (Replays on Viewport Enter)
 */
export function EduDataBar({
  percentage,
  color = 'bg-yellow-400',
  height = 'h-4',
  delay = 0,
}: {
  percentage: number;
  color?: string;
  height?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`w-full bg-charcoal-700 overflow-hidden ${height} rounded-2xs relative`}>
      <motion.div
        initial={{ scaleX: prefersReducedMotion ? percentage / 100 : 0 }}
        whileInView={{ scaleX: percentage / 100 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 1.1, delay, ease: CINEMATIC_EASE }}
        style={{ transformOrigin: 'left' }}
        className={`h-full w-full ${color}`}
      />
    </div>
  );
}
