import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Contact from "../components/Contact";
import Reveal from "../components/Reveal";
import AreaChecker from "../components/AreaChecker";

export const metadata: Metadata = {
  title: "Kapcsolat – kérj azonnali árajánlatot",
  description:
    "Vedd fel velünk a kapcsolatot gázkészülék cseréhez vagy gázépítéshez. Online árajánló asszisztens, e-mail és telefon. Budapest és agglomerációja.",
  alternates: { canonical: "/kapcsolat" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "/kapcsolat",
    title: "Kapcsolat – Aqua System Service Kft.",
    description:
      "Írj vagy hívj minket – vagy kérj azonnali, tájékoztató árat az online árajánló asszisztensünkkel.",
  },
};

const HOURS = [
  { day: "Hétfő – Péntek", time: "8:00 – 18:00" },
  { day: "Szombat", time: "Előzetes egyeztetéssel" },
  { day: "Vasárnap", time: "Zárva" },
];

export default function KapcsolatPage() {
  return (
    <main className="flex-1">
      <PageHero
        tone="dark"
        actions
        eyebrow="Kapcsolat"
        title="Beszéljünk a gázkészülék cseréről"
        intro="A leggyorsabb út az árhoz az online árajánló asszisztensünk – pár kérdés, és máris kapsz egy tájékoztató árat. Ha inkább írnál vagy telefonálnál, minden elérhetőségünk lent van."
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Kapcsolat", href: "/kapcsolat" },
        ]}
      />

      {/* Elérhetőségek + űrlap (meglévő komponens) */}
      <Contact />

      {/* Kiszolgált terület + nyitvatartás */}
      <section className="bg-water py-16 lg:py-24">
        <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Kiszolgált terület
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Hol dolgozunk?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Budapesten és az agglomerációban vállalunk gázkészülék cserét,
              gázépítést és fűtésszerelést. Nézd meg egy másodperc alatt,
              hogy a te településed belefér-e.
            </p>
            <div className="mt-8">
              <AreaChecker />
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Nyitvatartás
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Mikor érsz el minket?
            </h2>
            <dl className="mt-6 divide-y divide-sky-200 overflow-hidden rounded-2xl border border-sky-200 bg-white">
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <dt className="font-medium text-ink">{h.day}</dt>
                  <dd className="text-ink-soft">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Sürgős esetben is keress minket telefonon – amit lehet, igyekszünk
              gyorsan megoldani.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
