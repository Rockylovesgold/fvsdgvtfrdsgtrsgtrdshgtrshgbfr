import type { Transition, Variants } from "framer-motion";
import { getReducedMotionTransition, motionTokens } from "@bigcup/ui";

export const springTransition: Transition = {
  ...motionTokens.spring
};

export const pageTransition = getReducedMotionTransition;

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.2, 0.65, 0.3, 0.9] }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05
    }
  }
};

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 }
  }
};
