"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { Suspense, lazy } from "react";
import { LinkButton } from "@/components/ui/Button";
import { hero } from "@/lib/data";

const SplineScene = lazy(() => import("@/components/SplineScene"));

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  /* Single-direction parallax on the title; scene "rolls away"
     on scroll — subtle and cohesive. */
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  /* GSAP entrance timeline */
  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from("[data-hero-eyebrow]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
      })
        .from("[data-hero-line]", {
          yPercent: 110,
          duration: 1.15,
          stagger: 0.13,
        }, "-=0.5")
        .from("[data-hero-accent]", {
          opacity: 0,
          y: 30,
          duration: 1.1,
        }, "-=0.7")
        .from("[data-hero-caption]", {
          opacity: 0,
          y: 22,
          duration: 0.9,
        }, "-=0.6")
        .from("[data-hero-cta]", {
          opacity: 0,
          y: 16,
          duration: 0.7,
          stagger: 0.12,
        }, "-=0.5")
        .from("[data-hero-meta]", {
          opacity: 0,
          y: 12,
          duration: 0.7,
        }, "-=0.5")
        .from("[data-hero-scroll]", {
          opacity: 0,
          y: 12,
          duration: 0.9,
        }, "-=0.4")
        .from("[data-hero-scene]", {
          opacity: 0,
          scale: 1.05,
          duration: 1.4,
        }, 0);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="hoofd"
      className="relative isolate min-h-[100dvh] overflow-hidden pt-32 sm:pt-36"
      aria-label="Welkom bij Hoekman"
    >
      <div aria-hidden className="absolute inset-0 -z-10 atmo-warm" />

      <div className="pad-x relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 pb-24 lg:grid-cols-12 lg:gap-8 lg:pb-32">
        {/* LEFT — copy */}
        <div className="relative z-10 lg:col-span-7">
          <motion.div
            data-hero-eyebrow
            className="mb-10 flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.4em] text-espresso/70"
          >
            <span className="rule-warm w-12" />
            <span>{hero.eyebrow}</span>
          </motion.div>

          <motion.h1
            style={{ y: titleY }}
            className="font-display tracking-editorial text-balance text-espresso"
          >
            <span className="block overflow-hidden">
              <span
                data-hero-line
                className="block text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.94]"
              >
                {hero.titleLines[0]}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-line
                className="block text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.94]"
              >
                {hero.titleLines[1]}{" "}
                <span data-hero-accent className="relative inline-block italic">
                  <span className="relative z-10">{hero.titleAccent}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 320 16"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 z-0 w-full text-terracotta"
                  >
                    <path
                      d="M2 10 C 80 4, 160 4, 240 8 S 320 10, 318 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            data-hero-caption
            className="mt-10 max-w-xl text-balance font-body text-[16px] leading-[1.65] text-espresso/75 sm:text-[17px]"
          >
            {hero.caption}
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.span data-hero-cta>
              <LinkButton href={hero.ctaPrimary.href} variant="primary">
                {hero.ctaPrimary.label}
              </LinkButton>
            </motion.span>
            <motion.span data-hero-cta>
              <LinkButton href={hero.ctaSecondary.href} variant="secondary">
                {hero.ctaSecondary.label}
              </LinkButton>
            </motion.span>
          </div>

          <motion.div
            data-hero-meta
            className="mt-14 flex flex-wrap items-end gap-x-10 gap-y-4 font-body text-[11px] uppercase tracking-[0.28em] text-espresso/70"
          >
            <div>
              <span className="block text-wood">Adres</span>
              <span className="mt-1 block tracking-normal normal-case text-espresso/85">
                Grotestraat 78, Raalte
              </span>
            </div>
            <div>
              <span className="block text-wood">Telefoon</span>
              <a
                href="tel:+31572351608"
                className="mt-1 block tracking-normal normal-case text-espresso/85 transition-colors hover:text-espresso"
              >
                0572 — 351 608
              </a>
            </div>
            <div>
              <span className="block text-wood">Open</span>
              <span className="mt-1 block tracking-normal normal-case text-espresso/85">
                Di — Zo · vanaf 8:30
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Spline 3D */}
        <motion.div
          data-hero-scene
          style={{ y: sceneY, scale: sceneScale }}
          className="relative z-0 lg:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full lg:aspect-[5/6] lg:translate-x-[6%]">
            <Suspense fallback={<div className="absolute inset-0 rounded-[2rem] bg-cream" />}>
              <SplineScene />
            </Suspense>

            <div className="pointer-events-none absolute -bottom-3 left-4 right-4 flex items-center justify-between font-body text-[10px] uppercase tracking-[0.36em] text-espresso/55">
              <span>Scene 01</span>
              <span>Café · Hoekman</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <div className="flex flex-col items-center gap-3 font-body text-[10px] uppercase tracking-[0.36em] text-espresso/65">
          <motion.span
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="block h-8 w-px origin-top bg-espresso/40"
          />
          Scroll om verder te lezen
        </div>
      </div>
    </section>
  );
}
