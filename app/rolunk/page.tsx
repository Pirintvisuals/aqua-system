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

const EXPERTISE = [
  {
    title: "Gázkészülék csere",
    body: "Régi kazánok és vízmelegítők cseréje korszerű, energiatakarékos készülékre – jellemzően egyetlen munkanap alatt, fix áron.",
  },
  {
    title: "Teljes körű gázépítés",
    body: "Új gázhálózat kiépítése, meglévő rendszer bővítése és átalakítása – a tervezéstől a kivitelezésen át a szabványos dokumentációig és ügyintézésig.",
  },
  {
    title: "Víz- és fűtésszerelés",
    body: "Vízvezeték-hálózatok, fűtésrendszerek és radiátorok szerelése, korszerűsítése – egy megbízható csapattól, aki a teljes rendszert átlátja.",
  },
];

const VALUES = [
  {
    title: "Biztonság mindenekelőtt",
    body: "Gázzal dolgozunk, ahol nincs helye a kompromisszumnak. Minden munkánk a hatályos szabványok szerint, dokumentáltan készül.",
  },
  {
    title: "Kiszámítható, fix ár",
    body: "Előre tudod, mennyibe kerül. Nincs utólagos meglepetés, nincs rejtett tétel – amit megbeszélünk, az az ár.",
  },
  {
    title: "Gyors, tiszta munka",
    body: "A legtöbb gázkészülék cserét egy nap alatt elvégezzük, magunk után rendet rakva. A régi készüléket is elszállítjuk.",
  },
  {
    title: "Családi hozzáállás",
    body: "Nem alvállalkozók váltják egymást nálad. Ugyanaz a csapat kezdi és fejezi be a munkát, névvel és felelősséggel.",
  },
];

const STATS = [
  { value: "50", label: "év tapasztalat az épületgépészetben" },
  { value: "500+", label: "sikeresen lecserélt gázkészülék" },
  { value: "100%", label: "garancia minden beépített készülékre" },
  { value: "1 nap", label: "alatt kész a legtöbb csere" },
];

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
  quote?: { text: string; source: string };
  image?: { src: typeof gepeszetKazanhaz; alt: string };
};

