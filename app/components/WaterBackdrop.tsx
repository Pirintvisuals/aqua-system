/* ------------------------------------------------------------------ *
 *  VÍZ-HÁTTÉR világos szekciókhoz.
 *
 *  A pont- és tervrajzrács helyére lép. Ott a textúra géppel rajzolt és
 *  ügynökségi volt, ráadásul olyan halvány, hogy a szekciók a végén
 *  egyszerűen fehérek lettek. Ez helyette a logó hullámmotívumát viszi
 *  tovább: széles, egymásra csúszó kék sávok, néhány vékony
 *  szintvonallal, mint egy vízfelület metszete.
 *
 *  Két dolgot tart szem előtt:
 *    - a szöveg mögött mindig világos marad (a sávok a szélek felé
 *      sűrűsödnek, középen kifutnak),
 *    - `-z-10`, `pointer-events-none`, `aria-hidden`, tehát sem a
 *      kattintást, sem a felolvasót nem zavarja.
 *
 *  A `variant` azért van, hogy két egymás utáni szekció ne ugyanúgy
 *  nézzen ki. Ugyanaz az elv, mint a Wave átmeneteknél.
 * ------------------------------------------------------------------ */

type Props = {
  /** Melyik rajzolat. Váltogasd szekciónként. */
  variant?: "a" | "b" | "c";
  /** Erősség. A `soft` fehér alapra, a `deep` világoskék sávra való. */
  strength?: "soft" | "deep";
  className?: string;
};

const SHAPES = {
  a: {
    bands: [
      "M0 190 C 320 96 620 268 940 208 C 1160 166 1310 120 1440 92 L1440 0 L0 0 Z",
      "M0 742 C 260 690 520 820 800 780 C 1080 740 1280 690 1440 706 L1440 900 L0 900 Z",
    ],
    lines: [
      "M-40 300 C 300 214 560 380 900 316 C 1140 272 1320 236 1480 218",
      "M-40 356 C 300 272 560 436 900 372 C 1140 328 1320 292 1480 276",
      "M-40 640 C 280 596 540 706 860 668 C 1120 638 1320 596 1480 584",
    ],
  },
  b: {
    bands: [
      "M0 150 C 240 224 520 60 820 128 C 1080 186 1280 150 1440 118 L1440 0 L0 0 Z",
      "M0 806 C 300 742 560 856 840 812 C 1100 772 1300 800 1440 780 L1440 900 L0 900 Z",
    ],
    lines: [
      "M-40 244 C 260 316 540 168 840 232 C 1100 288 1320 262 1480 240",
      "M-40 700 C 260 656 560 760 860 716 C 1120 678 1320 700 1480 682",
    ],
  },
  c: {
    bands: [
      "M0 96 C 200 160 420 132 660 92 C 940 46 1200 128 1440 168 L1440 0 L0 0 Z",
      "M0 700 C 220 776 480 656 760 700 C 1040 744 1260 830 1440 838 L1440 900 L0 900 Z",
    ],
    lines: [
      "M-40 196 C 220 260 460 226 700 188 C 960 146 1240 216 1480 252",
      "M-40 610 C 220 686 480 578 760 620 C 1040 662 1260 736 1480 748",
      "M-40 792 C 240 856 500 760 780 796 C 1060 832 1280 892 1480 900",
    ],
  },
};

export default function WaterBackdrop({
  variant = "a",
  strength = "soft",
  className = "",
}: Props) {
  const shape = SHAPES[variant];
  const deep = strength === "deep";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Széles sávok fent és lent, a szöveg mögül kifutva. */}
        <path
          d={shape.bands[0]}
          fill="#7fc4e8"
          opacity={deep ? 0.3 : 0.2}
        />
        <path
          d={shape.bands[1]}
          fill="#2b5fd0"
          opacity={deep ? 0.12 : 0.08}
        />

        {/* Vékony szintvonalak: ez adja a víz "rajzát" a rács helyett. */}
        {shape.lines.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke="#2b5fd0"
            strokeWidth={i === 0 ? 1.6 : 1.2}
            opacity={deep ? 0.22 : 0.14}
          />
        ))}
      </svg>
    </div>
  );
}
