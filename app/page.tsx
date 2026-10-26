import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Instagram } from "@/components/sections/instagram";
import { CasosReales } from "@/components/sections/casos-reales";
import { Testimonials } from "@/components/sections/testimonials";
import { Platforms } from "@/components/sections/platforms";
import { Security } from "@/components/sections/security";
import { Process } from "@/components/sections/process";
import { Packs } from "@/components/sections/packs";
import { Cuidado } from "@/components/sections/cuidado";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ExitOfferModal } from "@/components/ui/exit-offer-modal";
import { PromoBanner } from "@/components/ui/promo-banner";

/**
 * Orden pensado para quien escanea en el celular:
 * promesa → prueba (video, proyectos, opiniones) → qué hacemos → garantías →
 * cómo trabajamos → planes (al final, sin cifras) → dudas → contacto.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Instagram />
        <CasosReales />
        <Testimonials />
        <Platforms />
        <Security />
        <Process />
        <Packs />
        <Cuidado />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <PromoBanner />
      <ExitOfferModal />
    </>
  );
}