const ERAS: Era[] = [
  {
    year: "1970",
    kicker: "Az első generáció",
    title: "Elindul a családi műhely",
    body: "Víz, gáz, fűtés a környék otthonaiban. Egy szerszámosláda, egy név, és annyi munka, amennyit egy ember tisztességgel elvégez. A szakma itt kezdődik, és innentől nincs kihagyott évtized.",
  },
  {
    year: "1990",
    kicker: "A második generáció",
    title: "Apáról fiúra száll a szakma",
    body: "A fiú a helyszínen tanulja meg, nem tanfolyamon. Ekkor jönnek az első nagyobb gázépítési és teljes gépészeti munkák: már nem csak javítunk egy csövet, hanem egész rendszereket építünk.",
    image: {
      src: gepeszetCsovezetek,
      alt: "Rézcsövezés egy Aqua System által épített kazánházban",
    },
  },
  {
    year: "2000",
    kicker: "Ügyfelek, nem megrendelések",
    title: "Akik egyszer hívtak, azóta is visszahívnak",
    body: "Ez az az évtized, amikor kiderül, mit ér a munka. Nem az első megrendelésen múlik, hanem azon, hogy tizenöt év múlva kit hívnak, ha megint gond van.",
    quote: {
      text: "25 éve veszem igénybe a szolgáltatásukat.",
      source: "M. György, Érd",
    },
  },
  {
    year: "2015",
    kicker: "Technológiaváltás",
    title: "Megérkezik a kondenzációs kor",
    body: "Az uniós ErP-irányelv után a nyílt égésterű és turbós készülékek kifutnak. A csere innentől nem javítgatás helyett választható lehetőség, hanem a szakma fő feladata, és mi emellé állunk teljes mellszélességgel.",
    image: {
      src: kazancsereErgas,
      alt: "Korszerű kondenzációs gázkazán a csere után",
    },
  },
  {
    year: "Ma",
    kicker: "Az ötvenedik év",
    title: "Egy nap alatt, 500 csere tapasztalatával",
    body: "Egyetlen dolgot csinálunk, kazáncserét, és azt a legmagasabb szinten. Ugyanaz a család, ugyanaz a mérce, csak mostanra több száz kazánház van mögötte.",
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
        texture="wave"
        waveTo="text-paper"
        waveVariant="drift"
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

      {/* Történet */}
      <section className="relative bg-paper py-20 lg:py-28">
        <Reveal className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div className="order-last lg:order-first">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-sky-200 shadow-[0_40px_80px_-30px_rgba(15,42,94,0.45)]">
              <Image
                src={gepeszetCsovezetek}
                alt="Aqua System által épített kazánház rézcsövezéssel"
                placeholder="blur"
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              A történetünk
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Egy családi műhelyből mára megbízható csapat
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              A vállalkozás még az 1970-es években indult, és azóta apáról fiúra
              öröklődik a szakma. Az évtizedek alatt több ezer otthonban és
              épületben dolgoztunk – vízvezetéket építettünk, fűtést
              korszerűsítettünk és gázkészülékeket cseréltünk.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Ez a tapasztalat ma abban mutatkozik meg, hogy pontosan tudjuk, mi
              számít egy biztonságos, hosszú távon is jól működő rendszernél. Nem
              kapkodunk, nem trükközünk – szabályosan, átláthatóan és tiszta
              munkával dolgozunk.
            </p>

            <figure className="mt-8 rounded-2xl border-l-4 border-brand bg-sky/40 p-6">
              <blockquote className="font-display text-lg font-semibold leading-relaxed text-ink">
                „Ugyanazzal a hozzáállással megyünk minden otthonba, mintha a
                sajátunk lenne – ezt tanultuk a szüleinktől, és ezt adjuk tovább.”
              </blockquote>
              <figcaption className="mt-3 text-sm text-ink-soft">
                <span className="font-semibold text-ink">Nagy Ferenc</span>, tulajdonos, Aqua System Service Kft.
              </figcaption>
            </figure>
          </div>
        </Reveal>
        <Wave className="text-sky/40" size="md" variant="swell" layers="single" />
      </section>

      {/* Számok */}
      <section className="relative bg-sky/40 py-16 pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl font-extrabold text-brand sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm leading-snug text-ink-soft">
                  {s.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ *
          AZ ÖTVEN ÉV. Görgetés közben bomlik ki: egy folyamatos gerinc
          fut le az oldalon, mint egy csővezeték, és minden korszak
          felváltva jobbra-balra ül ki mellé. A nagy évszám viszi a
          ritmust, nem a szöveg.
          ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-paper py-20 lg:py-28">
        <Wave position="top" className="text-sky/40" size="md" variant="ripple" flip layers="single" />
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
              className="timeline-spine absolute left-[15px] top-2 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-brand/50 via-sky-200 to-transparent lg:left-1/2"
            />

            {ERAS.map((era, i) => {
              const right = i % 2 === 1;
              return (
                <li key={era.year} className="relative pb-16 last:pb-0 lg:pb-24">
                  {/* Jelölő a gerincen. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-paper lg:left-1/2 lg:-translate-x-1/2"
                  >
                    <span className="h-3 w-3 rounded-full bg-brand ring-4 ring-brand/15" />
                  </span>

                  <Reveal
                    className={`pl-14 lg:w-1/2 lg:pl-0 ${
                      right ? "lg:ml-auto lg:pl-16" : "lg:pr-16 lg:text-right"
                    }`}
                  >
                    <div className="font-display text-5xl font-extrabold leading-none tracking-tight text-brand sm:text-6xl lg:text-7xl">
                      {era.year}
                    </div>
                    <div className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      {era.kicker}
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink">
                      {era.title}
                    </h3>
                    <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">
                      {era.body}
                    </p>

                    {era.image && (
                      <div
                        className={`relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-sky-200 shadow-[0_30px_60px_-35px_rgba(15,42,94,0.5)]`}
                      >
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
                      <figure
                        className={`mt-6 border-brand bg-white/70 p-5 ${
                          right
                            ? "rounded-r-2xl border-l-4"
                            : "rounded-l-2xl border-r-4 lg:border-l-0"
                        }`}
                      >
                        <blockquote className="font-display text-lg font-semibold leading-snug text-ink">
                          „{era.quote.text}”
                        </blockquote>
                        <figcaption className="mt-2 text-sm text-ink-soft">
                          {era.quote.source}
                        </figcaption>
                      </figure>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Amivel foglalkozunk */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Amivel foglalkozunk
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Víz, gáz, fűtés – egy kézből
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              A gázkészülék csere a fő profilunk, de mögötte ott van a teljes
              épületgépészeti szaktudás. Így akkor is jó helyen jársz, ha nagyobb
              gázépítési vagy fűtéskorszerűsítési munkára van szükséged.
            </p>
          </div>

          <Reveal stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {EXPERTISE.map((e) => (
              <article
                key={e.title}
                className="flex flex-col rounded-2xl border border-sky-200 bg-white p-7 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {e.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {e.body}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
        <Wave className="text-sky/40" size="lg" variant="crest" flip layers="single" />
      </section>

      {/* Értékek */}
      <section className="relative bg-sky/40 py-20 pb-28 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Az értékeink
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Amiért nyugodtan ránk bízhatod
            </h2>
          </div>

          <Reveal stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-sky-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]"
              >
                <h3 className="font-display text-base font-bold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {v.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Csapat */}
      {/* NAGY FERENC. A velemenyek tobbsegeben ot emlitik nevvel, ezert
          kap sajat szekciot: arc es nev all a ceg mogott. */}
      <section className="relative overflow-hidden bg-cta edge-glow py-20 pt-28 lg:py-28 lg:pt-36">
        <Wave position="top" className="text-sky/40" size="md" variant="drift" layers="single" />
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
