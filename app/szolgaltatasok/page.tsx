import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "../components/PageHero";
import ServiceNav from "../components/ServiceNav";
import ServiceSection from "../components/ServiceSection";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
import { SERVICES, WORK_PHOTOS } from "../lib/services";
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Szolgáltatásaink – kazáncsere, gépészet, karbantartás, hőszivattyú",
  description:
    "Egynapos kazáncsere, családi házak komplett gépészeti szerelése, átalánydíjas karbantartás és hőszivattyú telepítés. 50 év tapasztalat, fix ár, teljes garancia.",
  alternates: { canonical: "/szolgaltatasok" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "/szolgaltatasok",
    title: "Szolgáltatásaink – Aqua System Service Kft.",
    description:
      "Kazáncsere egy nap alatt, teljes házgépészet, átalánydíjas karbantartás és hőszivattyú telepítés – egy csapattól.",
  },
};

/* A négy szolgáltatás strukturált adatként - a cégprofilhoz kötve.
   Ár szándékosan nincs benne: a konkrét árat felmérés adja. */
const offerCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${SITE_URL}/szolgaltatasok#katalogus`,
  name: "Aqua System Service – szolgáltatások",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "Offer",
    position: i + 1,
    itemOffered: {
      "@type": "Service",
      name: s.heading,
      description: s.teaser,
      serviceType: s.title,
      url: `${SITE_URL}/szolgaltatasok#${s.slug}`,
      provider: { "@id": `${SITE_URL}/#business` },
    },
  })),
};

export default function SzolgaltatasokPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }}
      />

      <PageHero
        eyebrow="Szolgáltatásaink"
        title="Négy dolog, amiben otthon vagyunk"
        intro="A kazáncserétől a teljes házgépészetig. Ugyanaz a csapat, ugyanaz a mérce – és minden munkánál egy felelős, akit fel tudsz hívni."
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Szolgáltatásaink", href: "/szolgaltatasok" },
        ]}
      />

      <ServiceNav />

      <div>
        {SERVICES.map((s, i) => (
          <ServiceSection key={s.slug} service={s} index={i} />
        ))}
      </div>

      {/* Saját munkafotók - nem stock, ezek a mi kazánházaink. */}
      <section className="border-t border-sky-200 bg-sky/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Saját munkáink
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Így néz ki nálunk egy átadott gépészet
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Ezek a fotók a saját kazánházainkban készültek – nem katalógusból
              valók. A rendezett csövezés nemcsak jól néz ki: évek múlva is ez
              teszi szervizelhetővé a rendszert.
            </p>
          </div>

          <Reveal
            stagger
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {WORK_PHOTOS.map((p) => (
              <figure
                key={p.alt}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]"
              >
                <Image
                  src={p.img}
                  alt={p.alt}
                  placeholder="blur"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Nem tudod, melyik kell neked?"
        body="Írd le pár mondatban, mi a helyzet – az online árajánló asszisztensünk pár kérdés után megmondja, melyik szolgáltatás való hozzád, és mennyiből jön ki."
      />
    </main>
  );
}
