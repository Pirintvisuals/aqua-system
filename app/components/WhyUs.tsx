import Reveal from "./Reveal";

/* ------------------------------------------------------------------ *
 *  Kilenc ok, HAROM csoportba rendezve.
 *
 *  Korabban minden kartya sajat szinu cimket kapott, es a kilenc kartya
 *  kilenc kulonbozo szint jelentett: ranezesre zajos volt, es a szinnek
 *  nem volt jelentese. Most a szin a CSOPORTHOZ tartozik, a sorrend
 *  pedig fix: biztonsag, ido, penz. Igy a szin informacio, nem dekoracio.
 * ------------------------------------------------------------------ */
type Reason = {
  title: string;
  body: string;
  /** Egy konkret, ellenorizheto reszlet. Ez valasztja el a kartyat a
      szokasos "megbizhatoak vagyunk" szovegtol. */
  proof: string;
  icon: React.ReactNode;
};

type Group = {
  key: string;
  label: string;
  lead: string;
  /** A csoport egyetlen szine: cimke, ikon es a kartya felso csikja. */
  chip: string;
  accent: string;
  icon: React.ReactNode;
  reasons: Reason[];
};

const GROUPS: Group[] = [
  {
    key: "biztonsag",
    label: "Biztonság",
    lead: "Gázzal dolgozunk, itt nincs helye a kompromisszumnak.",
    chip: "bg-rose-100 text-rose-700",
    accent: "bg-rose-400",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    reasons: [
      {
        title: "Regisztrált gázszerelők",
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
        title: "Kéménybélelés és engedélyek egy kézből",
        body: "A kondenzációs kazán égésterméke savas kondenzvizet ad, amit a régi kémény nem visel el: bélelés kell hozzá. Ezt és a szolgáltatói ügyintézést is mi visszük végig.",
        proof: "Bélelés, tervdokumentáció, beüzemelés, papírok. Neked nem kell szaladgálnod.",
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
        body: "A régi kazán kW-ját nem másoljuk le. A hőigényt a ház adja, korszerű szigetelésnél nagyjából 30-50 W négyzetméterenként, és legalább ennyire számít a modulációs tartomány is.",
        proof: "A túlméretezett kazán folyamatosan ki-be kapcsol, ez viszi a gázt.",
        icon: <path d="M3 12h4l3 8 4-16 3 8h4" />,
      },
    ],
  },
  {
    key: "ido",
    label: "Idő",
    lead: "Egy nap, egy csapat, egy hideg este helyett egy sem.",
    chip: "bg-sky text-brand",
    accent: "bg-brand",
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7z" />,
    reasons: [
      {
        title: "Egy nap alatt kész",
        body: "Reggel bontunk, estére meleg van. A felmérés és a fix ár után kap időpontot a munka, és azon a napon a csere végig is megy.",
        proof: "Egyetlen fűtés nélküli nap, nem egy hetes építkezés.",
        icon: <path d="M13 2 3 14h7l-1 8 10-12h-7z" />,
      },
      {
        title: "Teljes felszereléssel érkezünk",
        body: "Minden szerszám, anyag és műszer velünk van, ezért nincs félbehagyott munka és nincs második nap. A szerelvényeket is mi hozzuk.",
        proof: "Nincs olyan, hogy visszajövünk jövő héten a hiányzó idomért.",
        icon: (
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-2.1z" />
        ),
      },
      {
        title: "A régi készüléket elvisszük",
        body: "A bontás, a régi kazán elszállítása és a takarítás is a munka része. Az utolsó lépés nálunk az, hogy a kazánház rendezettebb legyen, mint ahogy találtuk.",
        proof: "Nem marad a garázsban egy leszerelt kazán.",
        icon: (
          <>
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M6 6l1 14h10l1-14" />
          </>
        ),
      },
    ],
  },
  {
    key: "penz",
    label: "Pénz",
    lead: "Fix ár elöl, alacsonyabb rezsi hátul, garancia mindkét végén.",
    chip: "bg-emerald-50 text-emerald-700",
    accent: "bg-emerald-500",
    icon: (
      <>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>
    ),
    reasons: [
      {
        title: "Fix ár, felmérés után",
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
        title: "Csak prémium kondenzációs készülék",
        body: "A régi, nyílt égésterű kazánok 75-80 százalék körül dolgoznak, a mai kondenzációs készülékek 92-94 százalékon. Ugyanannyi gázból több hő marad a házban.",
        proof: "Nagyjából 15 százaléknyi hatásfok-különbség, minden szezonban.",
        icon: <path d="M9 21h6M10 21c0-3-4-4-4-9a6 6 0 1 1 12 0c0 5-4 6-4 9" />,
      },
      {
        title: "Garancia, ami meg is marad",
        body: "A kivitelezésre és a beépített készülékre is garanciát adunk. A gyártók kiterjesztett garanciája viszont csak éves felülvizsgálattal él, ezért erre külön felhívjuk a figyelmet.",
        proof: "A gyári garancia feltétele az éves, szakszerviz által végzett karbantartás.",
        icon: (
          <>
            <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </>
        ),
      },
    ],
  },
];

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
            Három csoportba rendezve: ami a biztonságról szól, ami az időről,
            és ami a pénzről. Ötven év alatt nagyjából ez a kilenc dolog az,
            amit a végén mindenki szóvá tesz.
          </p>
        </div>

        <div className="mt-14 space-y-14">
          {GROUPS.map((group) => (
            <div key={group.key}>
              {/* Csoportfejlec: innentol egy szin visz mindent. */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-sky-200 pb-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold uppercase tracking-wide ${group.chip}`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {group.icon}
                  </svg>
                  {group.label}
                </span>
                <p className="text-[15px] font-medium text-ink-soft">
                  {group.lead}
                </p>
              </div>

              <Reveal
                stagger
                className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3"
              >
                {group.reasons.map((r) => (
                  <div
                    key={r.title}
                    className="flex flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-[0_20px_45px_-32px_rgba(15,42,94,0.45)]"
                  >
                    <span className={`h-1 w-full ${group.accent}`} aria-hidden="true" />
                    <div className="flex flex-1 flex-col p-7">
                      <span className="text-brand">
                        <svg
                          className="h-7 w-7"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {r.icon}
                        </svg>
                      </span>
                      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink">
                        {r.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                        {r.body}
                      </p>
                      <p className="mt-5 flex gap-2 border-t border-sky-200 pt-4 text-[13px] font-medium leading-snug text-ink">
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
                  </div>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
