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

/* ------------------------------------------------------------------ *
 *  ⚠ Ez egy szakmailag megalapozott sablon, VALÓS céggel feltöltve
 *  (lásd `lib/site.ts`), de nem helyettesíti a jogi felülvizsgálatot.
 *  Éles indulás előtt Ferenccel át kell nézni különösen:
 *   - az árajánló asszisztens (chatbot) tényleges adatkezelését
 *     (hol tárolja az adatokat, ki fér hozzá, mennyi ideig),
 *   - az adatmegőrzési időtartamokat,
 *   - hogy van-e adatvédelmi tisztviselő vagy csak az adatkezelő jár el.
 * ------------------------------------------------------------------ */

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
              A weboldalon elérhető árajánló asszisztens egy különálló
              szolgáltatás, amely a beszélgetés során megadott adatok (pl. a
              tervezett munka jellege, helyszín, elérhetőség) alapján ad
              tájékoztató jellegű becslést. A beszélgetés célja a
              gyors, kötelezettségmentes tájékoztatás; a becslés nem
              minősül kötelező érvényű árajánlatnak.
            </p>
            <div className="legal-box">
              <p>
                ⚠ Ezt a szakaszt a chatbot tényleges működése alapján kell
                pontosítani: hol tárolja a beszélgetéseket, mennyi ideig, és
                továbbítja-e harmadik félnek (pl. AI-modellt futtató
                szolgáltatónak) az adatokat. Amíg ez nincs tisztázva, a
                tájékoztató a legszűkebb, legvédettebb feltételezéssel él.
              </p>
            </div>

            <h3>3.4 Technikai adatok</h3>
            <p>
              A weboldal megtekintése során a tárhelyszolgáltató (Vercel
              Inc.) a szokásos szerverüzemeltetési naplóadatokat (pl. IP-cím,
              időbélyeg, böngésző típusa) rögzítheti, kizárólag a szolgáltatás
              biztonságos működtetése céljából. A weboldal jelenleg nem
              használ látogatáskövető (analitikai vagy marketing) sütiket.
            </p>

            <h2>4. Adatmegőrzés</h2>
            <p>
              A kapcsolatfelvétel és megrendelés során megadott adatokat a
              megkeresés megválaszolásához, illetve – megrendelés esetén – a
              szerződéses és számviteli kötelezettségek teljesítéséhez
              szükséges ideig, de legfeljebb a vonatkozó jogszabályokban
              (pl. számviteli törvény) meghatározott megőrzési időn belül
              tároljuk.
            </p>

            <h2>5. Adatfeldolgozók, adattovábbítás</h2>
            <p>Az adatok kezelésében a következő szereplők vesznek részt:</p>
            <ul>
              <li>
                <strong>Vercel Inc.</strong> – a weboldal tárhelyszolgáltatója.
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
