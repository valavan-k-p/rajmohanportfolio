'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export function PageLoadProgress() {
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Quick, professional initial load duration (450ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-load-progress"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
          className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2.5px] bg-sand-200"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="h-full w-full bg-gradient-to-r from-maroon-700 via-yellow-500 to-maroon-700 shadow-[0_0_8px_rgba(122,16,11,0.5)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
