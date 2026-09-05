import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import BoilerCalculator from "../components/BoilerCalculator";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
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
  title: "Kell-e új kazán? Jelek, életkor, javítás vagy csere",
  description:
    "Mikor éri meg javítani, és mikor cserélni a gázkazánt? Árulkodó jelek, életkor szerinti útmutató és egy kalkulátor, ami megmondja, hol tart a készüléked.",
  alternates: { canonical: "/kell-e-uj-kazan" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "/kell-e-uj-kazan",
    title: "Kell-e új kazán? – Aqua System Service Kft.",
    description:
      "Árulkodó jelek, életkor szerinti útmutató és kalkulátor: javítás vagy csere?",
  },
};

const SIGNS = [
  {
    title: "Egyre több a javítás",
    body: "Ha két fűtési szezonban is hívtál szerelőt, a következő hiba már nem meglepetés lesz, hanem menetrend. Ilyenkor a javítások ára gyorsan összeadódik.",
    urgency: "Gyanús",
  },
  {
    title: "Nő a gázszámla, pedig nem fűtesz többet",
    body: "A régi, nyílt égésterű készülékek hatásfoka jóval alacsonyabb. Ha a fogyasztás kúszik felfelé változatlan szokások mellett, a készülék viszi a pénzt.",
    urgency: "Gyanús",
  },
  {
    title: "Zajos, kattog, búg",
    body: "Az új zajok általában vízkövesedést, szivattyúhibát vagy levegős rendszert jeleznek. Önmagában még javítható, de ritkán jön egyedül.",
    urgency: "Nézzük meg",
  },
  {
    title: "Hibakódot ír ki, vagy le-leáll",
    body: "Az ismétlődő leállás nem szeszély. Van, amit egy beszabályozás megold, van, ami a hőcserélő végét jelenti. Ezt meg kell nézni.",
    urgency: "Nézzük meg",
  },
  {
    title: "Sárga a láng, korom van a készüléken",
    body: "A sárga, lobogó láng tökéletlen égést jelez, és szén-monoxiddal jár együtt. Ez nem várhat a következő szezonig.",
    urgency: "Azonnal",
  },
  {
    title: "Nyílt égésterű készülék a lakótérben",
    body: "A régi, kéménybe kötött nyílt égésterű kazánok a levegőt a helyiségből veszik el. Mai szemmel ez a legkockázatosabb elrendezés.",
    urgency: "Azonnal",
  },
];

const URGENCY_STYLE: Record<string, string> = {
  Gyanús: "bg-sky text-brand",
  "Nézzük meg": "bg-copper-soft text-copper",
  Azonnal: "bg-rose-50 text-rose-700",
};

/* Kazantipusok hatasfok szerint. A szamok szakmai forrasokbol valok
   (lasd a szekcio aljan a hivatkozast), nem a sajat becslesunk. */
const TYPES = [
  {
    name: "Nyílt égésterű, kéménybe kötve",
    era: "Jellemzően 2000 előtti készülék",
    efficiency: 78,
    range: "75-80%",
    flue: "160-170 °C égéstermék",
    note: "Az égéshez a lakótér levegőjét használja, ezért szén-monoxid szempontjából ez a legkockázatosabb elrendezés. Új készülékként ma már gyakorlatilag nem telepíthető.",
    tone: "bad",
  },
  {
    name: "Zárt égésterű, hagyományos",
    era: "Turbós, parapetes készülékek",
    efficiency: 88,
    range: "86-89%",
    flue: "Zárt rendszerű égéstermék-elvezetés",
    note: "A levegőt kívülről veszi, az égésterméket kívülre vezeti, tehát a lakótértől el van választva. Hatásfokban viszont már elmarad a kondenzációstól.",
    tone: "ok",
  },
  {
    name: "Kondenzációs",
    era: "Ma ez az alapeset",
    efficiency: 94,
    range: "92-94%",
    flue: "Kb. 60 °C égéstermék",
    note: "Az égéstermék vízgőzének hőjét is visszanyeri, ezért hűl le 60 fok környékére. Alacsony előremenő hőmérsékleten, például padlófűtéssel dolgozik a legjobban.",
    tone: "best",
  },
];

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

