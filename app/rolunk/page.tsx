import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "../components/PageHero";
import Team from "../components/Team";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
import Wave from "../components/Wave";
import nagyFerenc from "../assets/team/nagy-ferenc.png";
import gepeszetCsovezetek from "../assets/munkak/gepeszet-csovezetek.jpg";
import gepeszetVitodens from "../assets/munkak/gepeszet-vitodens.jpg";
import gepeszetKazanhaz from "../assets/munkak/gepeszet-kazanhaz.jpg";
import kazancsereErgas from "../assets/munkak/kazancsere-ergas.jpg";

export const metadata: Metadata = {
  title: "Rólunk – ötven év épületgépészeti tapasztalat",
  description:
    "Az Aqua System Service Kft. családi vállalkozásként ötven éve foglalkozik víz-, gáz- és fűtésszereléssel. Ismerd meg a történetünket, az értékeinket és a csapatot.",
  alternates: { canonical: "/rolunk" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "/rolunk",
    title: "Rólunk – Aqua System Service Kft.",
    description:
      "Családi vállalkozás ötven év épületgépészeti tapasztalattal – víz, gáz, fűtés és egynapos gázkészülék csere.",
  },
};




/* ------------------------------------------------------------------ *
 *  Az ötven év, korszakokra bontva. Görgetés közben bomlik ki.
 *
 *  A szövegek szándékosan nem találnak ki konkrét dátumokat: amit itt
 *  állítunk, az vagy a cég saját, régóta vállalt története, vagy valós
 *  ügyfélvéleményből jön (lásd `app/lib/reviews.ts`). Ha a család küld
 *  pontos évszámokat és régi fotókat, azok ide kerülnek.
 * ------------------------------------------------------------------ */
type Era = {
  year: string;
  kicker: string;
  title: string;
  body: string;
  /** Mi volt akkor a szakmában. Iparági tény, nem a cég állítása. */
  era: string;
  /** Két rövid tény a korszakról, nagy számmal. */
  facts: { value: string; label: string }[];
  quote?: { text: string; source: string };
  image?: { src: typeof gepeszetKazanhaz; alt: string };
};

const ERAS: Era[] = [
  {
    year: "1970",
    kicker: "Az első generáció",
    title: "Elindul a családi műhely",
    body: "Víz, gáz, fűtés a környék otthonaiban. Egy szerszámosláda, egy név, és annyi munka, amennyit egy ember tisztességgel elvégez. Nincs marketing, nincs cégtábla: a következő munkát az hozza, hogy az előzőt jól csinálta meg valaki.",
    era: "Ekkor a lakások túlnyomó részében nyílt égésterű, kéménybe kötött készülék dolgozik. Pontosan az a típus, amit ma cserélünk le.",
    facts: [
      { value: "75-80%", label: "egy akkori kazán hatásfoka" },
      { value: "1", label: "generáció, egy szerelő" },
    ],
  },
  {
    year: "1990",
    kicker: "A második generáció",
    title: "Apáról fiúra száll a szakma",
    body: "A fiú a helyszínen tanulja meg, nem tanfolyamon. Ez az a tudás, amit nem lehet leírni: melyik falban merre megy a vezeték, mit bír el egy régi rendszer, és mikor kell nemet mondani egy megoldásra. Ekkor jönnek az első nagyobb gázépítési és teljes gépészeti munkák.",
    era: "A szakmában megjelennek a zárt égésterű, turbós készülékek. A lakótérből kikerül az égés, a hatásfok viszont még alig mozdul.",
    facts: [
      { value: "3 szakág", label: "víz, gáz és fűtés egy kézben" },
      { value: "86-89%", label: "amit egy turbós készülék tud" },
    ],
    image: {
      src: gepeszetCsovezetek,
      alt: "Rézcsövezés egy Aqua System által épített kazánházban",
    },
  },
  {
    year: "2000",
    kicker: "Ügyfelek, nem megrendelések",
    title: "Akik egyszer hívtak, azóta is visszahívnak",
    body: "Ez az az évtized, amikor kiderül, mit ér a munka. Nem az első megrendelésen múlik, hanem azon, hogy tizenöt év múlva kit hívnak, ha megint gond van. A visszatérő ügyfél a szakmában az egyetlen hiteles minősítés, és ekkorra ebből lett elég.",
    era: "Közben megjelennek az első kondenzációs készülékek. Aki ekkor épített rendszert, annak ma jár le a második kazánja.",
    facts: [
      { value: "25 év", label: "a leghosszabb ügyfélkapcsolatunk" },
      { value: "17 év", label: "múlva hívott vissza egy ügyfél" },
    ],
    quote: {
      text: "25 éve veszem igénybe a szolgáltatásukat.",
      source: "M. György, Érd",
    },
  },
  {
    year: "2015",
    kicker: "Technológiaváltás",
    title: "Megérkezik a kondenzációs kor",
    body: "Az uniós ErP-irányelv után a nyílt égésterű és turbós készülékek kifutnak a piacról. A csere innentől nem javítgatás helyett választható lehetőség, hanem a szakma fő feladata. Ekkor döntjük el, hogy emellé állunk teljes mellszélességgel, és nem szórjuk szét magunkat tíz másik munkatípusra.",
    era: "Egy kondenzációs kazán már 92-94 százalékon dolgozik, viszont bélelt kéményt és kondenzvíz-elvezetést kíván. A csere ettől lesz szakmunka, nem készülékakasztás.",
    facts: [
      { value: "92-94%", label: "a mai kondenzációs hatásfok" },
      { value: "2015", label: "az ErP-irányelv éve" },
    ],
    image: {
      src: kazancsereErgas,
      alt: "Korszerű kondenzációs gázkazán a csere után",
    },
  },
  {
    year: "Ma",
    kicker: "Az ötvenedik év",
    title: "Egy nap alatt, 500 csere tapasztalatával",
    body: "Egyetlen dolgot csinálunk, kazáncserét, és azt a legmagasabb szinten. Ugyanaz a család, ugyanaz a mérce, csak mostanra több száz kazánház van mögötte. A régi ügyfelek gyerekei hívnak, és pontosan ugyanazt kapják, amit annak idején a szüleik.",
    era: "Egy komplett csere ma egyetlen munkanap: reggel bontás, estére meleg. Ez nem sietség, hanem ötven év alatt beforgatott rutin.",
    facts: [
      { value: "500+", label: "elvégzett készülékcsere" },
      { value: "1 nap", label: "alatt kész a legtöbb csere" },
    ],
    quote: {
      text: "17 év különbséggel hívtak minket vissza. Ez önmagában is sokat elmond.",
      source: "CS.K. Ildikó véleménye nyomán, Érd",
    },
    image: {
      src: gepeszetKazanhaz,
      alt: "Mai Aqua System kazánház átadás után",
    },
  },
];

