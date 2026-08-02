"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import { atmosphere } from "@/lib/data";

type Tile = { title: string; span: string; image: string };

export default function Atmosphere() {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={ref}
      id="sfeer"
      className="relative overflow-hidden bg-paper py-32 lg:py-48"
      aria-label="De sfeer bij Hoekman"
    >
      <div className="pad-x mx-auto max-w-[1400px]">
        <Eyebrow n="03">De sfeer</Eyebrow>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[44px] leading-[1.05] tracking-editorial text-espresso sm:text-[64px] lg:text-[88px]">
              Binnenkomen is
              <br />
              <span className="italic text-wood">al half thuis.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-4">
            <p className="font-body text-[16px] leading-[1.75] text-espresso/75">
              Hier geen design waar je niets mee mag. Tafels die kraken, een
              krantje dat open ligt, een kannetje water dat plotseling
              verschijnt. Onze bediening groet u zoals dat hoort — en neemt
              daarna de tijd om uw bestelling op te nemen.
            </p>
            <div className="mt-6 flex h-px w-32 bg-espresso/30" />
          </div>
        </div>

        {/* ASYMMETRIC SCATTER — like photos resting on a café table.
            Each tile carries a hand-placed rotation + vertical offset
            so the rhythm reads as curated, not generated. */}
        <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-16 sm:gap-y-24 sm:grid-cols-2 lg:grid-cols-12">
          {atmosphere.map((item, i) => {
            /* Even tiles lean slightly right + down, odd tiles slightly left + up.
               Tall tiles get a deeper rotate so the silhouette reads physical. */
            const rotate =
              item.span === "tall"
                ? i % 2 === 0
                  ? -1.6
                  : 1.4
                : i % 2 === 0
                ? 1.2
                : -0.9;
            const offsetY =
              i % 2 === 0 ? "-1.5%" : item.span === "wide" ? "2%" : "-0.5%";
            return (
              <GalleryTile
                key={item.title}
                item={item}
                i={i}
                rotate={rotate}
                offsetY={offsetY}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GalleryTile({
  item,
  i,
  rotate,
  offsetY,
}: {
  item: Tile;
  i: number;
  rotate: number;
  offsetY: string;
}) {
  const tileRef = useRef<HTMLDivElement | null>(null);

  const spanClass =
    item.span === "tall"
      ? "sm:row-span-2 sm:col-span-1 lg:col-span-5"
      : item.span === "wide"
      ? "sm:col-span-2 lg:col-span-7 aspect-[16/9]"
      : "sm:col-span-1 lg:col-span-4 aspect-[4/5]";

  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const clipInset = useTransform(scrollYProgress, [0, 0.6], (v) => `inset(0 0 ${v}% 0)`);

  return (
    <figure
      ref={tileRef}
      /* Set CSS vars so the .atmosphere-tile hover class in globals.css
         can settle rotation to 0deg while preserving translateY. */
      style={
        {
          "--tile-y": offsetY,
          "--tile-r": `${rotate}deg`,
        } as React.CSSProperties
      }
      className={`atmosphere-tile group relative overflow-hidden rounded-[2px] shadow-[0_20px_60px_-30px_rgba(28,22,18,0.45)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${spanClass}`}
      aria-label={item.title}
    >
      <motion.div style={{ clipPath: clipInset }} className="absolute inset-0">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover warmth"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.05 * i }}
        className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-espresso/65 to-transparent p-5"
      >
        <span className="font-display text-[20px] italic text-cream">
          {item.title}
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.32em] text-cream/85">
          0{i + 1}
        </span>
      </motion.div>
    </figure>
  );
}
