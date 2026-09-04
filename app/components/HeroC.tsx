"use client";

import { useEffect, useRef, useState } from "react";
import { CHATBOT_URL } from "../lib/links";

function useCountUp(target: number, duration = 1400) {
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
            setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { value, ref };
}

/* Technician cutout - transparent background, floats on the sky. Placeholder. */
function TechnicianCutout() {
  return (
    <svg
      viewBox="0 0 420 480"
      className="h-full w-full"
      role="img"
      aria-label="Aqua System szerelő – kivágott fotó helye"
    >
      <defs>
        <linearGradient id="uniformC" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b6fd4" />
          <stop offset="1" stopColor="#2b5fd0" />
        </linearGradient>
      </defs>
      {/* ground shadow */}
      <ellipse cx="210" cy="452" rx="120" ry="20" fill="#2b5fd0" opacity="0.14" />
      {/* technician */}
      <g>
        <path d="M120 452 v-72 a92 92 0 0 1 180 0 v72 z" fill="url(#uniformC)" />
        <path d="M188 380 l22 24 22-24 -7 -16 h-30 z" fill="#ffffff" opacity="0.92" />
        <rect x="164" y="400" width="40" height="9" rx="4.5" fill="#ffffff" opacity="0.7" />
        <rect x="196" y="336" width="28" height="38" rx="12" fill="#f4c9a8" />
        <circle cx="210" cy="308" r="46" fill="#f6d2b2" />
        <path d="M194 318 q16 16 32 0" fill="none" stroke="#b9763f" strokeWidth="4" strokeLinecap="round" />
        <circle cx="197" cy="302" r="3.8" fill="#3a3f4a" />
        <circle cx="223" cy="302" r="3.8" fill="#3a3f4a" />
        {/* cap */}
        <path d="M166 292 a46 46 0 0 1 92 0 z" fill="url(#uniformC)" />
        <path d="M166 292 h-18 a11 11 0 0 0 0 14 h22 z" fill="#3b6fd4" />
        <rect x="194" y="272" width="32" height="8" rx="4" fill="#ffffff" opacity="0.85" />
        {/* thumbs up */}
        <path d="M300 408 q46 -8 50 -62" fill="none" stroke="url(#uniformC)" strokeWidth="30" strokeLinecap="round" />
        <circle cx="350" cy="342" r="18" fill="#f4c9a8" />
        <rect x="341" y="310" width="14" height="26" rx="7" fill="#f4c9a8" />
      </g>
    </svg>
  );
}

function FloatCard({
  target,
  suffix = "",
  label,
  className = "",
}: {
  target: number;
  suffix?: string;
  label: string;
  className?: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div
      className={`rounded-2xl border border-sky-200 bg-white/90 px-5 py-4 shadow-[0_18px_45px_-18px_rgba(43,95,208,0.5)] backdrop-blur ${className}`}
    >
      <div className="font-display text-2xl font-bold text-brand sm:text-3xl">
        <span ref={ref}>{value}</span>
        {suffix}
      </div>
      <div className="mt-0.5 text-sm font-medium text-ink-soft">{label}</div>
    </div>
  );
}

export default function HeroC() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* full sky gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-sky/60 to-sky" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[8%] top-[16%] h-16 w-52 rounded-full bg-white/80 blur-xl animate-drift" />
        <div className="absolute right-[26%] top-[30%] h-12 w-40 rounded-full bg-white/70 blur-xl animate-drift [animation-delay:-7s]" />
        <div className="absolute left-[6%] top-[24%] h-14 w-44 rounded-full bg-white/70 blur-xl animate-drift [animation-delay:-4s]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-28 lg:grid-cols-2 lg:pt-32">
        {/* LEFT - copy */}
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-brand backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Reggel felmérés, estére kész
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Egynapos gázkészülék csere,{" "}
            <span className="text-brand-light">estére kész.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Régi kazánját{" "}
            <strong className="font-semibold text-ink">egyetlen nap alatt</strong>{" "}
            cseréljük le modern, energiatakarékos készülékre. Engedélyes
            szakemberek, fix ár, teljes garancia. Az{" "}
            <strong className="font-semibold text-ink">
              online árajánló asszisztensünktől
            </strong>{" "}
            pár perc alatt kap egy tájékoztató árat.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={CHATBOT_URL}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg shadow-cta/25 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
            >
              Azonnali árajánlat
              <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="tel:+36203990093"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-6 py-4 text-base font-semibold text-ink transition-colors duration-200 hover:bg-sky"
            >
              <svg className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (06 20) 399 0093
            </a>
          </div>
        </div>

        {/* RIGHT - cutout on sky + floating cards */}
        <div className="relative fade-up [animation-delay:120ms]">
          <div className="relative mx-auto max-w-sm">
            <div className="mx-auto h-[440px] w-full animate-float-slow">
              <TechnicianCutout />
            </div>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-ink-soft backdrop-blur">
              Kivágott fotó helye
            </span>

            <div className="absolute left-0 top-6 animate-float-slow">
              <FloatCard target={474} suffix="+" label="Sikeres csere" />
            </div>
            <div className="absolute -right-2 top-28 animate-float-slow [animation-delay:-3s]">
              <FloatCard target={100} suffix="%" label="Garancia" />
            </div>
            <div className="absolute -left-2 bottom-24 animate-float-slow [animation-delay:-1.5s]">
              <div className="rounded-2xl border border-sky-200 bg-white/90 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(43,95,208,0.45)] backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky text-brand">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-ink">1 nap alatt kész</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
