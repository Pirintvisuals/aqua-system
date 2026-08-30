import Reveal from "./Reveal";

type Reason = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const REASONS: Reason[] = [
  {
    title: "Gyors kivitelezés",
    body: "Nem húzzuk hetekig: felmérünk, megtervezünk és egy nap alatt beszereljük az új készüléket, minimális fennakadással.",
    icon: (
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    ),
  },
  {
    title: "Engedélyes, tapasztalt szakemberek",
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
    body: "Korszerű gázkészülékeket ajánlunk, amelyek kevesebbet fogyasztanak és stabilabb teljesítményt adnak – alacsonyabb rezsi, biztonságosabb működés.",
    icon: (
      <path d="M9 21h6M10 21c0-3-4-4-4-9a6 6 0 1 1 12 0c0 5-4 6-4 9" />
    ),
  },
  {
    title: "Teljes felszereléssel érkezünk",
    body: "Minden szükséges szerszám, anyag és műszer nálunk van, így nincs felesleges kör és nincs csúszás – még aznap üzemel az új készülék.",
    icon: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-2.1z" />
      </>
    ),
  },
];

export default function WhyUs() {
  return (
    <section id="miert-mi" className="scroll-mt-24 bg-sky/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Miért minket válassz?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Ha gázkészülékről van szó, a biztonság és a gyorsaság a legfontosabb.
            Azért dolgozunk, hogy a csere gördülékenyen, átláthatóan és egyetlen
            nap alatt megtörténjen – felesleges stressz nélkül.
          </p>
        </div>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="group rounded-2xl border border-sky-200 bg-white p-7 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-[0_30px_55px_-30px_rgba(15,42,94,0.5)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {r.icon}
                </svg>
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
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
