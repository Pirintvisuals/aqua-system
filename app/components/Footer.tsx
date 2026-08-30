import Image from "next/image";
import logo from "../assets/logo.png";
import { CHATBOT_URL } from "../lib/links";

const EMAIL = "keszulekcsere@aqua-system.hu";
const PHONE_DISPLAY = "(06 20) 399 0093";
const PHONE_HREF = "tel:+36203990093";

const LINKS = [
  { label: "Azonnali árajánlat", href: CHATBOT_URL },
  { label: "Szolgáltatás", href: "#szolgaltatas" },
  { label: "Miért mi", href: "#miert-mi" },
  { label: "Kazán kalkulátor", href: "#kalkulator" },
  { label: "Folyamat", href: "#folyamat" },
  { label: "Rólunk", href: "#rolunk" },
  { label: "GYIK", href: "#gyik" },
];

export default function Footer() {
  return (
    <footer className="border-t border-sky-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src={logo} alt="Aqua System Épületgépészet" className="h-12 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              Egynapos, teljes körű gázkészülék csere – gyorsan, biztonságosan és
              kiszámítható áron. Majdnem 50 év épületgépészeti tapasztalattal.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              Oldalak
            </h3>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-ink-soft transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
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

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-sky-200 pt-6 text-sm text-ink-soft sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Aqua System Service Kft. Minden jog fenntartva.</p>
          <p>Egynapos gázkészülék csere · Budapest és agglomeráció</p>
        </div>
      </div>
    </footer>
  );
}
