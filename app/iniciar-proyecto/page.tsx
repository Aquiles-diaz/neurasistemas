import type { Metadata } from "next";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { ProjectBrief } from "@/components/sections/project-brief";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Iniciar proyecto",
  description:
    "Contanos qué necesitás, tu presupuesto y la fecha deseada. Te respondemos en menos de 24 horas con una propuesta concreta.",
};

export default function IniciarProyectoPage() {
  return (
    <>
      <Nav />
      <main>
        <section
          id="top"
          className="relative overflow-hidden pb-[var(--section-y-sm)] pt-[clamp(120px,16vh,180px)]"
        >
          {/* ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(55% 45% at 50% -6%, var(--accent-glow), transparent 70%)",
            }}
          />
          <Container className="relative z-[1] text-center">
            <Reveal>
              <Eyebrow center>Iniciar proyecto</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mx-auto mt-5 max-w-[20ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.4vw,4rem)] font-bold leading-[1.03] tracking-[-0.02em] text-[color:var(--text-strong)]">
                Contanos <span className="brand-text">tu idea</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-[54ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.6] text-[color:var(--text-muted)]">
                Unos pocos datos para entender qué necesitás, tu presupuesto y
                para cuándo. Te respondemos en menos de 24 horas con una
                propuesta concreta — sin compromiso.
              </p>
            </Reveal>
          </Container>
        </section>

        <ProjectBrief />
      </main>
      <Footer />
    </>
  );
}
