"use client";

import Image from "next-image-export-optimizer";
import Link from "next/link";
import nagyFerenc from "../assets/team/nagy-ferenc.png";
import Wave from "./Wave";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CHATBOT_URL, CTA_NOTE, CTA_PRIMARY, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

/* A szovegek es a foto a szerkesztobol jonnek (content/fooldal/hero),
   a page.tsx olvassa be es adja at. */
export type HeroContent = {
  eyebrowStrong: string;
  eyebrowText: string;
  titleHighlight: string;
  title: string;
  intro: ReactNode;
  photo: string;
  photoAlt: string;
  stats: readonly { value: number; suffix: string; label: string }[];
};

/* Nem a szerkesztobol jon: a page.tsx szamolja a csapatbol es a valodi
   ugyfelvelemenyekbol, hogy a szam mindig az legyen, ami tenyleg igaz. */
export type HeroProof = {
  rating: { average: number; count: number };
};

/* Count-up that respects reduced motion.

   A lassulas szandekosan eros: a szamok gyorsan indulnak, majd az utolso
   egysegeknel szinte megallnak. Ezert kvintikus kifutas (1-(1-p)^5) es
   hosszabb ido, nem a szokasos kobos gorbe. */
function useCountUp(target: number, duration = 2200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setValue(Math.round((1 - Math.pow(1 - p, 5)) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { value, ref };
}

/* Soft branded wave motif - echoes the logo swoosh, fills the background. */
function WaveBackdrop() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 -z-10 h-[65%] w-full"
      viewBox="0 0 1440 520"
      fill="none"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fc4e8" stopOpacity="0.30" />
          <stop offset="1" stopColor="#2b5fd0" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="wave2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4b7be5" stopOpacity="0.16" />
          <stop offset="1" stopColor="#7fc4e8" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      <path
        d="M0 300 C 320 210 520 400 760 340 C 1000 280 1180 150 1440 250 L1440 520 L0 520 Z"
        fill="url(#wave1)"
      />
      <path
        d="M0 400 C 300 330 560 470 820 420 C 1080 370 1260 300 1440 360 L1440 520 L0 520 Z"
        fill="url(#wave2)"
      />
    </svg>
  );
}

function Stat({ value: target, suffix, label }: HeroContent["stats"][number]) {
  const { value, ref } = useCountUp(target);
  /* A szerkesztoben "év"-et irnak, nem " év"-et: betuvel kezdodo utotag
     ele mi tesszuk a szokozt, jel (+, %) ele nem. */
  const spacedSuffix = /^\p{L}/u.test(suffix) ? ` ${suffix}` : suffix;
  return (
    <div className="text-center sm:text-left">
      <div className="font-display text-4xl font-bold text-white sm:text-5xl">
        <span ref={ref}>{value}</span>
        <span className="text-cyan">{spacedSuffix}</span>
      </div>
      <div className="mt-1 text-sm font-medium text-white/70">{label}</div>
    </div>
  );
}

