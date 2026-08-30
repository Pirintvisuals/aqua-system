import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, BUSINESS } from "../lib/site";
import { FAQS } from "../lib/faqs";

/* ------------------------------------------------------------------ *
 *  JSON-LD strukturált adat — a keresők és az AI-válaszmotorok (Google
 *  AI Overviews, ChatGPT, Perplexity) ebből értik meg, ki a cég, mit
 *  csinál és hol. Szerver-komponens: a HTML-be sül, nincs JS-költsége.
 *
 *  Szándékosan NINCS AggregateRating/Review: a jelenlegi vélemények
 *  mintaszövegek. Valós értékelések élesítése után adjuk hozzá — kitalált
 *  értékelés strukturált adatként a Google irányelveibe ütközik.
 * ------------------------------------------------------------------ */
export default function StructuredData() {
  const hasAddress = Boolean(BUSINESS.address.streetAddress);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    image: `${SITE_URL}/opengraph-image`,
    ...(hasAddress && {
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.streetAddress,
        addressLocality: BUSINESS.address.addressLocality,
        postalCode: BUSINESS.address.postalCode,
        addressRegion: BUSINESS.address.addressRegion,
        addressCountry: BUSINESS.address.addressCountry,
      },
    }),
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    knowsAbout: [
      "Gázkészülék csere",
      "Kazáncsere",
      "Gázkazán beüzemelés",
      "Épületgépészet",
    ],
    ...(BUSINESS.sameAs.length > 0 && { sameAs: BUSINESS.sameAs }),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
