"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  Ragadós fejezet-navigáció.
 *
 *  Ugyanaz a minta, mint a /szolgaltatasok oldal ServiceNav sávja, csak
 *  tetszőleges fejezetlistával. Két dolgot ad: látszik, hány részből áll
 *  az oldal, és látszik, hol tart benne az olvasó.
 *
 *  Pozíció alapú kiemelés, nem IntersectionObserver: a megfigyelő sávból
 *  kicsúszva (oldal teteje, alja) az utóbbi beragadna az utoljára látott
 *  szekción, így viszont mindig van értelmes aktív elem.
 * ------------------------------------------------------------------ */

export type Step = { id: string; label: string };

export default function StepNav({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(steps[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = steps
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => el !== null);
      if (sections.length === 0) return;

      const line = window.scrollY + 220;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 120;
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
  }, [steps]);

  // Mobilon görgessük láthatóba az aktív pillt.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-step="${active}"]`);
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const left = el.offsetLeft - (list.clientWidth - el.clientWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Az oldal fejezetei"
      className="sticky top-20 z-40 border-y border-sky-200 bg-white/85 backdrop-blur-md"
    >
      <ul
        ref={listRef}
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-3"
      >
        {steps.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="flex-none">
              <a
                href={`#${s.id}`}
                data-step={s.id}
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
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
