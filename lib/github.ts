import type { Project } from "@/components/sections/projects-data";

/**
 * Build-time GitHub lookup for project detail pages. This is a static export,
 * so these fetches run once during `next build` — never in the visitor's
 * browser. Any failure (repo private, offline build, rate limit) falls back
 * to the local copy in projects-data.ts.
 */
export type ProjectContent = {
  title: string;
  desc: string;
  /** full https URL to the repository, when one is configured */
  repoUrl?: string;
};

const README_BRANCHES = ["HEAD"];

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/**
 * First `# Heading` of the README (markdown allows up to 3 leading spaces),
 * stripped of emphasis and of decorative emoji at either end.
 */
function readmeTitle(md: string): string | null {
  const m = md.match(/^ {0,3}#[ \t]+(.+)$/m);
  if (!m) return null;
  const title = m[1]
    .replace(/[*_`]/g, "")
    .replace(/^[^\p{L}\p{N}]+/u, "")
    .replace(/[^\p{L}\p{N})!?."]+$/u, "")
    .trim();
  return title || null;
}

/**
 * First real paragraph of the README — skips headings, badges, images and
 * HTML so the excerpt reads like a description.
 */
function readmeDescription(md: string): string | null {
  const blocks = md.split(/\r?\n\s*\r?\n/);
  for (const block of blocks) {
    const text = block.trim();
    if (!text) continue;
    if (/^(#|!\[|\[!\[|<|```|---|\|)/.test(text)) continue;
    const plain = text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → label
      .replace(/[*_`>]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (plain.length >= 20) return plain;
  }
  return null;
}

export async function getProjectContent(
  project: Project
): Promise<ProjectContent> {
  const fallback: ProjectContent = {
    title: project.name,
    desc: project.desc,
    repoUrl: project.repo ? `https://github.com/${project.repo}` : undefined,
  };
  if (!project.repo) return fallback;

  for (const branch of README_BRANCHES) {
    const md = await fetchText(
      `https://raw.githubusercontent.com/${project.repo}/${branch}/README.md`
    );
    if (!md) continue;
    return {
      ...fallback,
      title: readmeTitle(md) ?? fallback.title,
      desc: readmeDescription(md) ?? fallback.desc,
    };
  }
  return fallback;
}
