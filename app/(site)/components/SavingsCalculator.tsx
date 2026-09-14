"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CHATBOT_URL, CTA_NOTE, CTA_PRIMARY } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  MEGTAKARÍTÁS KALKULÁTOR.
 *
 *  FONTOS, és emiatt lett újraírva: Magyarországon a lakossági gázár
 *  SÁVOS, nem lineáris. Forintban kérdezni a számlát ezért félrevezető
 *  volt, mert ugyanaz a forintösszeg egészen más fogyasztást takar a
 *  kedvezményes sávban és fölötte.
 *
 *    - kedvezményes ár: 102 Ft/m³, évi 1729 m³-ig (63 645 MJ, kb. 144
 *      m³/hó),
 *    - a limit fölött: 747 Ft/m³, vagyis nagyjából HÉTSZERES ár.
 *
 *  Emiatt a legnagyobb megtakarítás nem pusztán a kevesebb gázból jön,
 *  hanem abból, hogy a fogyasztás visszakerül (vagy közelebb kerül) a
 *  kedvezményes sávba. Ezt a kalkulátor kiszámolja és külön ki is emeli,
 *  mert ez az az érv, amit egy magyar háztartás tényleg ismer.
 *
 *  A számítás továbbra is egyetlen dolgot néz, a hatásfok-különbséget:
 *    uj fogyasztas = mostani × (mostani hatásfok / 94%)
 *  Se szabályozás, se szigetelés, se szokásváltozás nincs beleszámolva.
 *
 *  A 102 / 747 Ft/m³ tájékoztató átszámítás: a számla MJ alapon készül,
 *  a tényleges fűtőértékkel. Ezt a szekció alja ki is mondja.
 *  Forrás: MVM / rezsicsökkentés, 2026-os díjszabás. Ha az árak
 *  változnak, elég az alábbi négy konstans.
 * ------------------------------------------------------------------ */

/** Kedvezményes éves mennyiség (63 645 MJ ≈ 1729 m³, kb. 144 m³/hó). */
const CAP_M3 = 1729;
/** Kedvezményes ár a limitig, Ft/m³. */
const PRICE_REDUCED = 102;
/** Piaci ár a limit fölött, Ft/m³. */
const PRICE_MARKET = 747;

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

const MIN_M3 = 600;
const MAX_M3 = 4000;

const forint = new Intl.NumberFormat("hu-HU", { maximumFractionDigits: 0 });

/** Sávos éves gázköltség: a limitig kedvezményes, fölötte piaci áron. */
function yearlyCost(m3: number) {
  const reduced = Math.min(m3, CAP_M3) * PRICE_REDUCED;
  const market = Math.max(0, m3 - CAP_M3) * PRICE_MARKET;
  return reduced + market;
}

/** Ezresre kerekítve: a tizedes forint hamis pontosságot sugallna. */
function round(value: number) {
  return Math.round(value / 1000) * 1000;
}

