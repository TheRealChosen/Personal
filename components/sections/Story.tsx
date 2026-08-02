"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";
import { story } from "@/lib/data";

export default function Story() {
  const ref = useRef<HTMLElement | null>(null);
  const portrait = useRef<HTMLDivElement | null>(null);

  /* Parallax on the right column portrait */
  const { scrollYProgress: portraitProgress } = useScroll({
    target: portrait,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(portraitProgress, [0, 1], ["-6%", "8%"]);

  /* Image clip reveal — hoisted clipPath string so we don't call
     a hook inside JSX. */
  const { scrollYProgress: clipProgress } = useScroll({
    target: portrait,
    offset: ["start 80%", "start 30%"],
  });
  const clipRaw = useTransform(clipProgress, [0, 1], [0, 100]);
  const clipInset = useTransform(clipRaw, (v) => `inset(0 0 ${v}% 0)`);

  return (
    <section
      ref={ref}
      id="verhaal"
      className="relative overflow-hidden bg-paper py-32 lg:py-48"
      aria-label="Het verhaal van Hoekman"
    >
      <div className="pad-x mx-auto max-w-[1400px]">
        <Eyebrow n="01">Ons verhaal</Eyebrow>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — editorial text */}
          <div className="lg:col-span-6">
            <h2 className="font-display text-[44px] leading-[1.05] tracking-editorial text-balance text-espresso sm:text-[64px] lg:text-[80px]">
              <SplitText text={story.heading.split("\n")[0]} as="span" />
              <span className="block overflow-hidden">
                <span className="block">
                  <SplitText
                    text={story.heading.split("\n")[1]}
                    as="span"
                    italic
                    delay={0.15}
                  />
                </span>
              </span>
            </h2>

            <div className="mt-12 max-w-lg space-y-7">
              {story.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    i === 0
                      ? "dropcap font-body text-[17px] leading-[1.75] text-espresso/80"
                      : "font-body text-[16px] leading-[1.75] text-espresso/75"
                  }
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-16 max-w-md border-l border-terracotta pl-8"
            >
              <span
                aria-hidden
                className="absolute -left-3 -top-2 font-display text-[60px] italic text-terracotta/40"
              >
                “
              </span>
              <blockquote className="font-display text-[24px] italic leading-[1.35] text-espresso sm:text-[28px]">
                {story.quote.text}
              </blockquote>
              <figcaption className="mt-5 font-body text-[12px] uppercase tracking-[0.28em] text-wood">
                {story.quote.attribution}
              </figcaption>
            </motion.figure>
          </div>

          {/* RIGHT — portrait with clip reveal + parallax */}
          <div className="relative lg:col-span-6 lg:pl-8">
            <div
              ref={portrait}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px]"
            >
              <motion.div style={{ clipPath: clipInset }} className="absolute inset-0">
                <motion.div style={{ y: imgY }} className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1400&q=80"
                    alt="Versgebakken brood uit de oven — Hoekman"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover warmth"
                    priority
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-body text-[11px] uppercase tracking-[0.36em] text-cream/85"
              >
                <span>
                  1937<span className="ml-3 text-cream/70">—</span>
                  <span className="ml-3">Vandaag</span>
                </span>
                <span>Hendrik → Marleen</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.32em] text-wood"
            >
              <span className="rule-warm w-10" />
              <span>Salland · 1937</span>
            </motion.div>
          </div>
        </div>

        {/* DATA STRIP — three pillars */}
        <div className="mt-28 grid grid-cols-1 gap-y-10 border-t border-espresso/10 pt-12 sm:grid-cols-3 sm:gap-x-12">
          {[
            {
              n: "87",
              unit: "jaar",
              label: "Dezelfde deur, dezelfde stam.",
            },
            {
              n: "3",
              unit: "generaties",
              label: "Hendrik, Jan en Marleen — Hoekman.",
            },
            {
              n: "100%",
              unit: "met de hand",
              label: "Geen mix, geen machine. Geduld als ingrediënt.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-baseline gap-2 font-display text-espresso">
                <span className="text-[64px] leading-none sm:text-[80px]">
                  {s.n}
                </span>
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-wood">
                  {s.unit}
                </span>
              </div>
              <p className="max-w-xs font-body text-[14px] leading-[1.6] text-espresso/70">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
