import { cn } from "@/lib/utils";

/**
 * Rolling text (skiper-ui style): every glyph is a two-line column that
 * slides up on hover, with a per-character stagger. Pure CSS (`.roll` in
 * globals.css); the parent opts in as the hover target with `.roll-trigger`
 * (a button / link) or the text itself rolls when hovered directly.
 *
 * Screen readers get the plain string once; the animated glyphs are hidden.
 */
export function RollingText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const chars = Array.from(text);
  return (
    <span className={cn("roll", className)}>
      <span className="sr-only">{text}</span>
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="roll__char"
          style={{ ["--i" as string]: i }}
        >
          <span>{ch}</span>
          <span>{ch}</span>
        </span>
      ))}
    </span>
  );
}
