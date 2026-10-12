import type { Metadata } from "next";
import Image from "next-image-export-optimizer";
import PageHero from "../components/PageHero";
import szechenyiBanner from "../assets/palyazat/szechenyi-terv-plusz.jpg";
import { BUSINESS } from "../lib/site";

/* ------------------------------------------------------------------ *
 *  GINOP Plusz-3.2.1-21 - Munkaerőfejlesztési támogatás.
 *
 *  Az adatok a cég saját, korábban közzétett Facebook-bejegyzéséből
 *  valók (2026. február 3.), az összeg Ferenc e-mailjéből. A projekt
 *  azonosító száma és a támogatás mértéke nincs meg - amíg a támogatói
 *  okiratból nem derül ki, nem írunk ki semmit helyettük.
 *
 *  A logósáv ugyanaz a hivatalos infoblokk, mint a lábléc bannere.
 * ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Munkaerőfejlesztési támogatás – GINOP Plusz-3.2.1-21",
  description:
    "Az Aqua System Service Kft. európai uniós támogatással megvalósuló képzése: energiahatékonyság a fűtési rendszerek átalakítása során.",
  alternates: { canonical: "/munkaerofejlesztesi-palyazat" },
  robots: { index: true, follow: true },
};

const DETAILS = [
  { label: "Kedvezményezett", value: BUSINESS.legalName },
  { label: "Pályázati felhívás", value: "GINOP Plusz-3.2.1-21 – Munkaerőfejlesztési támogatás" },
  {
    label: "A képzés elnevezése",
    value:
      "Energiahatékonyság figyelembevétele a fűtési rendszerek átalakítása során, a rendszerek ismereteinek fejlesztése",
  },
  { label: "A szerződött támogatás összege", value: "5 707 272 Ft" },
  { label: "Képzésen résztvevők száma", value: "7 fő" },
  { label: "A képzések tervezett befejezési dátuma", value: "2026. szeptember 30." },
];

export default function MunkaerofejlesztesiPalyazatPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Európai uniós pályázat"
        title="Munkaerőfejlesztési támogatás"
        intro="Európai uniós támogatással megvalósuló képzés: energiahatékonyság a fűtési rendszerek átalakítása során."
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Munkaerőfejlesztési támogatás", href: "/munkaerofejlesztesi-palyazat" },
        ]}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="overflow-hidden rounded-2xl border border-sky-200 bg-white">
            <Image
              src={szechenyiBanner}
              alt="Széchenyi Terv Plusz – Magyarország Kormánya – Az Európai Unió társfinanszírozásával"
              sizes="(max-width: 768px) 100vw, 720px"
              className="h-auto w-full"
            />
          </div>

          <article className="legal-article mt-12">
            <h2>A nyertes pályázat adatai</h2>
            <dl className="legal-box">
              {DETAILS.map((d) => (
                <div
                  key={d.label}
                  className="grid grid-cols-1 gap-1 border-b border-sky-200 py-3 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[14rem_1fr] sm:gap-4"
                >
                  <dt className="text-sm font-medium text-ink-soft">{d.label}</dt>
                  <dd className="text-sm font-semibold leading-snug text-ink">{d.value}</dd>
                </div>
              ))}
            </dl>

            <h2>A képzés célja</h2>
            <p>
              Adott ingatlanhoz legjobban illeszkedő, a lehető legnagyobb
              energiamegtakarítást eredményező, a megrendelőnk elvárásaihoz
              legjobban passzoló, komplex gépészeti rendszer ajánlásához
              szükséges ismeretek fejlesztése.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
