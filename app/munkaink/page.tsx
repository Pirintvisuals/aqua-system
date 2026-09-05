import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
import { SERVICES, WORK_PHOTOS } from "../lib/services";
import { LOCATIONS } from "../lib/locations";
import { BUSINESS } from "../lib/site";
import gepeszetCsovezetek from "../assets/munkak/gepeszet-csovezetek.jpg";

/* ------------------------------------------------------------------ *
 *  Munkáink - saját fotók egy helyen, plusz az, hogy hol dolgoztunk.
 *
 *  A településlista nem marketingszöveg: a `reviews.ts`-ből jön, tehát
 *  minden név mögött egy valódi, aláírt ügyfélvélemény áll. Ezért
 *  külön jelöljük, melyik településről van visszajelzésünk.
 * ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Munkáink – saját fotók elkészült kazánházakról",
  description:
    "Nem katalógusképek: saját fotók az általunk épített kazánházakról és elvégzett készülékcserékről, Budapesten és az agglomerációban.",
  alternates: { canonical: "/munkaink" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "/munkaink",
    title: "Munkáink – Aqua System Service Kft.",
    description:
      "Saját fotók elkészült kazánházakról és készülékcserékről, Budapesten és környékén.",
  },
};

/* Minden saját fotó egy helyen, képaláírással. */
const GALLERY = [
  ...SERVICES.filter((s) => s.photo).map((s) => ({
    img: s.photo!,
    alt: s.alt,
    caption: s.title,
  })),
  ...WORK_PHOTOS.map((p) => ({
    img: p.img,
    alt: p.alt,
    caption: p.alt.split(":")[0].split(",")[0],
  })),
];

export default function MunkainkPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Munkáink"
        title="Saját fotók, saját kazánházak"
        intro="Ezek a képek a mi munkáinkról készültek, átadás körül. A rendezett csövezés nem szépészeti kérdés: ettől lesz évek múlva is szervizelhető a rendszer."
        image={gepeszetCsovezetek}
        imageAlt="Elkészült kazánház rézcsövezéssel, puffertartállyal és szivattyúkkal"
        badge={{ value: "500+", label: "elvégzett készülékcsere" }}
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Munkáink", href: "/munkaink" },
        ]}
      />

      {/* GALÉRIA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal
            stagger
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {GALLERY.map((g, i) => (
              <figure
                key={`${g.caption}-${i}`}
                className={`group relative overflow-hidden rounded-2xl border border-sky-200 bg-white ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative ${i === 0 ? "aspect-[4/3] sm:h-full" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={g.img}
                    alt={g.alt}
                    placeholder="blur"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute bottom-0 left-0 p-5 text-base font-semibold text-white drop-shadow">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOL DOLGOZUNK. Sötét sáv, a településlista kiemelve. */}
      <section className="relative overflow-clip bg-cta edge-glow py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan">
              Hol dolgozunk
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Budapest és az agglomeráció
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sky-200">
              A csillaggal jelölt településekről valódi, aláírt ügyfélvéleményünk
              is van, és külön oldaluk van a helyi visszajelzésekkel. Ha a te
              településed nincs a listán, kérdezz rá: jó eséllyel megoldjuk.
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-3">
            {BUSINESS.areaServed.map((place) => {
              const loc = LOCATIONS.find((l) => l.name === place);
              if (loc) {
                return (
                  <li key={place}>
                    <Link
                      href={`/kazancsere/${loc.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-cta transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.8l1.2-6.6L2.5 9l6.6-.9z" />
                      </svg>
                      {place}
                    </Link>
                  </li>
                );
              }
              return (
                <li
                  key={place}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20"
                >
                  {place}
                </li>
              );
            })}
          </ul>

          <Link
            href="/#velemenyek"
            className="group mt-10 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-cyan transition-colors hover:text-white"
          >
            Olvasd el, mit írtak
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      <CtaBand
        title="A tiéd lehet a következő"
        body="Küldj egy fotót a jelenlegi készülékről, és pár kérdés után kapsz egy tájékoztató árat."
      />
    </main>
  );
}
