/* ------------------------------------------------------------------ *
 *  MINTA ÉRTÉKELÉSEK — cseréld valós ügyfélvéleményekre!
 *  Kitalált véleményt élő oldalon nem szabad valósként feltüntetni.
 * ------------------------------------------------------------------ */
const REVIEWS = [
  {
    quote:
      "Reggel jöttek, estére kész volt az új kazán. Mindent elmagyaráztak, a végösszeg pontosan annyi lett, amennyit előre mondtak.",
    name: "Minta Ügyfél",
    meta: "Érd",
  },
  {
    quote:
      "Végre valaki, aki visszahív és időben érkezik. Tiszta, gyors munka, korrekt hozzáállás. Csak ajánlani tudom.",
    name: "Minta Ügyfél",
    meta: "Diósd",
  },
  {
    quote:
      "A régi készülék már nem volt biztonságos. Egy nap alatt lecserélték, azóta halkabb és érezhetően kevesebbet fogyaszt.",
    name: "Minta Ügyfél",
    meta: "Budapest",
  },
];

import Reveal from "./Reveal";

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-amber-400" aria-label="5 csillag">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.8l1.2-6.6L2.5 9l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section id="velemenyek" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-sky px-4 py-1.5 text-sm font-semibold text-brand ring-1 ring-sky-200">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            500+ sikeres csere
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Mit mondanak ügyfeleink?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Több mint 500 sikeres kazáncsere áll mögöttünk. Ügyfeleink azért
            keresnek minket, mert fontos nekik a gyors ügyintézés és az átlátható
            kommunikáció. A megbeszéltek szerint dolgozunk – időre,
            kiszámíthatóan.
          </p>
        </div>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border border-sky-200 bg-white p-7 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                „{r.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-sky-200 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky font-display text-sm font-bold text-brand">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {r.name}
                  </span>
                  <span className="block text-xs text-ink-soft">{r.meta}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
