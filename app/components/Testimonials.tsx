"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import {
  REVIEWS,
  REVIEW_AVERAGE,
  REVIEW_COUNT,
  type Review,
} from "../lib/reviews";

/* ------------------------------------------------------------------ *
 *  Ügyfélvélemények — VALÓS visszajelzések (lásd `app/lib/reviews.ts`).
 *
 *  Kőműves-rács (CSS columns) helyett azért nem sima grid: a vélemények
 *  hossza nagyon eltérő, így a kártyák nem nyúlnak fölöslegesen nagyra.
 *
 *  Alapból 6 vélemény látszik, a többi egy kattintásra. Kezdetben is a
 *  DOM-ban vannak (csak rejtve), hogy a keresők mindet lássák.
 * ------------------------------------------------------------------ */

const PREVIEW_COUNT = 6;

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

function ReviewCard({ review, hidden }: { review: Review; hidden: boolean }) {
  return (
    <figure
      hidden={hidden}
      className="mb-6 break-inside-avoid rounded-2xl border border-sky-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]"
    >
      <div className="flex items-start justify-between gap-3">
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
      </div>

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
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      id="velemenyek"
      className="scroll-mt-24 border-b border-sky-200 bg-sky/30 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Ügyfélvélemények
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Mit mondanak azok, akiknél már jártunk?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Van, aki huszonöt éve hív minket vissza. Ügyfeleink azért
              keresnek, mert fontos nekik a gyors ügyintézés és az átlátható
              kommunikáció – a megbeszéltek szerint dolgozunk, időre,
              kiszámíthatóan.
            </p>
          </div>

          {/* Értékelés-összegző */}
          <div className="rounded-2xl border border-sky-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]">
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl font-extrabold text-cta tabular-nums">
                {REVIEW_AVERAGE.toLocaleString("hu-HU")}
              </span>
              <span>
                <Stars rating={Math.round(REVIEW_AVERAGE)} />
                <span className="mt-1 block text-sm text-ink-soft">
                  {REVIEW_COUNT} valós ügyfélvélemény alapján
                </span>
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-sky-200 pt-5">
              <div>
                <dt className="font-display text-xl font-bold text-ink">500+</dt>
                <dd className="text-xs leading-snug text-ink-soft">
                  sikeres készülékcsere
                </dd>
              </div>
              <div>
                <dt className="font-display text-xl font-bold text-ink">
                  50 év
                </dt>
                <dd className="text-xs leading-snug text-ink-soft">
                  szakmai tapasztalat
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Vélemények — eltérő hosszúság miatt oszlopos (masonry) tördelés */}
        <Reveal className="mt-12">
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {REVIEWS.map((r, i) => (
              <ReviewCard
                key={`${r.name}-${r.place}-${i}`}
                review={r}
                hidden={!showAll && i >= PREVIEW_COUNT}
              />
            ))}
          </div>

          {!showAll && REVIEW_COUNT > PREVIEW_COUNT && (
            <div className="mt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-sky-200 bg-white px-6 py-3.5 text-base font-semibold text-ink transition-colors duration-200 hover:border-brand-light/60 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
