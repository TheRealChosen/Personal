"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/* Dynamic import — Spline is browser-only (WebGL).
   Loaded only on the client and only after the first paint, so the
   hero text never has to wait for it. */

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineFallback />,
});

const SCENES = {
  coffeeCup:
    "https://prod.spline.design/6Wq1Q7YGyUpwxe41/scene.splinecode",
  /* A second, lightweight option if the first fails */
  cafeInterior:
    "https://prod.spline.design/oPQR6z9r1PxaPj7z/scene.splinecode",
};

/* CSS-only fallback for when the 3D scene is still loading or errors.
   Designed to feel intentional — a soft warm gradient + a single
   hand-drawn coffee cup SVG. */

function SplineFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 grid place-items-center"
    >
      <div className="relative h-[78%] w-[78%] aspect-square">
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="cupShadow" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#1c1612" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1c1612" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cupBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3ede0" />
              <stop offset="100%" stopColor="#d9c9a8" />
            </linearGradient>
            <linearGradient id="cupInside" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5a4738" />
              <stop offset="100%" stopColor="#785a46" />
            </linearGradient>
            <linearGradient id="steam" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#d9c9a8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#d9c9a8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* surface shadow */}
          <ellipse cx="200" cy="320" rx="160" ry="14" fill="url(#cupShadow)" />

          {/* cup body */}
          <path
            d="M120 180 Q120 290 200 300 Q280 290 280 180 Z"
            fill="url(#cupBody)"
            stroke="#785a46"
            strokeWidth="1.5"
          />

          {/* cup interior */}
          <ellipse cx="200" cy="180" rx="78" ry="14" fill="url(#cupInside)" />

          {/* saucer */}
          <ellipse
            cx="200"
            cy="305"
            rx="135"
            ry="14"
            fill="#d9c9a8"
            stroke="#785a46"
            strokeWidth="1"
          />

          {/* steam */}
          <g opacity="0.85">
            <path
              d="M180 170 C 175 130, 195 120, 192 90"
              fill="none"
              stroke="url(#steam)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M210 170 C 215 130, 195 120, 200 80"
              fill="none"
              stroke="url(#steam)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M235 170 C 240 140, 225 120, 230 100"
              fill="none"
              stroke="url(#steam)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* letter H on the cup */}
          <text
            x="200"
            y="245"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontStyle="italic"
            fontSize="48"
            fill="#785a46"
          >
            H
          </text>
        </svg>
      </div>
    </div>
  );
}

interface SplineSceneProps {
  scene?: keyof typeof SCENES;
}

export default function SplineScene({ scene = "coffeeCup" }: SplineSceneProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  /* Mouse-reactive parallax (no Lib dependency) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(mx, [-1, 1], [-6, 6]), {
    stiffness: 90,
    damping: 18,
  });
  const ry = useSpring(useTransform(my, [-1, 1], [-4, 4]), {
    stiffness: 90,
    damping: 18,
  });
  const tx = useSpring(useTransform(mx, [-1, 1], [-10, 10]), {
    stiffness: 90,
    damping: 20,
  });
  const ty = useSpring(useTransform(my, [-1, 1], [-6, 6]), {
    stiffness: 90,
    damping: 20,
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    /* Only attach mouse listeners on fine-pointer devices (desktop).
       On touch / hybrid devices this is wasted work and silently broke. */
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (ev: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      mx.set(x * 2);
      my.set(y * 2);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="3D illustratie van een stomende kop koffie — Hoekman"
      className="spline-host relative h-full w-full overflow-hidden rounded-[2rem]"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(212,165,116,0.22), transparent 70%), radial-gradient(ellipse 60% 50% at 70% 30%, rgba(120,90,70,0.18), transparent 65%), #f3ede0",
      }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, x: tx, y: ty }}
        className="absolute inset-0 origin-center transform-gpu"
      >
        {failed ? (
          <SplineFallback />
        ) : (
          <Suspense fallback={<SplineFallback />}>
            <Spline
              scene={SCENES[scene]}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          </Suspense>
        )}
      </motion.div>

      {/* Soft vignette frame to integrate the 3D into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-espresso/8"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 65%, rgba(28,22,18,0.22) 100%)",
        }}
      />
    </div>
  );
}
