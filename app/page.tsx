import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Solution } from "@/components/sections/solution";
import { Servicios } from "@/components/sections/servicios";
import { Packs } from "@/components/sections/packs";
import { Cuidado } from "@/components/sections/cuidado";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
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
        <Solution />
        <Servicios />
        <Packs />
        <Cuidado />
        <WhyUs />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <PromoBanner />
      <ExitOfferModal />
    </>
  );
}
