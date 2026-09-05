import Reveal from "./Reveal";

type Reason = {
  title: string;
  body: string;
  /** Rovid kategoria-cimke, ugyanaz a minta, mint az "Arulkodo jelek"-nel. */
  tag: string;
  /** Egy konkret, ellenorizheto reszlet. Ez valasztja el a kartyat a
      szokasos "megbizhatoak vagyunk" szovegtol. */
  proof: string;
  icon: React.ReactNode;
};

const REASONS: Reason[] = [
  {
    title: "Egy nap alatt kész",
    tag: "Idő",
    body: "Reggel bontunk, estére meleg van. A felmérés és a fix ár után kap időpontot a munka, és azon a napon a csere végig is megy.",
    proof: "Egyetlen fűtés nélküli este, nem egy hetes építkezés.",
    icon: (
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    ),
  },
  {
    title: "Regisztrált gázszerelők",
    tag: "Biztonság",
    body: "Gázkészüléket Magyarországon csak regisztrált gázszerelő cserélhet, és a munkáról dokumentációnak kell készülnie. Nálunk ez alapfeltétel, nem extra.",
    proof: "Szabálytalan szerelésnél a biztosító is elutasíthatja a kárt.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Fix ár, felmérés után",
    tag: "Pénz",
    body: "Az ajánlat a helyszín ismeretében készül, ezért nem kell utólag módosítani. Benne van a szerelés, a beüzemelés és az ügyintézés is.",
    proof: "Amit a felmérésen megbeszélünk, az lesz a számlán.",
    icon: (
      <>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>
    ),
  },
  {
    title: "Garancia, ami meg is marad",
    tag: "Garancia",
    body: "A kivitelezésre és a beépített készülékre is garanciát adunk. A gyártók kiterjesztett garanciája viszont csak akkor él, ha a készüléket évente felülvizsgálják, ezért erre külön felhívjuk a figyelmet.",
    proof: "A gyári garancia feltétele az éves, szakszerviz által végzett karbantartás.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </>
    ),
  },
  {
    title: "Csak prémium kondenzációs készülék",
    tag: "Rezsi",
    body: "A régi, nyílt égésterű kazánok 75-80 százalék körül dolgoznak, a mai kondenzációs készülékek 92-94 százalékon. Ugyanannyi gázból érezhetően több hő marad a házban.",
    proof: "Nagyjából 15 százaléknyi hatásfok-különbség, minden fűtési szezonban.",
    icon: (
      <path d="M9 21h6M10 21c0-3-4-4-4-9a6 6 0 1 1 12 0c0 5-4 6-4 9" />
    ),
  },
  {
    title: "Teljes felszereléssel érkezünk",
    tag: "Idő",
    body: "Minden szükséges szerszám, anyag és műszer velünk van, ezért nincs félbehagyott munka és nincs második nap. A szerelvényeket is mi hozzuk, nem a boltból kell utánamenni.",
    proof: "Nincs olyan, hogy visszajövünk jövő héten a hiányzó idomért.",
    icon: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-2.1z" />
      </>
    ),
  },
  {
    title: "Kéménybélelés és engedélyek egy kézből",
    tag: "Ügyintézés",
    body: "A kondenzációs kazán égésterméke savas kondenzvizet ad, amit a régi kémény nem visel el: bélelés kell hozzá. Ezt, és a szolgáltatói ügyintézést is mi visszük végig.",
    proof: "Kéménybélelés, tervdokumentáció, beüzemelés, papírok. Neked nem kell szaladgálnod.",
    icon: (
      <>
        <path d="M4 21V8l6-4 6 4v13" />
        <path d="M9 21v-6h4v6" />
        <path d="M19 21V10l-3-2" />
      </>
    ),
  },
  {
    title: "Nem méretezünk túl",
    tag: "Szakértelem",
    body: "A régi kazán kW-ját nem másoljuk le. A hőigényt a ház adja, korszerű szigetelésnél nagyjából 30-50 W négyzetméterenként, és legalább ennyire számít a készülék modulációs tartománya is.",
    proof: "A túlméretezett kazán folyamatosan ki-be kapcsol, ez viszi a gázt és koptatja a készüléket.",
    icon: (
      <>
        <path d="M3 12h4l3 8 4-16 3 8h4" />
      </>
    ),
  },
  {
    title: "A régi készüléket elvisszük",
    tag: "Kényelem",
    body: "A bontás, a régi kazán elszállítása és a takarítás is a munka része. Az utolsó lépés nálunk az, hogy a kazánház rendezettebb legyen, mint ahogy találtuk.",
    proof: "Nem marad a garázsban egy leszerelt kazán, amivel kezdened kell valamit.",
    icon: (
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M6 6l1 14h10l1-14" />
      </>
    ),
  },
];

/* A cimkek szinei: az "Arulkodo jelek" szekcio mintajara. */
const TAG_STYLE: Record<string, string> = {
  "Idő": "bg-sky text-brand",
  Biztonság: "bg-rose-50 text-rose-700",
  Pénz: "bg-sky text-brand",
  Garancia: "bg-emerald-50 text-emerald-700",
  Rezsi: "bg-sky text-brand",
  Ügyintézés: "bg-amber-50 text-amber-700",
  Szakértelem: "bg-sky text-brand",
  Kényelem: "bg-emerald-50 text-emerald-700",
};

export default function WhyUs() {
  return (
    <section id="miert-mi" className="scroll-mt-36 bg-sky/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            Miért minket
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Kilenc dolog, amiért visszahívnak minket
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Van köztük biztonsági kérdés, van, ami a pénzről szól, és van,
            ami egyszerűen arról, hogy ne neked kelljen intézned. Ötven év
            alatt nagyjából ez a kilenc dolog az, amit a végén mindenki
            szóvá tesz.
          </p>
        </div>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sky-200 bg-sky-200 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.title} className="group flex flex-col bg-white p-7">
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
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                {r.body}
              </p>
              <p className="mt-4 flex gap-2 border-t border-sky-200 pt-4 text-[13px] font-medium leading-snug text-ink">
                <svg
                  className="mt-0.5 h-4 w-4 flex-none text-brand"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {r.proof}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
