import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Centered max-width container with fluid gutter. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-lg)] px-[var(--gutter)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Mono uppercase kicker with a leading hairline rule. */
export function Eyebrow({
  children,
  center,
  className,
}: {
  children: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow", center && "justify-center", className)}>
      {children}
    </span>
  );
}

/** Status badge — pill with optional pulsing accent dot. */
export function Badge({
  children,
  dot,
  className,
}: {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-default)] bg-[color:var(--surface-2)] px-3.5 py-1.5 text-xs font-medium text-[color:var(--text-body)] [box-shadow:var(--edge-hi)]",
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent-400)] opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent-500)]" />
        </span>
      )}
      {children}
    </span>
  );
}

/** Secondary / outline button — hairline border, lifts on hover. */
export function SecondaryButton({
  children,
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-[52px] px-6 text-base",
  };
  return (
    <button
      className={cn(
        "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--surface-2)] font-semibold text-[color:var(--text-strong)] [box-shadow:var(--edge-hi)] transition-[transform,border-color,background-color,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-3)] hover:[box-shadow:var(--glow-silver),var(--edge-hi)] active:translate-y-px active:scale-[0.985]",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
