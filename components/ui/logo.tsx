import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand mark. The white PNG is the only cropped-to-content asset, so instead
 * of shipping a second file we invert it with CSS:
 *   on="page" → black in light mode (the page ground is white)
 *   on="band" → black in dark mode (the band is the inverse: white)
 */
export function Logo({
  className,
  alt = "",
  on = "page",
}: {
  className?: string;
  alt?: string;
  on?: "page" | "band";
}) {
  return (
    <Image
      src="/logo/logoneurasistemas-white.png"
      alt={alt}
      width={1755}
      height={649}
      className={cn(
        "h-[22px] w-auto",
        on === "page" ? "light:invert" : "dark:invert",
        className
      )}
      priority
    />
  );
}
