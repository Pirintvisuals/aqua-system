import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Wave, { type WaveVariant } from "./Wave";
import WaterBackdrop from "./WaterBackdrop";

/* ------------------------------------------------------------------ *
 *  Aloldalak fejléce - egységes címsáv a /rolunk, /kapcsolat stb.
 *  oldalak tetején. A főoldali Hero-t nem helyettesíti, csak egy
 *  visszafogott, világoskék "page header" a belső oldalakhoz.
 * ------------------------------------------------------------------ */

type Crumb = { label: string; href: string };

/* Halvany hullamretegek a fejlec hatterebe. Nem eles rajz, csak
   annyi mozgas, hogy a sav ne legyen egyszinu folt. */
function BackWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0 250 C 300 170 520 320 780 262 C 1040 204 1220 150 1440 208 L1440 420 L0 420 Z"
          fill="#7fc4e8"
          opacity="0.22"
        />
        <path
          d="M0 320 C 280 262 560 380 820 330 C 1080 280 1260 246 1440 292 L1440 420 L0 420 Z"
          fill="#2b5fd0"
          opacity="0.10"
        />
      </svg>
    </div>
  );
}

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
   * Háttértextúra. A `grid` a régi műszaki rács, a `wave` a logó
   * hullámmotívuma. Új oldalakon a `wave` a preferált.
   */
  texture?: "grid" | "wave";
  /** A fejléc alatti szekció alapszíne, a záró hullámhoz. */
  waveTo?: string;
  /** A záró hullám rajzolata. */
  waveVariant?: WaveVariant;
};

export default function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  image,
  imageAlt,
  badge,
  texture = "grid",
  waveTo = "text-paper",
  waveVariant = "crest",
}: Props) {
  const wave = texture === "wave";
  const crumbs = breadcrumb && breadcrumb.length > 0 && (
    <nav aria-label="Morzsamenü" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
        {breadcrumb.map((c, i) => {
          const last = i === breadcrumb.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-ink">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="transition-colors hover:text-brand">
                    {c.label}
                  </Link>
                  <span aria-hidden="true" className="text-sky-200">
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
      <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
        {eyebrow}
      </span>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {intro}
        </p>
      )}
    </>
  );

  /* Fotó nélkül: a régi, visszafogott címsáv. */
  if (!image) {
    return (
      <section
        className={`relative isolate overflow-hidden bg-sky/40 ${wave ? "" : "border-b border-sky-200"}`}
      >
        {wave ? (
          <BackWaves />
        ) : (
          <WaterBackdrop variant="b" strength="deep" />
        )}
        <div
          className={`relative mx-auto max-w-7xl px-6 py-16 lg:py-20 ${wave ? "pb-24 lg:pb-36" : ""}`}
        >
          {copy}
        </div>
        {wave && <Wave className={waveTo} size="lg" variant={waveVariant} layers="single" />}
      </section>
    );
  }

  /* Fotóval: kétoszlopos fejléc. */
  return (
    <section
      className={`relative isolate overflow-hidden bg-sky/40 ${wave ? "" : "border-b border-sky-200"}`}
    >
      {wave ? (
        <BackWaves />
      ) : (
        <WaterBackdrop variant="a" strength="deep" />
      )}
      <div
        className={`relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20 ${
          wave ? "pb-24 lg:pb-36" : ""
        }`}
      >
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
      {wave && <Wave className={waveTo} size="lg" variant={waveVariant} layers="single" />}
    </section>
  );
}
