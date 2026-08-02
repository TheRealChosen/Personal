"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { experiences, ribbonLines } from "@/lib/data";

export default function Experience() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      id="beleving"
      className="grain relative overflow-hidden bg-espresso py-32 text-cream lg:py-44"
      aria-label="De Hoekman beleving"
    >
      {/* Parallax warm halo */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[140%] -translate-x-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,165,116,0.32), transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      <div className="pad-x relative mx-auto max-w-[1400px]">
        <div className="flex items-center gap-4">
          <span className="font-body text-[11px] uppercase tracking-[0.4em] text-cream/55">
            04
          </span>
          <span className="font-body text-[11px] uppercase tracking-[0.4em] text-cream">
            Beleving
          </span>
          <span className="h-px flex-1 bg-cream/20" />
        </div>

        <h2 className="mt-12 font-display text-[44px] leading-[1.05] tracking-editorial text-cream sm:text-[64px] lg:text-[96px]">
          Vier kleine beloftes
          <br />
          <span className="italic text-gold">die we elke dag houden.</span>
        </h2>

        <div className="mt-24 grid grid-cols-1 gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e, i) => (
            <motion.article
              key={e.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: 0.1 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-espresso p-8 lg:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[60px] italic text-gold">
                  {e.n}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.36em] text-cream/40">
                  Belofte
                </span>
              </div>
              <h3 className="mt-8 font-display text-[26px] leading-tight text-cream lg:text-[28px]">
                {e.title}
              </h3>
              <p className="mt-4 font-body text-[14px] leading-[1.7] text-cream/65">
                {e.body}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Ribbon */}
        <div className="mt-24 overflow-hidden border-y border-cream/15 py-7">
          <div className="flex w-max animate-marquee gap-12 will-change-transform">
            {[...ribbonLines, ...ribbonLines].map((line, i) => (
              <span
                key={i}
                className="font-body text-[12px] uppercase tracking-[0.36em] text-cream/65"
              >
                {line} <span className="ml-8 text-gold">✱</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
