import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Wave from "./Wave";
import { CHATBOT_URL, CTA_NOTE, CTA_PRIMARY, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  Aloldalak fejléce - egységes címsáv a /rolunk, /kapcsolat stb.
 *  oldalak tetején. A főoldali Hero-t nem helyettesíti, csak egy
 *  visszafogott, világoskék "page header" a belső oldalakhoz.
 * ------------------------------------------------------------------ */

type Crumb = { label: string; href: string };

type Props = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** Morzsamenü - az utolsó elem az aktuális oldal (link nélkül). */
  breadcrumb?: Crumb[];
  /** Fotó a fejlécbe. Nélküle a régi, szöveges változat marad. */
  image?: StaticImageData;
  imageAlt?: string;
  /** Kis kártya a fotó sarkában. */
  badge?: { value: string; label: string };
  /**
   * Fotó nélküli fejléc erős, sötét változata. Ott kell, ahol a fejléc
   * alatt nem fotó, hanem rögtön tartalom jön: világos sávként ugyanis
   * egybefolyt a következő szekcióval, és nem látszott rajta, hogy ez
   * az oldal nyitánya.
   */
  tone?: "light" | "dark";
  /** A hero alá kerülő elsődleges gomb és telefonszám. */
  actions?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  image,
  imageAlt,
  badge,
  tone = "light",
  actions = false,
}: Props) {
  const dark = tone === "dark";
  const crumbs = breadcrumb && breadcrumb.length > 0 && (
    <nav aria-label="Morzsamenü" className="mb-5">
      <ol
        className={`flex flex-wrap items-center gap-1.5 text-sm ${
          dark ? "text-sky-200" : "text-ink-soft"
        }`}
      >
        {breadcrumb.map((c, i) => {
          const last = i === breadcrumb.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className={`font-medium ${dark ? "text-white" : "text-ink"}`}
                >
                  {c.label}
                </span>
              ) : (
                <>
                  <Link
                    href={c.href}
                    className={`transition-colors ${
                      dark ? "hover:text-white" : "hover:text-brand"
                    }`}
                  >
                    {c.label}
                  </Link>
                  <span aria-hidden="true" className={dark ? "text-sky-200/50" : "text-sky-200"}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );

  const copy = (
    <>
      {crumbs}
      <span
        className={`text-sm font-semibold uppercase tracking-[0.14em] ${
          dark ? "text-cyan" : "text-brand"
        }`}
      >
        {eyebrow}
      </span>
      <h1
        className={`mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl ${
          dark ? "text-white lg:text-6xl" : "text-ink"
        }`}
      >
        {title}
      </h1>
      {intro && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed ${
            dark ? "text-sky-200" : "text-ink-soft"
          }`}
        >
          {intro}
        </p>
      )}

      {actions && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={CHATBOT_URL}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-cta shadow-lg transition-all duration-200 hover:bg-sky hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {CTA_PRIMARY}
            <svg
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10"
          >
            <svg
              className="h-5 w-5 text-cyan"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {PHONE_DISPLAY}
          </a>
        </div>
      )}
      {actions && (
        <p className={`mt-3 text-sm ${dark ? "text-sky-200/80" : "text-ink-soft"}`}>
          {CTA_NOTE}
        </p>
      )}
    </>
  );

  /* Fotó nélkül. Sötét tónussal ez egy valódi nyitókép: saját súlya
     van, és élesen elválik a mögötte jövő szekciótól. */
  if (!image) {
    return (
      <section
        className={`relative isolate overflow-hidden ${
          dark ? "bg-cta edge-glow" : "bg-water"
        }`}
      >
        {dark && (
          <>
            <div
              className="pointer-events-none absolute inset-0 bg-blueprint-dark"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cyan/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-brand-light/20 blur-3xl"
              aria-hidden="true"
            />
          </>
        )}
        <div
          className={`relative mx-auto max-w-7xl px-6 ${
            dark ? "py-20 lg:py-28" : "py-16 lg:py-20"
          }`}
        >
          {copy}
        </div>
        {dark && <Wave className="text-white" size="md" variant="drift" layers="single" />}
      </section>
    );
  }

  /* Fotóval: kétoszlopos fejléc. */
  return (
    <section
      className="relative isolate overflow-hidden bg-water"
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
        <div>{copy}</div>
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/60 shadow-[0_40px_80px_-30px_rgba(15,42,94,0.5)]">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              placeholder="blur"
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="h-full w-full object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cta/30 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          {badge && (
            <div className="absolute -bottom-5 left-6 rounded-2xl border border-sky-200 bg-white/95 px-5 py-3 shadow-[0_18px_40px_-18px_rgba(15,42,94,0.45)] backdrop-blur">
              <span className="font-display text-lg font-bold text-brand">
                {badge.value}
              </span>
              <span className="mt-0.5 block text-xs font-medium text-ink-soft">
                {badge.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
