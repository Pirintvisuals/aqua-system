import Hero from "./components/Hero";
import Services from "./components/Services";
import ServicesShowcase from "./components/ServicesShowcase";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import TrustBanner from "./components/TrustBanner";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Faq from "./components/Faq";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      {/* ------------------------------------------------------------------ *
       *  A sorrend nem esetleges, egy dontesi utat kovet:
       *
       *    1. Mit csinalnak?        Hero
       *    2. Megbizhatok?          Testimonials
       *    3. Mit vallalnak pontosan? Services + ServicesShowcase
       *    4. Hogyan zajlik?        Process
       *    5. Tenyleg tudjak?       Gallery (sajat munkafotok)
       *    6. Miert ok?             WhyUs + TrustBanner
       *    7. Kik ok?               About (a teljes tortenet: /rolunk)
       *    8. Maradt kerdes?        Faq
       *    9. Hogyan indulok el?    Contact
       *
       *  Ami NEM ide tartozik, mert masik oldal a helye: a kazan
       *  kalkulator (/kell-e-uj-kazan) es a csapat (/rolunk). Egy
       *  szekcio egy oldalon lakjon, kulonben az egesz site ismetel.
       *
       *  Uj szekcio csak akkor kerul be, ha van helye ebben a sorban.
       * ------------------------------------------------------------------ */}
      <Hero />
      <Testimonials />
      <Services />
      <ServicesShowcase />
      <Process />
      <Gallery />
      <WhyUs />
      <TrustBanner />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}
