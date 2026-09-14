import Image from "next-image-export-optimizer";
import Reveal from "./Reveal";

export type TeamContent = {
  title: string;
  intro: string;
  members: readonly { name: string; role: string; photo: string }[];
};

/* A racs duplazott oszlopszamu (4/6/8), minden kartya ket oszlopot fog:
   soronkent 2 / 3 / 4 kartya. Ha az utolso sor nem telik meg, annak elso
   kartyaja fel kartyanyival beljebb indul hianyzo helyenkent, igy az utolso
   sor kozepre kerul. A letszam a szerkesztobol jon, ezert ez szamolt, nem
   kezzel beallitott. Az osztalynevek teljes, statikus stringek, kulonben
   a Tailwind nem talalja meg oket. */
const COL_START = [
  { perRow: 2, start: { 2: "col-start-2" }, auto: "col-start-auto" },
  { perRow: 3, start: { 2: "sm:col-start-2", 3: "sm:col-start-3" }, auto: "sm:col-start-auto" },
  { perRow: 4, start: { 2: "lg:col-start-2", 3: "lg:col-start-3", 4: "lg:col-start-4" }, auto: "lg:col-start-auto" },
] as const;

function centeringClasses(index: number, total: number) {
  const classes: string[] = [];
  let offset = false;
  for (const bp of COL_START) {
    const rest = total % bp.perRow;
    if (rest > 0 && index === total - rest) {
      classes.push(bp.start[(bp.perRow - rest + 1) as keyof typeof bp.start]);
      offset = true;
    } else if (offset) {
      classes.push(bp.auto);
      offset = false;
    }
  }
  return classes.join(" ");
}

export default function Team({ title, intro, members }: TeamContent) {
  return (
    <section
      id="csapat"
      className="relative isolate overflow-clip scroll-mt-36 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>
        </div>

        <Reveal
          stagger
          step={60}
          className="mt-12 grid grid-cols-4 gap-6 sm:grid-cols-6 lg:grid-cols-8"
        >
          {members.map((m, i) => (
            <figure
              key={`${m.name}-${i}`}
              className={`group col-span-2 overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)] ${centeringClasses(i, members.length)}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-sky">
                <Image
                  src={m.photo}
                  alt={`${m.name} – ${m.role}, Aqua System`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="p-4">
                <div className="font-display text-base font-bold text-ink">
                  {m.name}
                </div>
                <div className="mt-0.5 text-sm text-ink-soft">{m.role}</div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
