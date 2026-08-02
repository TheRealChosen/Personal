"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "#verhaal", label: "Ons verhaal" },
  { href: "#menukaart", label: "De kaart" },
  { href: "#sfeer", label: "De sfeer" },
  { href: "#beleving", label: "Beleving" },
  { href: "#bezoek", label: "Bezoek" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /* Hydration-safe: start with a stable server-rendered placeholder so the
     initial paint already has content, then swap to the live status after mount.
     This prevents the layout flash / empty dot on first load. */
  const [now, setNow] = useState<string>("Sinds 1937");

  /* Scroll-aware backdrop */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Live open status — show whether currently open */
  useEffect(() => {
    const compute = () => {
      const d = new Date();
      const day = d.getDay(); // 0 Sun .. 6 Sat
      const hour = d.getHours();
      const min = d.getMinutes();
      const mins = hour * 60 + min;
      // Hours: Tue-Thu 8:30-17:30 | Fri-Sat 8:30-18:00 | Sun 10:00-17:00
      const isOpenDay =
        (day >= 2 && day <= 4 && mins >= 510 && mins < 1050) ||
        ((day === 5 || day === 6) && mins >= 510 && mins < 1080) ||
        (day === 0 && mins >= 600 && mins < 1020);
      setNow(isOpenDay ? "Nu open" : "Nu gesloten");
    };
    compute();
    const t = setInterval(compute, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.1,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pad-x",
          scrolled
            ? "py-3 backdrop-blur-xl bg-paper/72 border-b border-espresso/8"
            : "py-5 bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          {/* Brand */}
          <a
            href="#hoofd"
            className="group flex items-end gap-3"
            aria-label="Hoekman — naar boven"
          >
            <span className="font-display text-[28px] leading-none italic text-espresso transition-transform duration-500 group-hover:-translate-y-[1px]">
              Hoekman
            </span>
            <span className="hidden font-body text-[10px] uppercase tracking-[0.4em] text-wood sm:inline-block">
              est. 1937
            </span>
          </a>

          {/* Desktop links */}
          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="
                      group relative inline-block py-2 font-body text-[13px]
                      font-medium uppercase tracking-[0.22em] text-espresso/85
                      transition-colors hover:text-espresso
                    "
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-espresso transition-all duration-500 group-hover:w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right rail */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "hidden items-center gap-2 rounded-full border px-3 py-1.5 font-body text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 sm:flex",
                now === "Nu open"
                  ? "border-terracotta/45 text-terracotta"
                  : now === "Sinds 1937"
                  ? "border-espresso/15 text-espresso/70"
                  : "border-espresso/20 text-espresso/65"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                  now === "Nu open" ? "bg-terracotta soft-pulse" : "bg-espresso/30"
                )}
              />
              {now}
            </div>

            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full bg-espresso text-cream transition-transform duration-300 hover:scale-105 lg:hidden"
              aria-label="Menu openen"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <MenuIcon className="h-4 w-4" strokeWidth={1.4} />
            </button>

            <a
              href="#bezoek"
              className="
                hidden items-center gap-2 rounded-full bg-espresso px-5 py-3
                font-body text-[12px] font-medium uppercase tracking-[0.22em] text-cream
                transition-all duration-500 hover:bg-espresso-2 lg:inline-flex
              "
            >
              Kom langs
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14" strokeLinecap="round" />
                <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobiel navigatiemenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-paper/96 backdrop-blur-2xl pad-x"
          >
            <div className="mx-auto flex max-w-[1400px] items-center justify-between py-6">
              <span className="font-display text-[28px] italic text-espresso">
                Hoekman
              </span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-espresso text-cream"
                aria-label="Menu sluiten"
              >
                <X className="h-4 w-4" strokeWidth={1.4} />
              </button>
            </div>
            <nav aria-label="Mobiele navigatie" className="mx-auto mt-8 max-w-[1400px]">
              <ul className="space-y-6">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 + i * 0.06,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className="
                        block font-display text-[44px] leading-none text-espresso
                        sm:text-[64px]
                      "
                    >
                      <span className="mr-4 font-body text-sm uppercase tracking-[0.4em] text-wood">
                        0{i + 1}
                      </span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mx-auto mt-12 max-w-[1400px]">
              <p className="font-display text-2xl italic text-espresso/80">
                Grotestraat 78, Raalte · <span className="text-wood">0572 351608</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
