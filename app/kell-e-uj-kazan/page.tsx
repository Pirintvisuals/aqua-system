import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import BoilerCalculator from "../components/BoilerCalculator";
import SavingsCalculator from "../components/SavingsCalculator";
import WhyUs from "../components/WhyUs";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
import Chapter from "../components/Chapter";
import StepNav, { type Step } from "../components/StepNav";
import Wave from "../components/Wave";
import { CHATBOT_URL } from "../lib/links";
import vezerlopanel from "../assets/munkak/vezerlopanel.jpg";

/* ------------------------------------------------------------------ *
 *  "Kell-e új kazán?" - döntéstámogató oldal.
 *
 *  Ez lett a kalkulátor otthona, miután lekerült a főmenüből. Azoknak
 *  szól, akik még nem vásárolni akarnak, csak eldönteni, hogy baj
 *  van-e. Ezért NEM egy álcázott ajánlatkérő: a "még ne cserélj"
 *  válasz is szerepel benne, mert az hitelesíti a többit.
 * ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Kell-e új kazán? Árulkodó jelek, életkor, csere",
  description:
    "Mikor jött el a gázkazán cseréjének ideje? Árulkodó jelek, életkor szerinti útmutató és egy kalkulátor, ami megmondja, hol tart a készüléked. Ötven éve kizárólag kazáncserével foglalkozunk.",
  alternates: { canonical: "/kell-e-uj-kazan" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "/kell-e-uj-kazan",
    title: "Kell-e új kazán? – Aqua System Service Kft.",
    description:
      "Árulkodó jelek, életkor szerinti útmutató és kalkulátor: mikor jött el a csere ideje?",
  },
};

const SIGNS = [
  {
    title: "Két szezonban is hívtál szerelőt",
    body: "A következő hiba már nem meglepetés lesz, hanem menetrend.",
    urgency: "Gyanús",
  },
  {
    title: "Nő a gázszámla, pedig nem fűtesz többet",
    body: "Változatlan szokások mellett a készülék viszi a pénzt.",
    urgency: "Gyanús",
  },
  {
    title: "Zajos, kattog, búg",
    body: "Vízkő, szivattyúhiba vagy levegő a rendszerben. Ritkán jön egyedül.",
    urgency: "Nézzük meg",
  },
  {
    title: "Hibakódot ír ki, vagy le-leáll",
    body: "Az ismétlődő leállás néha beszabályozás, néha a hőcserélő vége.",
    urgency: "Nézzük meg",
  },
  {
    title: "Sárga a láng, korom van a készüléken",
    body: "Tökéletlen égés, szén-monoxiddal. Ez nem várhat a szezon végéig.",
    urgency: "Azonnal",
  },
  {
    title: "Nyílt égésterű készülék a lakótérben",
    body: "A lakás levegőjét égeti el. Mai szemmel ez a legkockázatosabb.",
    urgency: "Azonnal",
  },
];

const URGENCY_STYLE: Record<string, string> = {
  Gyanús: "bg-sky text-brand",
  "Nézzük meg": "bg-amber-50 text-amber-700",
  Azonnal: "bg-rose-100 text-rose-700",
};

/* Kazantipusok hatasfok szerint. A szamok szakmai forrasokbol valok
   (lasd a szekcio aljan a hivatkozast), nem a sajat becslesunk. */
