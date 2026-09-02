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
  const y = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={targetRef} aria-hidden="true" className="absolute inset-0">
      <motion.img
        src="/frontier-passage.jpg"
        alt=""
        fetchPriority="high"
        loading="eager"
        decoding="async"
        style={{
          y: shouldReduceMotion ? 0 : y,
          scale: shouldReduceMotion ? 1 : scale,
          willChange: shouldReduceMotion ? "auto" : "transform",
        }}
        className="theme-hero-image absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
