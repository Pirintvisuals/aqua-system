import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 *  Görgetésre beúszó tartalom - JAVASCRIPT NÉLKÜL.
 *
 *  Korábban ez kliens komponens volt IntersectionObserverrel, és 21
 *  helyen szerepel az oldalon. Ez volt a legnagyobb hidratálandó fa a
 *  főoldalon. Most szerver komponens: csak osztályt tesz a wrapperre,
 *  az animációt a CSS `animation-timeline: view()` intézi.
 *
 *  Fontos: a tartalom alapból LÁTHATÓ. Ahol a böngésző nem támogatja a
 *  görgetésvezérelt animációt (jelenleg pl. a Firefox), ott egyszerűen
 *  nincs animáció - de minden olvasható. Így nem fordulhat elő, hogy
 *  JS nélkül üres marad a fél oldal.
 *
 *  Az API szándékosan változatlan, hogy a 21 hívási hely érintetlen
 *  maradjon.
 * ------------------------------------------------------------------ */

type Props = {
  children: ReactNode;
  className?: string;
  /** A közvetlen gyerekeket lépcsőzetesen úsztatja be. */
  stagger?: boolean;
  /**
   * Korábban a lépcsőzés késleltetése ms-ban. A CSS-es megoldásban
   * minden elem a saját görgetési pozíciójához igazodik, így erre nincs
   * szükség. Csak a hívási helyek kedvéért maradt meg.
   */
  step?: number;
};

export default function Reveal({ children, className, stagger = false }: Props) {
  return (
    <div className={`${stagger ? "reveal-stagger" : "reveal"} ${className ?? ""}`}>
      {children}
    </div>
  );
}
