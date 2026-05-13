import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { ProofTicker } from '@/components/sections/ProofTicker';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import Results from '@/components/sections/Results';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import LeadMagnet from '@/components/sections/LeadMagnet';
import AboutRohan from '@/components/sections/AboutRohan';
import BookCall from '@/components/sections/BookCall';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ProofTicker />
      <Problem />
      <Solution />
      <Results />
      <Process />
      <Testimonials />
      <LeadMagnet />
      <AboutRohan />
      <BookCall />
      <Footer />
    </>
  );
}
