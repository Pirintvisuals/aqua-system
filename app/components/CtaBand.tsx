import Reveal from "./Reveal";
import { CHATBOT_URL, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

/* Záró CTA-sáv az aloldalak aljára — árajánló asszisztens + telefon. */

type Props = {
  title?: string;
  body?: string;
};

export default function CtaBand({
  title = "Cseréljük le a régi gázkészüléket – egyetlen nap alatt",
  body = "Pár kérdés az online árajánló asszisztensünkben, és máris kapsz egy tájékoztató árat. Ha inkább beszélnél valakivel, hívj minket bátran.",
}: Props) {
  return (
    <section className="py-20 lg:py-28">
      <Reveal className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-cta px-8 py-14 text-center shadow-[0_40px_80px_-30px_rgba(15,42,94,0.6)] sm:px-12 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sky-200">{body}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CHATBOT_URL}
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-cta shadow-lg transition-all duration-200 hover:bg-sky hover:shadow-xl sm:w-auto"
              >
                Azonnali árajánlat
                <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
