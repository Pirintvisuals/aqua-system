"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BUSINESS } from "../lib/site";
import { LOCATIONS } from "../lib/locations";
import { PHONE_DISPLAY, PHONE_HREF } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  "KIMEGYÜNK HOZZÁD?" - település-ellenőrző.
 *
 *  A leggyakoribb néma kifogás nem az ár, hanem az, hogy "biztos nem
 *  jönnek ki ide". Erre eddig csak egy általános mondat válaszolt
 *  ("Budapest és agglomerációja"). Itt a látogató beírja a saját
 *  települését, és konkrét választ kap.
 *
 *  Három kimenet van, és MINDHÁROM visz tovább valahova:
 *    - benne van a listában  -> igen, és ha van saját oldala, oda vezet
 *    - nem találjuk          -> nem "nem", hanem "hívj fel, megnézzük"
 *    - üres mező             -> a lista magától is olvasható
 *
 *  Ékezetre és kisbetűre érzéketlen az egyeztetés, mert senki nem fogja
 *  ékezethelyesen beírni a saját faluját egy telefonon.
 * ------------------------------------------------------------------ */

/** "Törökbálint" -> "torokbalint", hogy az ékezet ne számítson. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/* A "Budapest agglomerációja" gyűjtőnév, nem település: a keresőből
   kihagyjuk, különben találatnak látszana. */
const TOWNS = BUSINESS.areaServed.filter((t) => !t.includes("agglomeráció"));

export default function AreaChecker() {
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const needle = normalize(trimmed);

  const matches = useMemo(() => {
    if (needle.length < 2) return [];
    return TOWNS.filter((t) => normalize(t).includes(needle));
  }, [needle]);

  const hit = matches[0];
  const page = hit ? LOCATIONS.find((l) => l.name === hit) : undefined;
  const searched = needle.length >= 2;

  return (
    <div className="rounded-2xl border border-sky-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)] sm:p-8">
      <h3 className="font-display text-xl font-bold text-ink">
        Kimegyünk hozzád?
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
        Írd be a településed nevét, és megmondjuk. Budapesten és az
        agglomerációban dolgozunk.
      </p>

      <label htmlFor="area-input" className="sr-only">
        Település neve
      </label>
      <input
        id="area-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Például: Érd"
        autoComplete="address-level2"
        className="mt-5 w-full rounded-xl border border-sky-200 bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors duration-200 placeholder:text-ink-soft/70 focus:border-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      />

      <div aria-live="polite" className="mt-4">
        {searched && hit && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="flex items-start gap-2.5 font-semibold text-emerald-900">
              <svg
                className="mt-0.5 h-5 w-5 flex-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Igen, {hit} a törzsterületünk része.
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-emerald-900/80">
              {page
                ? "Innen valós ügyfélvéleményeink is vannak."
                : "A felmérés és a csere között sem kell hetekig várni."}
            </p>
            {page && (
              <Link
                href={`/kazancsere/${page.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-900 underline-offset-2 hover:underline"
              >
                Kazáncsere {page.inName}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            )}
          </div>
        )}

        {searched && !hit && (
          <div className="rounded-xl border border-sky-200 bg-sky/50 p-4">
            <p className="font-semibold text-ink">
              Ez a település nincs a listánkban, de ettől még lehet, hogy
              kimegyünk.
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              A környéket ismerjük, és nagyobb munkánál távolabbra is
              elmegyünk. Egy telefon alatt kiderül.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-2 hover:underline"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-sky-200 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Ahol rendszeresen dolgozunk
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {TOWNS.map((t) => (
            <li
              key={t}
              className="rounded-full bg-sky px-3 py-1 text-xs font-semibold text-brand"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
