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
  // Teljes, bejegyzett cégnév — a cégkivonat szerint.
  legalName:
    "AQUA SYSTEM SERVICE Épületgépészeti Szolgáltató Korlátolt Felelősségű Társaság",
  telephone: "+36203990093",
  email: "kazancsere@aqua-system.hu",

  // Bejegyzett székhely. Ez a NAP (név / cím / telefon) alapja — ha
  //    változik, itt írd át, és mindenhol követi (lábléc, JSON-LD).
  address: {
    streetAddress: "Szent István út 40.",
    addressLocality: "Érd",
    postalCode: "2030",
    addressRegion: "Pest",
    addressCountry: "HU",
  },

  // Cégazonosítók — ezek teszik ellenőrizhetővé a céget. Gázmunkánál
  //    ez nem formalitás: a látogató ebből látja, kivel áll szemben.
  registration: {
    taxNumber: "12830433-2-13", // adószám
    companyNumber: "13-09-091027", // cégjegyzékszám
  },

  // Kiszolgált települések. A második blokk a valós ügyfélvéleményekből
  //    jött (lásd `app/lib/reviews.ts`) — ezeken a helyeken bizonyítottan
  //    dolgoztunk már, kár volt kihagyni őket.
  areaServed: [
    "Budapest",
    "Érd",
    "Diósd",
    "Tárnok",
    "Halásztelek",
    "Törökbálint",
    "Budaörs",
    "Páty",
    "Százhalombatta",
    "Martonvásár",
    "Göd",
    "Budapest agglomerációja",
  ],

  // ⚠ Közösségi / cégprofil linkek — ha vannak, ide (erősíti az entitást).
  sameAs: [] as string[],

  // Nyitvatartás — igazítsd a valósághoz.
  openingHours: "Mo-Fr 08:00-18:00",
  priceRange: "$$",
} as const;
