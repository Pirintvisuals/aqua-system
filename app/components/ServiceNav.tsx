"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "../lib/services";

/* ------------------------------------------------------------------ *
 *  Ragadós szolgáltatás-navigáció.
 *
 *  A négy szekciót figyeli, és kiemeli azt, amelyik épp a képernyőn
 *  van. Egyben ugrómenü is. Mobilon vízszintesen görgethető pill-sáv,
 *  desktopon számozott sor - mindkettő a fejléc alá tapad.
 *
 *  A `scroll-mt-*` a szekciókon gondoskodik arról, hogy az ugrás után
 *  ne bújjon a cím a fejléc mögé (Navbar h-20 + ez a sáv).
 * ------------------------------------------------------------------ */

export default function ServiceNav() {
  const [active, setActive] = useState(SERVICES[0].slug);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const getSections = () =>
      SERVICES.map((s) => document.getElementById(s.slug)).filter(
        (el): el is HTMLElement => el !== null,
      );

    // Pozíció alapú kiemelés IntersectionObserver helyett: a megfigyelő
    // sávból kicsúszva (pl. az oldal tetején) az utóbbi beragadt volna az
    // utoljára látott szekción. Így mindig van értelmes aktív elem.
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = getSections();
      if (sections.length === 0) return;

      // A fejléc + ez a sáv alatti első képpontsor a "olvasási vonal".
      const line = window.scrollY + 200;

      // Az oldal alján mindig az utolsó szekció legyen aktív, különben a
      // hosszú lábléc miatt sosem érnénk el.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 120;
      if (atBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0].id;
      for (const el of sections) {
        if (el.offsetTop <= line) current = el.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mobilon görgessük láthatóba az aktív pillt.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const left = el.offsetLeft - (list.clientWidth - el.clientWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Szolgáltatások"
      className="sticky top-20 z-40 border-b border-sky-200 bg-white/85 backdrop-blur-md"
    >
      <ul
        ref={listRef}
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-3"
      >
        {SERVICES.map((s, i) => {
          const isActive = active === s.slug;
          return (
            <li key={s.slug} className="flex-none">
              <a
                href={`#${s.slug}`}
                data-slug={s.slug}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  isActive
                    ? "border-brand bg-brand text-white"
                    : "border-sky-200 bg-white text-ink-soft hover:border-brand-light/60 hover:text-brand"
                }`}
              >
                <span
                  className={`flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] font-bold tabular-nums transition-colors duration-200 ${
                    isActive ? "bg-white/20 text-white" : "bg-sky text-brand"
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
