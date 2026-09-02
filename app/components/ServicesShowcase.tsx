import Reveal from "./Reveal";

/* ------------------------------------------------------------------ *
 *  Szolgáltatásaink — kártyás felsorolás, kártyánként egy képhellyel.
 *
 *  A kép EGYELŐRE ÜRES: minden kártya tetején egy placeholder van. Ha
 *  megvan a fotó, tedd az `app/assets/`-be, importáld, és cseréld a
 *  placeholdert egy <Image src={...} .../>-re (lásd a lenti megjegyzést).
 * ------------------------------------------------------------------ */

type Service = {
  title: string;
  body: string;
  // image?: StaticImageData;  // <- ide jön majd a fotó, ha megvan
};

const SERVICES: Service[] = [
  {
    title: "Gázkészülék csere",
    body: "Régi, elavult kazán vagy vízmelegítő cseréje korszerű, energiatakarékos készülékre – egyetlen munkanap alatt.",
  },
  {
    title: "Kazán karbantartás",
    body: "Éves felülvizsgálat és tisztítás, hogy a készülék biztonságosan, alacsony fogyasztással működjön a fűtési szezonban is.",
  },
  {
    title: "Vízmelegítő és bojler",
    body: "Átfolyós vízmelegítők és tárolós bojlerek szakszerű cseréje, bekötése – gyorsan, tiszta munkával.",
  },
  {
    title: "Fűtéskorszerűsítés",
    body: "Radiátorcsere, termosztatikus szelepek, fűtésrendszer optimalizálás – kényelmesebb hőérzet, kisebb rezsi.",
  },
  {
    title: "Gázszerelés",
    body: "Új gázhálózat kiépítése, bővítés és átalakítás, teljes ügyintézéssel és a szabványoknak megfelelő dokumentációval.",
  },
  {
    title: "Hibaelhárítás",
    body: "Nem indul a kazán, vagy hibakódot ír ki? Gyors bevizsgálás és javítás, hogy mielőbb újra meleg legyen.",
  },
];

export default function ServicesShowcase() {
  return (
    <section id="kinalat" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            Szolgáltatásaink
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Amiben segíteni tudunk
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            A gázkészülék cserén túl a fűtésrendszer teljes életciklusában
            mellettünk állhatsz – felméréstől a karbantartáson át a
            hibaelhárításig.
          </p>
        </div>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-[0_30px_55px_-30px_rgba(15,42,94,0.5)]"
            >
              {/* KÉPHELY — egyelőre üres. Cseréld le egy <Image ... />-re,
                  ha megvan a fotó (aspect-[4/3], object-cover). */}
              <div className="relative flex aspect-[4/3] items-center justify-center bg-sky/50">
                <svg className="h-10 w-10 text-brand/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="sr-only">Kép hamarosan</span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