export default function KellEUjKazanPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Döntéstámogató"
        title="Kell-e új kazán?"
        intro="Nem minden hiba jelent cserét, és nem minden működő kazán van rendben. Itt összeszedtük, mire érdemes figyelni, és mikor éri meg még javítani."
        image={vezerlopanel}
        imageAlt="Gázkazán vezérlőpanelje ellenőrzés közben"
        badge={{ value: "10-15 év", label: "egy kazán átlagos élettartama" }}
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Kell-e új kazán?", href: "/kell-e-uj-kazan" },
        ]}
      />

      {/* A KALKULÁTOR: az oldal fő eszköze, rögtön elöl. */}
      <BoilerCalculator />

      {/* ÁRULKODÓ JELEK. Sürgősség szerint jelölve. */}
      <section className="border-y border-sky-200 bg-sky/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-copper">
              Árulkodó jelek
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Hat jel, amit nem érdemes elnézni
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Az alsó kettő biztonsági kérdés, azokkal ne várj a szezon
              végéig. A többi inkább pénzkérdés, ott van idő gondolkodni.
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

      {/* KAZANTIPUSOK. Hatasfok-savok, nem ujabb szovegdobozok. */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-sky/70 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Kazántípusok
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Mi az a kondenzációs, és miért ez maradt?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              A különbség nem apró: a legrégebbi és a mai készülék között
              nagyjából tizenöt százaléknyi hatásfok van. Ez minden elfűtött
              köbméternél számít.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {TYPES.map((t) => (
              <div
                key={t.name}
                className={`rounded-2xl border p-6 sm:p-7 ${
                  t.tone === "best"
                    ? "border-copper-line bg-copper-soft"
                    : "border-sky-200 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      {t.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-ink-soft">{t.era}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-display text-3xl font-extrabold tabular-nums ${
                        t.tone === "best" ? "text-copper" : "text-ink"
                      }`}
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
                    className={`h-full rounded-full ${
                      t.tone === "best"
                        ? "bg-copper"
                        : t.tone === "ok"
                          ? "bg-brand"
                          : "bg-ink-soft/50"
                    }`}
                    style={{ width: `${t.efficiency}%` }}
                  />
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  <span className="font-semibold text-ink">{t.flue}.</span>{" "}
                  {t.note}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink-soft">
            A 2015-ös uniós ErP-irányelv óta új nyílt égésterű és turbós
            készüléket gyakorlatilag nem hoznak forgalomba, ezért cserénél
            szinte mindig kondenzációs kazán kerül a helyére. Ez nem
            marketingdöntés, hanem ez maradt.
          </p>
        </div>
      </section>

      {/* MEKKORA ES MILYEN. Sotet sav, ket oszlop. */}
      <section className="relative overflow-hidden bg-cta edge-glow py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan">
              Amit a felmérésen eldöntünk
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Mekkora, és kombi vagy tárolós?
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/15">
              <h3 className="font-display text-xl font-bold text-white">
                Mekkora teljesítmény kell?
              </h3>
              <p className="mt-3 leading-relaxed text-sky-200">
                Nem a régi kazán kW-ját másoljuk le. A hőigényt a ház
                alapterülete és szigeteltsége adja: korszerű szigetelésnél
                nagyjából 30-50 W négyzetméterenként. Egy közepesen szigetelt,
                100 négyzetméteres háznál ez jellemzően 14-18 kW.
              </p>
              <p className="mt-3 leading-relaxed text-sky-200">
                A túlméretezett kazán nem jobb, hanem rosszabb: ha a legkisebb
                teljesítménye is túl nagy, folyamatosan ki-be kapcsol. Ezért a
                modulációs tartomány legalább annyira számít, mint a maximum.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/15">
              <h3 className="font-display text-xl font-bold text-white">
                Kombi vagy tárolós?
              </h3>
              <p className="mt-3 leading-relaxed text-sky-200">
                A kombi kazán menet közben állítja elő a melegvizet, ezért a
                melegvíz gyakran nagyobb pillanatnyi teljesítményt kíván, mint
                maga a fűtés. Így lesz 20-30 kW-os készülék egy jóval kisebb
                hőigényű házban.
              </p>
              <p className="mt-3 leading-relaxed text-sky-200">
                Tárolós megoldásnál a melegvíz külön tartályban áll, a kazánt
                elég a fűtési hőigényre méretezni. Több hely kell hozzá, cserébe
                egyszerre több csapolási helyen is kitart.
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-sky-200/80">
            Ezek tájékoztató nagyságrendek. A tényleges méretezés helyszíni
            felmérés és hőigény-számítás alapján készül, mert a nyílászárók, a
            fűtött terület és a leadók típusa is beleszól.
          </p>
        </div>
      </section>

      {/* JAVÍTÁS VAGY CSERE. Táblázat, nem kártya: más ritmus. */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Javítás vagy csere
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Melyik oldalon áll a te kazánod?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Ha a jobb oszlopban ismersz magadra két-három sorban is, a
              javítgatás jellemzően csak halasztja a döntést.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse overflow-hidden rounded-2xl border border-sky-200 text-left">
              <thead>
                <tr className="bg-cta text-white">
                  <th scope="col" className="px-5 py-4 text-sm font-semibold" />
                  <th scope="col" className="px-5 py-4 text-sm font-semibold">
                    Inkább javítás
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-semibold">
                    Inkább csere
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
                    <td className="bg-copper-soft/60 px-5 py-4 text-[15px] font-medium text-ink">
                      {row.replace}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink-soft">
            Ez tájékoztató útmutató. A pontos képet mindig egy helyszíni
            felmérés adja, és ha a javítás éri meg jobban, azt fogjuk mondani.
            Erről szól az{" "}
            <Link
              href="/szolgaltatasok/atalanydijas-karbantartas"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              átalánydíjas karbantartás
            </Link>{" "}
            is: a cél, hogy a készülék minél tovább bírja.
          </p>
        </div>
      </section>

      <CtaBand
        title="Nem vagy biztos benne, mi a helyzet?"
        body="Írd le pár mondatban, mennyi idős a készülék és mi a panasz. Az online árajánló asszisztensünk pár kérdés után megmondja, mire számíts."
      />
    </main>
  );
}
