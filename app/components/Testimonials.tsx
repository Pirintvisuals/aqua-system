import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import {
  REVIEWS,
  REVIEW_AVERAGE,
  REVIEW_COUNT,
  type Review,
} from "../lib/reviews";

/* ------------------------------------------------------------------ *
 *  Ügyfélvélemények - VALÓS visszajelzések (lásd `app/lib/reviews.ts`).
 *
 *  A szekció egy magától mozgó körhinta: két sáv, ellentétes irányban,
 *  végtelenítve. Korábban egy kiemelt idézet + három kártya + egy
 *  "mutasd mind" kapcsoló állt itt; a körhintában mind a 12 vélemény
 *  folyamatosan látszik, kattintás nélkül.
 *
 *  Továbbra is szerver komponens: a mozgás tiszta CSS (duplázott sáv +
 *  `translate3d(-50%)`), így nulla JavaScript kerül a kliensre, és a
 *  keresők mind a 12 véleményt megkapják a HTML-ben.
 *
 *  Egérrel fölé állva (és billentyűzet-fókusznál) megáll, csökkentett
 *  mozgás mellett pedig nem indul el, helyette kézzel görgethető.
 * ------------------------------------------------------------------ */

/* A két sáv nagyjából egyforma hosszú legyen: hosszúság szerint
   rendezve, felváltva osztjuk szét őket. Ez számolt, nem kézzel
   válogatott - új vélemény esetén magától rendeződik. */
const textLength = (r: Review) => r.body.join(" ").length;
const ordered = [...REVIEWS].sort((a, b) => textLength(b) - textLength(a));
const rowTop = ordered.filter((_, i) => i % 2 === 0);
const rowBottom = ordered.filter((_, i) => i % 2 === 1);

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} csillag az ötből`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-sky-200"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.8l1.2-6.6L2.5 9l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="mr-6 flex w-[300px] flex-none flex-col rounded-2xl border border-sky-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)] sm:w-[360px]">
      <figcaption className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-sky font-display text-sm font-bold text-brand">
          {review.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">
            {review.name}
          </span>
          <span className="block text-xs text-ink-soft">
            {review.place} · {review.year}
          </span>
        </span>
      </figcaption>
      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>
      {/* A hosszabb véleményeket a kártyán levágjuk, hogy a sáv ritmusa
          egyenletes maradjon - a teljes szöveg benne marad a HTML-ben. */}
      <blockquote className="review-clamp mt-3 text-[15px] leading-relaxed text-ink">
        {review.body.join(" ")}
      </blockquote>
    </figure>
  );
}

/* Egy sáv: ugyanaz a kártyasor kétszer egymás után. A második példány
   csak a folytonos hurokhoz kell, ezért a képernyőolvasó elől rejtjük. */
function MarqueeRow({
  reviews,
  reverse = false,
  duration,
}: {
  reviews: Review[];
  reverse?: boolean;
  duration: string;
}) {
  const group = (clone: boolean) => (
    <div className="flex" aria-hidden={clone || undefined}>
      {reviews.map((r, i) => (
        <ReviewCard key={`${clone ? "b" : "a"}-${r.name}-${r.place}-${i}`} review={r} />
      ))}
    </div>
  );

  return (
    <div className="marquee-row py-3">
      <div
        className={`marquee${reverse ? " marquee-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="velemenyek"
      className="relative isolate scroll-mt-36 overflow-hidden bg-water-down py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Fejlec: az otven ev a foszereplo. */}
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            Ügyfélvélemények
          </span>
          <AnimatedHeading className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Ötven év alatt sok bizalom gyűlik össze
            </AnimatedHeading>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Van, aki huszonöt éve hív minket vissza, van, aki tizenhét év
            múlva keresett meg újra. Ez az ötven év nem egy szám a falon:
            ugyanaz a család, ugyanaz a mérce, generációk óta.
          </p>

          <dl className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Átlagos értékelés</dt>
              <dd className="flex items-center gap-2">
                <span className="font-display text-2xl font-extrabold text-cta tabular-nums">
                  {REVIEW_AVERAGE.toLocaleString("hu-HU")}
                </span>
                <Stars rating={Math.round(REVIEW_AVERAGE)} />
                <span className="text-sm text-ink-soft">
                  {REVIEW_COUNT} valós vélemény
                </span>
              </dd>
            </div>
            <span className="hidden h-5 w-px bg-sky-200 sm:block" aria-hidden="true" />
            <div className="flex items-baseline gap-2">
              <dt className="font-display text-2xl font-extrabold text-cta">50</dt>
              <dd className="text-sm text-ink-soft">éve a szakmában</dd>
            </div>
            <span className="hidden h-5 w-px bg-sky-200 sm:block" aria-hidden="true" />
            <div className="flex items-baseline gap-2">
              <dt className="font-display text-2xl font-extrabold text-cta">500+</dt>
              <dd className="text-sm text-ink-soft">sikeres csere</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* A korhinta teljes szelessegben fut, a szelein kifakul. */}
      <Reveal className="marquee-mask mt-12">
        <MarqueeRow reviews={rowTop} duration="72s" />
        <MarqueeRow reviews={rowBottom} duration="88s" reverse />
      </Reveal>
    </section>
  );
}
