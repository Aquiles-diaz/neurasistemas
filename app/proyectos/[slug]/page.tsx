import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { ProjectDetail } from "@/components/sections/project-detail";
import { PROJECTS } from "@/components/sections/projects-data";
import { DitherBackground } from "@/components/ui/dither-background";
import { getProjectContent } from "@/lib/github";

// Static export: every project page is prerendered at build time and unknown
// slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  const { title, desc } = await getProjectContent(project);
  return { title, description: desc };
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const content = await getProjectContent(project);

  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden pb-[var(--section-y)] pt-[clamp(120px,16vh,180px)]">
          <DitherBackground className="z-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(55% 45% at 50% -6%, var(--accent-glow), transparent 70%)",
            }}
          />
          <ProjectDetail project={project} content={content} />
        </section>
      </main>
      <Footer />
    </>
  );
}
