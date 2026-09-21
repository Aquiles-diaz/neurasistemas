import type { Metadata } from "next";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { ProjectBrief } from "@/components/sections/project-brief";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Iniciar proyecto",
  description:
    "Contanos qué sistema necesitás, tu presupuesto y la fecha deseada. Te respondemos en menos de 12 horas con una propuesta concreta.",
};

export default function IniciarProyectoPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero page="startPage" />
        <ProjectBrief />
      </main>
      <Footer />
    </>
  );
}
