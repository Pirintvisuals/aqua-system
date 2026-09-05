import Reveal from "./Reveal";

type Reason = {
  title: string;
  body: string;
  /** Rovid kategoria-cimke, ugyanaz a minta, mint az "Arulkodo jelek"-nel. */
  tag: string;
  icon: React.ReactNode;
};

const REASONS: Reason[] = [
  {
    title: "Gyors kivitelezés",
    tag: "Idő",
    body: "Nem húzzuk hetekig: felmérünk, megtervezünk és egy nap alatt beszereljük az új készüléket, minimális fennakadással.",
    icon: (
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    ),
  },
  {
    title: "Engedélyes, tapasztalt szakemberek",
    tag: "Biztonság",
    body: "Csak hivatalos, szakképesített gázszerelők dolgoznak nálunk. Mindent a szabványoknak megfelelően, dokumentáltan végzünk.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Átlátható, fix árak",
    tag: "Pénz",
    body: "Nincs utólagos ráfizetés vagy rejtett költség. Az ár tartalmazza a szerelést, beüzemelést és az ügyintézést is.",
    icon: (
      <>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>
    ),
  },
  {
    title: "Garancia a munkára és készülékre",
    tag: "Garancia",
    body: "A munka után is elérhetőek vagyunk. Minden kivitelezésre és az új gázkészülékre is hivatalos garanciát adunk.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </>
    ),
  },
  {
    title: "Modern, energiatakarékos megoldások",
    tag: "Rezsi",
    body: "Korszerű gázkészülékeket ajánlunk, amelyek kevesebbet fogyasztanak és stabilabb teljesítményt adnak – alacsonyabb rezsi, biztonságosabb működés.",
    icon: (
      <path d="M9 21h6M10 21c0-3-4-4-4-9a6 6 0 1 1 12 0c0 5-4 6-4 9" />
    ),
  },
  {
    title: "Teljes felszereléssel érkezünk",
    tag: "Idő",
    body: "Minden szükséges szerszám, anyag és műszer nálunk van, így nincs felesleges kör és nincs csúszás – még aznap üzemel az új készülék.",
    icon: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-2.1z" />
      </>
    ),
  },
];

/* A cimkek szinei: az "Arulkodo jelek" szekcio mintajara. */
const TAG_STYLE: Record<string, string> = {
  "Idő": "bg-sky text-brand",
  Biztonság: "bg-rose-50 text-rose-700",
  Pénz: "bg-copper-soft text-copper",
  Garancia: "bg-emerald-50 text-emerald-700",
  Rezsi: "bg-copper-soft text-copper",
};

export default function WhyUs() {
  return (
    <section id="miert-mi" className="scroll-mt-24 bg-sky/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-copper">
            Miért minket
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Hat dolog, amiért visszahívnak minket
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Kettő közülük biztonsági kérdés, a többi inkább arról szól, hogy
            ne érjen meglepetés. Ötven év alatt nagyjából ez a hat dolog az,
            amit a végén mindenki szóvá tesz.
          </p>
        </div>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sky-200 bg-sky-200 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.title} className="group bg-white p-7">
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    TAG_STYLE[r.tag] ?? "bg-sky text-brand"
                  }`}
                >
                  {r.tag}
                </span>
                <span className="text-brand transition-transform duration-200 group-hover:-translate-y-0.5">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {r.icon}
                  </svg>
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {r.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {r.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