const TYPES = [
  {
    name: "Nyílt égésterű, kéménybe kötve",
    era: "2000 előtti készülékek",
    verdict: "Elavult és kockázatos",
    efficiency: 78,
    range: "75-80%",
    headline: "Minden ötödik elfűtött köbméter kimegy a kéményen.",
    points: [
      "A lakás levegőjét égeti el: szén-monoxid szempontjából ez a legrosszabb elrendezés.",
      "160-170 fokos égéstermék távozik, vagyis a hő, amiért fizettél.",
      "Új készülékként ma már nem telepíthető.",
    ],
    tone: "bad",
  },
  {
    name: "Zárt égésterű, hagyományos",
    era: "Turbós és parapetes készülékek",
    verdict: "Biztonságos, de lemaradt",
    efficiency: 88,
    range: "86-89%",
    headline: "Biztonságban rendben van, hatásfokban egy egész osztállyal marad el.",
    points: [
      "A levegőt kívülről veszi, tehát a lakótértől el van választva.",
      "A vízgőz hőjét nem tudja visszanyerni: az itt is kimegy a kéményen.",
      "Fokozatokkal jár, ezért sokat kapcsolgat, és ez koptatja.",
    ],
    tone: "ok",
  },
  {
    name: "Kondenzációs",
    era: "Ma ez a csúcs",
    verdict: "Ezt építjük be",
    efficiency: 94,
    range: "92-94%",
    headline: "Azt a hőt is visszaveszi, ami eddig a kéménybe ment. 160 fok helyett 60.",
    points: [
      "Fokozatmentesen modulál: annyit fűt, amennyi kell, ezért halk és egyenletes.",
      "Padlófűtéssel, alacsony előremenővel hozza a legjobb hatásfokot.",
      "Nálunk csak prémium, márkaszervizes készülék kerül be, gyári garanciával.",
    ],
    tone: "best",
  },
];

/* A karyak szinei tonus szerint. A regi tipusok szandekosan tompak es
   pirosak: az olvasonak ranezesre latnia kell, melyik a rossz vege. */
const TYPE_STYLE: Record<string, { card: string; chip: string; num: string; bar: string }> = {
  bad: {
    card: "border-rose-200 bg-rose-50/50",
    chip: "bg-rose-100 text-rose-700",
    num: "text-rose-700",
    bar: "bg-rose-400",
  },
  ok: {
    card: "border-sky-200 bg-white",
    chip: "bg-amber-50 text-amber-700",
    num: "text-ink-soft",
    bar: "bg-ink-soft/45",
  },
  best: {
    card: "border-brand/35 bg-brand/5 ring-1 ring-brand/15 shadow-[0_30px_60px_-40px_rgba(15,42,94,0.55)]",
    chip: "bg-brand text-white",
    num: "text-brand",
    bar: "bg-brand",
  },
};

const COMPARE = [
  {
    q: "A készülék kora",
    repair: "10 év alatt",
    replace: "15 év fölött",
  },
  {
    q: "A javítás ára",
    repair: "Egy új készülék árának töredéke",
    replace: "Megközelíti a csere árát",
  },
  {
    q: "Alkatrészellátás",
    repair: "Kapható, pár nap alatt megvan",
    replace: "Kifutó típus, bizonytalan beszerzés",
  },
  {
    q: "Hibák gyakorisága",
    repair: "Első komolyabb hiba",
    replace: "Szezononként visszatérő",
  },
  {
    q: "Égéstér",
    repair: "Zárt égésterű, korszerű",
    replace: "Nyílt égésterű, kéménybe kötve",
  },
];

/* A negy fejezet, ebben a sorrendben. A StepNav es a Chapter is
   ebbol dolgozik, hogy ne csusszon szet a szamozas. */
const STEPS: Step[] = [
  { id: "allapot", label: "Hol tart a kazánod" },
  { id: "koltseg", label: "Mennyibe kerül, ha marad" },
  { id: "megoldas", label: "Mi kerül a helyére" },
  { id: "kivel", label: "Kivel csináltasd" },
];

