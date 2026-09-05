import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { SERVICES } from "../lib/services";

/* ------------------------------------------------------------------ *
 *  Szolgáltatásaink - a négy fő szolgáltatás kártyán, saját
 *  munkafotókkal. A szöveg forrása az `app/lib/services.ts`, ugyanaz,
 *  amiből a /szolgaltatasok aloldal is dolgozik.
 *
 *  Minden kártya a részletes szekcióra ugrik az aloldalon.
 * ------------------------------------------------------------------ */

export default function ServicesShowcase() {
  return (
    <section id="kinalat" className="relative isolate overflow-hidden scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dotgrid opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Szolgáltatásaink
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Amiben segíteni tudunk
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Egy kazáncserétől a teljes házgépészetig – és utána is
              melletted maradunk, hogy évekig ne legyen vele gondod.
            </p>
          </div>

          <Link
            href="/szolgaltatasok"
            className="group inline-flex flex-none cursor-pointer items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Összes szolgáltatás
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <Reveal
          stagger
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s, i) => (
            <article
              key={s.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-[0_30px_55px_-30px_rgba(15,42,94,0.5)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sky/50">
                {s.photo ? (
                  <Image
                    src={s.photo}
                    alt={s.alt}
                    placeholder="blur"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Hőszivattyú - még nincs saját fotónk, ezért jelzés
                     értékű rajz áll itt kazánfotó helyett. */
                  <div className="relative flex h-full w-full items-center justify-center">
                    <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-60" aria-hidden="true" />
                    <svg className="relative h-16 w-16 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="6" width="13" height="12" rx="2" />
                      <circle cx="8.5" cy="12" r="3.5" />
                      <path d="M18 9c1.2 1 1.2 2 0 3s-1.2 2 0 3" />
                      <path d="M21.5 8c1.4 1.3 1.4 2.7 0 4s-1.4 2.7 0 4" />
                    </svg>
                  </div>
                )}
                <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 font-display text-xs font-bold text-cta tabular-nums shadow-sm backdrop-blur">
                  {i + 1}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {s.teaser}
                </p>
                <Link
                  href={`/szolgaltatasok/${s.slug}`}
                  className="group/link mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Részletek
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
