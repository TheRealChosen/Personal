"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import { menuCategories, type MenuItem } from "@/lib/data";

export default function Menu() {
  const [active, setActive] = useState(menuCategories[0].key);
  const activeCategory = menuCategories.find((c) => c.key === active)!;
  const followerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  /* Floating image follow cursor (only inside section, only on non-touch) */
  useEffect(() => {
    if (!followerRef.current || !sectionRef.current) return;
    const follower = followerRef.current;
    const xTo = gsap.quickTo(follower, "x", { duration: 0.7, ease: "expo.out" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.7, ease: "expo.out" });

    const onMove = (ev: MouseEvent) => {
      const r = sectionRef.current!.getBoundingClientRect();
      // Only follow when mouse is inside the menu items column
      if (
        ev.clientX > r.left + r.width * 0.45 &&
        ev.clientX < r.right - 40 &&
        ev.clientY > r.top + 80 &&
        ev.clientY < r.bottom - 80
      ) {
        gsap.to(follower, { opacity: 1, duration: 0.4 });
        xTo(ev.clientX - r.left - 140);
        yTo(ev.clientY - r.top - 130);
      } else {
        gsap.to(follower, { opacity: 0, duration: 0.4 });
      }
    };
    const onLeave = () => gsap.to(follower, { opacity: 0, duration: 0.5 });

    sectionRef.current.addEventListener("mousemove", onMove);
    sectionRef.current.addEventListener("mouseleave", onLeave);
    return () => {
      sectionRef.current?.removeEventListener("mousemove", onMove);
      sectionRef.current?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menukaart"
      className="relative overflow-hidden bg-cream py-32 lg:py-44"
      aria-label="De kaart"
    >
      {/* Warm gradient halo behind the menu */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[120%] -translate-x-1/2 rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,165,116,0.18), transparent 70%)",
        }}
      />

      <div className="pad-x relative mx-auto max-w-[1400px]">
        <Eyebrow n="02">De kaart</Eyebrow>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* HEADER */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-[44px] leading-[1.05] tracking-editorial text-espresso sm:text-[64px] lg:text-[84px]">
              Eerlijk eten. <br />
              <span className="italic text-terracotta">
                Hier geen haast.
              </span>
            </h2>
            <p className="mt-8 max-w-md font-body text-[16px] leading-[1.7] text-espresso/75">
              Wat er op staat is wat u krijgt. Zo veel mogelijk van vlakbij,
              zo veel mogelijk met de hand. Allergenen? Vraag het ons gerust.
            </p>
          </div>

          {/* Tabs */}
          <div className="lg:col-span-5 lg:pt-6">
            <div
              role="tablist"
              aria-label="Menucategorieën"
              aria-orientation="horizontal"
              className="flex flex-wrap gap-2 lg:justify-end"
            >
              {menuCategories.map((cat) => {
                const isActive = cat.key === active;
                return (
                  <button
                    key={cat.key}
                    role="tab"
                    id={`tab-${cat.key}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${cat.key}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(cat.key)}
                    className={`
                      relative inline-flex items-center gap-2 rounded-full border
                      px-5 py-2.5 font-body text-[12px] uppercase tracking-[0.22em]
                      transition-all duration-500
                      ${
                        isActive
                          ? "border-espresso bg-espresso text-cream"
                          : "border-espresso/20 bg-transparent text-espresso/75 hover:border-espresso/60 hover:text-espresso"
                      }
                    `}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* TWO-COL CONTENT */}
        <div className="relative mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Blurb + image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.key + "-blurb"}
              role="tabpanel"
              id={`panel-${activeCategory.key}`}
              aria-labelledby={`tab-${activeCategory.key}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px]">
                <Image
                  src={activeCategory.image}
                  alt={activeCategory.label}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover warmth"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-espresso/55 to-transparent p-6 font-body text-[11px] uppercase tracking-[0.36em] text-cream/90">
                  <span>{activeCategory.label}</span>
                  <span>Nu in de vitrine</span>
                </div>
              </div>

              <p className="mt-8 max-w-sm font-body text-[15px] italic leading-[1.7] text-espresso/70">
                {activeCategory.blurb}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Items list */}
          <div className="relative lg:col-span-7">
            <ul className="divide-y divide-espresso/15">
              <AnimatePresence mode="wait">
                {activeCategory.items.map((item, i) => (
                  <MenuRow
                    key={activeCategory.key + item.name}
                    item={item}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* Floating image follower (desktop only) */}
        <div
          ref={followerRef}
          aria-hidden
          className="
            pointer-events-none absolute left-0 top-0 hidden h-[260px] w-[280px]
            rotate-[-6deg] overflow-hidden rounded-[2px] opacity-0
            shadow-2xl shadow-espresso/30 lg:block
          "
        >
          <Image
            src={activeCategory.image}
            alt=""
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function MenuRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.05 + index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex items-start gap-6 py-7 pl-5 sm:pl-7"
    >
      {/* Price guide dash, revealed on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-3 -translate-y-1/2 origin-left scale-x-0 bg-espresso/30 transition-transform duration-500 group-hover:scale-x-100 sm:block"
      />

      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-[24px] leading-tight text-espresso sm:text-[28px]">
            {item.name}
          </h3>
          {item.mark === "signature" && (
            <span className="stamp stamp-signature">Handtekening</span>
          )}
          {item.mark === "season" && (
            <span className="stamp stamp-season">Seizoen</span>
          )}
          {item.mark === "homemade" && (
            <span className="stamp stamp-homemade">Huisgemaakt</span>
          )}
        </div>
        <p className="mt-2 max-w-md ink-note text-[14px] leading-[1.6]">
          {item.detail}
        </p>
      </div>
      <div className="font-display text-[22px] tabular-nums text-espresso transition-transform duration-500 group-hover:-translate-x-1 sm:text-[26px]">
        {item.price}
      </div>
    </motion.li>
  );
}
