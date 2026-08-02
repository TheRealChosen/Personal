"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ribbonLines, brand, address } from "@/lib/data";

export default function Footer() {
  const giant = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!giant.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Scrubbed, not time-based — typography that physically rises
      // as the user scrolls past. Feels anchored to the page.
      gsap.fromTo(
        "[data-footer-letter]",
        { yPercent: 105 },
        {
          yPercent: 0,
          ease: "none",
          stagger: 0.018,
          scrollTrigger: {
            trigger: giant.current,
            start: "top 95%",
            end: "top 25%",
            scrub: 0.6,
          },
        }
      );
    }, giant);
    return () => ctx.revert();
  }, []);

  const word = brand.full;
  const letters = word.split("");

  return (
    <footer className="relative mt-32 overflow-hidden bg-espresso text-cream">
      {/* Marquee ribbon */}
      <div className="relative overflow-hidden border-b border-cream/10 py-7">
        <div className="flex w-max animate-marquee gap-12 will-change-transform">
          {[...ribbonLines, ...ribbonLines].map((line, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="flex items-center gap-12 font-body text-[12px] uppercase tracking-[0.4em]"
            >
              <span>{line}</span>
              <span className="text-gold">✱</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pad-x relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="font-display italic text-[36px] leading-tight sm:text-[44px]">
            Hoekman.
          </div>
          <p className="mt-6 max-w-md font-body text-[15px] leading-[1.7] text-cream/75">
            Een Hollands banket- en koffiehuus in hartje Raalte. Drie generaties —
            en nog steeds even graag.
          </p>
          <div className="mt-10 flex flex-col gap-2 font-body text-[13px] text-cream/85">
            <span>{address.street}</span>
            <span>{address.postcode}</span>
            <span className="text-cream/65">{address.country}</span>
            <a
              href={address.phoneHref}
              className="mt-3 inline-block text-cream hover:text-gold"
            >
              {address.phone}
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="lg:col-span-3">
          <h4 className="font-body text-[11px] uppercase tracking-[0.4em] text-cream/75">
            Openingstijden
          </h4>
          <ul className="mt-6 space-y-2.5 font-body text-[13px] text-cream/90">
            <li className="flex justify-between gap-6">
              <span>Ma</span>
              <span className="text-cream/65">Gesloten</span>
            </li>
            <li className="flex justify-between gap-6">
              <span>Di — Do</span>
              <span>08:30 — 17:30</span>
            </li>
            <li className="flex justify-between gap-6">
              <span>Vr — Za</span>
              <span>08:30 — 18:00</span>
            </li>
            <li className="flex justify-between gap-6">
              <span>Zo</span>
              <span>10:00 — 17:00</span>
            </li>
          </ul>
        </div>

        {/* Newsletter / socials */}
        <div className="lg:col-span-4">
          <h4 className="font-body text-[11px] uppercase tracking-[0.4em] text-cream/75">
            Blijf op de hoogte
          </h4>
          <p className="mt-6 font-body text-[14px] leading-[1.7] text-cream/85">
            Ontvang een paar keer per jaar een brief — over nieuwe gebakjes,
            seizoensmenu&apos;s en bijzondere middagen.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            aria-label="Nieuwsbrief aanmelden"
            className="mt-8 flex items-center gap-3 border-b border-cream/30 pb-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              E-mailadres
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="uw@email.nl"
              className="flex-1 bg-transparent font-body text-[15px] text-cream placeholder:text-cream/50 focus:outline-none"
            />
            <button
              type="submit"
              className="group inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.3em] text-cream hover:text-gold"
            >
              Aanmelden
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14" strokeLinecap="round" />
                <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <div className="mt-10 flex gap-5 font-body text-[12px] uppercase tracking-[0.3em] text-cream/75">
            <a className="hover:text-gold" href="#">Instagram</a>
            <a className="hover:text-gold" href="#">Facebook</a>
            <a className="hover:text-gold" href={address.phoneHref}>Bellen</a>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div
        ref={giant}
        className="relative overflow-hidden border-t border-cream/10"
      >
        <div className="pad-x mx-auto max-w-[1500px] py-8 sm:py-12">
          <div
            aria-hidden="true"
            className="flex select-none items-end justify-between font-display leading-[0.85]"
          >
            {letters.map((ch, i) => (
              <span
                key={i}
                data-footer-letter
                style={{
                  fontSize: "clamp(72px, 16vw, 220px)",
                  marginRight: ch === " " ? "0.2em" : 0,
                  fontStyle: i === 0 ? "italic" : "normal",
                }}
                className="relative inline-block overflow-hidden align-baseline text-cream/[0.07]"
              >
                <span className="inline-block">{ch}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pad-x mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 border-t border-cream/10 py-6 font-body text-[11px] uppercase tracking-[0.3em] text-cream/65 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Familie Hoekman — Raalte</span>
        <span>Sinds {brand.established} · Met de hand</span>
      </div>
    </footer>
  );
}
