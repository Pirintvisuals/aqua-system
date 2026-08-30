"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CHATBOT_URL } from "../lib/links";
import { FAQS } from "../lib/faqs";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="gyik" className="scroll-mt-24 bg-sky/30 py-20 lg:py-28">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Gyakran ismételt kérdések
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Nem találod a választ? Kérdezd meg az online árajánló
            asszisztensünket, vagy hívj minket – szívesen segítünk.
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
        </div>

        <Reveal
          stagger
          className="divide-y divide-sky-200 rounded-2xl border border-sky-200 bg-white"
        >
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="px-6">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-display text-base font-semibold text-ink"
                  >
                    {f.q}
                    <span
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-brand text-white" : "bg-sky text-brand"
                      }`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 text-[15px] leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Reveal>
    </section>
  );
}
