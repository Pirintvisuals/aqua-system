/* ------------------------------------------------------------------ *
 *  FEJEZETCÍM.
 *
 *  Egy hosszú oldal legnagyobb baja nem a hossz, hanem hogy nem látszik
 *  rajta a szerkezet: szekció szekció után, egyforma súllyal, és az
 *  olvasó nem tudja, hol tart és mi jön még. Ez a sáv választja el a
 *  fejezeteket: nagy sorszám, egy cím, egy mondat arról, mire válaszol
 *  a következő rész.
 *
 *  A fejezeten BELÜLI szekciók ezért szándékosan halkabbak: ott már nem
 *  kell újabb nagy H2, elég egy kis felcím.
 * ------------------------------------------------------------------ */

type Props = {
  /** Ugrópont a fejezet-navigációhoz. */
  id: string;
  /** Sorszám, kétjegyű alakban jelenik meg. */
  step: number;
  title: string;
  intro: string;
  /** Sötét sávon világos szöveggel. */
  tone?: "light" | "dark";
};

export default function Chapter({
  id,
  step,
  title,
  intro,
  tone = "light",
}: Props) {
  const dark = tone === "dark";
  return (
    <div id={id} className="scroll-mt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start gap-5 sm:gap-7">
          <span
            aria-hidden="true"
            className={`font-display text-5xl font-extrabold leading-none tabular-nums sm:text-6xl ${
              dark ? "text-white/25" : "text-brand/25"
            }`}
          >
            {String(step).padStart(2, "0")}
          </span>
          <div className="max-w-2xl">
            <h2
              className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-3 text-lg leading-relaxed ${
                dark ? "text-sky-200" : "text-ink-soft"
              }`}
            >
              {intro}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
