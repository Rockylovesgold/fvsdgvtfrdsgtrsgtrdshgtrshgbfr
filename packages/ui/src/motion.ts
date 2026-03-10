export const motionTokens = {
  spring: { type: "spring", stiffness: 210, damping: 24, mass: 0.9 },
  easeOut: [0.22, 1, 0.36, 1],
  durations: {
    fast: 0.18,
    base: 0.24,
    slow: 0.36
  },
  reducedMotion: { duration: 0, delay: 0 }
} as const;

/**
 * Returns transition settings that respect prefers-reduced-motion.
 * Use in Framer Motion: transition={getReducedMotionTransition()}
 */
export function getReducedMotionTransition() {
  if (typeof window === "undefined") return { duration: motionTokens.durations.base, ease: motionTokens.easeOut };
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return prefersReduced ? motionTokens.reducedMotion : { duration: motionTokens.durations.base, ease: motionTokens.easeOut };
}

export const webMotionPresets = {
  page: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: motionTokens.durations.base, ease: motionTokens.easeOut }
  },
  section: {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: motionTokens.durations.base, ease: motionTokens.easeOut }
  },
  listStagger: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 }
    }
  },
  listItem: {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: motionTokens.durations.fast, ease: motionTokens.easeOut }
    }
  }
} as const;
