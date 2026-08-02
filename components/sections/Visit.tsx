"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { address, hours, brand } from "@/lib/data";

export default function Visit() {
  /* Hydration-safe open-now status: empty on first render,
     then computed in useEffect on the client. */
  const [openNow, setOpenNow] = useState<boolean | null>(null);

  useEffect(() => {
    const compute = () => {
      const d = new Date();
      const day = d.getDay(); // 0 Sun .. 6 Sat
      const m = d.getHours() * 60 + d.getMinutes();
      const open =
        (day >= 2 && day <= 4 && m >= 510 && m < 1050) ||
        ((day === 5 || day === 6) && m >= 510 && m < 1080) ||
        (day === 0 && m >= 600 && m < 1020);
      setOpenNow(open);
    };
    compute();
    const t = setInterval(compute, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="bezoek"
      className="relative overflow-hidden bg-paper py-32 lg:py-48"
      aria-label="Bezoek Hoekman"
    >
      <div className="pad-x mx-auto max-w-[1400px]">
        <Eyebrow n="05">Bezoek</Eyebrow>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — title + meta */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-[44px] leading-[1.05] tracking-editorial text-espresso sm:text-[64px] lg:text-[80px]">
              Kom langs.
              <br />
              <span className="italic text-terracotta">Wij zetten koffie.</span>
            </h2>

            <p className="mt-8 max-w-md font-body text-[16px] leading-[1.7] text-espresso/75">
              Vijf minuten lopen vanaf het station van Raalte. Wanneer u de
              geur van versgebakken brood ruikt, bent u er bijna.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <LinkButton
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.mapsQuery)}`}
                arrow={false}
                variant="primary"
              >
                <MapPin className="mr-1 h-4 w-4" strokeWidth={1.5} />
                Route plannen
              </LinkButton>
              <LinkButton href={address.phoneHref} arrow={false} variant="secondary">
                <Phone className="mr-1 h-4 w-4" strokeWidth={1.5} />
                {address.phone}
              </LinkButton>
            </div>

            {/* Live status — hydrate-safe */}
            <div
              suppressHydrationWarning
              className={`mt-10 inline-flex items-center gap-3 rounded-full border px-4 py-2 font-body text-[12px] uppercase tracking-[0.22em] ${
                openNow === null
                  ? "border-espresso/15 text-espresso/70"
                  : openNow
                  ? "border-terracotta/45 text-terracotta"
                  : "border-espresso/20 text-espresso/65"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  openNow === null
                    ? "bg-espresso/30"
                    : openNow
                    ? "bg-terracotta soft-pulse"
                    : "bg-espresso/40"
                }`}
              />
              {openNow === null
                ? "Openingstijden bekijken"
                : openNow
                ? "Op dit moment open"
                : "Op dit moment gesloten"}
            </div>
          </div>

          {/* RIGHT — details & hours table */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {/* Address card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9 }}
                className="rounded-[2px] border border-espresso/10 bg-cream p-8"
              >
                <div className="flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.4em] text-wood">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Adres
                </div>
                <div className="mt-5 font-display text-[28px] leading-tight text-espresso">
                  {address.street}
                </div>
                <div className="mt-2 font-body text-[15px] text-espresso/75">
                  {address.postcode}
                </div>
                <div className="mt-2 font-body text-[15px] text-espresso/75">
                  {brand.region}
                </div>

                <a
                  className="mt-6 inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.28em] text-espresso hover:text-terracotta"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.mapsQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Maps
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </motion.div>

              {/* Hours card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="rounded-[2px] border border-espresso/10 bg-cream p-8"
              >
                <div className="flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.4em] text-wood">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Openingstijden
                </div>
                <ul
                  id="hours-list"
                  className="mt-5 space-y-2 font-body text-[15px]"
                >
                  {hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-baseline justify-between gap-6 border-b border-espresso/8 pb-2 last:border-none"
                    >
                      <span
                        className={
                          h.closed ? "text-espresso/45" : "text-espresso"
                        }
                      >
                        {h.day}
                      </span>
                      <span
                        className={
                          h.closed
                            ? "text-espresso/45 italic"
                            : "text-espresso/85"
                        }
                      >
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* MAP — OpenStreetMap embed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative mt-12 overflow-hidden rounded-[2px] border border-espresso/10"
            >
              <div className="relative aspect-[16/9] w-full">
                <iframe
                  title="Hoekman op de kaart — Grotestraat 78, Raalte"
                  src={address.mapsEmbed}
                  className="absolute inset-0 h-full w-full border-0 grayscale-[20%] transition duration-700 group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 ring-1 ring-espresso/10"
                />
              </div>

              <div className="flex items-center justify-between border-t border-espresso/10 bg-cream px-5 py-4 font-body text-[11px] uppercase tracking-[0.32em] text-espresso/75">
                <span>Grotestraat 78 · Raalte</span>
                <a
                  className="inline-flex items-center gap-2 hover:text-terracotta"
                  href={`https://www.openstreetmap.org/?mlat=52.3855&mlon=6.2785#map=17/52.3855/6.2785`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Bekijk op de kaart
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-24 flex items-center gap-4 font-body text-[11px] uppercase tracking-[0.32em] text-wood">
          <span className="rule-warm w-12" />
          <span>Tot binnenkort — Familie Hoekman</span>
        </div>
      </div>
    </section>
  );
}
