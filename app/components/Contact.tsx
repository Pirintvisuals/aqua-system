"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CHATBOT_URL } from "../lib/links";

const EMAIL = "keszulekcsere@aqua-system.hu";
const PHONE_DISPLAY = "(06 20) 399 0093";
const PHONE_HREF = "tel:+36203990093";

export default function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `Név: ${name}\nElérhetőség: ${contact}\n\n${message}`;
    // Chatbot/űrlap-backend később; addig e-mail kliens nyílik meg.
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Ajánlatkérés – gázkészülék csere",
    )}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <section id="kapcsolat" className="scroll-mt-24 py-20 lg:py-28">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* info */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            Kapcsolat
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Vedd fel velünk a kapcsolatot
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            A leggyorsabb út az árhoz az online árajánló asszisztensünk – pár
            kérdés, és máris kapsz egy tájékoztató árat. Ha inkább írnál vagy
            hívnál, azt is szívesen fogadjuk.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={CHATBOT_URL}
              className="group flex items-center gap-4 rounded-2xl border border-brand/30 bg-brand/5 p-5 transition-colors hover:bg-brand/10"
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <span className="flex-1">
                <span className="block text-sm text-brand">Leggyorsabb</span>
                <span className="block font-semibold text-ink">
                  Azonnali árajánlat az asszisztenssel
                </span>
              </span>
              <svg className="h-5 w-5 flex-none text-brand transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 rounded-2xl border border-sky-200 bg-white p-5 transition-colors hover:bg-sky/50"
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-sky text-brand">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <span>
                <span className="block text-sm text-ink-soft">E-mail</span>
                <span className="block font-semibold text-ink">{EMAIL}</span>
              </span>
            </a>

            <a
              href={PHONE_HREF}
              className="flex items-center gap-4 rounded-2xl border border-sky-200 bg-white p-5 transition-colors hover:bg-sky/50"
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-sky text-brand">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span>
                <span className="block text-sm text-ink-soft">Telefon</span>
                <span className="block font-semibold text-ink">{PHONE_DISPLAY}</span>
              </span>
            </a>
          </div>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-sky-200 bg-white p-7 shadow-[0_30px_70px_-40px_rgba(15,42,94,0.5)] sm:p-9"
        >
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label htmlFor="c-name" className="text-sm font-medium text-ink">
                Neved
              </label>
              <input
                id="c-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Kovács Anna"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="c-contact" className="text-sm font-medium text-ink">
                E-mail vagy telefonszám
              </label>
              <input
                id="c-contact"
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="anna@example.hu / +36 20 123 4567"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="c-msg" className="text-sm font-medium text-ink">
                Miben segíthetünk?
              </label>
              <textarea
                id="c-msg"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Pl. 18 éves kombi kazánom van, cserét szeretnék…"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
            >
              Üzenet küldése
              <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <p className="text-xs text-ink-soft">
              A gombra kattintva a levelezőprogramod nyílik meg. Ha azonnali
              árat szeretnél, indítsd el fent az online árajánló asszisztenst.
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
