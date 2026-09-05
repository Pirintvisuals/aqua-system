import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
import { SERVICES } from "../lib/services";
import { SITE_URL } from "../lib/site";
import gepeszetKazanhaz from "../assets/munkak/gepeszet-kazanhaz.jpg";

/* ------------------------------------------------------------------ *
 *  Szolgáltatások gyűjtőoldala.
 *
 *  Mostantól index: minden szolgáltatásnak SAJÁT aloldala van, itt csak
 *  a felvezetés és a négy belépő áll. Így a részletes tartalom nem egy
 *  végtelen görgetésű oldalon torlódik, és mind a négy téma külön
 *  indexelhető, külön linkelhető.
 * ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Szolgáltatásaink – kazáncsere, gépészet, karbantartás, hőszivattyú",
  description:
    "Egynapos kazáncsere, családi házak komplett gépészeti szerelése, átalánydíjas karbantartás és hőszivattyú telepítés. Ötven év tapasztalat, fix ár.",
  alternates: { canonical: "/szolgaltatasok" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "/szolgaltatasok",
    title: "Szolgáltatásaink – Aqua System Service Kft.",
    description:
      "Kazáncsere egy nap alatt, teljes házgépészet, átalánydíjas karbantartás és hőszivattyú telepítés.",
  },
};

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/szolgaltatasok#lista`,
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.heading,
    url: `${SITE_URL}/szolgaltatasok/${s.slug}`,
  })),
};

export default function SzolgaltatasokPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <PageHero
        eyebrow="Szolgáltatásaink"
        title="Négy dolog, amiben otthon vagyunk"
        intro="A kazáncserétől a teljes házgépészetig. Ugyanaz a csapat, ugyanaz a mérce, és minden munkánál egy felelős, akit fel tudsz hívni."
        image={gepeszetKazanhaz}
        imageAlt="Elkészült kazánház fali kazánnal, melegvíz-tárolóval és puffertartállyal"
        badge={{ value: "50 éve", label: "a szakmában" }}
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Szolgáltatásaink", href: "/szolgaltatasok" },
        ]}
      />

      {/* BEVEZETŐ. Egy bekezdes arrol, hogyan all ossze ez a negy dolog,
          es hol a hatarunk: cseret vallalunk, javitast nem. */}
      <section className="relative bg-paper pt-16 pb-4 lg:pt-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-lg leading-relaxed text-ink-soft">
            A fő profilunk a kazáncsere, és ötven éve ezt csináljuk: a régi
            készülék le, az új kondenzációs fel, egyetlen munkanap alatt.
            Mögötte viszont ott van a teljes épületgépészeti háttér, ezért
            tudunk egy komplett házat is végigvinni, és ezért nem akadunk el
            azon, ha a kéményt bélelni kell vagy a gázvezetéket át kell
            alakítani.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Egy dolgot nem csinálunk:{" "}
            <strong className="font-semibold text-ink">
              idegen készülék javítását
            </strong>
            . Aki mindent vállal, az semmiben nem lesz igazán jó. Karbantartási
            szerződést az általunk beépített rendszerekre kötünk, mert azoknak
            ismerjük a teljes előéletét.
          </p>
        </div>
      </section>

      {/* NÉGY BELÉPŐ. Váltakozó, széles sorok, nem egyforma kártyák. */}
      <section className="bg-paper pb-20 pt-10 lg:pb-28">
        <div className="mx-auto max-w-7xl space-y-6 px-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug}>
              <Link
                href={`/szolgaltatasok/${s.slug}`}
                className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-sky-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-[0_40px_70px_-40px_rgba(15,42,94,0.5)] lg:grid-cols-[1fr_1.15fr]"
              >
                {/* Kép vagy jelzésértékű felület */}
                <div
                  className={`relative min-h-[220px] overflow-hidden lg:min-h-[300px] ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  {s.photo ? (
                    <Image
                      src={s.photo}
                      alt={s.alt}
                      placeholder="blur"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky via-white to-sky">
                      <div className="pointer-events-none absolute inset-0 bg-blueprint" aria-hidden="true" />
                      <svg className="relative h-20 w-20 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="6" width="13" height="12" rx="2" />
                        <circle cx="8.5" cy="12" r="3.5" />
                        <path d="M18 9c1.2 1 1.2 2 0 3s-1.2 2 0 3" />
                        <path d="M21.5 8c1.4 1.3 1.4 2.7 0 4s-1.4 2.7 0 4" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Szöveg */}
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <span className="font-display text-sm font-bold text-brand tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    {s.heading}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-ink-soft">
                    {s.intro}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.includes.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-sky px-3 py-1 text-xs font-semibold text-brand"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    Részletek és folyamat
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ZÁRÓ SZÖVEG. Terulet es keretek, kereseshez is hasznos. */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Hol dolgozunk
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Budapesten és az agglomerációban vállalunk munkát: Érd, Budaörs,
              Törökbálint, Diósd, Százhalombatta, Biatorbágy és a környező
              települések. A visszatérő ügyfeleink jó része is innen van, sokan
              tizenöt-huszonöt éve.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Családi házakkal, sorházakkal és társasházi lakásokkal egyaránt
              dolgozunk. Nagyobb, több készülékes társasházi feladatra külön
              ütemtervet készítünk.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Hogyan indul egy munka
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Minden munka helyszíni felméréssel kezdődik. Megnézzük a meglévő
              rendszert, a kéményt és a gázvezetéket, és ezután adunk fix árat,
              írásban. Nem sávos becslést, nem telefonos tippet.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Ha csak egy nagyságrendre vagy kíváncsi, az online árajánló
              asszisztensünk pár kérdés után ad egy tájékoztató árat, a nap
              bármely szakában. A pontos ajánlat ettől függetlenül mindig a
              felmérés után születik.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Nem tudod, melyik kell neked?"
        body="Írd le pár mondatban, mi a helyzet. Az online árajánló asszisztensünk pár kérdés után megmondja, melyik szolgáltatás való hozzád, és mennyiből jön ki."
      />
    </main>
  );
}
