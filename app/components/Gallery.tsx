import Image, { type StaticImageData } from "next/image";
import work1 from "../assets/stock/work-1.jpg";
import work2 from "../assets/stock/work-2.jpg";
import work3 from "../assets/stock/work-3.jpg";
import work4 from "../assets/stock/work-4.jpg";
import work5 from "../assets/stock/work-5.jpg";
import Reveal from "./Reveal";

/* Reprezentatív fotók — cseréld saját, valós munkafotókra, ha megvannak. */
const PROJECTS: { city: string; span: string; img: StaticImageData }[] = [
  { city: "Érd", span: "md:col-span-2 md:row-span-2", img: work1 },
  { city: "Tárnok", span: "", img: work2 },
  { city: "Halásztelek", span: "", img: work3 },
  { city: "Diósd", span: "", img: work4 },
  { city: "Budapest", span: "md:col-span-2", img: work5 },
];

export default function Gallery() {
  return (
    <section id="galeria" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Korábbi munkáink
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Néhány helyszín, ahol új, biztonságos gázkészülékre cseréltük a
            régit.
          </p>
        </div>

        <Reveal stagger className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {PROJECTS.map((p) => (
            <div
              key={p.city}
              className={`group relative flex items-end overflow-hidden rounded-2xl border border-sky-200 ${p.span}`}
            >
              <Image
                src={p.img}
                alt={`Gázkészülék csere – ${p.city}`}
                placeholder="blur"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="relative p-5">
                <span className="inline-flex items-center gap-2 text-lg font-bold text-white drop-shadow">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {p.city}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
