import Reveal from "./Reveal";

const STEPS = [
  {
    n: "1",
    title: "Kapcsolatfelvétel",
    body: "Írsz vagy felhívsz minket, és átbeszéljük, mire van szükséged. Segítünk kitalálni a legjobb megoldást.",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    n: "2",
    title: "Helyszíni felmérés + ajánlat",
    body: "Kimegyünk hozzád, ránézünk a rendszerre, és ajánlunk egy hozzád illő készüléket. Előre megmondjuk a végső árat.",
    icon: (
      <>
        <path d="M9 11H15M9 15H13" />
        <path d="M8 3H16A2 2 0 0 1 18 5V21L12 18L6 21V5A2 2 0 0 1 8 3Z" />
      </>
    ),
  },
  {
    n: "3",
    title: "Csere egy nap alatt",
    body: "Megérkezünk, elvégezzük a cserét, beállítjuk, és megmutatjuk a használatát. A nap végére már az új készüléket használod.",
    icon: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-2.1z" />
      </>
    ),
  },
];

export default function Process() {
  return (
    <section
      id="folyamat"
      className="relative isolate overflow-hidden scroll-mt-36 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Így történik a készülékcsere
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Három lépés, és kész az új gázkészülék.
          </p>
        </div>

        <Reveal stagger step={120} className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              {/* connector line */}
              {i < STEPS.length - 1 && (
                <span className="absolute left-[4.5rem] top-8 hidden h-px w-[calc(100%-3rem)] bg-sky-200 md:block" />
              )}
              <div className="relative flex flex-col">
                <div className="flex items-center gap-4">
                  <span className="relative flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-white text-brand shadow-[0_18px_40px_-20px_rgba(15,42,94,0.5)] ring-1 ring-sky-200">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {s.icon}
                    </svg>
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-cta text-xs font-bold text-white">
                      {s.n}
                    </span>
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
