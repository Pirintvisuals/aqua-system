/* ------------------------------------------------------------------ *
 *  Hullám-átmenet két szekció között.
 *
 *  A korábbi pont- és tervrajzrács géppel rajzolt, ügynökségi textúra
 *  volt. Ez helyette a logó saját hullámmotívumát viszi tovább: a
 *  szekcióhatárok nem éles vonalak, hanem egymásra rétegzett vízfelület.
 *
 *  FONTOS: nem ugyanaz a hullám ismétlődik. Négy különböző rajzolat van
 *  (`variant`), eltérő ritmussal, és mindegyik máshogy néz ki tükrözve
 *  is. Egy oldalon belül soha ne szerepeljen kétszer ugyanaz a variáns
 *  egymás után, mert onnantól megint mintázatnak látszik.
 *
 *  Használat: a szekció ALJÁRA teszed, és a `className`-ben a KÖVETKEZŐ
 *  szekció alapszínét adod meg szövegszínként, mert a kitöltés
 *  `currentColor`:
 *
 *    <section className="relative bg-white">
 *      ...
 *      <Wave variant="swell" className="text-sky/40" />
 *    </section>
 *    <section className="bg-sky/40">...</section>
 *
 *  A `position="top"` ugyanez fordítva. Tisztán dekoratív, ezért
 *  `aria-hidden`.
 * ------------------------------------------------------------------ */

export type WaveVariant = "swell" | "crest" | "ripple" | "drift";

type Props = {
  /** A szekció melyik szélére kerül. Alapból az aljára. */
  position?: "bottom" | "top";
  /** Ide a SZOMSZÉD szekció alapszíne kerül szövegszínként. */
  className?: string;
  /** Magasság. A nagyobb hullám nyugodtabb ritmusú. */
  size?: "sm" | "md" | "lg";
  /** Tükrözés, hogy két egymás utáni hullám ne legyen egyforma. */
  flip?: boolean;
  /** Melyik rajzolat. Lásd a WAVES tömböt. */
  variant?: WaveVariant;
  /**
   * `stack`: három réteg, dekoratív hullámzás (pl. fejléc alján).
   * `single`: egyetlen tiszta él. Két szekció KÖZÖTT mindig ez kell,
   * mert ott a hullám színt vált, és a halvány rétegek csak csíkoznak.
   */
  layers?: "stack" | "single";
};

const SIZE = {
  sm: "h-8 sm:h-12 lg:h-16",
  md: "h-12 sm:h-20 lg:h-28",
  lg: "h-16 sm:h-28 lg:h-40",
};

/* Négy karakter. Minden variáns három rétegből áll: két halvány és egy
   tömör. A rétegek szándékosan nem párhuzamosak, mert a víz sem az. */
const WAVES: Record<WaveVariant, string[]> = {
  /* Hosszú, nyugodt hullámzás. Nagy szekcióhatárokra. */
  swell: [
    "M0 78 C 260 22 470 116 720 76 C 970 36 1180 8 1440 58 L1440 140 L0 140 Z",
    "M0 96 C 240 48 500 130 760 94 C 1020 58 1220 44 1440 84 L1440 140 L0 140 Z",
    "M0 116 C 280 76 520 140 780 112 C 1040 84 1230 78 1440 106 L1440 140 L0 140 Z",
  ],
  /* Egyetlen nagy taréj az egyik oldalon: aszimmetrikus, nem tapétaszerű. */
  crest: [
    "M0 116 C 180 112 330 30 560 34 C 830 39 980 118 1200 104 C 1310 97 1380 78 1440 62 L1440 140 L0 140 Z",
    "M0 126 C 200 124 340 62 570 66 C 840 71 1000 128 1210 118 C 1320 113 1385 100 1440 90 L1440 140 L0 140 Z",
    "M0 134 C 220 133 360 92 580 96 C 850 101 1020 136 1220 130 C 1330 127 1390 118 1440 112 L1440 140 L0 140 Z",
  ],
  /* Sűrűbb, apróbb hullámok: fodrozódás. Kisebb magassághoz illik. */
  ripple: [
    "M0 92 C 120 62 240 118 360 92 C 480 66 600 116 720 92 C 840 68 960 118 1080 94 C 1200 70 1320 112 1440 90 L1440 140 L0 140 Z",
    "M0 108 C 120 84 240 130 360 108 C 480 86 600 128 720 108 C 840 88 960 130 1080 110 C 1200 90 1320 126 1440 108 L1440 140 L0 140 Z",
    "M0 122 C 120 104 240 138 360 122 C 480 106 600 138 720 122 C 840 106 960 138 1080 124 C 1200 110 1320 134 1440 122 L1440 140 L0 140 Z",
  ],
  /* Lassan elsodródó, egyre laposabb vonal. Sötét sávok elé jó. */
  drift: [
    "M0 44 C 300 96 620 20 900 62 C 1120 95 1280 110 1440 96 L1440 140 L0 140 Z",
    "M0 74 C 320 118 640 52 920 88 C 1130 115 1290 122 1440 112 L1440 140 L0 140 Z",
    "M0 104 C 340 134 660 88 940 112 C 1140 129 1300 132 1440 126 L1440 140 L0 140 Z",
  ],
};

export default function Wave({
  position = "bottom",
  className = "text-white",
  size = "md",
  flip = false,
  variant = "swell",
  layers = "stack",
}: Props) {
  const [back, mid, front] = WAVES[variant];
  const single = layers === "single";
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
        {!single && (
          <>
            <path d={back} fill="currentColor" opacity="0.32" />
            <path d={mid} fill="currentColor" opacity="0.58" />
          </>
        )}
        <path d={front} fill="currentColor" />
      </svg>
    </div>
  );
}
