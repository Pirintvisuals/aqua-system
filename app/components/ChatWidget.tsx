"use client";

import { useEffect, useState } from "react";
import { CHATBOT_URL } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  Lebegő árajánló widget — a sarokban ül, nem külső link.
 *  A gombra kattintva egy panel nyílik, benne az AI asszisztens
 *  iframe-ként betöltve. Mobilon teljes képernyő, desktopon kártya.
 * ------------------------------------------------------------------ */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  // Zárja a panelt Esc-re + megakadályozza a háttér görgetését, ha nyitva van.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Panel */}
      <div
        className={`fixed z-[60] transition-all duration-300 ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-4"
        } inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-8rem)] sm:w-[400px]`}
        role="dialog"
        aria-label="Azonnali árajánlat asszisztens"
        aria-modal="true"
      >
        <div className="flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl ring-1 ring-black/10 sm:rounded-2xl">
          {/* fejléc */}
          <div className="flex items-center justify-between gap-3 bg-cta px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Azonnali árajánlat</p>
                <p className="text-xs text-white/80">Pár kérdés, és megvan az ár</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Bezárás"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/15"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* iframe — csak akkor töltjük be, ha már megnyílt egyszer */}
          {open && (
            <iframe
              src={CHATBOT_URL}
              title="Aqua System árajánló asszisztens"
              className="h-full w-full flex-1 border-0"
              allow="clipboard-write; microphone"
            />
          )}
        </div>
      </div>

      {/* Lebegő gomb */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Árajánló bezárása" : "Azonnali árajánlat kérése"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-cta text-white shadow-lg ring-1 ring-black/10 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta sm:h-16 sm:w-16"
      >
        {open ? (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
