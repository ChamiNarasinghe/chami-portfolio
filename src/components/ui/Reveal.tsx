
"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  immediate?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 24,
  immediate = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const visible = {
    opacity: 1,
    y: 0,
  };

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: distance,
            }
      }
      animate={immediate ? visible : undefined}
      whileInView={!immediate ? visible : undefined}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
