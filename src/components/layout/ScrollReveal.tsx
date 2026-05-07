"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  yOffset = 40,
  duration = 0.8,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: yOffset, filter: "blur(8px)" }
      }
      transition={{
        duration: duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(/(\s+)/);
  let globalCharIndex = 0;

  return (
    <div
      ref={ref}
      style={{ perspective: "1000px" }}
      className={className}
    >
      {words.map((word, wordIndex) => {
        if (word.match(/\s+/)) {
          globalCharIndex += word.length;
          return <span key={wordIndex} style={{ display: "inline-block", width: "0.25em" }}>{" "}</span>;
        }

        return (
          <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((char, charIndex) => {
              const currentGlobalIndex = globalCharIndex++;
              return (
                <motion.span
                  key={charIndex}
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: -90 }}
                  transition={{
                    duration: 0.8,
                    delay: delay / 1000 + currentGlobalIndex * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: "inline-block", transformOrigin: "50% 100%" }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}
