import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import { BUSINESS, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Általános Szerződési Feltételek",
  description:
    "Az Aqua System Service Kft. weboldalának és online árajánló asszisztensének használati feltételei.",
  alternates: { canonical: "/aszf" },
  robots: { index: true, follow: true },
};

/* ⚠ Ez a weboldal ES az arajanlo asszisztens HASZNALATANAK feltetelei -
   nem a kazancsere-szolgaltatas szerzodesi feltetelei. Az tenyleges
   munka mindig kulon, egyedi megallapodas alapjan jon letre a
   helyszini felmeres utan. Elesites elott jogasszal atnezendo. */

const UPDATED = "2026. szeptember";

export default function AszfPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Jogi"
        title="Általános Szerződési Feltételek"
        intro="Ez a dokumentum a weboldal és az online árajánló asszisztens használatának feltételeit rögzíti. A tényleges kazáncsere vagy gépészeti munka mindig külön, egyedi megállapodás alapján jön létre – ezt ez a dokumentum nem helyettesíti."
        breadcrumb={[
          { label: "Főoldal", href: "/" },
          { label: "ÁSZF", href: "/aszf" },
        ]}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm text-ink-soft">Hatályos: {UPDATED}</p>

          <article className="legal-article mt-6">
            <h2>1. Szolgáltató adatai</h2>
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

            <h2>2. A dokumentum hatálya</h2>
            <p>
              A jelen Általános Szerződési Feltételek (ÁSZF) a{" "}
              {SITE_URL.replace("https://", "")} weboldal (a továbbiakban:
              weboldal) és az azon elérhető online árajánló asszisztens
              (a továbbiakban: asszisztens) használatára vonatkoznak. A
              weboldal használatával Ön elfogadja a jelen feltételeket.
            </p>

            <h2>3. A weboldal és az asszisztens jellege</h2>
            <p>
              A weboldal a Szolgáltató tevékenységéről nyújt tájékoztatást,
              az asszisztens pedig a megadott információk alapján gyors,
              tájékoztató jellegű becslést ad egy tervezett munka várható
              költségéről.
            </p>
            <div className="legal-box">
              <p>
                Az asszisztens által adott becslés <strong>nem minősül
                kötelező érvényű árajánlatnak vagy szerződéses ajánlatnak</strong>.
                A végleges, kötelező érvényű árajánlatot minden esetben egy
                helyszíni felmérés után adjuk meg, a konkrét munka
                ismeretében.
              </p>
            </div>

            <h2>4. A szerződés létrejötte</h2>
            <p>
              A weboldal és az asszisztens használata önmagában nem hoz
              létre szerződést a Szolgáltató és a látogató között. A
              tényleges munkára (pl. gázkészülék csere, gépészeti
              kivitelezés) vonatkozó szerződés a helyszíni felmérést követő,
              külön, mindkét fél által elfogadott megállapodással jön létre.
            </p>

            <h2>5. Felelősség</h2>
            <p>
              A Szolgáltató minden tőle elvárható intézkedést megtesz annak
              érdekében, hogy a weboldalon található információk pontosak és
              naprakészek legyenek, de nem vállal felelősséget:
            </p>
            <ul>
              <li>
                az asszisztens által adott becslés és a végleges árajánlat
                közötti eltérésért, amíg helyszíni felmérés nem történt,
              </li>
              <li>
                a weboldal átmeneti elérhetetlenségéért vagy technikai
                hibájáért,
              </li>
              <li>
                a weboldalon hivatkozott külső, harmadik fél által üzemeltetett
                szolgáltatások (pl. az asszisztens háttérrendszere)
                tartalmáért vagy működéséért.
              </li>
            </ul>

            <h2>6. Szellemi tulajdon</h2>
            <p>
              A weboldalon található szövegek, fotók és grafikai elemek a
              Szolgáltató tulajdonát képezik, vagy a Szolgáltató jogosult
              azok felhasználására. Ezek másolása, terjesztése vagy
              kereskedelmi célú felhasználása a Szolgáltató előzetes írásos
              engedélye nélkül nem megengedett.
            </p>

            <h2>7. Panaszkezelés</h2>
            <p>
              A weboldallal vagy az asszisztens működésével kapcsolatos
              észrevételeit, panaszait a{" "}
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> e-mail
              címen vagy a{" "}
              <a href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephone}</a>{" "}
              telefonszámon jelezheti. A konkrét, megrendelt munkával
              kapcsolatos panaszokra a felmérés után létrejött egyedi
              megállapodás feltételei az irányadók.
            </p>

            <h2>8. Alkalmazandó jog</h2>
            <p>
              A jelen ÁSZF-re a magyar jog az irányadó. A jelen dokumentumból
              eredő esetleges jogviták elbírálására a magyar bíróságok
              rendelkeznek joghatósággal.
            </p>

            <h2>9. Módosítás</h2>
            <p>
              A Szolgáltató jogosult a jelen ÁSZF-et egyoldalúan módosítani.
              A módosítás a weboldalon történő közzététellel lép hatályba.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
