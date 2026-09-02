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
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <ServicesShowcase />
      <Testimonials />
      <WhyUs />
      <BoilerCalculator />
      <Process />
      <TrustBanner />
      <About />
      <Team />
      <Gallery />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
