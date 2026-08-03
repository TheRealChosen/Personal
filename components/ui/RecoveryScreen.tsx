import type { ReactNode } from "react";

/**
 * RecoveryScreen — shared shell for full-height status screens (404 / runtime
 * error). Centered editorial layout: small stamp label, italic display
 * heading, supporting copy, and an optional action row. Used by both
 * `app/not-found.tsx` and `app/error.tsx` so the two states stay consistent.
 */
export default function RecoveryScreen({
  stamp,
  title,
  children,
  actions,
}: {
  stamp: string;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="pad-x grid min-h-[85dvh] place-items-center py-28">
      <div className="flex max-w-md flex-col items-center text-center">
        <span className="font-body text-[11px] uppercase tracking-[0.4em] text-wood">
          {stamp}
        </span>

        <p className="mt-7 font-display text-[clamp(2.6rem,7vw,4.5rem)] italic leading-[1.05] text-espresso">
          {title}
        </p>

        <div className="mt-5 font-body text-[15px] leading-relaxed text-espresso/70">
          {children}
        </div>

        {actions && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
