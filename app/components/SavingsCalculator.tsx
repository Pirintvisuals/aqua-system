"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CHATBOT_URL } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  MEGTAKARÍTÁS KALKULÁTOR.
 *
 *  Az oldal legfontosabb érve az, hogy a régi kazán a kéményt fűti. Ez
 *  addig elvont, amíg százalékban áll ott. Itt forintra váltjuk: a
 *  látogató beállítja a saját éves gázszámláját, és látja, mennyi megy
 *  el belőle a kéményen.
 *
 *  A számítás szándékosan egyszerű és ellenőrizhető:
 *    veszteség  = számla × (1 - jelenlegi hatásfok)
 *    megtakarítás = számla × (1 - jelenlegi hatásfok / 94%)
 *  Vagyis csak a hatásfok-különbséget mutatjuk, semmi mást. Nem
 *  számolunk bele szabályozást, szigetelést vagy szokásváltozást, mert
 *  azokat nem tudjuk, és a túlígért megtakarítás a felmérésen úgyis
 *  visszaüt.
 *
 *  A hatásfok-értékek ugyanazok, mint a "Kazántípusok" szekcióban.
 * ------------------------------------------------------------------ */

const NEW_EFFICIENCY = 0.94;
const KEEP_YEARS = 15;

const CURRENT = [
  {
    key: "nyilt",
    label: "Nyílt égésterű",
    hint: "Kéménybe kötve, 2000 előtti",
    efficiency: 0.78,
  },
  {
    key: "zart",
    label: "Zárt égésterű",
    hint: "Turbós vagy parapetes",
    efficiency: 0.88,
  },
  {
    key: "kondenzacios",
    label: "Régebbi kondenzációs",
    hint: "10 évnél idősebb készülék",
    efficiency: 0.9,
  },
];

const MIN_BILL = 150_000;
const MAX_BILL = 1_200_000;

const forint = new Intl.NumberFormat("hu-HU", { maximumFractionDigits: 0 });

/** Ezresre kerekítve, mert a tizedes forint itt hamis pontosságot sugallna. */
function round(value: number) {
  return Math.round(value / 1000) * 1000;
}

export default function SavingsCalculator() {
  const [bill, setBill] = useState(450_000);
  const [typeKey, setTypeKey] = useState(CURRENT[0].key);

  const current = CURRENT.find((c) => c.key === typeKey) ?? CURRENT[0];
  const lost = round(bill * (1 - current.efficiency));
  const saving = round(bill * (1 - current.efficiency / NEW_EFFICIENCY));
  const longTerm = round(saving * KEEP_YEARS);
  const pct = ((bill - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100;

  return (
    <section id="megtakaritas" className="scroll-mt-36 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-sky-200 bg-gradient-to-br from-white to-sky/50 p-8 shadow-[0_40px_90px_-40px_rgba(15,42,94,0.5)] sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />

          <div className="relative">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Megtakarítás kalkulátor
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Mennyit fűtesz ki a kéményen?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              Állítsd be az éves gázszámládat és a mostani készüléked
              típusát. A többit a hatásfok-különbség adja.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Vezerlok */}
              <div>
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm font-medium text-ink-soft">
                    Éves gázszámla
                  </span>
                  <span className="font-display text-3xl font-bold tabular-nums text-ink sm:text-4xl">
                    {forint.format(bill)}
                    <span className="ml-1 text-xl text-ink-soft">Ft</span>
                  </span>
                </div>

                <input
                  type="range"
                  min={MIN_BILL}
                  max={MAX_BILL}
                  step={10_000}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  aria-label="Éves gázszámla forintban"
                  className="range-brand mt-4 h-2 w-full cursor-pointer rounded-full outline-none"
                  style={{
                    background: `linear-gradient(to right, var(--color-brand) ${pct}%, var(--color-sky-200) ${pct}%)`,
                  }}
                />
                <div className="mt-2 flex justify-between text-xs font-medium text-ink-soft">
                  <span>150 e Ft</span>
                  <span>1,2 M Ft</span>
                </div>

                <fieldset className="mt-8">
                  <legend className="text-sm font-medium text-ink-soft">
                    A mostani készüléked
                  </legend>
                  <div className="mt-3 space-y-2">
                    {CURRENT.map((c) => {
                      const active = c.key === typeKey;
                      return (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => setTypeKey(c.key)}
                          aria-pressed={active}
                          className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                            active
                              ? "border-brand bg-brand/5"
                              : "border-sky-200 bg-white hover:border-brand-light/60"
                          }`}
                        >
                          <span>
                            <span className="block text-[15px] font-semibold text-ink">
                              {c.label}
                            </span>
                            <span className="block text-xs text-ink-soft">
                              {c.hint}
                            </span>
                          </span>
                          <span
                            className={`font-display text-lg font-bold tabular-nums ${
                              active ? "text-brand" : "text-ink-soft"
                            }`}
                          >
                            {Math.round(c.efficiency * 100)}%
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              {/* Eredmeny */}
              <div
                aria-live="polite"
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sky-200 sm:p-7"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-rose-700">
                  Most a kéménybe megy
                </span>
                <div className="mt-3 font-display text-4xl font-extrabold tabular-nums leading-none text-rose-700 sm:text-5xl">
                  {forint.format(lost)}
                  <span className="ml-1 text-xl text-ink-soft">Ft / év</span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  Ennyit fizetsz ki olyan hőért, ami nem a házadat fűti,
                  hanem az égéstermékkel távozik.
                </p>

                {/* Ket sav: mennyi hasznosul most, es mennyi hasznosulna. */}
                <div className="mt-6 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-ink-soft">
                      <span>Mostani készülék</span>
                      <span className="tabular-nums">
                        {Math.round(current.efficiency * 100)}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-sky-200">
                      <div
                        className="h-full rounded-full bg-rose-400 transition-all duration-300"
                        style={{ width: `${current.efficiency * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-ink-soft">
                      <span>Új kondenzációs</span>
                      <span className="tabular-nums">94%</span>
                    </div>
                    <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-sky-200">
                      <div
                        className="h-full rounded-full bg-brand transition-all duration-300"
                        style={{ width: `${NEW_EFFICIENCY * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-sky-200 pt-5">
                  <div>
                    <dt className="text-xs font-medium text-ink-soft">
                      Megtakarítás cserével
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-extrabold tabular-nums text-brand">
                      {forint.format(saving)}
                      <span className="ml-1 text-sm font-semibold text-ink-soft">
                        Ft / év
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-ink-soft">
                      {KEEP_YEARS} év alatt
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-extrabold tabular-nums text-brand">
                      {forint.format(longTerm)}
                      <span className="ml-1 text-sm font-semibold text-ink-soft">
                        Ft
                      </span>
                    </dd>
                  </div>
                </dl>

                <a
                  href={CHATBOT_URL}
                  className="group mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
                >
                  Mennyibe kerül a csere?
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
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-ink-soft">
              Tájékoztató becslés, és szándékosan csak egyetlen dolgot
              számol: a hatásfok-különbséget. A valós eredménybe beleszól a
              szabályozás, a fűtővíz hőmérséklete, a szigetelés és a fűtési
              szokások is. Pontos képet a helyszíni felmérés ad.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
