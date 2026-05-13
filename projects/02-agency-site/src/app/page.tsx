import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
