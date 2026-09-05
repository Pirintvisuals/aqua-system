/* ------------------------------------------------------------------ *
 *  Hullám-átmenet két szekció között.
 *
 *  A korábbi pont- és tervrajzrács géppel rajzolt, ügynökségi textúra
 *  volt. Ez helyette a logó saját hullámmotívumát viszi tovább: a
 *  szekcióhatárok nem éles vonalak, hanem egymásra rétegzett vízfelület.
 *
 *  Használat: a szekció ALJÁRA teszed, és a `className`-ben a KÖVETKEZŐ
 *  szekció alapszínét adod meg szövegszínként, mert a kitöltés
 *  `currentColor`:
 *
 *    <section className="relative bg-white">
 *      ...
 *      <Wave className="text-sky/40" />
 *    </section>
 *    <section className="bg-sky/40">...</section>
 *
 *  A `position="top"` ugyanez fordítva, ha a felső szekció alapszínét
 *  kell átemelni. Tisztán dekoratív, ezért `aria-hidden`.
 * ------------------------------------------------------------------ */

type Props = {
  /** A szekció melyik szélére kerül. Alapból az aljára. */
  position?: "bottom" | "top";
  /** Ide a SZOMSZÉD szekció alapszíne kerül szövegszínként. */
  className?: string;
  /** Magasság. Alapból közepes; a nagyobb hullám nyugodtabb ritmusú. */
  size?: "sm" | "md" | "lg";
  /** Tükrözés, hogy két egymás utáni hullám ne legyen egyforma. */
  flip?: boolean;
};

const SIZE = {
  sm: "h-8 sm:h-12 lg:h-16",
  md: "h-12 sm:h-20 lg:h-28",
  lg: "h-16 sm:h-28 lg:h-40",
};

export default function Wave({
  position = "bottom",
  className = "text-white",
  size = "md",
  flip = false,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 ${
        position === "bottom" ? "bottom-0" : "top-0 rotate-180"
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        fill="none"
        className={`block w-full ${SIZE[size]} ${flip ? "-scale-x-100" : ""}`}
      >
        {/* Két halvány réteg a mélységért, majd a záró, tömör hullám. */}
        <path
          d="M0 78 C 260 22 470 116 720 76 C 970 36 1180 8 1440 58 L1440 140 L0 140 Z"
          fill="currentColor"
          opacity="0.35"
        />
        <path
          d="M0 96 C 240 48 500 130 760 94 C 1020 58 1220 44 1440 84 L1440 140 L0 140 Z"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M0 116 C 280 76 520 140 780 112 C 1040 84 1230 78 1440 106 L1440 140 L0 140 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
