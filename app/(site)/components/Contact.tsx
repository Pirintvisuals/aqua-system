"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Wave from "./Wave";
import AnimatedHeading from "./AnimatedHeading";
import { CHATBOT_URL, PHONE_DISPLAY, PHONE_HREF, QUOTING_AGENT_ON } from "../lib/links";
import { BUSINESS, WEB3FORMS_KEY } from "../lib/site";

// Ne legyen második másolat: az e-mail/telefon egy helyen él, különben
// (mint korábban) észrevétlenül szétcsúszik a valóditól.
const EMAIL = BUSINESS.email;

const WORK_TYPES = [
  "Gázkészülék csere",
  "Gázépítés / gázhálózat",
  "Víz- és fűtésszerelés",
  "Helyszíni felmérés",
  "Egyéb / még nem tudom",
] as const;

export default function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [workType, setWorkType] = useState("");
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState("");
  // Csapda a spamrobotoknak: ember nem látja, robot kitölti.
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = "Ajánlatkérés – gázkészülék csere";

    // Nincs még Web3Forms kulcs: a levelezőprogram nyílik meg, mint eddig.
    if (!WEB3FORMS_KEY) {
      const body =
        `Név: ${name}\n` +
        `Elérhetőség: ${contact}\n` +
        `Milyen munka: ${workType || "nincs megadva"}\n` +
        `Helyszín: ${place || "nincs megadva"}` +
        `\n\n${message}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${subject} – ${name}`,
          from_name: "aqua-system.hu űrlap",
          // Ha e-mail címet adott meg, a "Válasz" gomb egyből neki ír.
          ...(contact.includes("@") ? { replyto: contact.trim() } : {}),
          botcheck,
          "Név": name,
          "Elérhetőség": contact,
          "Milyen munka": workType || "nincs megadva",
          "Helyszín": place || "nincs megadva",
          "Üzenet": message || "-",
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <section id="kapcsolat" className="relative isolate overflow-clip scroll-mt-36 bg-water py-16 lg:py-24">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* info */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            Kapcsolat
          </span>
          <AnimatedHeading className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Vedd fel velünk a kapcsolatot
            </AnimatedHeading>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            {QUOTING_AGENT_ON
              ? "A leggyorsabb út az árhoz az online árajánló asszisztensünk – pár kérdés, és máris kapsz egy tájékoztató árat. Ha inkább írnál vagy hívnál, azt is szívesen fogadjuk."
              : "Írj nekünk az űrlapon vagy e-mailben, esetleg hívj minket. A végleges, fix árat a helyszíni felmérés után adjuk."}
          </p>

          <div className="mt-8 space-y-4">
            {QUOTING_AGENT_ON && (
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
            )}

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
              <label htmlFor="c-work" className="text-sm font-medium text-ink">
                Milyen munka?{" "}
                <span className="font-normal text-ink-soft">(opcionális)</span>
              </label>
              <select
                id="c-work"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className={`${inputClass} ${
                  workType ? "text-ink" : "text-ink-soft/60"
                }`}
              >
                <option value="" disabled>
                  Válaszd ki, mire van szükséged
                </option>
                {WORK_TYPES.map((w) => (
                  <option key={w} value={w} className="text-ink">
                    {w}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="c-place" className="text-sm font-medium text-ink">
                Helyszín{" "}
                <span className="font-normal text-ink-soft">(opcionális)</span>
              </label>
              <input
                id="c-place"
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Település / kerület – pl. Budapest, XIII. kerület"
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
            <input
              type="checkbox"
              name="botcheck"
              checked={botcheck}
              onChange={(e) => setBotcheck(e.target.checked)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            {status === "sent" ? (
              <div role="status" className="rounded-xl border border-brand/30 bg-brand/5 p-5">
                <p className="font-semibold text-ink">Köszönjük, megkaptuk az üzenetedet!</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Hamarosan jelentkezünk. Ha sürgős, hívj minket:{" "}
                  <a href={PHONE_HREF} className="font-semibold text-brand">
                    {PHONE_DISPLAY}
                  </a>
                </p>
              </div>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? "Küldés…" : "Üzenet küldése"}
                  <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                {status === "error" && (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    Valami hiba történt, az üzenet nem ment el. Próbáld újra, vagy
                    hívj minket: <a href={PHONE_HREF} className="underline">{PHONE_DISPLAY}</a>
                  </p>
                )}
                <p className="text-xs text-ink-soft">
                  {WEB3FORMS_KEY
                    ? "Az üzenetedre e-mailben vagy telefonon válaszolunk."
                    : "A gombra kattintva a levelezőprogramod nyílik meg."}
                  {QUOTING_AGENT_ON &&
                    " Ha azonnali árat szeretnél, indítsd el fent az online árajánló asszisztenst."}
                </p>
              </>
            )}
          </div>
        </form>
      </Reveal>
      <Wave className="text-white" size="sm" variant="drift" layers="single" />
    </section>
  );
}
