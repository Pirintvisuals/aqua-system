import Link from "next/link";
import Reveal from "./Reveal";
import { CHATBOT_URL, CTA_NOTE, CTA_PRIMARY, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  Záró CTA-sáv az oldalak aljára.
 *
 *  Korábban lekerekített sötét kártya lebegett egy fehér szekcióban,
 *  ezért véletlenszerű buboréknak hatott. Most teljes szélességű,
 *  a lábléchez tapadó záró sáv: egyértelmű, hogy itt ér véget az oldal.
 *
 *  Három út, mert nem mindenki chatel: azonnali árajánlat, telefon,
 *  és üzenet az űrlapon.
 * ------------------------------------------------------------------ */

type Props = {
  title?: string;
  body?: string;
};

export default function CtaBand({
  title = "Cseréljük le a régi gázkészüléket egyetlen nap alatt",
  body = "Pár kérdés az online árajánló asszisztensünkben, és máris kapsz egy tájékoztató árat. Ha inkább beszélnél valakivel, hívj minket, vagy írj üzenetet.",
}: Props) {
  return (
    <section className="relative overflow-clip bg-cta edge-glow">
      <div
        className="pointer-events-none absolute inset-0 bg-blueprint-dark"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl"
        aria-hidden="true"
      />

      <Reveal className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:py-24">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-sky-200">{body}</p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href={CHATBOT_URL}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-cta shadow-lg transition-all duration-200 hover:bg-sky hover:shadow-xl"
          >
            {CTA_PRIMARY}
            <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {PHONE_DISPLAY}
          </a>
        </div>

        <p className="mt-4 text-sm text-sky-200/90">{CTA_NOTE}</p>

        {/* Nem mindenki akar chatelni vagy telefonálni. */}
        <p className="mt-4 text-sm text-sky-200">
          Inkább leírnád?{" "}
          <Link
            href="/kapcsolat#kapcsolat"
            className="font-semibold text-white underline underline-offset-4 transition-colors hover:text-cyan"
          >
            Írj nekünk üzenetet
          </Link>{" "}
          és egy munkanapon belül válaszolunk.
        </p>
      </Reveal>
    </section>
  );
}