export default function SavingsCalculator() {
  const [m3, setM3] = useState(1700);
  const [typeKey, setTypeKey] = useState(CURRENT[0].key);

  const current = CURRENT.find((c) => c.key === typeKey) ?? CURRENT[0];

  /* A hatásfok-különbség pontosan ennyivel csökkenti a fogyasztást. */
  const newM3 = Math.round(m3 * (current.efficiency / NEW_EFFICIENCY));
  const costNow = yearlyCost(m3);
  const costNew = yearlyCost(newM3);
  const saving = round(costNow - costNew);
  const longTerm = round(saving * KEEP_YEARS);

  const overNow = Math.max(0, m3 - CAP_M3);
  const overNew = Math.max(0, newM3 - CAP_M3);
  /* A legerősebb eset: a csere után visszakerül a kedvezményes sávba. */
  const dropsUnderCap = overNow > 0 && overNew === 0;

  const pct = ((m3 - MIN_M3) / (MAX_M3 - MIN_M3)) * 100;
  const capPct = ((CAP_M3 - MIN_M3) / (MAX_M3 - MIN_M3)) * 100;

  return (
    <section
      id="megtakaritas"
      className="relative isolate overflow-clip scroll-mt-36 py-16 lg:py-24"
    >
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
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Állítsd be az éves gázfogyasztásodat köbméterben és a mostani
              készüléked típusát. A többit a hatásfok-különbség és a
              kedvezményes sáv határa adja.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Vezerlok */}
              <div>
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm font-medium text-ink-soft">
                    Éves gázfogyasztás
                  </span>
                  <span className="font-display text-3xl font-bold tabular-nums text-ink sm:text-4xl">
                    {forint.format(m3)}
                    <span className="ml-1 text-xl text-ink-soft">m³</span>
                  </span>
                </div>

                <div className="relative mt-4">
                  <input
                    type="range"
                    min={MIN_M3}
                    max={MAX_M3}
                    step={50}
                    value={m3}
                    onChange={(e) => setM3(Number(e.target.value))}
                    aria-label="Éves gázfogyasztás köbméterben"
                    className="range-brand h-2 w-full cursor-pointer rounded-full outline-none"
                    style={{
                      background: `linear-gradient(to right, var(--color-brand) ${pct}%, var(--color-sky-200) ${pct}%)`,
                    }}
                  />
                  {/* A kedvezmenyes sav hatara a skalan. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-1.5 h-5 w-0.5 rounded-full bg-rose-500"
                    style={{ left: `${capPct}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between gap-2 text-xs font-medium text-ink-soft">
                  <span>{MIN_M3} m³</span>
                  <span className="font-semibold text-rose-600">
                    {forint.format(CAP_M3)} m³: kedvezményes határ
                  </span>
                  <span>{forint.format(MAX_M3)} m³</span>
                </div>

                <p className="mt-4 rounded-lg bg-sky/60 px-3 py-2 text-xs leading-relaxed text-ink-soft">
                  Az éves fogyasztás rajta van a gázszámládon, m³-ben. Egy
                  átlagos, nem felújított családi ház nagyjából{" "}
                  <span className="font-semibold text-ink">1600-1800 m³</span>{" "}
                  körül fogyaszt fűtésre és melegvízre.
                </p>

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
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
                  Megtakarítás cserével
                </span>
                <div className="mt-3 font-display text-4xl font-extrabold tabular-nums leading-none text-brand sm:text-5xl">
                  {forint.format(saving)}
                  <span className="ml-1 text-xl text-ink-soft">Ft / év</span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {forint.format(m3)} m³ helyett{" "}
                  <span className="font-semibold text-ink">
                    {forint.format(newM3)} m³
                  </span>{" "}
                  fogyna ugyanennyi melegért, mert nem a kéményt fűtenéd.
                </p>

                {/* A kedvezmenyes sav: ez a magyar rendszer lenyege. */}
                {dropsUnderCap ? (
                  <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-[15px] leading-relaxed text-emerald-900">
                    <span className="font-semibold">
                      A csere után visszakerülnél a kedvezményes sávba.
                    </span>{" "}
                    Most {forint.format(overNow)} m³-ért fizetsz{" "}
                    {PRICE_MARKET} Ft-os piaci árat a{" "}
                    {forint.format(CAP_M3)} m³-es határ fölött. Utána nem
                    lenne ilyen tételed.
                  </p>
                ) : overNow > 0 ? (
                  <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-[15px] leading-relaxed text-rose-900">
                    <span className="font-semibold">
                      Most {forint.format(overNow)} m³ esik a határ fölé.
                    </span>{" "}
                    Ez a rész {PRICE_MARKET} Ft/m³, a kedvezményes{" "}
                    {PRICE_REDUCED} Ft helyett. A csere{" "}
                    {forint.format(overNew)} m³-re vinné le.
                  </p>
                ) : (
                  <p className="mt-5 rounded-xl border border-sky-200 bg-sky/50 p-4 text-[15px] leading-relaxed text-ink-soft">
                    <span className="font-semibold text-ink">
                      A fogyasztásod a kedvezményes sávban van.
                    </span>{" "}
                    A megtakarítás ezért szerényebb, viszont marad tartalékod
                    a hidegebb telekre, amikor a határ átlépése fenyeget.
                  </p>
                )}

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-sky-200 pt-5">
                  <div>
                    <dt className="text-xs font-medium text-ink-soft">
                      Éves gázköltség most
                    </dt>
                    <dd className="mt-1 font-display text-xl font-extrabold tabular-nums text-ink">
                      {forint.format(round(costNow))}
                      <span className="ml-1 text-sm font-semibold text-ink-soft">
                        Ft
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-ink-soft">
                      {KEEP_YEARS} év alatt
                    </dt>
                    <dd className="mt-1 font-display text-xl font-extrabold tabular-nums text-brand">
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
                <p className="mt-3 text-center text-sm text-ink-soft">
                  {CTA_NOTE}
                </p>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-ink-soft">
              Tájékoztató becslés. A kedvezményes ár évi{" "}
              {forint.format(CAP_M3)} m³-ig (63 645 MJ) érvényes, a fölött a
              piaci ár számít. A köbméteres árak átszámítottak: a számla MJ
              alapon, a tényleges fűtőértékkel készül. A kalkulátor
              szándékosan csak a hatásfok-különbséget nézi, a szabályozást, a
              szigetelést és a fűtési szokásokat nem.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