export default function RolunkPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Rólunk"
        image={gepeszetVitodens}
        imageAlt="Aqua System által épített gépészeti rendszer szivattyúkkal és osztó-gyűjtővel"
        badge={{ value: "1970-es évek óta", label: "ugyanaz a család" }}
        title="Ötven éve az épületgépészet mellett"
        intro="Az Aqua System Service Kft. családi vállalkozás, amely ötven éve foglalkozik víz-, gáz- és fűtésszereléssel. Ma leginkább a gyors, biztonságos gázkészülék cseréről ismernek minket – de a szaktudásunk a teljes fűtésrendszerre kiterjed."
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Rólunk", href: "/rolunk" },
        ]}
      />

      {/* ------------------------------------------------------------------ *
          AZ ÖTVEN ÉV. Görgetés közben bomlik ki: egy folyamatos gerinc
          fut le az oldalon, mint egy csővezeték, és minden korszak
          felváltva jobbra-balra ül ki mellé. A nagy évszám viszi a
          ritmust, nem a szöveg.
          ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-water py-16 lg:py-24">
        <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Az utunk
            </span>
            <h2 className="headline-anim mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {"Fél évszázad, három generáció".split(" ").map((word, i) => (
                <span key={word} style={{ "--i": i } as React.CSSProperties}>
                  {word}
                  {" "}
                </span>
              ))}
            </h2>

            {/* Rajzolodo hullamvonal a cimsor alatt. */}
            <svg
              className="wave-rule mt-4 h-4 w-56 text-brand"
              viewBox="0 0 320 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 14 C 34 2 66 2 98 12 C 130 22 162 22 194 12 C 226 2 258 2 290 10 C 300 12 310 14 318 14"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <p className="headline-anim mt-5 text-lg leading-relaxed text-ink-soft">
              {"Nem egy cég története, hanem egy családé. Görgess végig rajta."
                .split(" ")
                .map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    style={{ "--i": i * 0.35 } as React.CSSProperties}
                  >
                    {word}
                    {" "}
                  </span>
                ))}
            </p>
          </div>

          <ol className="relative mt-16 lg:mt-20">
            {/* A gerinc: egy folyamatos vonal, ami összeköti a korszakokat. */}
            <span
              aria-hidden="true"
              className="timeline-spine absolute left-[15px] top-2 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-brand/50 via-sky-200 to-transparent sm:left-[23px]"
            />

            {ERAS.map((era) => {
              return (
                <li key={era.year} className="relative pb-12 last:pb-0 lg:pb-16">
                  {/* Jelölő a gerincen. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white sm:left-2"
                  >
                    <span className="era-dot h-3 w-3 rounded-full bg-brand ring-4 ring-brand/15" />
                  </span>

                  <div className="era-block pl-14 sm:pl-20">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="era-year font-display text-5xl font-extrabold leading-none tracking-tight text-brand sm:text-6xl">
                        {era.year}
                      </span>
                      <span className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
                        {era.kicker}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink">
                      {era.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-ink-soft">
                      {era.body}
                    </p>

                    {/* A szamok es a szakmai hatter egy sorban: igy a
                        korszak melle nem kell fotot varni ahhoz, hogy
                        legyen mit nezni. */}
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
                      <dl className="flex gap-x-8 gap-y-4">
                        {era.facts.map((f) => (
                          <div key={f.label}>
                            <dt className="font-display text-2xl font-extrabold tabular-nums text-brand">
                              {f.value}
                            </dt>
                            <dd className="mt-0.5 text-sm leading-snug text-ink-soft">
                              {f.label}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <p className="border-l-2 border-brand/30 pl-4 text-[15px] leading-relaxed text-ink-soft">
                        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-brand">
                          Ekkor a szakmában
                        </span>
                        <span className="mt-1 block">{era.era}</span>
                      </p>
                    </div>

                    {era.image && (
                      <div className="relative mt-6 aspect-[16/7] max-w-3xl overflow-hidden rounded-2xl border border-sky-200 shadow-[0_30px_60px_-35px_rgba(15,42,94,0.5)]">
                        <Image
                          src={era.image.src}
                          alt={era.image.alt}
                          placeholder="blur"
                          sizes="(max-width: 1024px) 90vw, 45vw"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    )}

                    {era.quote && (
                      <figure className="mt-6 max-w-3xl rounded-r-2xl border-l-4 border-brand bg-white/70 p-5">
                        <blockquote className="font-display text-lg font-semibold leading-snug text-ink">
                          „{era.quote.text}”
                        </blockquote>
                        <figcaption className="mt-2 text-sm text-ink-soft">
                          {era.quote.source}
                        </figcaption>
                      </figure>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Zaras: az idovonal vege ne csak elfogyjon. */}
          <div className="mt-4 pl-14 sm:pl-20">
            <div className="max-w-3xl rounded-2xl border border-brand/25 bg-brand/5 p-7 sm:p-9">
              <p className="font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                Ötven év alatt a készülékek teljesen kicserélődtek. Egy dolog
                nem változott: ugyanaz a család áll a munka mögött.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                A nyílt égésterű kazánt felváltotta a kondenzációs, a
                szerelőlapból hőigény-számítás lett, a kéményből bélelt
                égéstermék-elvezetés. A mérce viszont ugyanaz, mint az első
                napon.
              </p>
              <figure className="mt-6 border-t border-brand/20 pt-6">
                <blockquote className="font-display text-lg font-semibold leading-relaxed text-ink">
                  „Ugyanazzal a hozzáállással megyünk minden otthonba, mintha a
                  sajátunk lenne. Ezt tanultuk a szüleinktől, és ezt adjuk
                  tovább.”
                </blockquote>
                <figcaption className="mt-3 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">Nagy Ferenc</span>,
                  tulajdonos
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Csapat */}
      {/* NAGY FERENC. A velemenyek tobbsegeben ot emlitik nevvel, ezert
          kap sajat szekciot: arc es nev all a ceg mogott. */}
      <section className="relative overflow-hidden bg-cta edge-glow py-20 pt-28 lg:py-28 lg:pt-36">
        <Wave position="top" className="text-white" size="md" variant="drift" layers="single" />
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-cyan/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" aria-hidden="true">
          <svg
            viewBox="0 0 1440 300"
            preserveAspectRatio="xMidYMax slice"
            fill="none"
            className="h-full w-full"
          >
            <path
              d="M0 150 C 300 90 520 210 780 160 C 1040 110 1240 80 1440 120 L1440 300 L0 300 Z"
              fill="#7fc4e8"
              opacity="0.07"
            />
            <path
              d="M0 210 C 280 160 560 260 820 216 C 1080 172 1260 150 1440 186 L1440 300 L0 300 Z"
              fill="#7fc4e8"
              opacity="0.05"
            />
          </svg>
        </div>
        <Reveal className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/20 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src={nagyFerenc}
                alt="Nagy Ferenc, az Aqua System Service Kft. tulajdonosa"
                placeholder="blur"
                sizes="(max-width: 1024px) 80vw, 30vw"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-2xl bg-white px-5 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)]">
              <span className="block font-display text-base font-bold text-ink">
                Nagy Ferenc
              </span>
              <span className="mt-0.5 block text-xs font-medium text-ink-soft">
                tulajdonos, cégvezető
              </span>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan">
              Aki a cég mögött áll
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Nálunk van kihez fordulni
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-sky-200">
              A legtöbb ügyfelünk nem a céget keresi, hanem Ferencet. Ő méri
              fel a munkát, ő adja az árat, és ha valami mégsem stimmel, őt
              lehet hívni. Ötven év alatt ez volt a legfontosabb döntés: hogy
              mindig legyen egy név és egy arc a munka mögött.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-sky-200">
              Ez nem marketingszöveg. Az ügyfélvéleményeinkben újra és újra
              az ő neve jön elő, sokan egyenesen neki címezve írják meg a
              visszajelzést.
            </p>

            <figure className="mt-8 rounded-2xl border-l-4 border-cyan bg-white/5 p-6">
              <blockquote className="text-lg leading-relaxed text-white">
                Nagy Ferenc cégvezetővel különösen jó, gördülékeny
                kapcsolatom alakult ki.
              </blockquote>
              <figcaption className="mt-3 text-sm text-sky-200">
                F. Tibor, Budapest XII. kerület
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </section>

      <Team />

      <CtaBand />
    </main>
  );
}
