import { CHATBOT_URL, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  Ragadós mobil CTA-sáv.
 *
 *  Miért: a szakipari oldalakon a telefonos érdeklődő konvertál a
 *  legjobban, és mobilon a fejléc telefonszáma elgörög a képernyőről.
 *  Ez a sáv végig ott marad, egy koppintásra hívható.
 *
 *  Csak mobilon és tableten jelenik meg (lg alatt); nagyobb képernyőn
 *  a fejléc CTA-ja végig látszik, ott csak zavarna.
 *
 *  A `pb-[env(safe-area-inset-bottom)]` az iPhone alsó csíkja miatt
 *  kell, különben a gombok a home indicator alá csúsznak.
 * ------------------------------------------------------------------ */

export default function StickyCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-sky-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_-12px_rgba(15,42,94,0.35)] backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Gyors kapcsolatfelvétel"
    >
      <div className="mx-auto flex max-w-lg items-stretch gap-2.5 px-4 py-3">
        <a
          href={PHONE_HREF}
          aria-label={`Hívás most: ${PHONE_DISPLAY}`}
          className="inline-flex min-h-[52px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-4 text-base font-semibold text-ink transition-colors duration-200 hover:bg-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <svg
            className="h-5 w-5 flex-none text-brand"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Hívás
        </a>
        <a
          href={CHATBOT_URL}
          className="inline-flex min-h-[52px] flex-[1.4] cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-4 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-colors duration-200 hover:bg-cta-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
        >
          Azonnali árajánlat
        </a>
      </div>
    </div>
  );
}
