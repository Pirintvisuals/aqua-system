/* ------------------------------------------------------------------ *
 *  Központi linkek - egy helyen, hogy a CTA-k ne csússzanak szét.
 *
 *  CHATBOT_URL: az AI árajánló asszisztens. Minden "árajánlatot kérek"
 *  jellegű gomb ide vezet - a látogató pár kérdés után azonnali,
 *  tájékoztató árat kap, emberi ügyintézés nélkül.
 * ------------------------------------------------------------------ */
export const CHATBOT_URL = "https://aqua-system-quoiting-agent.vercel.app/";

/* ------------------------------------------------------------------ *
 *  AZ ELSODLEGES CTA SZOVEGE. Egy helyen all, mert korabban ot kulonbozo
 *  feliratu gomb vitt ugyanoda ("Azonnali árajánlat", "Kérdezek",
 *  "Árajánlat erre a munkára"...). A latogato igy nem ismeri fel, hogy
 *  ugyanaz a lepes ismetlodik, es minden szekcioban ujra donteni kell.
 *
 *  A felirat megmondja, MIT kap es MENNYI IDO alatt. A `CTA_NOTE` pedig
 *  a gomb ala kerul: az ar es a kotelezettseg kerdeset veszi le.
 * ------------------------------------------------------------------ */
export const CTA_PRIMARY = "Árajánlat 2 perc alatt";
/** Rovid valtozat oda, ahol nincs hely (fejlec, ragados mobil sav). */
export const CTA_PRIMARY_SHORT = "Árajánlat";
export const CTA_NOTE = "Ingyenes, kötelezettség nélkül, hívás nélkül is.";

export const PHONE_DISPLAY = "(06 20) 399 0093";
export const PHONE_HREF = "tel:+36203990093";
