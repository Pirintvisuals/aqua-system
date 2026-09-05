import Wave, { type WaveVariant } from "./Wave";

/* ------------------------------------------------------------------ *
 *  Átmenet KÉT SZEKCIÓ KÖZÉ.
 *
 *  A Wave-et magukba a szekciókba is be lehetne tenni, de a szekciók
 *  közös komponensek, és több oldalon más-más szín jön utánuk. Ezért a
 *  főoldalon inkább közéjük tesszük ezt a sávot: megkapja az ELŐZŐ
 *  szekció alapszínét háttérnek, és a KÖVETKEZŐ szekció színével rajzol
 *  hullámot. Így egyik komponenshez sem kell hozzányúlni.
 *
 *    <Testimonials />                       (bg-sky/30)
 *    <WaveBand from="bg-sky/30" to="text-white" />
 *    <Services />                           (fehér)
 * ------------------------------------------------------------------ */

const SIZE = {
  sm: "h-8 sm:h-12 lg:h-16",
  md: "h-12 sm:h-20 lg:h-28",
  lg: "h-16 sm:h-28 lg:h-40",
};

type Props = {
  /** Az előző szekció alapszíne, háttérként. */
  from: string;
  /** A következő szekció alapszíne, szövegszínként a hullámhoz. */
  to: string;
  /** Alapból `sm`: a szekciók sajat paddingja mellett ennel tobb ures ter lesz. */
  size?: "sm" | "md" | "lg";
  variant?: WaveVariant;
  flip?: boolean;
};

export default function WaveBand({
  from,
  to,
  size = "sm",
  variant = "swell",
  flip = false,
}: Props) {
  return (
    <div className={`relative ${from} ${SIZE[size]}`} aria-hidden="true">
      <Wave
        className={to}
        size={size}
        variant={variant}
        flip={flip}
        layers="single"
      />
    </div>
  );
}
