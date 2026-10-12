import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import { BUSINESS, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description:
    "Az Aqua System Service Kft. adatkezelési tájékoztatója: milyen adatokat kezelünk, milyen célból, és milyen jogok illetik meg az érintetteket.",
  alternates: { canonical: "/adatkezelesi-tajekoztato" },
  robots: { index: true, follow: true },
};

const UPDATED = "2026. szeptember";

export default function AdatkezelesPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Jogi"
        title="Adatkezelési tájékoztató"
        intro="Ez a tájékoztató bemutatja, milyen személyes adatokat kezelünk a weboldal és az online árajánló asszisztens használata során, milyen célból, és milyen jogok illetik meg Önt ezzel kapcsolatban."
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "Adatkezelési tájékoztató", href: "/adatkezelesi-tajekoztato" },
        ]}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm text-ink-soft">Hatályos: {UPDATED}</p>

          <article className="legal-article mt-6">
            <h2>1. Az adatkezelő adatai</h2>
            <p>
              <strong>{BUSINESS.legalName}</strong>
              <br />
              Székhely: {BUSINESS.address.postalCode} {BUSINESS.address.addressLocality},{" "}
              {BUSINESS.address.streetAddress}
              <br />
              Cégjegyzékszám: {BUSINESS.registration.companyNumber}
              <br />
              Adószám: {BUSINESS.registration.taxNumber}
              <br />
              E-mail: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              <br />
              Telefon: <a href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephone}</a>
            </p>

            <h2>2. A tájékoztató hatálya</h2>
            <p>
              A tájékoztató a {SITE_URL.replace("https://", "")} weboldal
              (a továbbiakban: weboldal) és az azon elérhető online árajánló
              asszisztens használata során megvalósuló adatkezelésekre
              vonatkozik. Az adatkezelés az Európai Parlament és a Tanács (EU)
              2016/679 rendelete (GDPR), valamint az információs
              önrendelkezési jogról és az információszabadságról szóló 2011.
              évi CXII. törvény (Infotv.) rendelkezései szerint történik.
            </p>

            <h2>3. Milyen adatokat kezelünk, és milyen célból</h2>

            <h3>3.1 Kapcsolatfelvételi űrlap</h3>
            <p>
              A weboldal Kapcsolat oldalán található űrlap kitöltésekor
              megadott adatokat (név, elérhetőség – telefonszám vagy e-mail
              cím, munka típusa, helyszín, üzenet, valamint az opcionálisan
              csatolt fotók) az árajánlat-kérés megválaszolása céljából
              kezeljük. Az adatkezelés jogalapja az Ön hozzájárulása (GDPR 6.
              cikk (1) bekezdés a) pont), az elküldés pillanatában.
            </p>
            <div className="legal-box">
              <p>
                Az űrlap jelenleg nem küld adatot szervernek: elküldéskor egy
                előre kitöltött e-mail nyílik meg az Ön saját levelezőjében,
                amelyet Önnek kell elküldenie. Ezért az adatok elsőként a mi
                postafiókunkba (<a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>) érkeznek,
                nem egy külső adatbázisba.
              </p>
            </div>

            <h3>3.2 Telefonos és e-mailes megkeresés</h3>
            <p>
              Ha telefonon vagy e-mailben veszi fel velünk a kapcsolatot, az
              ennek során megadott adatokat (név, elérhetőség, a munkával
              kapcsolatos információk) az Ön megkeresésének megválaszolása és
              – amennyiben megrendelés lesz belőle – a szerződés
              előkészítése céljából kezeljük. Jogalap: a szerződés
              megkötését megelőző lépések megtétele (GDPR 6. cikk (1)
              bekezdés b) pont).
            </p>

            <h3>3.3 Online árajánló asszisztens (chatbot)</h3>
            <p>
              A weboldalon elérhető árajánló asszisztens a beszélgetés során
              megadott adatok (pl. a tervezett munka jellege, helyszín,
              elérhetőség) alapján ad tájékoztató jellegű becslést. A
              beszélgetés célja a gyors, kötelezettségmentes tájékoztatás; a
              becslés nem minősül kötelező érvényű árajánlatnak.
            </p>
            <p>
              Az asszisztens nem használ külső mesterséges intelligencia
              szolgáltatót: a beszélgetésben megadott adatokat nem küldjük
              harmadik félnek. Az árajánlat-kéréssel megadott adatok (név,
              elérhetőség, a munka jellege és helyszíne) az adatkezelő
              ügyfélkezelő (CRM) rendszerébe kerülnek, és ott az
              ajánlatadás céljából kezeljük őket. Jogalap: az Ön
              hozzájárulása, amelyet az adatok megadásával és a beszélgetés
              elküldésével ad meg (GDPR 6. cikk (1) bekezdés a) pont).
              A hozzájárulást bármikor visszavonhatja, ez nem érinti a
              visszavonás előtti adatkezelés jogszerűségét.
            </p>

            <h3>3.4 Technikai adatok</h3>
            <p>
              A weboldal megtekintése során a tárhelyszolgáltató (Websupport
              Magyarország Kft.) a szokásos szerverüzemeltetési naplóadatokat
              (pl. IP-cím, időbélyeg, böngésző típusa) rögzítheti, kizárólag
              a szolgáltatás biztonságos működtetése céljából. Jogalap: az
              adatkezelő jogos érdeke az oldal biztonságos üzemeltetésére
              (GDPR 6. cikk (1) bekezdés f) pont).
            </p>

            <h3>3.5 Látogatottság-mérés</h3>
            <p>
              A weboldal használatáról névtelen statisztikát készítünk a
              PostHog szolgáltatással (PostHog Inc.; az adatok az Európai
              Unión belüli szerveren tárolódnak). Mérjük az oldalmegtekintéseket,
              a telefonszámra, e-mail címre és a gombokra való kattintásokat,
              valamint azt, hogy elindítottak-e egy űrlapot. Az űrlapokba
              beírt tartalmat, szöveget nem rögzítjük, és munkamenet-felvétel
              sem készül.
            </p>
            <p>
              A mérés nem helyez el sütit és semmilyen adatot nem tárol az Ön
              böngészőjében, ezért ehhez nincs szükség süti-hozzájárulásra.
              Célja a weboldal fejlesztése, jogalapja az adatkezelő jogos
              érdeke (GDPR 6. cikk (1) bekezdés f) pont). Ez ellen az
              adatkezelés ellen bármikor tiltakozhat a fenti elérhetőségeken.
            </p>

            <h2>4. Adatmegőrzés</h2>
            <ul>
              <li>
                <strong>Árajánlat-kérés, amelyből nem lett megrendelés:</strong>{" "}
                az adatokat az utolsó kapcsolatfelvételtől számított 12 hónapig
                őrizzük, ezt követően töröljük.
              </li>
              <li>
                <strong>Megrendelés esetén:</strong> a számlákat és a
                számviteli bizonylatokat a számviteli törvény szerint 8 évig,
                a szerződéshez és a garanciához kapcsolódó adatokat a
                garanciális, illetve elévülési idő végéig őrizzük.
              </li>
              <li>
                <strong>Látogatottság-mérés:</strong> a PostHogban tárolt
                névtelen eseményeket legfeljebb 12 hónapig őrizzük.
              </li>
            </ul>
            <p>
              Kérésére az adatokat ennél korábban is töröljük, kivéve, ha
              jogszabály a megőrzésüket előírja.
            </p>

            <h2>5. Adatfeldolgozók, adattovábbítás</h2>
            <p>Az adatok kezelésében a következő szereplők vesznek részt:</p>
            <ul>
              <li>
                <strong>Websupport Magyarország Kft.</strong> (1119 Budapest,
                Fehérvári út 97-99.) – a weboldal tárhelyszolgáltatója.
              </li>
              <li>
                <strong>Vercel Inc.</strong> – az online árajánló asszisztens
                futtatásához használt szerverszolgáltató. Az asszisztensen
                keresztül megadott adatok áthaladnak a szolgáltató
                rendszerén.
              </li>
              <li>
                <strong>PostHog Inc.</strong> – a névtelen látogatottság-mérés
                szolgáltatója (lásd a 3.5 pontot).
              </li>
              <li>
                Az Ön saját e-mail- vagy telefonszolgáltatója – a
                kapcsolatfelvételi űrlap jelenlegi (mailto) működése miatt az
                üzenet az Ön levelezőjén keresztül jut el hozzánk.
              </li>
            </ul>
            <p>
              Adatait harmadik félnek – a fent felsoroltak kivételével –
              nem adjuk át, és nem használjuk fel a megadott céltól eltérő
              célra.
            </p>

            <h2>6. Az Önt megillető jogok</h2>
            <p>A GDPR alapján Ön jogosult:</p>
            <ul>
              <li>tájékoztatást kérni a kezelt adatairól,</li>
              <li>kérni az adatok helyesbítését, ha azok pontatlanok,</li>
              <li>kérni az adatok törlését,</li>
              <li>kérni az adatkezelés korlátozását,</li>
              <li>tiltakozni az adatkezelés ellen,</li>
              <li>
                kérni az általunk kezelt adatok más adatkezelőhöz történő
                továbbítását (adathordozhatóság).
              </li>
            </ul>
            <p>
              Kéréseit a{" "}
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> e-mail
              címen vagy a{" "}
              <a href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephone}</a>{" "}
              telefonszámon jelezheti felénk.
            </p>

            <h2>7. Jogorvoslat</h2>
            <p>
              Amennyiben úgy ítéli meg, hogy adatkezelésünk jogsértő, panasszal
              élhet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál
              (NAIH):
            </p>
            <div className="legal-box">
              <p>
                Cím: 1055 Budapest, Falk Miksa utca 9-11.
                <br />
                Postacím: 1363 Budapest, Pf.: 9.
                <br />
                Telefon: +36 (1) 391-1400
                <br />
                E-mail: ugyfelszolgalat@naih.hu
                <br />
                Web: www.naih.hu
              </p>
            </div>
            <p>
              Jogainak megsértése esetén bírósághoz is fordulhat; a per a
              lakóhelye vagy tartózkodási helye szerint illetékes törvényszék
              előtt is megindítható.
            </p>

            <h2>8. A tájékoztató módosítása</h2>
            <p>
              A tájékoztatót jogszabályváltozás vagy a szolgáltatás
              változása esetén frissítjük. A hatályos verzió mindig ezen az
              oldalon érhető el.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
