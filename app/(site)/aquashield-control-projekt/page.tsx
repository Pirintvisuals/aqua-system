import type { Metadata } from "next";
import Image from "next-image-export-optimizer";
import PageHero from "../components/PageHero";
import szechenyiBanner from "../assets/palyazat/szechenyi-terv-plusz.jpg";
import { BUSINESS } from "../lib/site";

/* ------------------------------------------------------------------ *
 *  Nyertes uniós pályázat. Az URL szándékosan ugyanaz, mint a régi
 *  WordPress oldalon: a pályázati nyilvánosság erre a címre mutathat,
 *  ezért nem költözhet el.
 *
 *  Az adatok a régi oldalról valók, szó szerint. Számot, dátumot csak
 *  a támogatási szerződés alapján szabad módosítani.
 * ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Aquashield projekt – GINOP-2.1.7-15-2016-01635",
  description:
    "Az Aqua System Service Kft. európai uniós támogatással megvalósult fejlesztése: Aquashield – csúcsminőségű élelmiszerek előállítása smart monitoring rendszer segítségével.",
  alternates: { canonical: "/aquashield-control-projekt" },
  robots: { index: true, follow: true },
};

const DETAILS = [
  { label: "Kedvezményezett", value: BUSINESS.legalName },
  {
    label: "A projekt címe",
    value:
      "Aquashield – Csúcsminőségű élelmiszerek előállítása smart monitoring rendszer segítségével",
  },
  { label: "A szerződött támogatás összege", value: "50 000 000 Ft" },
  { label: "A támogatás mértéke", value: "60,24 %" },
  { label: "A projekt befejezése", value: "2019. június 30." },
  { label: "A projekt azonosító száma", value: "GINOP-2.1.7-15-2016-01635" },
];

export default function AquashieldPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Európai uniós pályázat"
        title="Aquashield Control projekt"
        intro="Csúcsminőségű élelmiszerek előállítása smart monitoring rendszer segítségével – európai uniós támogatásból megvalósult fejlesztés."
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Aquashield projekt", href: "/aquashield-control-projekt" },
        ]}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="overflow-hidden rounded-2xl border border-sky-200 bg-white">
            <Image
              src={szechenyiBanner}
              alt="Széchenyi Terv Plusz – Magyarország Kormánya – Az Európai Unió társfinanszírozásával"
              sizes="(max-width: 768px) 100vw, 720px"
              className="h-auto w-full"
            />
          </div>

          <article className="legal-article mt-12">
            <h2>A nyertes pályázat adatai</h2>
            <dl className="legal-box">
              {DETAILS.map((d) => (
                <div
                  key={d.label}
                  className="grid grid-cols-1 gap-1 border-b border-sky-200 py-3 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[14rem_1fr] sm:gap-4"
                >
                  <dt className="text-sm font-medium text-ink-soft">{d.label}</dt>
                  <dd className="text-sm font-semibold leading-snug text-ink">{d.value}</dd>
                </div>
              ))}
            </dl>

            <h2>A projekt háttere</h2>
            <p>
              Az Aqua System Service Kft. a hagyományos épületgépészeti
              szolgáltatásokon kívül nagy hangsúlyt fektet az új típusú
              kontrolling technológiák, például az okosházak kutatására és
              fejlesztésére. Ez a projekt is automatikus monitoring és
              kontrolling elven épül fel, csak itt nem épületek, hanem úgynevezett
              vízbázisú agrokultúrák felügyelete a cél.
            </p>
            <p>
              A projekttel a GINOP-2.1.7-15 „Prototípus, termék-, technológia- és
              szolgáltatásfejlesztés” kiírásán nyertünk támogatást.
            </p>

            <h2>A projekt tartalma</h2>
            <p>
              A kutatás-fejlesztési projekt célja egy olyan monitoring és
              kontrolling eszköz (AquaShield) létrehozása, amely a vízbázisú
              agrokultúrákban (aquapónia és hidropónia) felügyeli a kert
              egészségét és optimális működését. Segítségével minőségi,
              vegyszermentesen termesztett élelmiszereket lehet előállítani, a
              hagyományosnál jóval nagyobb hozamokkal. Az eszköz szükség esetén
              értesít, vagy be is avatkozik a kert egyensúlyának megőrzése
              érdekében.
            </p>
            <p>
              Az aquapóniában egy közös rendszerben nevelnek halakat és
              termesztenek növényeket, a hidropóniában pedig speciális
              folyadékkal táplálják a növényeket a minél gyorsabb fejlődés
              érdekében.
            </p>
            <p>
              A rendszer nagy előnye, hogy segítségével elháríthatók a
              vészhelyzetek. A pH-értéket például folyamatosan méri, és egy adott
              határérték elérésekor jelez, hogy be kell avatkozni. Így
              megóvhatók a növények, a halak és a rendszer egyes elemei, például
              a szivattyúk. Kiemelten fontos és egyedi funkció, hogy a rendszer
              folyamatosan csatlakozik az internetre, ezért bárhonnan és bármikor
              elérhető.
            </p>

            <h3>AquaShield OS</h3>
            <p>
              A hardver működését szolgáló operációs rendszer. Feldolgozza és
              kiértékeli a szenzoroktól begyűjtött adatokat, majd az eredmények
              alapján optimális körülményeket tart fenn.
            </p>

            <h3>AquaShield Connect</h3>
            <p>
              A távoli hozzáférésért felelős szoftver. Lehetővé teszi, hogy
              távolról, akár telefonon is ellenőrizni lehessen a rendszer
              állapotát, megjeleníteni a szenzorok adatait, és szükség esetén
              kézzel is beavatkozni a vezérlési folyamatokba. Így a
              veszélyhelyzetek elkerülhetők, a növények és a halak pedig a
              lehető leggyorsabban fejlődhetnek.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
