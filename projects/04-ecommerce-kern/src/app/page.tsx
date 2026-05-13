import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Collection } from "@/components/sections/Collection";
import { Materials } from "@/components/sections/Materials";
import { FeaturedProduct } from "@/components/sections/FeaturedProduct";
import { Lookbook } from "@/components/sections/Lookbook";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Philosophy />
      <Collection />
      <Materials />
      <FeaturedProduct />
      <Lookbook />
      <Testimonials />
      <Footer />
    </main>
  );
}
