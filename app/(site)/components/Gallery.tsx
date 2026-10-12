import Image from "next-image-export-optimizer";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import Reveal from "./Reveal";
import { SERVICES } from "../lib/services";
import kazancsereValtoOszto from "../assets/munkak/kazancsere-valto-oszto.jpg";
import kazancsereErgas from "../assets/munkak/kazancsere-ergas.jpg";
import napkollektorMezo from "../assets/munkak/napkollektor-kollektormezo-uszoda.jpg";
import hoszivattyuKulteri from "../assets/munkak/hoszivattyu-kulteri-egyseg.jpg";
import gepeszetPadloNagy from "../assets/munkak/gepeszet-padlofutes-nagy-terulet.jpg";
import kazancsereKaszkad from "../assets/munkak/kazancsere-kaszkad.jpg";

/* ------------------------------------------------------------------ *
 *  Korábbi munkáink - VALÓDI, saját fotók, válogatás.
 *
 *  Korábban stockfotók álltak itt kitalált településnevekkel. Kifelé az
 *  a látszat, hogy a mi munkánk - ez egy bizalomra épülő szakmában nem
 *  vállalható, ezért kikerült. A képaláírás azt mondja, ami a képen van.
 *
 *  Minden csempe más szolgáltatást mutat, és annak az oldalára visz.
 *  A rács alakja a fotókhoz igazodik, nem fordítva: az álló kép álló
 *  csempébe kerül, a fekvő fekvőbe, és minden képnek saját fókuszpontja
 *  van (`focus`), hogy a vágás a lényeget mutassa, ne a falat.
 *
 *  A rács 4 oszlopos (mobilon 2), és hézag nélkül telik meg - ha képet
 *  cserélsz, a `span` maradjon, csak a kép és a fókusz változzon.
 * ------------------------------------------------------------------ */

type Tile = {
  img: StaticImageData;
  alt: string;
  caption: string;
  /** A szolgáltatás slug-ja - ide visz a csempe. */
  service: string;
  span: string;
  /** object-position: hova essen a vágás közepe. */
  focus: string;
  sizes: string;
};

const TILES: Tile[] = [
  {
    img: kazancsereValtoOszto,
    alt: "Fali kazán alatti gépészet: piros tágulási tartály, hidraulikus váltó, szivattyúk és padlófűtés osztó-gyűjtő",
    caption: "Kazán, váltó és padlófűtés-osztó",
    service: "komplett-gepeszet",
    span: "col-span-2 row-span-2",
    focus: "object-[55%_50%]",
    sizes: "(max-width: 768px) 92vw, 46vw",
  },
  {
    img: kazancsereErgas,
    alt: "Beüzemelt Viessmann kondenzációs kazán, mellette melegvíz-tároló és tágulási tartály",
    caption: "Egynapos kazáncsere",
    service: "egynapos-kazancsere",
    span: "row-span-2",
    focus: "object-[50%_40%]",
    sizes: "(max-width: 768px) 46vw, 23vw",
  },
  {
    img: napkollektorMezo,
    alt: "Kollektormező egy fedett uszoda tetején: hosszú sorban telepített síkkollektorok",
    caption: "Napkollektor",
    service: "napkollektor-vezerles",
    span: "",
    focus: "object-[60%_35%]",
    sizes: "(max-width: 768px) 46vw, 23vw",
  },
  {
    img: hoszivattyuKulteri,
    alt: "Mitsubishi Electric levegő-víz hőszivattyú kültéri egysége betonlábakon, a ház fala mellett",
    caption: "Hőszivattyú",
    service: "hoszivattyu-telepites",
    span: "",
    focus: "object-[50%_45%]",
    sizes: "(max-width: 768px) 46vw, 23vw",
  },
  {
    img: kazancsereKaszkad,
    alt: "Két Viessmann fali kondenzációs kazán kaszkádba kötve, sárga gázvezetékkel és acél osztóval",
    caption: "Társasházi kaszkád",
    service: "tarsashazi-ipari-kazanhaz",
    span: "col-span-2",
    focus: "object-[50%_8%]",
    sizes: "(max-width: 768px) 92vw, 46vw",
  },
  {
    img: gepeszetPadloNagy,
    alt: "Padlófűtés csövei nagy alapterületen, hőszigetelésre és hegesztett hálóra fektetve egy új építésű házban",
    caption: "Padlófűtés új házba",
    service: "komplett-gepeszet",
    span: "col-span-2",
    focus: "object-[50%_70%]",
    sizes: "(max-width: 768px) 92vw, 46vw",
  },
];

/* Ugyanaz a szám, amit a /munkaink szűrője "Összes"-nek mutat. */
const PHOTO_COUNT = new Set(
  SERVICES.flatMap((s) => [
    ...(s.photo ? [s.photo.src] : []),
    ...(s.gallery ?? []).map((g) => g.img.src),
  ]),
).size;

export default function Gallery() {
  return (
    <section id="galeria" className="relative isolate overflow-clip scroll-mt-36 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Munkáink
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Így adjuk át a kazánházat
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Minden kép a saját munkánkról készült. A rendezett csövezés nem
              dísz: ettől marad a rendszer évek múlva is szervizelhető.
            </p>
          </div>

          <Link
            href="/munkaink"
            className="group inline-flex flex-none cursor-pointer items-center gap-2 rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-light/60 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Mind a {PHOTO_COUNT} fotó
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <Reveal
          stagger
          className="mt-12 grid grid-flow-dense auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[240px]"
        >
          {TILES.map((t) => (
            <Link
              key={t.caption}
              href={`/szolgaltatasok/${t.service}`}
              className={`group relative flex items-end overflow-hidden rounded-2xl border border-sky-200 bg-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${t.span}`}
            >
              <Image
                src={t.img}
                alt={t.alt}
                placeholder="blur"
                sizes={t.sizes}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${t.focus}`}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
                aria-hidden="true"
              />
              <span className="relative flex w-full items-end justify-between gap-3 p-4 text-white sm:p-5">
                <span className="text-sm font-semibold drop-shadow sm:text-base">{t.caption}</span>
                <svg className="h-5 w-5 flex-none opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
