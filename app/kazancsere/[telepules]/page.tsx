import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../../components/PageHero";
import CtaBand from "../../components/CtaBand";
import Reveal from "../../components/Reveal";
import { LOCATIONS, findLocation } from "../../lib/locations";
import { SERVICES } from "../../lib/services";
import { SITE_URL, BUSINESS } from "../../lib/site";
import gepeszetKazanhaz from "../../assets/munkak/gepeszet-kazanhaz.jpg";

/* ------------------------------------------------------------------ *
 *  Települési oldal: "Kazáncsere Érden" és társai.
 *
 *  Minden oldalon SAJÁT tartalom van: az adott településről érkezett,
 *  valódi ügyfélvélemények teljes szöveggel. Ezért nem sablonoldalak.
 *  Lásd `app/lib/locations.ts` - csak akkor épül oldal, ha van innen
 *  visszajelzésünk.
 * ------------------------------------------------------------------ */

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ telepules: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ telepules: string }>;
}): Promise<Metadata> {
  const { telepules } = await params;
  const loc = findLocation(telepules);
  if (!loc) return {};
  const title = `Kazáncsere ${loc.inName} – egynapos gázkészülék csere`;
  return {
    title,
    description: `Gázkazán csere ${loc.inName} fix áron, jellemzően egyetlen munkanap alatt. Ötven év tapasztalat, valódi helyi ügyfélvéleményekkel.`,
    alternates: { canonical: `/kazancsere/${loc.slug}` },
    openGraph: {
      type: "website",
      locale: "hu_HU",
      url: `/kazancsere/${loc.slug}`,
      title: `${title} – Aqua System Service Kft.`,
      description: `Kazáncsere ${loc.inName}: fix ár, egy nap, teljes ügyintézés.`,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ telepules: string }>;
}) {
  const { telepules } = await params;
  const loc = findLocation(telepules);
  if (!loc) notFound();

  const others = LOCATIONS.filter((l) => l.slug !== loc.slug);
  const years = [...new Set(loc.reviews.map((r) => r.year))].sort();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Kazáncsere ${loc.inName}`,
    serviceType: "Gázkészülék csere",
    url: `${SITE_URL}/kazancsere/${loc.slug}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "City", name: loc.name },
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={`Kazáncsere ${loc.name}`}
        title={`Gázkészülék csere ${loc.inName}`}
        intro={`Fix áron, jellemzően egyetlen munkanap alatt. ${loc.name} a törzsterületünk része, így a felmérés és a csere között sem kell hetekig várni.`}
        image={gepeszetKazanhaz}
        imageAlt="Elkészült kazánház fali kazánnal és melegvíz-tárolóval"
        badge={{
          value: `${loc.reviews.length} vélemény`,
          label: `innen: ${loc.name}`,
        }}
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Kazáncsere", href: "/munkaink" },
          { label: loc.name, href: `/kazancsere/${loc.slug}` },
        ]}
      />

      {/* HELYI VÉLEMÉNYEK: ez az oldal egyedi tartalma. */}
      <section className="relative isolate overflow-hidden py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-blueprint opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Mit írtak a {loc.name.toLowerCase()}i ügyfeleink?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {loc.reviews.length === 1
              ? `Egy aláírt visszajelzés ${loc.inName}, ${years.join(", ")}-ből. Szó szerint, ahogy megírták.`
              : `${loc.reviews.length} aláírt visszajelzés ${loc.inName}, ${years.join(" és ")} közötti munkákról. Szó szerint, ahogy megírták.`}
          </p>

          <Reveal stagger className="mt-10 space-y-6">
            {loc.reviews.map((r, i) => (
              <figure
                key={`${r.name}-${i}`}
                className="border-l-4 border-sky-200 pl-6 sm:pl-8"
              >
                <blockquote className="space-y-2.5 text-lg leading-relaxed text-ink">
                  {r.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </blockquote>
                <figcaption className="mt-3 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{r.name}</span>,{" "}
                  {r.place} · {r.year}
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MIT VÁLLALUNK ITT */}
      <section className="bg-water py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Mivel tudunk segíteni {loc.inName}?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Ugyanaz a csapat jár ki, mint bárhová máshová. A kiszállás nem
              külön tétel: a felmérés után fix árat adunk, írásban.
            </p>
          </div>

          <Reveal stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/szolgaltatasok/${s.slug}`}
                className="group rounded-2xl border border-sky-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-[0_30px_55px_-30px_rgba(15,42,94,0.5)]"
              >
                <h3 className="font-display text-lg font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {s.teaser}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Részletek
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* KÖRNYÉKBELI TELEPÜLÉSEK */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            A környéken is dolgozunk
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Ezekről a településekről szintén van aláírt ügyfélvéleményünk.
            Teljes kiszolgált területünk: {BUSINESS.areaServed.join(", ")}.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/kazancsere/${o.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-light/60 hover:text-brand"
                >
                  Kazáncsere {o.name}
                  <span className="text-xs font-normal text-ink-soft">
                    {o.reviews.length}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Kazáncsere ${loc.inName}: kérj tájékoztató árat`}
        body="Pár kérdés az online árajánló asszisztensünkben, és máris kapsz egy tájékoztató árat. A véglegeset helyszíni felmérés után, írásban adjuk."
      />
    </main>
  );
}
