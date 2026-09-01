import Image from "next/image";
import ctaBg from "../assets/stock/cta-heating.jpg";
import Reveal from "./Reveal";
import { CHATBOT_URL, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

export default function TrustBanner() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-cta px-8 py-14 text-white sm:px-14 lg:px-16">
          {/* background photo + navy wash for contrast */}
          <Image
            src={ctaBg}
            alt=""
            aria-hidden="true"
            placeholder="blur"
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cta via-cta/95 to-cta/70" />
          {/* branded wave motif */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 260 C 260 180 440 320 700 260 C 960 200 1080 160 1200 210 L1200 400 L0 400 Z"
              fill="rgba(127,196,232,0.16)"
            />
            <path
              d="M0 320 C 300 260 520 360 820 320 C 1040 290 1120 270 1200 300 L1200 400 L0 400 Z"
              fill="rgba(255,255,255,0.07)"
            />
          </svg>

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Megbízható szolgáltatás
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Végig fogjuk a kezed – az első hívástól a beüzemelésig
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
                Több mint 500 sikeres csere tapasztalatával egyszerűen
                elmagyarázzuk, mit miért csinálunk, mire számíthatsz, és hogyan
                zajlik a csere. Nem siettetünk, nem beszélünk szakzsargonnal, és
                mindig visszahívunk – hogy nyugodtan tudj dönteni. A kezdéshez
                elég pár kérdés az{" "}
                <span className="font-semibold text-white">
                  online árajánló asszisztensünkben
                </span>{" "}
                — pár percen belül megvan a tájékoztató ár.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={CHATBOT_URL}
                className="group inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-cta shadow-lg transition-all duration-200 hover:bg-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Azonnali árajánlat
                <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/40 px-6 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
