import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Doctors } from "@/components/sections/Doctors";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookingForm } from "@/components/sections/BookingForm";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Hero />
        <TrustBar />
        <Services />
        <HowItWorks />
        <Doctors />
        <Stats />
        <Testimonials />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
