import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Solution } from "@/components/sections/solution";
import { Packs } from "@/components/sections/packs";
import { Casos } from "@/components/sections/casos";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Solution />
        <Packs />
        <Casos />
        <WhyUs />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
