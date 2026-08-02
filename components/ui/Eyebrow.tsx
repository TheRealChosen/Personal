import { cn } from "@/lib/cn";

/**
 * Editorial eyebrow — small uppercase label used at the top
 * of every section. Always paired with a thin warm rule.
 */
export default function Eyebrow({
  n,
  children,
  className,
}: {
  n?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {n && (
        <span className="font-body text-[11px] uppercase tracking-[0.4em] text-wood">
          {n}
        </span>
      )}
      <span className="font-body text-[11px] uppercase tracking-[0.4em] text-espresso/70">
        {children}
      </span>
      <span className="rule-warm flex-1" />
    </div>
  );
}
