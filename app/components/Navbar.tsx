"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { CHATBOT_URL, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

// A hash-linkek "/#…" alakban a főoldal szekcióira mutatnak, így bármelyik
// aloldalról is működnek (nem csak a főoldalon).
const NAV_LINKS = [
  { label: "Szolgáltatásaink", href: "/szolgaltatasok" },
  { label: "Kell-e új kazán?", href: "/kell-e-uj-kazan" },
  { label: "Munkáink", href: "/munkaink" },
  { label: "Rólunk", href: "/rolunk" },
  { label: "Kapcsolat", href: "/kapcsolat" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Aqua System – főoldal">
      <Image
        src={logo}
        alt="Aqua System Épületgépészet"
        priority
        sizes="(max-width: 640px) 170px, 250px"
        className="h-20 w-auto sm:h-24 lg:h-28"
      />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Nyitott mobil menü: Esc zárja, és ne lehessen mögötte görgetni.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-sky-200 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-6 sm:h-28 lg:h-32">
        <Logo />

        {/* desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* right actions */}
        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            aria-label={`Hívás: ${PHONE_DISPLAY}`}
            className="inline-flex h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-ink transition-colors hover:text-brand md:px-0"
          >
            <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="hidden md:inline">{PHONE_DISPLAY}</span>
          </a>

          <a
            href={CHATBOT_URL}
            className="hidden cursor-pointer items-center justify-center rounded-xl bg-cta px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-cta-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta sm:inline-flex"
          >
            Azonnali árajánlat
          </a>

          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-sky-200 text-ink transition-colors duration-200 hover:bg-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile panel */}
      {open && (
        <div className="border-t border-sky-200 bg-white lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink transition-colors hover:bg-sky hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2">
              <a
                href={PHONE_HREF}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-200 px-5 py-3 text-base font-semibold text-ink"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={CHATBOT_URL}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-cta px-5 py-3 text-base font-semibold text-white shadow-sm"
              >
                Azonnali árajánlat
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
