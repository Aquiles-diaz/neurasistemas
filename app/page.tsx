import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { DigitalGap } from "@/components/sections/digital-gap";
import { Platforms } from "@/components/sections/platforms";
import { Servicios } from "@/components/sections/servicios";
import { Security } from "@/components/sections/security";
import { TechStack } from "@/components/sections/tech-stack";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { CasosReales } from "@/components/sections/casos-reales";
import { Testimonials } from "@/components/sections/testimonials";
import { Packs } from "@/components/sections/packs";
import { Cuidado } from "@/components/sections/cuidado";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ExitOfferModal } from "@/components/ui/exit-offer-modal";
import { PromoBanner } from "@/components/ui/promo-banner";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DigitalGap />
        <Platforms />
        <Servicios />
        <Security />
        <TechStack />
        <WhyUs />
        <Process />
        <CasosReales />
        <Testimonials />
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
