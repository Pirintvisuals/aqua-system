import Image from "next/image";
import Reveal from "./Reveal";
import { CHATBOT_URL } from "../lib/links";
import type { Service } from "../lib/services";

/* ------------------------------------------------------------------ *
 *  Egy szolgáltatás részletes blokkja. Váltakozó elrendezés: a páros
 *  sorszámúaknál a fotó jobbra, a páratlanoknál balra kerül.
 *
 *  Ha a szolgáltatáshoz nincs saját munkafotó (`photo: null`), rajzolt
 *  illusztrációt teszünk a helyére - soha nem másik szolgáltatás
 *  fotóját.
 * ------------------------------------------------------------------ */

function BadgeIcon({ name }: { name: Service["badge"]["icon"] }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  if (name === "wrench") {
    return (
      <svg {...common}>
        <path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3z" />
        <path d="M14.7 6.3 18 3l3 3-3.3 3.3" />
      </svg>
    );
  }
  if (name === "leaf") {
    return (
      <svg {...common}>
        <path d="M20 4c0 9-5.5 14-14 14H4c0-9 5.5-14 14-14z" />
        <path d="M4 20c3-6 7-9 12-11" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* Rajzolt hőszivattyú - kültéri egység, hőleadás a ház felé.
   Addig áll itt, amíg nincs saját fotónk egy elkészült telepítésről. */
function HeatPumpIllustration() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-sky via-white to-sky/60 p-8">
      <svg
        viewBox="0 0 320 260"
        className="relative w-full max-w-sm"
        fill="none"
        role="img"
        aria-label="Levegő-víz hőszivattyú kültéri egysége, amely hőt ad át a háznak"
      >
        {/* ház */}
        <path
          d="M186 118 248 70l62 48v96a6 6 0 0 1-6 6h-112a6 6 0 0 1-6-6z"
          fill="#ffffff"
          stroke="#2b5fd0"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M176 122 248 66l72 56" stroke="#0f2a5e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="228" y="168" width="40" height="52" rx="3" fill="#eaf3ff" stroke="#2b5fd0" strokeWidth="2.5" />
        <rect x="206" y="132" width="26" height="24" rx="3" fill="#eaf3ff" stroke="#2b5fd0" strokeWidth="2.5" />
        <rect x="264" y="132" width="26" height="24" rx="3" fill="#eaf3ff" stroke="#2b5fd0" strokeWidth="2.5" />

        {/* kültéri egység */}
        <rect x="14" y="104" width="118" height="94" rx="10" fill="#ffffff" stroke="#0f2a5e" strokeWidth="3.5" />
        <rect x="14" y="104" width="118" height="20" rx="10" fill="#0f2a5e" />
        <circle cx="73" cy="156" r="30" fill="#eaf3ff" stroke="#2b5fd0" strokeWidth="3" />
        {/* ventilátorlapátok */}
        <g stroke="#2b5fd0" strokeWidth="3" strokeLinecap="round">
          <path d="M73 156c0-14 6-22 16-24" />
          <path d="M73 156c12 7 14 17 9 26" />
          <path d="M73 156c-12 7-23 4-28-4" />
        </g>
        <circle cx="73" cy="156" r="5.5" fill="#0f2a5e" />
        {/* lábak */}
        <path d="M34 198v16M112 198v16" stroke="#0f2a5e" strokeWidth="3.5" strokeLinecap="round" />

        {/* hőátadás a ház felé */}
        <g stroke="#7fc4e8" strokeWidth="4" strokeLinecap="round">
          <path d="M142 128c8-7 16 7 24 0" />
          <path d="M142 150c8-7 16 7 24 0" />
          <path d="M142 172c8-7 16 7 24 0" />
        </g>

        {/* talaj */}
        <path d="M8 226h304" stroke="#d6e6ff" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function ServiceSection({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  // Páratlan sorszám → a fotó a szövegtől balra (desktopon).
  const flipped = index % 2 === 1;

  return (
    <section
      id={service.slug}
      className={`relative isolate overflow-hidden scroll-mt-44 py-20 lg:py-28 ${
        flipped ? "bg-water" : ""
      }`}
    >
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* SZÖVEG */}
        <div className={flipped ? "lg:order-2" : undefined}>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-cta font-display text-sm font-bold text-white tabular-nums">
              {index + 1}
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Szolgáltatás
            </span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {service.heading}
          </h2>

          {service.body.map((p) => (
            <p key={p} className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}

          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky text-brand">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>

          {/* Kiemelt tudnivaló - forrásmegjelöléssel, hogy ellenőrizhető
              legyen. Garanciafeltételt sosem állítunk forrás nélkül. */}
          {service.note && (
            <aside className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 9v4M12 17h.01" />
                    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {service.note.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {service.note.body}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    {service.note.disclaimer}{" "}
                    <a
                      href={service.note.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand underline-offset-2 hover:underline"
                    >
                      {service.note.sourceLabel}
                    </a>
                  </p>
                </div>
              </div>
            </aside>
          )}

          <a
            href={CHATBOT_URL}
            className="group mt-9 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
          >
            Árajánlat erre a munkára
            <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        {/* FOTÓ vagy ILLUSZTRÁCIÓ */}
        <div className={`relative ${flipped ? "lg:order-1" : ""}`}>
          <div
            className={`relative overflow-hidden rounded-3xl border border-sky-200 shadow-[0_40px_80px_-30px_rgba(15,42,94,0.45)] ${
              service.orientation === "portrait"
                ? "mx-auto aspect-[4/5] max-w-md"
                : "aspect-[4/3]"
            }`}
          >
            {service.photo ? (
              <Image
                src={service.photo}
                alt={service.alt}
                placeholder="blur"
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <HeatPumpIllustration />
            )}
          </div>

          {/* lebegő címke - ugyanaz a motívum, mint a főoldali Hero-n */}
          <div
            className={`absolute -bottom-5 flex items-center gap-3 rounded-2xl border border-sky-200 bg-white/90 px-5 py-3 shadow-[0_18px_40px_-18px_rgba(15,42,94,0.4)] backdrop-blur ${
              flipped ? "right-6" : "left-6"
            }`}
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-sky text-brand">
              <BadgeIcon name={service.badge.icon} />
            </span>
            <span className="text-sm font-semibold text-ink">
              {service.badge.label}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
