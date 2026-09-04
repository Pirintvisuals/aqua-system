import Reveal from "./Reveal";
import {
  REVIEWS,
  REVIEW_AVERAGE,
  REVIEW_COUNT,
  type Review,
} from "../lib/reviews";

/* ------------------------------------------------------------------ *
 *  Ügyfélvélemények - VALÓS visszajelzések (lásd `app/lib/reviews.ts`).
 *
 *  A nyitókép szándékosan NYUGODT: egy nagy kiemelt idézet, alatta
 *  három rövid kártya. Korábban hat, nagyon eltérő hosszúságú kártya
 *  állt itt egy masonry rácsban, és zsúfoltnak hatott. A hosszabb
 *  véleményeket a "mind a 12" mögé tettük.
 *
 *  A rövid nézetbe a három LEGRÖVIDEBB vélemény kerül, hogy a három
 *  kártya nagyjából egyforma magas legyen. Ez számolt, nem kézzel
 *  válogatott: ha új vélemény jön, magától rendeződik.
 *
 *  Az egész szekció szerver komponens. A "mutasd mind" tisztán CSS
 *  (rejtett checkbox + label), így nulla JavaScriptet visz a kliensre,
 *  a keresők pedig mind a 12 véleményt látják a HTML-ben.
 * ------------------------------------------------------------------ */

const PREVIEW_COUNT = 3;

const featured = REVIEWS.find((r) => r.featured) ?? REVIEWS[0];
const rest = REVIEWS.filter((r) => r !== featured);
const textLength = (r: Review) => r.body.join(" ").length;
const shortest = [...rest].sort((a, b) => textLength(a) - textLength(b));
const preview = shortest.slice(0, PREVIEW_COUNT);
const hidden = rest.filter((r) => !preview.includes(r));

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const box = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} csillag az ötből`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${box} ${i < rating ? "text-amber-400" : "text-sky-200"}`}
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

function Byline({ review }: { review: Review }) {
  return (
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
  );
}

function ReviewCard({ review, extra }: { review: Review; extra?: boolean }) {
  return (
    <figure
      className={`${
        extra ? "mb-6 break-inside-avoid " : ""
      }rounded-2xl border border-sky-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]`}
    >
      <Byline review={review} />
      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>
      <blockquote className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-ink">
        {review.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </blockquote>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section
      id="velemenyek"
      className="scroll-mt-24 border-b border-sky-200 bg-sky/30 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Fejléc: az ötven év a főszereplő. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Ügyfélvélemények
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Ötven év alatt sok bizalom gyűlik össze
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Van, aki huszonöt éve hív minket vissza, van, aki tizenhét év
              múlva keresett meg újra. Ez az ötven év nem egy szám a falon:
              ugyanaz a család, ugyanaz a mérce, generációk óta.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-6xl font-extrabold leading-none text-cta tabular-nums">
                50
              </span>
              <span className="font-display text-2xl font-bold text-brand">
                éve
              </span>
            </div>
            <p className="mt-2 text-sm leading-snug text-ink-soft">
              a szakmában, családi vállalkozásként
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-sky-200 pt-5">
              <div>
                <dt className="font-display text-xl font-bold text-ink">500+</dt>
                <dd className="text-xs leading-snug text-ink-soft">
                  sikeres készülékcsere
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 font-display text-xl font-bold text-ink">
                  {REVIEW_AVERAGE.toLocaleString("hu-HU")}
                  <Stars rating={Math.round(REVIEW_AVERAGE)} />
                </dt>
                <dd className="text-xs leading-snug text-ink-soft">
                  {REVIEW_COUNT} valós vélemény
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <Reveal className="mt-12">
          <input
            type="checkbox"
            id="reviews-toggle"
            className="sr-only"
            aria-label={`Mind a ${REVIEW_COUNT} vélemény megjelenítése`}
          />

          {/* Egy nagy, kiemelt idézet: a leghosszabb ügyfélkapcsolat. */}
          <figure className="rounded-3xl border border-sky-200 bg-white p-8 shadow-[0_30px_70px_-40px_rgba(15,42,94,0.5)] sm:p-10">
            <svg
              className="h-8 w-8 text-sky-200"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7.5 5A5.5 5.5 0 0 0 2 10.5V19h8.5v-8.5H6.5A1 1 0 0 1 7.5 9zm11 0A5.5 5.5 0 0 0 13 10.5V19h8.5v-8.5H17.5A1 1 0 0 1 18.5 9z" />
            </svg>
            <blockquote className="mt-4 space-y-3 text-lg leading-relaxed text-ink sm:text-xl">
              {featured.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </blockquote>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-sky-200 pt-6">
              <Byline review={featured} />
              <Stars rating={featured.rating} size="md" />
            </div>
          </figure>

          {/* Három rövid vélemény, egyforma ritmusban. */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {preview.map((r, i) => (
              <ReviewCard key={`${r.name}-${r.place}-${i}`} review={r} />
            ))}
          </div>

          {/* A többi vélemény: alapból rejtve, CSS-ből nyílik. */}
          <div className="reviews-extra mt-6 columns-1 gap-6 md:columns-2 lg:columns-3">
            {hidden.map((r, i) => (
              <ReviewCard key={`${r.name}-${r.place}-${i}`} review={r} extra />
            ))}
          </div>

          <div className="reviews-more mt-8 flex justify-center">
            <label
              htmlFor="reviews-toggle"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-sky-200 bg-white px-6 py-3.5 text-base font-semibold text-ink transition-colors duration-200 hover:border-brand-light/60 hover:text-brand"
            >
              Mind a {REVIEW_COUNT} vélemény
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </label>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
