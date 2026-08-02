"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * SplitText — splits each word of a string into its own <span>
 * and reveals them with a cinematic stagger on enter / in-view.
 *
 * Uses overflow-clip to mask the slide, so words feel like they
 * rise out of nowhere — premium editorial reveal.
 */
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  start = "top 78%",
  as: El = "h2",
  italic = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  italic?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(
        "[data-split-word]",
        ref.current
      );
      gsap.set(targets, { yPercent: 110 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [delay, stagger, start]);

  return (
    <El
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="block">
        {words.map((word, i) => (
          <span
            key={i}
            className="relative inline-block overflow-hidden align-baseline"
            style={{ marginRight: i === words.length - 1 ? 0 : "0.28em" }}
          >
            <span
              data-split-word
              className={
                italic ? "inline-block italic font-display" : "inline-block"
              }
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </El>
  );
}
