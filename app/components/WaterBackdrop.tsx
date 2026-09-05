/* ------------------------------------------------------------------ *
 *  VÍZ-HÁTTÉR világos szekciókhoz.
 *
 *  A pont- és tervrajzrács helyére lép. FONTOS tanulság az első
 *  változatból: tömör kitöltésű sávokkal nem szabad dolgozni. A sáv a
 *  szekció tetején és alján éles vízszintes élt kapott, és a végén nem
 *  textúrának látszott, hanem egy odadobott világoskék foltnak.
 *
 *  Ezért itt MINDEN átlátszóba fut ki:
 *    - a sávok függőleges színátmenettel halványodnak el, így nincs él,
 *    - a szintvonalak a két végükön eltűnnek, nem vágja el őket a
 *      szekció széle,
 *    - az egész réteg halvány: a szöveg mögött alig van jelen.
 *
 *  A gradiens-azonosítók a variánsból és az erősségből jönnek. Ha két
 *  azonos beállítású háttér kerül egy oldalra, az azonosító ütközik, de
 *  a definíció szó szerint ugyanaz, tehát a rajz nem változik.
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
    top: "M0 0 L1440 0 L1440 120 C 1180 176 900 236 640 206 C 400 178 180 118 0 150 Z",
    bottom:
      "M0 900 L1440 900 L1440 726 C 1240 690 1040 796 800 780 C 540 762 280 700 0 754 Z",
    lines: [
      "M-60 318 C 300 232 560 398 900 334 C 1140 290 1320 254 1500 236",
      "M-60 648 C 280 604 540 714 860 676 C 1120 646 1320 604 1500 592",
    ],
  },
  b: {
    top: "M0 0 L1440 0 L1440 148 C 1220 196 1000 120 760 156 C 500 196 240 126 0 96 Z",
    bottom:
      "M0 900 L1440 900 L1440 800 C 1260 772 1060 852 800 820 C 540 788 300 736 0 792 Z",
    lines: [
      "M-60 262 C 260 334 540 186 840 250 C 1100 306 1320 280 1500 258",
      "M-60 712 C 260 668 560 772 860 728 C 1120 690 1320 712 1500 694",
    ],
  },
  c: {
    top: "M0 0 L1440 0 L1440 96 C 1200 142 960 74 700 116 C 460 154 220 132 0 84 Z",
    bottom:
      "M0 900 L1440 900 L1440 838 C 1260 830 1040 744 760 700 C 480 656 220 776 0 700 Z",
    lines: [
      "M-60 622 C 220 698 480 590 760 632 C 1040 674 1260 748 1500 760",
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
  const key = `${variant}-${strength}`;
  const bandTop = deep ? 0.17 : 0.12;
  const lineTop = deep ? 0.16 : 0.1;

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
        <defs>
          {/* A felső sáv lefelé, az alsó felfelé halványodik el. Így a
              szekció széleinél nincs vágás, csak elfogy a szín. */}
          <linearGradient id={`w-top-${key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7fc4e8" stopOpacity={bandTop} />
            <stop offset="1" stopColor="#7fc4e8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`w-bottom-${key}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#2b5fd0" stopOpacity={deep ? 0.08 : 0.05} />
            <stop offset="1" stopColor="#2b5fd0" stopOpacity="0" />
          </linearGradient>
          {/* A vonalak a két végükön tűnnek el. */}
          <linearGradient id={`w-line-${key}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2b5fd0" stopOpacity="0" />
            <stop offset="0.35" stopColor="#2b5fd0" stopOpacity={lineTop} />
            <stop offset="0.7" stopColor="#7fc4e8" stopOpacity={lineTop} />
            <stop offset="1" stopColor="#7fc4e8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={shape.top} fill={`url(#w-top-${key})`} />
        <path d={shape.bottom} fill={`url(#w-bottom-${key})`} />

        {shape.lines.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke={`url(#w-line-${key})`}
            strokeWidth={i === 0 ? 1.5 : 1}
          />
        ))}
      </svg>
    </div>
  );
}
