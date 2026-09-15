import Image from "next-image-export-optimizer";
import Link from "next/link";
import logo from "../assets/logo.png";
import szechenyiBanner from "../assets/palyazat/szechenyi-terv-plusz.jpg";
import { CHATBOT_URL, PHONE_DISPLAY, PHONE_HREF } from "../lib/links";
import { BUSINESS } from "../lib/site";

const EMAIL = BUSINESS.email;

const LINKS = [
  { label: "Azonnali árajánlat", href: CHATBOT_URL },
  { label: "Szolgáltatásaink", href: "/szolgaltatasok" },
  { label: "Kell-e új kazán?", href: "/kell-e-uj-kazan" },
  { label: "Munkáink", href: "/munkaink" },
  { label: "Rólunk", href: "/rolunk" },
  { label: "Kapcsolat", href: "/kapcsolat" },
];

export default function Footer() {
  return (
    <footer className="border-t border-sky-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src={logo}
              alt="Aqua System Épületgépészet"
              sizes="150px"
              className="h-16 w-auto sm:h-20"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              Egynapos, teljes körű gázkészülék csere – gyorsan, biztonságosan és
              kiszámítható áron. Ötven éve, családi vállalkozásként.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              Oldalak
            </h3>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-soft transition-colors hover:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              Kapcsolat
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className="text-ink-soft transition-colors hover:text-brand">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={PHONE_HREF} className="font-semibold text-ink transition-colors hover:text-brand">
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Cégadatok - gázmunkánál ez nem formalitás. A látogató ebből
            látja, hogy valódi, ellenőrizhető céggel áll szemben, nem egy
            névtelen landing page-dzsel. */}
        <section
          aria-labelledby="cegadatok"
          className="mt-12 rounded-2xl border border-sky-200 bg-sky/30 p-6"
        >
          <h3
            id="cegadatok"
            className="font-display text-sm font-bold uppercase tracking-wide text-ink"
          >
            Cégadatok
          </h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                Cégnév
              </dt>
              <dd className="mt-1 text-sm leading-snug text-ink">
                {BUSINESS.legalName}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                Székhely
              </dt>
              <dd className="mt-1 text-sm leading-snug text-ink">
                {BUSINESS.address.postalCode} {BUSINESS.address.addressLocality},{" "}
                {BUSINESS.address.streetAddress}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                Cégjegyzékszám
              </dt>
              <dd className="mt-1 text-sm tabular-nums text-ink">
                {BUSINESS.registration.companyNumber}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                Adószám
              </dt>
              <dd className="mt-1 text-sm tabular-nums text-ink">
                {BUSINESS.registration.taxNumber}
              </dd>
            </div>
          </dl>
        </section>

        {/* Pályázati infoblokk - minden oldalon látszik (a főoldalon is),
            és a projekt aloldalára visz. */}
        <Link
          href="/aquashield-control-projekt"
          className="mt-8 block w-full max-w-sm overflow-hidden rounded-xl border border-sky-200 bg-white transition-shadow hover:shadow-md"
        >
          <Image
            src={szechenyiBanner}
            alt="Széchenyi Terv Plusz – Az Európai Unió társfinanszírozásával. Tovább a projekt oldalára"
            sizes="384px"
            className="h-auto w-full"
          />
        </Link>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-sky-200 pt-6 text-sm text-ink-soft sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Aqua System Service Kft. Minden jog fenntartva.</p>
          <p>Egynapos gázkészülék csere · Budapest és agglomeráció</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-soft">
          <Link href="/adatkezelesi-tajekoztato" className="transition-colors hover:text-brand">
            Adatkezelési tájékoztató
          </Link>
          <Link href="/aszf" className="transition-colors hover:text-brand">
            ÁSZF
          </Link>
          <Link href="/impresszum" className="transition-colors hover:text-brand">
            Impresszum
          </Link>
          <Link href="/aquashield-control-projekt" className="transition-colors hover:text-brand">
            Uniós pályázat
          </Link>
        </div>
      </div>
    </footer>
  );
}
