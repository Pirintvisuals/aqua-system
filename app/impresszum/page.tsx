import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import { BUSINESS } from "../lib/site";

export const metadata: Metadata = {
  title: "Impresszum",
  description:
    "Az Aqua System Service Kft. weboldalának impresszuma: a szolgáltató és a tárhelyszolgáltató adatai.",
  alternates: { canonical: "/impresszum" },
  robots: { index: true, follow: true },
};

/* ⚠ A gazszereloi/kamarai jogosultsagi szamokat Ferenctol kell kerni -
   ha van ilyen nyilvantartasi szam, ide kerul, mert gazmunkanal ez
   erositi a bizalmat. Amig nincs meg, ez a szakasz kimarad. */

export default function ImpresszumPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Jogi"
        title="Impresszum"
        intro="A 2001. évi CVIII. törvény (az elektronikus kereskedelmi szolgáltatásokról) alapján előírt adatok a weboldal szolgáltatójáról."
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Impresszum", href: "/impresszum" },
        ]}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <article className="legal-article">
            <h2>Szolgáltató</h2>
            <p>
              <strong>{BUSINESS.legalName}</strong>
              <br />
              Székhely: {BUSINESS.address.postalCode} {BUSINESS.address.addressLocality},{" "}
              {BUSINESS.address.streetAddress}
              <br />
              Cégjegyzékszám: {BUSINESS.registration.companyNumber}
              <br />
              Adószám: {BUSINESS.registration.taxNumber}
              <br />
              E-mail: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              <br />
              Telefon: <a href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephone}</a>
            </p>

            <h2>Nyilvántartó bíróság</h2>
            <p>
              A társaság a cégjegyzékszáma szerint illetékes törvényszék
              cégbírósága által van bejegyezve.
            </p>

            <h2>Tárhelyszolgáltató</h2>
            <p>
              Vercel Inc.
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, USA
            </p>

            <h2>A weboldalon nyújtott tartalomért felelős</h2>
            <p>
              A weboldal tartalmáért a Szolgáltató felel, elérhetőségei a
              fentiekben szerepelnek.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
