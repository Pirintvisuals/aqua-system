/* ------------------------------------------------------------------ *
 *  Központi SEO / cég-adatok — minden strukturált adat és metaadat
 *  innen táplálkozik, hogy a NAP (név / cím / telefon) sehol se
 *  csússzon szét. Éles indulás előtt ellenőrizd a ⚠ jelölt mezőket.
 * ------------------------------------------------------------------ */

// ⚠ Az éles domain. Ha nem aqua-system.hu lesz, írd át — ez a kanonikus URL,
//    a sitemap, a robots és az Open Graph képek alapja is.
export const SITE_URL = "https://aqua-system.hu";

export const SITE_NAME = "Aqua System Service Kft.";

export const SITE_DESCRIPTION =
  "Gyors, biztonságos és profi gázkészülék- és kazáncsere egyetlen nap alatt. 50 év tapasztalat, fix ár, 100% garancia minden készülékre. Már 500+ sikeres csere.";

export const BUSINESS = {
  legalName: "Aqua System Service Kft.",
  telephone: "+36203990093",
  email: "keszulekcsere@aqua-system.hu",

  // ⚠ Cím — töltsd ki a bejegyzett székhely / telephely adataival.
  //    Területi (kiszállásos) szolgáltatóként is kell egy valós cím a
  //    Google Cégprofilhoz és a NAP-konzisztenciához.
  address: {
    streetAddress: "", // ⚠ pl. "Fő utca 12."
    addressLocality: "", // ⚠ pl. "Érd"
    postalCode: "", // ⚠ pl. "2030"
    addressRegion: "Pest",
    addressCountry: "HU",
  },

  // Kiszolgált települések (a GYIK-ből).
  areaServed: [
    "Budapest",
    "Érd",
    "Diósd",
    "Tárnok",
    "Halásztelek",
    "Budapest agglomerációja",
  ],

  // ⚠ Közösségi / cégprofil linkek — ha vannak, ide (erősíti az entitást).
  sameAs: [] as string[],

  // Nyitvatartás — igazítsd a valósághoz.
  openingHours: "Mo-Fr 08:00-18:00",
  priceRange: "$$",
} as const;
