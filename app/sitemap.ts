import type { MetadataRoute } from "next";
import { PROJECTS } from "@/components/sections/projects-data";
import { SITE_URL } from "@/lib/site";

// Static export: generated once at build time into /sitemap.xml.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, priority: 1 },
    { url: `${SITE_URL}/proyectos/`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/iniciar-proyecto/`, lastModified, priority: 0.8 },
    ...PROJECTS.map((p) => ({
      url: `${SITE_URL}/proyectos/${p.slug}/`,
      lastModified,
      priority: 0.6,
    })),
  ];
}