export default function Hero({
  eyebrowStrong,
  eyebrowText,
  titleHighlight,
  title,
  intro,
  photo,
  photoAlt,
  stats,
  rating,
}: HeroContent & HeroProof) {
  const ratingText = rating.average.toFixed(1).replace(".", ",");
  return (
    <>
      <section className="relative isolate overflow-clip bg-white">
        {/* Retegelt hatter: lagy kek foltok es a markajelzo hullam. */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute -left-24 -top-24 h-[440px] w-[440px] rounded-full bg-sky/80 blur-3xl animate-drift" />
          <div className="absolute right-1/3 top-24 h-[320px] w-[320px] rounded-full bg-cyan/25 blur-3xl animate-drift [animation-delay:-8s]" />
          <div className="absolute -right-20 top-1/2 h-[360px] w-[360px] rounded-full bg-brand-light/15 blur-3xl animate-drift [animation-delay:-14s]" />
        </div>
        <WaveBackdrop />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-y-12 px-6 pb-16 pt-14 lg:min-h-[640px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-14 lg:pb-20 lg:pt-20">
          {/* LEFT - szoveg. Szandekosan visszafogott: nincs csillogo cimke,
              aláhúzás vagy lebego kartya. Egy allitas, egy mondat, ket
              gomb, alatta a bizonyitek. */}
          <div className="fade-up">
            <p className="text-sm font-medium text-ink-soft">
              <span className="font-semibold text-ink">{eyebrowStrong}</span>
              <span className="mx-2 text-sky-300" aria-hidden="true">|</span>
              {eyebrowText}
            </p>

            <h1 className="mt-5 font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[3.5rem] xl:text-[3.9rem]">
              <span className="block">{titleHighlight}</span>
              {/* Kiemelo-csik a kek sor also feleben, mint egy filctoll.
                  Hatterkepkent fut, ezert ket sorra torve is minden sor
                  alatt ott van (box-decoration-break: clone). */}
              <span className="block text-balance text-brand">
                <span className="bg-[linear-gradient(transparent_62%,rgba(127,196,232,0.45)_62%,rgba(127,196,232,0.45)_90%,transparent_90%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                  {title}
                </span>
              </span>
            </h1>

            <div className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft sm:text-[1.2rem] sm:leading-relaxed [&>p+p]:mt-4">
              {intro}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CHATBOT_URL}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-colors duration-200 hover:bg-cta-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
              >
                {CTA_PRIMARY}
                <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-6 py-4 text-base font-semibold text-ink transition-colors duration-200 hover:bg-sky"
              >
                <svg className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {PHONE_DISPLAY}
              </a>
            </div>

            <p className="mt-3 text-sm text-ink-soft">{CTA_NOTE}</p>

            {/* Bizonyitek es hang: a valodi velemenyek atlaga, alatta
                Ferenc mondata a sajat arcaval. Ez az, ami nem sablon: egy
                konkret ember, aki a nevet adja a munkahoz. */}
            <div className="mt-9 max-w-lg border-t border-ink/10 pt-6">
              <a
                href="#velemenyek"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.8l1.2-6.6L2.5 9l6.6-.9z" />
                    </svg>
                  ))}
                </span>
                <span className="font-semibold">{ratingText}</span>
                <span className="text-ink-soft">{rating.count} ügyfél értékelése alapján</span>
              </a>

              <figure className="mt-5 flex items-start gap-4">
                <Image
                  src={nagyFerenc}
                  alt="Nagy Ferenc"
                  sizes="48px"
                  className="h-12 w-12 flex-none rounded-full object-cover object-top ring-2 ring-white shadow-sm"
                />
                <div>
                  <blockquote className="text-[0.95rem] italic leading-snug text-ink">
                    „Ugyanazzal a hozzáállással megyünk minden otthonba, mintha
                    a sajátunk lenne.”
                  </blockquote>
                  <figcaption className="mt-1.5 text-sm text-ink-soft">
                    <span className="font-semibold text-ink">Nagy Ferenc</span>, cégvezető
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>

          {/* RIGHT - a csapat fotoja. Asztalin a kep a kepernyo jobb szelere
              nyulik, igy a csoportkep nagy marad, de a szoveg oszlopa nem
              szukul. A negativ jobb margo pontosan a tartalom es a kepernyo
              szele kozotti savot fedi le. */}
          <div className="relative lg:-mr-[max(0px,calc((100vw-80rem)/2+1.5rem))]">
            <Link
              href="/rolunk#csapat"
              className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-sky shadow-[0_40px_80px_-40px_rgba(15,42,94,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand lg:aspect-[3/2] lg:rounded-l-[2rem] lg:rounded-r-none"
            >
              {/* A foto a szerkesztobol jon, a meretet nem ismerjuk elore. A
                  width/height csak a srcset-hez kell. Az arcok a kep felso
                  harmadaban vannak, ezert nem pontosan kozepre igazitjuk. */}
              <Image
                src={photo}
                alt={photoAlt}
                width={1600}
                height={1067}
                priority
                sizes="(max-width: 1024px) 94vw, 58vw"
                className="h-full w-full object-cover object-[50%_28%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-4 left-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white drop-shadow lg:bottom-6 lg:left-7 lg:text-base">
                Az Aqua System csapata
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* stats band - dark contrast strip, grounds the hero. A sav aljan
          hullam visz at a kovetkezo, vilagoskek szekcioba. */}
      <div className="relative overflow-clip bg-cta">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-brand-light/20 blur-3xl" />
        <dl className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-10 gap-x-8 px-6 py-12 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Stat key={`${s.label}-${i}`} {...s} />
          ))}
        </dl>
        <Wave className="text-water" size="md" variant="swell" layers="single" />
      </div>
    </>
  );
}
