"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CHATBOT_URL } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  ÁLLÍTHATÓ KÜSZÖBÖK — szakmai forrásokkal alátámasztva.
 *  Egy gázkazán átlagos élettartama kb. 10–15 év. Kb. 8–10 évig a
 *  javítás éri meg, 15 év fölött a szakértők a cserét javasolják.
 *  (Források: nef.org.uk, uswitch.com, fokabt.hu, vizgazfutesszeged.hu)
 * ------------------------------------------------------------------ */
const INSPECT_AGE = 10; // 10 évtől érdemes felülvizsgáltatni / tervezni
const REPLACE_AGE = 15; // 15 évtől ajánlott a csere
const AVG_LIFESPAN = "10–15 év";
const MAX_AGE = 40;

type Verdict = {
  tone: "ok" | "warn" | "replace";
  ring: string;
  chip: string;
  dot: string;
  title: string;
  body: string;
  cta: string;
};

function verdictFor(age: number): Verdict {
  if (age < INSPECT_AGE) {
    return {
      tone: "ok",
      ring: "ring-emerald-200",
      chip: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
      title: "A készüléked még rendben van",
      body: `${age} évesen a kazánod az átlagos, 10–15 éves élettartamon belül van. Évi karbantartással jó eséllyel sokáig megbízhatóan üzemel – figyeld a zajt és a fogyasztást.`,
      cta: "Kérdésed van? Írj nekünk",
    };
  }
  if (age < REPLACE_AGE) {
    return {
      tone: "warn",
      ring: "ring-amber-200",
      chip: "bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
      title: "Érdemes felülvizsgáltatni",
      body: `${age} évesen a kazán eléri az átlagos 10–15 éves élettartamot. Ilyenkor a szakemberek szerint nagyobb hibánál már a cserét is érdemes mérlegelni – egy helyszíni felmérés megmutatja, mi éri meg jobban.`,
      cta: "Kérek helyszíni felmérést",
    };
  }
  return {
    tone: "replace",
    ring: "ring-rose-200",
    chip: "bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
    title: "Ajánlott a csere",
    body: `${age} évesen a kazán túl van az átlagos élettartamán. A 15 évnél idősebb készülékeknél a szakértők a cserét javasolják: többet fogyaszt, gyakrabban hibásodik, és egy modern készülék érezhetően alacsonyabb rezsit jelent.`,
    cta: "Kérek árajánlatot cserére",
  };
}

export default function BoilerCalculator() {
  const [age, setAge] = useState(12);
  const v = verdictFor(age);
  const pct = Math.min(age / MAX_AGE, 1) * 100;

  return (
    <section id="kalkulator" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-sky-200 bg-gradient-to-br from-white to-sky/50 p-8 shadow-[0_40px_90px_-40px_rgba(15,42,94,0.5)] sm:p-12">
          {/* soft glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />

          <div className="relative">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Kazán kalkulátor
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Mennyi idős a gázkészüléked?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              Állítsd be a készülék korát, és azonnal megmondjuk, mire érdemes
              figyelned.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* control */}
              <div>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-medium text-ink-soft">
                    A készülék kora
                  </span>
                  <span className="font-display text-4xl font-bold text-ink">
                    {age}
                    <span className="ml-1 text-xl text-ink-soft">
                      {age >= MAX_AGE ? "+ év" : " év"}
                    </span>
                  </span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={MAX_AGE}
                  step={1}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  aria-label="A gázkészülék kora években"
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
                  style={{
                    background: `linear-gradient(to right, var(--color-brand) ${pct}%, var(--color-sky-200) ${pct}%)`,
                  }}
                />
                <div className="mt-2 flex justify-between text-xs font-medium text-ink-soft">
                  <span>Új</span>
                  <span>{MAX_AGE}+ év</span>
                </div>
                <p className="mt-4 rounded-lg bg-sky/60 px-3 py-2 text-xs text-ink-soft">
                  A gázkazánok átlagos élettartama{" "}
                  <span className="font-semibold text-ink">{AVG_LIFESPAN}</span>.
                  10 év fölött érdemes felülvizsgáltatni, 15 év fölött a
                  szakemberek a cserét javasolják.
                </p>
              </div>

              {/* verdict */}
              <div
                className={`flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ${v.ring} transition-all duration-300`}
              >
                <div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${v.chip}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${v.dot}`} />
                    Eredmény
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {v.body}
                  </p>
                </div>
                <a
                  href={CHATBOT_URL}
                  className="group mt-5 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-cta-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
                >
                  {v.cta}
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="mt-6 text-xs text-ink-soft">
              A kalkulátor tájékoztató jellegű. Konkrét árért indítsd el az{" "}
              <a
                href={CHATBOT_URL}
                className="font-semibold text-brand underline-offset-2 hover:underline"
              >
                online árajánló asszisztenst
              </a>
              , a pontos állapotot pedig mindig helyszíni felmérés alapján tudjuk
              megmondani.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
