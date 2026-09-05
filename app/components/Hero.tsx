"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heroBoiler from "../assets/munkak/kazancsere-ergas.jpg";
import { CHATBOT_URL, CTA_NOTE, CTA_PRIMARY, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

const TRUST = [
  "Engedélyes szakemberek",
  "Fix, kiszámítható ár",
  "Teljes garancia",
];

const STATS = [
  { target: 500, suffix: "+", label: "Sikeres csere" },
  { target: 50, suffix: " év", label: "Tapasztalat" },
  { target: 100, suffix: "%", label: "Garancia" },
  { target: 1, suffix: " nap", label: "Alatt kész" },
];

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

/* Floating glass guarantee card that overlaps the photo edge. */
function GuaranteeCard() {
  const { value, ref } = useCountUp(100);
  return (
    <div className="rounded-2xl border border-sky-200 bg-white/90 px-5 py-4 shadow-[0_22px_50px_-20px_rgba(15,42,94,0.45)] backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky text-brand">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </span>
        <div>
          <div className="font-display text-2xl font-bold text-cta">
            <span ref={ref}>{value}</span>%
          </div>
          <div className="text-xs font-medium text-ink-soft">
            garancia minden készülékre
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ target, suffix, label }: (typeof STATS)[number]) {
  const { value, ref } = useCountUp(target);
  return (
    <div className="text-center sm:text-left">
      <div className="font-display text-4xl font-bold text-white sm:text-5xl">
        <span ref={ref}>{value}</span>
        <span className="text-cyan">{suffix}</span>
      </div>
      <div className="mt-1 text-sm font-medium text-white/70">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white">
        {/* Retegelt hatter: lagy kek foltok es a markajelzo hullam. A
            pontracs innen is kikerult: azt a texturat mindenhol a viz
            valtja. */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute -left-24 -top-24 h-[440px] w-[440px] rounded-full bg-sky/80 blur-3xl animate-drift" />
          <div className="absolute right-1/3 top-24 h-[320px] w-[320px] rounded-full bg-cyan/25 blur-3xl animate-drift [animation-delay:-8s]" />
          <div className="absolute -right-20 top-1/2 h-[360px] w-[360px] rounded-full bg-brand-light/15 blur-3xl animate-drift [animation-delay:-14s]" />
        </div>
        <WaveBackdrop />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-y-10 px-6 pb-16 pt-16 lg:min-h-[640px] lg:grid-cols-2 lg:gap-12 lg:pb-20 lg:pt-20">
          {/* LEFT - copy */}
          <div className="fade-up">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="font-semibold text-ink">50+ év</span> tapasztalat
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2rem] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              <span className="text-brand">Gázkészülék csere</span>{" "}
              1 nap alatt, gyorsan és biztonságosan
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
              Elavult, zajos vagy sokat fogyasztó gázkészülék? Ne várj a
              hibára: új, megbízható berendezést cserélünk{" "}
              <strong className="font-semibold text-ink">1 nap alatt</strong>,
              kiszámítható áron. Az{" "}
              <strong className="font-semibold text-ink">
                online árajánló asszisztensünk
              </strong>{" "}
              pár kérdés után azonnal ad egy tájékoztató árat. Hívás nélkül,
              a nap 24 órájában.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CHATBOT_URL}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
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

            {/* trust row */}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {TRUST.map((t) => (
                <li key={t} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                  <svg className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT - spacer that reserves the right half on desktop */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        {/* PHOTO - in-flow card on mobile, full-bleed panel on desktop */}
        <div className="relative mx-auto -mt-2 aspect-[4/5] w-[min(90%,26rem)] overflow-hidden rounded-3xl border border-sky-200 shadow-[0_40px_80px_-30px_rgba(15,42,94,0.5)] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:aspect-auto lg:w-[47vw] lg:rounded-l-[2.5rem] lg:rounded-r-none lg:border-0">
          <Image
            src={heroBoiler}
            alt="Frissen beüzemelt kondenzációs kazán és melegvíz-tároló egy elkészült cserénél"
            placeholder="blur"
            priority
            sizes="(max-width: 1024px) 90vw, 47vw"
            className="hero-parallax h-full w-full object-cover object-center"
          />
          {/* subtle brand tint for cohesion */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cta/25 via-transparent to-transparent" />
          {/* left white fade blends the photo into the copy side (desktop only) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-44 bg-gradient-to-r from-white to-transparent lg:block" />

          {/* floating guarantee card - overlaps the photo/white seam */}
          <div className="absolute -left-3 bottom-6 animate-float-slow lg:left-8 lg:bottom-14">
            <GuaranteeCard />
          </div>

          {/* small "1 nap" chip */}
          <div className="absolute right-4 top-4 animate-float-slow [animation-delay:-3s] lg:right-10 lg:top-12">
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 shadow-[0_18px_40px_-18px_rgba(15,42,94,0.45)] backdrop-blur">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky text-brand">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-ink">1 nap alatt kész</span>
            </div>
          </div>
        </div>
      </section>

      {/* stats band - dark contrast strip, grounds the hero */}
      <div className="relative overflow-hidden bg-cta">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-brand-light/20 blur-3xl" />
        <dl className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-10 gap-x-8 px-6 py-12 sm:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </dl>
      </div>
    </>
  );
}
