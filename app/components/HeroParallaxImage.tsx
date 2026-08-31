"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroParallaxImage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 28]);

  return (
    <div ref={targetRef} aria-hidden="true" className="absolute inset-0">
      <picture>
        <source media="(max-width: 767px)" srcSet="/frontier-passage-960.jpg" />
        <motion.img
          src="/frontier-passage.jpg"
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
          style={{
            y: shouldReduceMotion ? 0 : y,
            scale: shouldReduceMotion ? 1 : 1.035,
            willChange: shouldReduceMotion ? "auto" : "transform",
          }}
          className="theme-hero-image absolute inset-0 h-full w-full object-cover object-[69%_center] opacity-95 sm:object-center"
        />
      </picture>
    </div>
  );
}
