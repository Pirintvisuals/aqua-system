import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../../components/PageHero";
import CtaBand from "../../components/CtaBand";
import Reveal from "../../components/Reveal";
import { SERVICES } from "../../lib/services";
import { SITE_URL } from "../../lib/site";
import { CHATBOT_URL, PHONE_DISPLAY, PHONE_HREF } from "../../lib/links";

/* ------------------------------------------------------------------ *
 *  Egy szolgáltatás önálló aloldala.
 *
 *  Mind a négy oldal ebből az egy sablonból épül, de a tartalom
 *  szolgáltatásonként más (lásd `app/lib/services.ts`). Így nem négy
 *  külön fájlt kell karbantartani, viszont mindegyik valódi, önálló,
 *  indexelhető oldal marad.
 * ------------------------------------------------------------------ */

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.heading,
    description: service.intro,
    alternates: { canonical: `/szolgaltatasok/${service.slug}` },
    openGraph: {
      type: "website",
      locale: "hu_HU",
      url: `/szolgaltatasok/${service.slug}`,
      title: `${service.heading} – Aqua System Service Kft.`,
      description: service.intro,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.heading,
    description: service.intro,
    serviceType: service.title,
    url: `${SITE_URL}/szolgaltatasok/${service.slug}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: "Budapest és agglomerációja",
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Szolgáltatás"
        title={service.heading}
        intro={service.intro}
        image={service.photo ?? undefined}
        imageAlt={service.alt}
        badge={{ value: service.badge.label, label: "amit vállalunk" }}
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Szolgáltatásaink", href: "/szolgaltatasok" },
          { label: service.title, href: `/szolgaltatasok/${service.slug}` },
        ]}
      />

      {/* SÖTÉT TÉNY-SÁV. A világos szekciók közé kontrasztot tesz. */}
      <section className="relative overflow-hidden bg-cta edge-glow">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" />
        <dl className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3">
          {service.facts.map((f) => (
            <div key={f.label}>
              <dt className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {f.value}
              </dt>
              <dd className="mt-1 text-sm font-medium text-sky-200">{f.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* KINEK VALÓ + MIT TARTALMAZ. Ragadós bal oldal asztali nézetben. */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky-aside lg:self-start">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-copper">
              Kinek való
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Akkor keress minket, ha
            </h2>
            <ul className="mt-8 space-y-4">
              {service.who.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-copper-soft text-copper">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-lg leading-relaxed text-ink">{w}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={CHATBOT_URL}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
              >
                Árajánlat erre a munkára
                <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-6 py-4 text-base font-semibold text-ink transition-colors duration-200 hover:bg-sky"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div>
            {service.body.map((p) => (
              <p key={p} className="mb-5 text-lg leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}

            <h3 className="mt-10 font-display text-xl font-bold text-ink">
              Mit tartalmaz
            </h3>
            <Reveal
              stagger
              className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {service.includes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-sky-200 bg-white p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky text-brand">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-[15px] font-medium leading-snug text-ink">
                    {item}
                  </span>
                </div>
              ))}
            </Reveal>

            {service.note && (
              <aside className="mt-8 rounded-2xl border border-copper-line bg-copper-soft p-6">
                <h3 className="font-display text-base font-bold text-ink">
                  {service.note.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {service.note.body}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                  {service.note.disclaimer}{" "}
                  <a
                    href={service.note.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-copper underline-offset-2 hover:underline"
                  >
                    {service.note.sourceLabel}
                  </a>
                </p>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ÍGY ZAJLIK. Számozott, függőleges vonalra fűzött lépések. */}
      <section className="border-y border-sky-200 bg-sky/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Így zajlik
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Lépésről lépésre
            </h2>
          </div>

          <Reveal stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sky-200 bg-sky-200 md:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <div key={step.title} className="relative bg-white p-7">
                <span className="font-display text-5xl font-extrabold leading-none text-sky-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TOVÁBBI SZOLGÁLTATÁSOK */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Ezt is csináljuk
          </h2>
          <Reveal stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/szolgaltatasok/${o.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-[0_30px_55px_-30px_rgba(15,42,94,0.5)]"
              >
                {o.photo && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={o.photo}
                      alt={o.alt}
                      placeholder="blur"
                      sizes="(max-width: 640px) 90vw, 30vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {o.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                    {o.teaser}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Részletek
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
