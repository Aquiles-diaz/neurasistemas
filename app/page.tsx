import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Stack } from "@/components/sections/stack";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Showcase } from "@/components/sections/showcase";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Stack />
        <Stats />
        <Process />
        <Showcase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
