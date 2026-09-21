import type { Metadata } from "next";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { Projects } from "@/components/sections/projects";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portafolio de Neura Sistemas: sistemas de gestión, plataformas web, configuradores y portales a medida, en producción.",
};

export default function ProyectosPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero page="projectsPage" />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
