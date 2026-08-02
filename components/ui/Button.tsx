"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  arrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Handcrafted button — never a UI library default.
 * Feels warm, expensive, and tactile.
 */
export default function Button({
  variant = "primary",
  arrow = true,
  children,
  className,
  ...rest
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[13px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 will-change-transform";

  const styles: Record<Variant, string> = {
    primary:
      "bg-espresso text-cream hover:bg-espresso-2",
    secondary:
      "border border-espresso/30 bg-transparent text-espresso hover:border-espresso hover:bg-espresso hover:text-cream",
    ghost:
      "bg-transparent text-espresso hover:text-espresso-2",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={cn(base, styles[variant], className)}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {arrow && (
        <motion.span
          aria-hidden
          className="relative z-10 inline-flex h-5 w-5 items-center justify-center"
          initial={false}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14" strokeLinecap="round" />
            <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      )}
      <span
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
          from-transparent via-cream/15 to-transparent
          transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover:translate-x-full
        "
      />
    </motion.button>
  );
}

/**
 * Anchor with the same handcrafted feel — link variant.
 */
export function LinkButton({
  variant = "primary",
  arrow = true,
  children,
  className,
  href,
  ...rest
}: ButtonProps & { href: string }) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[13px] font-medium uppercase tracking-[0.2em] transition-colors duration-500";

  const styles: Record<Variant, string> = {
    primary: "bg-espresso text-cream hover:bg-espresso-2",
    secondary:
      "border border-espresso/30 bg-transparent text-espresso hover:border-espresso hover:bg-espresso hover:text-cream",
    ghost: "bg-transparent text-espresso hover:text-espresso-2",
  };

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={cn(base, styles[variant], className)}
      {...(rest as HTMLMotionProps<"a">)}
    >
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span className="relative z-10 inline-flex h-5 w-5 items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14" strokeLinecap="round" />
            <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <span
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
          from-transparent via-cream/15 to-transparent
          transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover:translate-x-full
        "
      />
    </motion.a>
  );
}
