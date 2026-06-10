import type { Metadata } from "next";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { Projects } from "@/components/sections/projects";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { Reveal } from "@/components/reveal";
import { DitherBackground } from "@/components/dither-background";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portafolio de Neura Sistemas — sitios corporativos, plataformas, e-commerce y aplicaciones web a medida.",
};

export default function ProyectosPage() {
  return (
    <>
      <Nav />
      <main>
        <section
          id="top"
          className="relative overflow-hidden pb-[var(--section-y-sm)] pt-[clamp(120px,16vh,180px)]"
        >
          {/* monochrome dithered backdrop (no WebGL) */}
          <DitherBackground className="z-0" />
          {/* ambient glow on top for a touch of depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(55% 45% at 50% -6%, var(--accent-glow), transparent 70%)",
            }}
          />
          <Container className="relative z-[1]">
            <Reveal>
              <Eyebrow>Portafolio</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.4vw,4rem)] font-bold leading-[1.03] tracking-[-0.02em] text-[color:var(--text-strong)]">
                Proyectos que{" "}
                <span className="metal-text">hablan por nosotros</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.6] text-[color:var(--text-muted)]">
                Una selección de trabajos: sitios corporativos e institucionales,
                tiendas online, plataformas y aplicaciones web. Cada uno pensado
                para su rubro y construido para durar.
              </p>
            </Reveal>
          </Container>
        </section>

        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
