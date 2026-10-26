"use client";

import { useEffect, useRef, useState } from "react";
import { INSTAGRAM_LATEST_POST, INSTAGRAM_LATEST_POST_URL } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

/**
 * Último post de Instagram embebido con el endpoint oficial `/embed/` (no
 * requiere embed.js). Se monta recién cuando está cerca del viewport para no
 * castigar el primer pintado en mobile; mientras tanto muestra un placeholder
 * con enlace al post.
 */
export function InstagramEmbed({
  className,
  loadingLabel,
  openLabel,
}: {
  className?: string;
  loadingLabel: string;
  openLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] [box-shadow:var(--shadow-md),var(--edge-hi)]",
        className
      )}
      style={{ aspectRatio: "9 / 17" }}
    >
      {!loaded && (
        <a
          href={INSTAGRAM_LATEST_POST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-[color:var(--text-muted)]"
        >
          <InstagramIcon size={36} className="text-[color:var(--text-strong)]" />
          <span className="text-sm">{near ? loadingLabel : openLabel}</span>
        </a>
      )}
      {near && (
        <iframe
          src={`https://www.instagram.com/p/${INSTAGRAM_LATEST_POST}/embed/`}
          title="Instagram · Neura Sistemas"
          loading="lazy"
          allow="encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full border-0 bg-transparent transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
