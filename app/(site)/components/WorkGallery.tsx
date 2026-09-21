"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next-image-export-optimizer";
import type { StaticImageData } from "next/image";

/* ------------------------------------------------------------------ *
 *  Munkáink galéria - szűrhető rács, kattintásra nagy képpel.
 *
 *  Miért kliens komponens: a szűrés és a nagykép állapota a böngészőben
 *  él. A KÉPEK viszont a szerverről jönnek készen (`items` prop), tehát
 *  JavaScript nélkül is ott a teljes rács a HTML-ben - csak a szűrő és
 *  a nagyítás nem működik. Semmi nem tűnik el.
 *
 *  A nagykép natív <dialog>: a böngésző adja hozzá a modális viselkedést,
 *  a háttér kizárását és az Esc-et, nekünk nem kell fókuszcsapdát írni.
 * ------------------------------------------------------------------ */

export type WorkItem = {
  img: StaticImageData;
  alt: string;
  caption: string;
  /** Melyik szolgáltatáshoz tartozik - ez alapján lehet szűrni. */
  group: string;
};

type Props = { items: WorkItem[] };

const ALL = "Összes";

export default function WorkGallery({ items }: Props) {
  const [filter, setFilter] = useState(ALL);
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  /* Ide térjen vissza a fókusz bezáráskor, hogy billentyűvel se
     veszítse el a helyét, aki eddig jutott a rácsban. */
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const groups = [ALL, ...Array.from(new Set(items.map((i) => i.group)))];
  const shown =
    filter === ALL ? items : items.filter((i) => i.group === filter);

  const current = open === null ? null : shown[open] ?? null;

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpen((prev) => {
        if (prev === null) return prev;
        // Körbeér, hogy a nyilak soha ne legyenek "halottak".
        return (prev + delta + shown.length) % shown.length;
      });
    },
    [shown.length],
  );

  /* A dialógust vezéreljük az állapotból, nem fordítva. A showModal()
     csak akkor hívható, ha még nincs nyitva - különben hibát dob. */
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open !== null && !el.open) el.showModal();
    if (open === null && el.open) el.close();
  }, [open]);

  /* Nyílbillentyűkkel is lehessen lapozni. Az Esc-et a <dialog> intézi,
     azt a close eseményben kapjuk vissza. */
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <>
      {/* SZŰRŐ. Ugyanaz a pill-forma, mint a szolgáltatás-navigációban. */}
      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
        {groups.map((g) => {
          const isActive = filter === g;
          const count =
            g === ALL ? items.length : items.filter((i) => i.group === g).length;
          return (
            <button
              key={g}
              type="button"
              onClick={() => {
                /* A nagykep indexe a szurt listara mutat, ezert szureskor
                   zarjuk - kulonben mas kep jonne fel, mint amire kattintottak. */
                setOpen(null);
                setFilter(g);
              }}
              aria-pressed={isActive}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                isActive
                  ? "border-brand bg-brand text-white"
                  : "border-sky-200 bg-white text-ink-soft hover:border-brand-light/60 hover:text-brand"
              }`}
            >
              {g}
              <span
                className={`text-[11px] font-bold tabular-nums ${
                  isActive ? "text-white/70" : "text-ink-soft/60"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
        {shown.length} kép
        {filter !== ALL ? ` – ${filter}` : ""}. Kattints bármelyikre a
        nagyításhoz.
      </p>

      {/* RÁCS */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((g, i) => (
          <figure
            key={`${g.group}-${g.caption}`}
            className="group relative overflow-hidden rounded-2xl border border-sky-200 bg-white"
          >
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setOpen(i);
              }}
              className="block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <span className="sr-only">
                {g.caption} – nagyítás
              </span>
              <span className="relative block aspect-[4/3] overflow-hidden">
                <Image
                  src={g.img}
                  alt={g.alt}
                  placeholder="blur"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
                aria-hidden="true"
              />
              {/* Nagyító ikon: ettől látszik, hogy a kép kattintható. */}
              <span
                className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.2-3.2M11 8.5v5M8.5 11h5" />
                </svg>
              </span>
            </button>
            <figcaption className="pointer-events-none absolute bottom-0 left-0 p-5 text-base font-semibold text-white drop-shadow">
              {g.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* NAGYKÉP */}
      <dialog
        ref={dialogRef}
        onClose={() => {
          setOpen(null);
          lastTrigger.current?.focus();
        }}
        /* Háttérre kattintás: a <dialog> maga a keret, a ::backdrop
           kattintása is rajta csapódik le, ezért a célpontot nézzük. */
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label={current ? current.caption : "Nagykép"}
        className="max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex h-dvh w-screen flex-col items-center justify-center gap-4 p-4 sm:p-8">
            <div className="relative flex max-h-[78dvh] w-full max-w-5xl items-center justify-center">
              <Image
                src={current.img}
                alt={current.alt}
                placeholder="blur"
                sizes="(max-width: 1024px) 95vw, 1024px"
                className="max-h-[78dvh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>

            <figcaption className="max-w-2xl text-center">
              <p className="font-display text-lg font-bold text-white">
                {current.caption}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-sky-200">
                {current.alt}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
                {current.group} · {(open ?? 0) + 1} / {shown.length}
              </p>
            </figcaption>

            {/* VEZÉRLŐK. Abszolút pozícióban, hogy a kép maradjon a főszereplő. */}
            <button
              type="button"
              onClick={close}
              aria-label="Bezárás"
              className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors duration-200 hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            {shown.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Előző kép"
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors duration-200 hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 6 9 12l6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Következő kép"
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors duration-200 hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
