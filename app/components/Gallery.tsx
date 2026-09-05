import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { SERVICES, WORK_PHOTOS } from "../lib/services";

/* ------------------------------------------------------------------ *
 *  Korábbi munkáink - VALÓDI, saját fotók a kazánházainkból.
 *
 *  Korábban stockfotók álltak itt kitalált településnevekkel
 *  ("Érd", "Tárnok"…). Kifelé az a látszat, hogy a mi munkánk -
 *  ez egy bizalomra épülő szakmában nem vállalható, ezért kikerült.
 *  A képaláírás most azt mondja, ami tényleg a képen van.
 *
 *  A forrás az `app/lib/services.ts`, hogy a fotók egy helyen legyenek.
 * ------------------------------------------------------------------ */

/* A bento-rács: az első kép nagy, a többi köré rendeződik. */
const TILES = [
  { ...WORK_PHOTOS[0], caption: "Kazánház átadás előtt", span: "md:col-span-2 md:row-span-2" },
  { ...WORK_PHOTOS[1], caption: "Osztó-gyűjtő, szivattyúk", span: "" },
  { ...WORK_PHOTOS[2], caption: "Kazán és melegvíz-tároló", span: "" },
  {
    img: SERVICES[1].photo!,
    alt: SERVICES[1].alt,
    caption: "Rézcsövezés, puffertartály",
    span: "",
  },
  { ...WORK_PHOTOS[3], caption: "Beüzemelés, beszabályozás", span: "" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="relative isolate overflow-hidden scroll-mt-36 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Korábbi munkáink
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Saját fotók, saját kazánházak
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Ezek nem katalógusképek: mind a mi munkánk, ahogy átadáskor
              kinézett. A rendezett csövezés nem szépészeti kérdés – ettől lesz
              évek múlva is szervizelhető a rendszer.
            </p>
          </div>

          <Link
            href="/szolgaltatasok"
            className="group inline-flex flex-none cursor-pointer items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Mit vállalunk?
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <Reveal
          stagger
          className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {TILES.map((t) => (
            <figure
              key={t.caption}
              className={`group relative flex items-end overflow-hidden rounded-2xl border border-sky-200 ${t.span}`}
            >
              <Image
                src={t.img}
                alt={t.alt}
                placeholder="blur"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="relative p-5 text-base font-semibold text-white drop-shadow">
                {t.caption}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