export default function KellEUjKazanPage() {
  return (
    <main className="flex-1">      <PageHero
        eyebrow="Döntéstámogató"
        title="Kell-e új kazán?"
        intro="Négy kérdésre válaszol ez az oldal, ebben a sorrendben: hol tart a készüléked, mennyibe kerül, ha marad, mi kerülhet a helyére, és kivel csináltasd. Görgess végig, két perc az egész."
        image={vezerlopanel}
        imageAlt="Gázkazán vezérlőpanelje ellenőrzés közben"
        badge={{ value: "10-15 év", label: "egy kazán átlagos élettartama" }}
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Kell-e új kazán?", href: "/kell-e-uj-kazan" },
        ]}
      />

      {/* Fejezet-navigacio: latszik, hany reszbol all az oldal. */}
      <StepNav steps={STEPS} />

      {/* ================================================================
          01. HOL TART A KAZÁNOD. Diagnózis: kor, jelek, verdikt.
          ================================================================ */}
      <section className="bg-paper pt-16 lg:pt-20">
        <Chapter
          id="allapot"
          step={1}
          title="Hol tart a kazánod?"
          intro="Kezdd itt. A kor önmagában még nem ítélet, de a korral együtt jelentkező jelek már azok. A fejezet végére tudni fogod, melyik oldalon állsz."
        />
      </section>

      {/* A KALKULÁTOR: az oldal fő eszköze, rögtön elöl. */}
      <BoilerCalculator />

      {/* ÁRULKODÓ JELEK. Sürgősség szerint jelölve. */}
      <section className="bg-paper py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Árulkodó jelek
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
              Hat jel, amit nem érdemes elnézni
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              A pirossal jelöltek biztonsági kérdések, azokkal ne várj. A többi
              pénzkérdés, ott van idő gondolkodni.
            </p>
          </div>

          <Reveal stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sky-200 bg-sky-200 md:grid-cols-2 lg:grid-cols-3">
            {SIGNS.map((sign) => (
              <div key={sign.title} className="bg-white p-7">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${URGENCY_STYLE[sign.urgency]}`}
                >
                  {sign.urgency}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {sign.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {sign.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MIKOR JÖTT EL A CSERE IDEJE. Táblázat, nem kártya: más ritmus. */}
      <section className="bg-paper py-14 lg:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Mikor jött el a csere ideje
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
              Melyik oldalon áll a te kazánod?
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Két-három találat a jobb oszlopban, és a toldozgatás már csak
              halasztja a döntést.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse overflow-hidden rounded-2xl border border-sky-200 text-left">
              <thead>
                <tr className="bg-cta text-white">
                  <th scope="col" className="px-5 py-4 text-sm font-semibold" />
                  <th scope="col" className="px-5 py-4 text-sm font-semibold">
                    Ez még ráér
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-semibold">
                    Itt a csere ideje
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-200 bg-white">
                {COMPARE.map((row) => (
                  <tr key={row.q}>
                    <th
                      scope="row"
                      className="px-5 py-4 text-sm font-semibold text-ink"
                    >
                      {row.q}
                    </th>
                    <td className="px-5 py-4 text-[15px] text-ink-soft">
                      {row.repair}
                    </td>
                    <td className="bg-sky/60 px-5 py-4 text-[15px] font-medium text-ink">
                      {row.replace}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink-soft">
            Ez tájékoztató útmutató, a pontos képet mindig a helyszíni felmérés
            adja. Ha a bal oldalon állsz, azt is megmondjuk, és nyugodtan
            várhatsz még. Javítást nem vállalunk: mi a cserében vagyunk otthon.
            Amit nálunk építettek be, azt viszont az{" "}
            <Link
              href="/szolgaltatasok/atalanydijas-karbantartas"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              átalánydíjas karbantartással
            </Link>{" "}
            tartjuk formában, hogy a gyári garancia is megmaradjon.
          </p>
        </div>
      </section>

      {/* ================================================================
          02. MENNYIBE KERÜL, HA MARAD. A hatásfok, majd forintban.
          ================================================================ */}
      <section className="relative bg-white pt-16 lg:pt-20">
        <Chapter
          id="koltseg"
          step={2}
          title="Mennyibe kerül, ha marad?"
          intro="A régi kazán nem akkor kerül pénzbe, amikor elromlik, hanem minden egyes nap. Előbb a hatásfok, aztán ugyanez forintban."
        />
      </section>

      {/* KAZANTIPUSOK. Hatasfok-savok, nem ujabb szovegdobozok. */}
      <section className="relative overflow-hidden bg-white py-14 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-sky/70 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Kazántípusok
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
              A régi kazán a kéményt fűti. A kondenzációs a házat.
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Ugyanaz a gáz, két nagyon különböző eredmény. Nézd meg a
              hatásfokot, a többi részlet ehhez képest mellékes.
            </p>
          </div>

          {/* Harom szam, amit egy pillantassal fel lehet fogni. */}
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sky-200 bg-sky-200 sm:grid-cols-3">
            {[
              { v: "160 °C", l: "ennyivel megy ki a hő egy régi kazán kéményén" },
              { v: "60 °C", l: "ennyi marad ebből egy kondenzációsnál" },
              { v: "15%", l: "hatásfok-különbség a legrégebbi és a mai készülék közt" },
            ].map((x) => (
              <div key={x.v} className="bg-white p-6">
                <dt className="font-display text-3xl font-extrabold tabular-nums text-brand">
                  {x.v}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-ink-soft">{x.l}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 space-y-4">
            {TYPES.map((t) => {
              const st = TYPE_STYLE[t.tone];
              return (
                <div key={t.name} className={`rounded-2xl border p-6 sm:p-7 ${st.card}`}>
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${st.chip}`}
                      >
                        {t.verdict}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold text-ink">
                        {t.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-ink-soft">{t.era}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-display text-3xl font-extrabold tabular-nums ${st.num}`}
                      >
                        {t.range}
                      </span>
                      <span className="block text-xs text-ink-soft">hatásfok</span>
                    </div>
                  </div>

                  <div
                    className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-sky-200"
                    role="img"
                    aria-label={`Hatásfok körülbelül ${t.efficiency} százalék`}
                  >
                    <div
                      className={`h-full rounded-full ${st.bar}`}
                      style={{ width: `${t.efficiency}%` }}
                    />
                  </div>

                  <p className="mt-4 font-display text-base font-bold text-ink">
                    {t.headline}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {t.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[15px] leading-snug text-ink-soft"
                      >
                        <span
                          className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${st.bar}`}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink-soft">
            A 2015-ös uniós ErP-irányelv óta nyílt égésterű és turbós készüléket
            gyakorlatilag nem hoznak forgalomba. Cserénél kondenzációs kazán
            kerül a helyére, ez nem marketingdöntés.
          </p>
        </div>
      </section>

      {/* MEGTAKARÍTÁS. A hatásfok-különbség forintban: ez az a pont,
          ahol a fenti százalékok végre jelentenek is valamit. */}
      <SavingsCalculator />

      {/* ================================================================
          03. MI KERÜL A HELYÉRE. Méretezés és készüléktípus.
          ================================================================ */}
      <section className="relative overflow-hidden bg-cta edge-glow pt-16 lg:pt-20">
        <Wave position="top" className="text-white" size="md" variant="drift" layers="single" />
        <div className="relative pt-6">
          <Chapter
            id="megoldas"
            step={3}
            title="Mi kerül a helyére?"
            intro="Ha a csere mellett döntesz, itt dől el, mit érdemes beépíteni. Ezt a két kérdést a felmérésen tisztázzuk, de jó, ha előre tudod, miről lesz szó."
            tone="dark"
          />
        </div>
      </section>

      {/* MEKKORA ES MILYEN. Sotet sav, ket oszlop. */}
      <section className="relative overflow-hidden bg-cta edge-glow py-14 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan">
              Amit a felmérésen eldöntünk
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Mekkora, és kombi vagy tárolós?
            </h3>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/15">
              <h3 className="font-display text-xl font-bold text-white">
                Mekkora teljesítmény kell?
              </h3>
              <p className="mt-3 font-semibold text-white">
                A régi kazán kW-ját nem másoljuk le.
              </p>
              <ul className="mt-4 space-y-2.5 text-sky-200">
                <li className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan" aria-hidden="true" />
                  <span>
                    A hőigényt a ház adja:{" "}
                    <strong className="font-semibold text-white">
                      30-50 W négyzetméterenként
                    </strong>{" "}
                    korszerű szigetelésnél.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan" aria-hidden="true" />
                  <span>
                    Egy közepesen szigetelt, 100 négyzetméteres ház jellemzően{" "}
                    <strong className="font-semibold text-white">14-18 kW</strong>.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan" aria-hidden="true" />
                  <span>
                    A túlméretezett kazán rosszabb: folyamatosan ki-be kapcsol.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/15">
              <h3 className="font-display text-xl font-bold text-white">
                Kombi vagy tárolós?
              </h3>
              <p className="mt-3 font-semibold text-white">
                A melegvíz dönti el, nem a fűtés.
              </p>
              <ul className="mt-4 space-y-2.5 text-sky-200">
                <li className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-white">Kombi:</strong>{" "}
                    menet közben melegít, ezért nagyobb készülék kell.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-white">Tárolós:</strong>{" "}
                    külön tartály, kisebb kazán, több csapolás egyszerre.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan" aria-hidden="true" />
                  <span>Tárolóshoz több hely kell, cserébe kitart.</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-sky-200/80">
            Ezek tájékoztató nagyságrendek. A pontos méretezés helyszíni
            felmérés és hőigény-számítás alapján készül.
          </p>
        </div>
      </section>

      {/* ================================================================
          04. KIVEL CSINÁLTASD. Pozicionálás, kilenc ok, kérdések.
          ================================================================ */}
      <section className="relative bg-paper pt-16 lg:pt-20">
        <Chapter
          id="kivel"
          step={4}
          title="Kivel csináltasd?"
          intro="Egy kazán tizenöt évig marad a falon. Ezen a távon az számít, ki tette fel, és hogy megtalálod-e öt év múlva is."
        />
      </section>

      <section className="bg-paper py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6">
          {/* Pozicionalas: egy dolgot csinalunk, azt viszont a legmagasabb
              szinten. A "javitast is vallalunk" uzenet szandekosan nincs
              benne, mert nem vallalunk javitast. */}
          <div className="rounded-2xl border border-brand/25 bg-brand/5 p-7 sm:p-9">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Csak kazáncsere. Csak prémium.
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">
              Ötven éve ugyanaz az egy feladat indul minden reggel. Ezért megy
              egy komplett csere egy nap alatt.
            </p>

            <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                ["Kizárólag kazáncsere", "Javítást, hibakeresést nem vállalunk."],
                ["Prémium készülék", "Modulációs kondenzációs, gyári garanciával."],
                ["Márkaszervizes háttér", "Öt év múlva is lesz hozzá alkatrész."],
                ["Egy nap, estére meleg", "Rendezett kazánház, kész dokumentáció."],
              ].map(([head, sub]) => (
                <li key={head} className="flex gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-none text-brand"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>
                    <span className="block font-semibold text-ink">{head}</span>
                    <span className="block text-[15px] leading-snug text-ink-soft">
                      {sub}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-7 border-t border-brand/15 pt-5 text-[15px] leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">
                Cserét nem beszélünk rá senkire.
              </span>{" "}
              Ha a készülékednek van még hátra pár éve, azt fogjuk mondani.
            </p>
          </div>
        </div>
      </section>

      {/* MARADT KERDESED. Nem ujabb kartya: egy kiemelt sav, ami az
          asszisztensre iranyit. Az oldal sok informaciot ad, es a
          leggyakoribb kovetkezo lepes egy konkret kerdes. */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-brand/25 bg-brand/5 p-7 sm:flex-row sm:items-center sm:p-8">
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-brand text-white">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-ink">
                Maradt kérdésed? Kérdezd meg az asszisztenst
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">
                Írd le pár szóban. Az asszisztensünk éjjel-nappal válaszol, és
                pár kérdés után tájékoztató árat is ad.
              </p>
            </div>
            <a
              href={CHATBOT_URL}
              className="group inline-flex flex-none cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
            >
              Kérdezek
              <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Miert minket - ugyanaz a szekcio, mint a fooldalon. Aki idaig
          eljutott, mar tudja, hogy kell uj kazan; innentol az a kerdes,
          hogy kivel csinaltassa. */}
      <WhyUs />

      <CtaBand
        title="Nem vagy biztos benne, mi a helyzet?"
        body="Írd le pár mondatban, mennyi idős a készülék és mi a panasz. Az online árajánló asszisztensünk pár kérdés után megmondja, mire számíts."
      />
    </main>
  );
}
