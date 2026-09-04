import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 *  Aloldalak fejléce - egységes címsáv a /rolunk, /kapcsolat stb.
 *  oldalak tetején. A főoldali Hero-t nem helyettesíti, csak egy
 *  visszafogott, világoskék "page header" a belső oldalakhoz.
 * ------------------------------------------------------------------ */

type Crumb = { label: string; href: string };

type Props = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** Morzsamenü - az utolsó elem az aktuális oldal (link nélkül). */
  breadcrumb?: Crumb[];
};

export default function PageHero({ eyebrow, title, intro, breadcrumb }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-sky-200 bg-sky/40">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Morzsamenü" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
              {breadcrumb.map((c, i) => {
                const last = i === breadcrumb.length - 1;
                return (
                  <li key={c.href} className="flex items-center gap-1.5">
                    {last ? (
                      <span aria-current="page" className="font-medium text-ink">
                        {c.label}
                      </span>
                    ) : (
                      <>
                        <Link href={c.href} className="transition-colors hover:text-brand">
                          {c.label}
                        </Link>
                        <span aria-hidden="true" className="text-sky-200">
                          /
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </span>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
