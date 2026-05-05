"use client";

import { useEffect, useRef, ReactNode } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const baseClass = direction === "left" ? "reveal-left" : "scroll-reveal";

  return (
    <div ref={ref} className={`${baseClass}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
