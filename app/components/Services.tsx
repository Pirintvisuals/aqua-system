import Image from "next/image";
import boilerPhoto from "../assets/munkak/gepeszet-kazanhaz.jpg";
import Reveal from "./Reveal";
import { CHATBOT_URL } from "../lib/links";

const INCLUDED = [
  "Helyszíni felmérés",
  "Készülék kiválasztása",
  "Régi készülék leszerelése",
  "Új készülék beszerelése",
  "Engedélyeztetés",
  "Beüzemelés + dokumentáció",
];

export default function Services() {
  return (
    <section id="szolgaltatas" className="relative isolate overflow-hidden scroll-mt-36 py-16 lg:py-24">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* text */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            Szolgáltatásunk
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Egynapos, teljes körű gázkészülék csere
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            A régi, elavult vagy hibás készüléket gyorsan és biztonságosan
            cseréljük új, korszerű és energiatakarékos berendezésre – mindezt
            egyetlen munkanap alatt. A helyszíni felméréstől a beüzemelésig
            mindent mi intézünk, a legfrissebb előírások szerint, dokumentáltan.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            Nem tudod, hol kezdd? Az{" "}
            <strong className="font-semibold text-ink">
              online árajánló asszisztensünk
            </strong>{" "}
            pár egyszerű kérdés alapján azonnal ad egy tájékoztató árat – hívás
            és várakozás nélkül.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-center gap-3 text-ink">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky text-brand">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={CHATBOT_URL}
            className="group mt-9 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
          >
            Azonnali árajánlat
            <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        {/* photo */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-sky-200 shadow-[0_40px_80px_-30px_rgba(15,42,94,0.45)]">
            <Image
              src={boilerPhoto}
              alt="Elkészült kazánház: fali kazán, melegvíz-tároló és puffertartály bekötve"
              placeholder="blur"
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl border border-sky-200 bg-white/90 px-5 py-3 shadow-[0_18px_40px_-18px_rgba(15,42,94,0.4)] backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky text-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-ink">
              Egyetlen munkanap alatt
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
