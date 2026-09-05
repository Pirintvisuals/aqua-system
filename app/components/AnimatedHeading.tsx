import type { ElementType } from "react";

/* ------------------------------------------------------------------ *
 *  SZAVANKÉNT BEÚSZÓ CÍMSOR.
 *
 *  A /rolunk idővonalánál kézzel írt szódarabolás állt; ez ugyanaz,
 *  komponensként, hogy minden szekció ugyanazt a mozgást kapja, és ne
 *  kelljen tizenegy helyen ismételni a JSX-et.
 *
 *  A mozgás görgetésvezérelt CSS (`.headline-anim`, lásd globals.css),
 *  tehát nulla JavaScript, és ahol a böngésző nem tudja, ott a cím
 *  egyszerűen ott van. Szerver komponens.
 *
 *  A szavak külön `<span>`-ekbe kerülnek, de szóközzel elválasztva
 *  maradnak, így a szöveg másolható és a felolvasó is egyben olvassa.
 * ------------------------------------------------------------------ */

type Props = {
  children: string;
  /** Milyen elemként rendereljük. Alapból h2. */
  as?: ElementType;
  className?: string;
  /** Két szó közti eltolás mértéke. Kisebb szám = sűrűbb ritmus. */
  step?: number;
};

export default function AnimatedHeading({
  children,
  as: Tag = "h2",
  className = "",
  step = 1,
}: Props) {
  const words = children.split(" ");
  return (
    <Tag className={`headline-anim ${className}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{ "--i": i * step } as React.CSSProperties}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
