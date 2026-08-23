import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useEffect } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Isomorphic effect for Next.js SSR
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Standardized easing curves mapped to the master prompt's motion system
 */
export const EASING = {
  natural: 'power2.out',
  expressive: 'expo.out',
  cinematic: 'power3.inOut'
};

/**
 * Standardized durations mapped to the master prompt
 */
export const DURATION = {
  micro: 0.25, // 250ms
  content: 0.65, // 650ms
  story: 1.1, // 1100ms
  signature: 1.4 // 1400ms
};

/**
 * Utility to check if reduced motion is preferred
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
