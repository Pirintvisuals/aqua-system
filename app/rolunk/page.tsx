import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "../components/PageHero";
import Team from "../components/Team";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
import nagyFerenc from "../assets/team/nagy-ferenc.png";
import gepeszetCsovezetek from "../assets/munkak/gepeszet-csovezetek.jpg";
import gepeszetVitodens from "../assets/munkak/gepeszet-vitodens.jpg";

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

const MILESTONES = [
  {
    year: "1970-es évek",
    title: "Elindul a családi műhely",
    body: "A szakma az első generációval kezdődik – víz-, gáz- és fűtésszerelés a környék otthonaiban.",
  },
  {
    year: "1990–2000-es évek",
    title: "Apáról fiúra száll a tudás",
    body: "A vállalkozás megerősödik, a szaktudás generációról generációra öröklődik, egyre több nagyobb gázépítési munkával.",
  },
  {
    year: "Ma",
    title: "Gyors, biztonságos gázkészülék csere",
    body: "Mára a fő profilunk a fix áras, egynapos gázkészülék csere – a teljes épületgépészeti háttérrel a hátunk mögött.",
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

      {/* Történet */}
      <section className="py-20 lg:py-28">
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
      </section>

      {/* Számok */}
      <section className="border-y border-sky-200 bg-sky/30 py-16">
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

      {/* Idővonal */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Az utunk
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Fél évszázad, három generáció
            </h2>
          </div>

          <Reveal stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className="relative rounded-2xl border border-sky-200 bg-white p-7 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-sky px-3 py-1 text-xs font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-brand">
                  {m.year}
                </div>
                <h3 className="mt-1 font-display text-lg font-bold text-ink">
                  {m.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {m.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Amivel foglalkozunk */}
      <section className="border-t border-sky-200 py-20 lg:py-28">
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
      </section>

      {/* Értékek */}
      <section className="border-t border-sky-200 bg-sky/30 py-20 lg:py-28">
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
      <section className="relative overflow-hidden bg-cta edge-glow py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-cyan/15 blur-3xl" />
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
