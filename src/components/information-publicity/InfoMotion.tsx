'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'motion/react';

// Premium Architectural & Editorial easing curve: cubic-bezier(0.16, 1, 0.3, 1)
export const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;
export const GENTLE_EASE = [0.25, 0.1, 0.25, 1] as const;

// Viewport settings for editorial scroll reveals (replays smoothly on scroll passes)
export const VIEWPORT_CONFIG = { once: false, amount: 0.12 } as const;
export const VIEWPORT_STRICT = { once: false, amount: 0.22 } as const;

/**
 * 1. InfoScrollProgressBar: Luxury Gold/Amber Scroll Progress Bar at the top of the viewport
 */
export function InfoScrollProgressBar() {
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
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#8a6c3b] via-[#c5a059] to-[#e6c888] origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(197,160,89,0.5)]"
    />
  );
}

/**
 * 2. InfoHeadingMask: Architectural Editorial Typography Mask Reveal
 * Emerges gracefully from behind an overflow-hidden mask (y: 100% -> 0%) with subtle opacity fade
 */
export function InfoHeadingMask({
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
        transition={{ duration: 0.85, delay, ease: CINEMATIC_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * 3. InfoHorizontalLine: Left-to-Right Drawing Divider Line
 */
export function InfoHorizontalLine({
  className = '',
  color = 'bg-[#c5a059]/40',
  duration = 0.85,
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
 * 4. InfoVerticalLine: Top-to-Bottom Drawing Rule
 */
export function InfoVerticalLine({
  className = '',
  color = 'bg-maroon-700',
  duration = 0.8,
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
 * 5. InfoReveal: Multi-Variant Viewport Entrance (Up, Left, Right, Scale, Fade)
 */
export type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'fade';

export function InfoReveal({
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
    if (prefersReducedMotion) return { opacity: 1, x: 0, y: 0, scale: 1 };
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -32, y: 0, scale: 1 };
      case 'right':
        return { opacity: 0, x: 32, y: 0, scale: 1 };
      case 'scale':
        return { opacity: 0, x: 0, y: 20, scale: 0.96 };
      case 'fade':
        return { opacity: 0, x: 0, y: 0, scale: 1 };
      case 'up':
      default:
        return { opacity: 0, x: 0, y: 35, scale: 0.98 };
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
      }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.75, delay, ease: CINEMATIC_EASE }}
      className={`relative ${className}`}
    >
      {showTopLine && (
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.85, delay: delay + 0.1, ease: CINEMATIC_EASE }}
          style={{ transformOrigin: 'left' }}
          className={`absolute top-0 inset-x-0 h-[1.5px] ${topLineColor} pointer-events-none z-10`}
        />
      )}
      {children}
    </motion.div>
  );
}

/**
 * 6. InfoCard: Editorial Card with Scroll Reveal + Restrained Lift & Glow on Hover
 */
export function InfoCard({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  showTopLine = true,
  topLineColor = 'bg-maroon-700',
  hoverLift = true,
  onClick,
}: {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  className?: string;
  showTopLine?: boolean;
  topLineColor?: string;
  hoverLift?: boolean;
  onClick?: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  const getInitialState = () => {
    if (prefersReducedMotion) return { opacity: 1, x: 0, y: 0, scale: 1 };
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -28, y: 0, scale: 0.98 };
      case 'right':
        return { opacity: 0, x: 28, y: 0, scale: 0.98 };
      case 'scale':
        return { opacity: 0, x: 0, y: 20, scale: 0.95 };
      case 'up':
      default:
        return { opacity: 0, x: 0, y: 35, scale: 0.98 };
    }
  };

  return (
    <motion.div
      onClick={onClick}
      initial={getInitialState()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.75, delay, ease: CINEMATIC_EASE }}
      whileHover={
        hoverLift && !prefersReducedMotion
          ? {
              y: -5,
              scale: 1.008,
              transition: { duration: 0.3, ease: CINEMATIC_EASE },
            }
          : undefined
      }
      className={`relative overflow-hidden group ${className}`}
    >
      {showTopLine && (
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.85, delay: delay + 0.1, ease: CINEMATIC_EASE }}
          style={{ transformOrigin: 'left' }}
          className={`absolute top-0 inset-x-0 h-[2px] ${topLineColor} pointer-events-none z-20`}
        />
      )}
      {children}
    </motion.div>
  );
}

/**
 * 7. InfoImageReveal: Editorial Image Container with Subtle Zoom Settle (1.06 -> 1.00) & Hover Zoom (1.04)
 */
export function InfoImageReveal({
  children,
  className = '',
  delay = 0,
  hoverZoom = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverZoom?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        initial={{
          opacity: 0,
          scale: prefersReducedMotion ? 1 : 1.06,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 1.1, delay, ease: CINEMATIC_EASE }}
        whileHover={
          hoverZoom && !prefersReducedMotion
            ? {
                scale: 1.04,
                transition: { duration: 0.5, ease: CINEMATIC_EASE },
              }
            : undefined
        }
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * 8. InfoParallax: Scroll-linked Subtle Parallax Layer
 */
export function InfoParallax({
  children,
  offset = 20,
  className = '',
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 25 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={prefersReducedMotion ? {} : { y: smoothY }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * 9. InfoStaggerContainer & InfoStaggerItem: Sequential Typesetting & Card Orchestration
 */
export function InfoStaggerContainer({
  children,
  className = '',
  stagger = 0.09,
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

export function InfoStaggerItem({
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
        return { opacity: 0, x: -24, y: 0, scale: 0.98 };
      case 'right':
        return { opacity: 0, x: 24, y: 0, scale: 0.98 };
      case 'scale':
        return { opacity: 0, x: 0, y: 16, scale: 0.95 };
      case 'up':
      default:
        return { opacity: 0, x: 0, y: 28, scale: 0.98 };
    }
  };

  const itemVariants: Variants = {
    hidden: getHiddenTransform(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: CINEMATIC_EASE },
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
              transition: { duration: 0.75, ease: CINEMATIC_EASE },
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
 * 10. InfoQuoteBlock: Editorial Quotation with Vertical Line Drawing & Progressive Text Reveal
 */
export function InfoQuoteBlock({
  quote,
  attribution,
  context,
  className = '',
}: {
  quote: string;
  attribution?: string;
  context?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative pl-6 sm:pl-8 py-2 ${className}`}>
      {/* Vertical Hairline Drawing */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
        style={{ transformOrigin: 'top' }}
        className="absolute left-0 inset-y-0 w-[3px] bg-maroon-700 pointer-events-none"
      />

      {/* Pull Quote */}
      <motion.blockquote
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.7, delay: 0.15, ease: CINEMATIC_EASE }}
        className="font-display text-xl sm:text-2xl md:text-3xl text-charcoal-900 leading-snug tracking-tight"
      >
        “{quote}”
      </motion.blockquote>

      {/* Attribution & Context */}
      {(attribution || context) && (
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, delay: 0.3, ease: CINEMATIC_EASE }}
          className="mt-4 pt-3 border-t border-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans"
        >
          {attribution && (
            <span className="font-semibold text-charcoal-800">{attribution}</span>
          )}
          {context && (
            <span className="text-charcoal-500 italic">{context}</span>
          )}
        </motion.div>
      )}
    </div>
  );
}

/**
 * 11. InfoCounter: Animated Numerical Increment with Ease-Out
 */
export interface InfoCounterProps {
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly duration?: number;
  readonly className?: string;
}

export function InfoCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className = '',
}: InfoCounterProps) {
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
