import Link from "next/link";
import Reveal from "./Reveal";
import { CHATBOT_URL } from "../lib/links";
import { FAQS } from "../lib/faqs";

/* ------------------------------------------------------------------ *
 *  GYIK - natív <details>/<summary>, JavaScript nélkül.
 *
 *  Korábban kliens komponens volt useState-tel. A nyitás-csukás pont
 *  az, amire a <details> elem való: billentyűzettel kezelhető,
 *  képernyőolvasók ismerik, és a keresők a zárt választ is látják.
 *  Az első kérdés `open`, hogy legyen egy látható minta.
 * ------------------------------------------------------------------ */

export default function Faq() {
  return (
    <section id="gyik" className="relative isolate overflow-hidden scroll-mt-36 bg-water py-16 lg:py-24">
      <Reveal className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:items-start">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Gyakran ismételt kérdések
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Nem találod a választ? Kérdezd meg az online árajánló
            asszisztensünket, vagy hívj minket, szívesen segítünk.
          </p>
          <a
            href={CHATBOT_URL}
            className="group mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
          >
            Azonnali árajánlat
            <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-ink-soft">
            Vagy{" "}
            <Link
              href="/kapcsolat#kapcsolat"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              írd meg üzenetben
            </Link>
            , és egy munkanapon belül válaszolunk.
          </p>
        </div>

        <Reveal
          stagger
          className="divide-y divide-sky-200 rounded-2xl border border-sky-200 bg-white"
        >
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="faq-item group border-l-2 border-transparent px-6 transition-colors duration-300 open:border-brand open:bg-white/60"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-base font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                {f.q}
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-sky text-brand transition-all duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 pr-10 text-[15px] leading-relaxed text-ink-soft">
                {f.a}
              </p>
            </details>
          ))}
        </Reveal>
      </Reveal>
    </section>
  );
}
