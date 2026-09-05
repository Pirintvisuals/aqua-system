import Hero from "./components/Hero";
import Services from "./components/Services";
import ServicesShowcase from "./components/ServicesShowcase";
import WhyUs from "./components/WhyUs";
import BoilerCalculator from "./components/BoilerCalculator";
import Process from "./components/Process";
import TrustBanner from "./components/TrustBanner";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Team from "./components/Team";
import Gallery from "./components/Gallery";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import WaveBand from "./components/WaveBand";

export default function Home() {
  return (
    <main className="flex-1">
      {/* ------------------------------------------------------------------ *
       *  A sorrend nem esetleges, egy dontesi utat kovet:
       *
       *    1. Mit csinalnak?        Hero
       *    2. Megbizhatok?          Testimonials
       *    3. Mit vallalnak pontosan? Services + ServicesShowcase
       *    4. Engem erint ez?       BoilerCalculator
       *    5. Hogyan zajlik?        Process
       *    6. Tenyleg tudjak?       Gallery (sajat munkafotok)
       *    7. Miert ok?             WhyUs + TrustBanner
       *    8. Kik ok?               About + Team
       *    9. Maradt kerdes?        Faq
       *   10. Hogyan indulok el?    Contact
       *
       *  Uj szekcio csak akkor kerul be, ha van helye ebben a sorban.
       * ------------------------------------------------------------------ */}
      <Hero />
      <WaveBand from="bg-white" to="text-sky/30" variant="swell" />
      <Testimonials />
      <WaveBand from="bg-sky/30" to="text-white" variant="crest" flip />
      <Services />
      <ServicesShowcase />
      <BoilerCalculator />
      <WaveBand from="bg-white" to="text-sky/30" variant="ripple" />
      <Process />
      <WaveBand from="bg-sky/30" to="text-white" variant="drift" />
      <Gallery />
      <WaveBand from="bg-white" to="text-sky/30" variant="crest" />
      <WhyUs />
      <TrustBanner />
      <About />
      <Team />
      <Faq />
      <WaveBand from="bg-sky/30" to="text-white" variant="ripple" flip />
      <Contact />
    </main>
  );
}
