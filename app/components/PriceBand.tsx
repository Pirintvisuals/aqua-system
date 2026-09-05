import Link from "next/link";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import { CHATBOT_URL, CTA_NOTE, CTA_PRIMARY, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  "MENNYIBE KERÜL?"
 *
 *  Ez volt a legnagyobb hiány az oldalon: sehol nem szerepelt, hogyan
 *  áll össze az ár. A látogató fejében ez az első kérdés, és amíg nincs
 *  rá válasz, addig minden más érv fölött ott lóg.
 *
 *  Konkrét összeget szándékosan NEM írunk ki: a csere ára a kéménytől,
 *  a gázvezetéktől és a készüléktől függ, egy kitalált "-tól ár" pedig a
 *  felmérésen visszaütne. Amit meg lehet mondani előre, azt megmondjuk:
 *  mitől függ, mi van benne, mi nem, és hogy hol lehet pár perc alatt
 *  tájékoztató árat kapni.
 * ------------------------------------------------------------------ */

const INCLUDED = [
  "A készülék és a beszerelés",
  "Kéménybélelés, ha kell hozzá",
  "Gázvezeték átalakítása, ha szükséges",
  "Régi készülék bontása és elszállítása",
  "Beüzemelés és beszabályozás",
  "Engedélyeztetés és teljes dokumentáció",
];

const FACTORS = [
  {
    title: "Milyen készülék kerül fel",
    body: "Teljesítmény, kombi vagy tárolós, márka. Ez a tétel nagyobbik része.",
  },
  {
    title: "Mit kíván a kémény",
    body: "A kondenzációs kazánhoz jellemzően bélelés kell. Ez a leggyakoribb rejtett tétel.",
  },
  {
    title: "Mennyit kell átalakítani",
    body: "Gázvezeték, fűtési csonkok, kondenzvíz-elvezetés, néha radiátorcsere.",
  },
];

export default function PriceBand() {
  return (
    <section id="ar" className="scroll-mt-36 bg-water py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            Mennyibe kerül
          </span>
          <AnimatedHeading className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Fix ár, felmérés után. Meglepetés nélkül.
            </AnimatedHeading>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Kitalált „-tól árat” nem írunk ki, mert az a felmérésen úgyis
            megváltozna. Azt viszont előre megmondjuk, mitől függ az ár, és
            mi van benne.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* Mitol fugg */}
          <div>
            <h3 className="font-display text-lg font-bold text-ink">
              Három dolog mozgatja az árat
            </h3>
            <ol className="mt-5 space-y-4">
              {FACTORS.map((f, i) => (
                <li
                  key={f.title}
                  className="flex gap-4 rounded-2xl border border-sky-200 bg-white p-5"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-sky font-display text-sm font-bold tabular-nums text-brand">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">
                      {f.title}
                    </span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-ink-soft">
                      {f.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Mi van benne + CTA */}
          <Reveal className="flex flex-col rounded-2xl border border-brand/25 bg-white p-7 shadow-[0_30px_60px_-40px_rgba(15,42,94,0.5)]">
            <h3 className="font-display text-lg font-bold text-ink">
              Ez mind benne van az árban
            </h3>
            <ul className="mt-5 flex-1 space-y-2.5">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15px] text-ink">
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
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={CHATBOT_URL}
              className="group mt-7 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-6 py-4 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
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
            <p className="mt-3 text-center text-sm text-ink-soft">{CTA_NOTE}</p>
            <p className="mt-4 text-center text-sm text-ink-soft">
              Inkább telefonon?{" "}
              <a
                href={PHONE_HREF}
                className="font-semibold text-brand underline-offset-2 hover:underline"
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          </Reveal>
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-soft">
          A felmérés után írásban kapod meg a fix árat. Amit ott
          megbeszélünk, az lesz a számlán is.{" "}
          <Link
            href="/kell-e-uj-kazan#megtakaritas"
            className="font-semibold text-brand underline-offset-2 hover:underline"
          >
            Nézd meg, mennyit spórolsz vele évente
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
