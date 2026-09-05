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
import PriceBand from "./components/PriceBand";

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
       *    5. Mennyibe kerul?       PriceBand   <- a legfontosabb kerdes
       *    6. Tenyleg tudjak?       Gallery (sajat munkafotok)
       *    7. Miert ok?             WhyUs + TrustBanner
       *    8. Kik ok?               About (a teljes tortenet: /rolunk)
       *    9. Maradt kerdes?        Faq
       *   10. Hogyan indulok el?    Contact
       *
       *  Ami NEM ide tartozik, mert masik oldal a helye: a kazan
       *  kalkulator (/kell-e-uj-kazan) es a csapat (/rolunk). Egy
       *  szekcio egy oldalon lakjon, kulonben az egesz site ismetel.
       *
       *  Uj szekcio csak akkor kerul be, ha van helye ebben a sorban.
       *
       *  A hatter szigoruan valtakozik: feher, tonus, feher, tonus...
       *  (Hero feher, Testimonials tonus, Services feher, Showcase tonus,
       *  Process feher, PriceBand tonus, Gallery feher, WhyUs tonus,
       *  TrustBanner feher, About tonus, Faq feher, Contact tonus.)
       *  Ha ide uj szekcio kerul, a sor tobbi elemenek tonusat is at kell
       *  fordítani, kulonben ket azonos szekcio er ossze, es abbol lesz a
       *  nagy ures feher sav.
       * ------------------------------------------------------------------ */}
      <Hero />
      <Testimonials />
      <Services />
      <ServicesShowcase />
      <Process />
      <PriceBand />
      <Gallery />
      <WhyUs />
      <TrustBanner />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}
