"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  distance?: number;
}>;

type RevealAsideProps = RevealProps & {
  ariaLabel?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

function useRevealMotion(delay: number, distance: number) {
  const shouldReduceMotion = useReducedMotion();

  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18, margin: "0px 0px -8% 0px" },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.72,
      delay: shouldReduceMotion ? 0 : delay,
      ease,
    },
  };
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
}: RevealProps) {
  const reveal = useRevealMotion(delay, distance);
  return (
    <motion.div data-motion-reveal className={className} {...reveal}>
      {children}
    </motion.div>
  );
}

export function RevealArticle({
  children,
  className,
  delay = 0,
  distance = 18,
}: RevealProps) {
  const reveal = useRevealMotion(delay, distance);
  return (
    <motion.article data-motion-reveal className={className} {...reveal}>
      {children}
    </motion.article>
  );
}

export function RevealAside({
  children,
  className,
  delay = 0,
  distance = 20,
  ariaLabel,
}: RevealAsideProps) {
  const reveal = useRevealMotion(delay, distance);
  return (
    <motion.aside data-motion-reveal aria-label={ariaLabel} className={className} {...reveal}>
      {children}
    </motion.aside>
  );
}
