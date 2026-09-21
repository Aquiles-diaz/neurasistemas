"use client";

import { useSiteMode } from "@/components/site-mode";
import { es } from "./es";
import { en } from "./en";
import type { Dict, Lang } from "./types";

export type { Dict, Lang } from "./types";

export const DICTS: Record<Lang, Dict> = { es, en };

/** Returns the copy for the current language (coupled to the theme). */
export function useT(): Dict {
  const { lang } = useSiteMode();
  return DICTS[lang];
}
