/* ------------------------------------------------------------------ *
 *  ÁRAJÁNLÓ ASSZISZTENS KI/BE. Ideiglenesen kikapcsolva: Ferenc még nem
 *  nézte át, az oldal nélküle megy élesbe. Visszakapcsolás: `true`, és
 *  minden visszaáll (widget, gombok, szövegek). Magához az asszisztenshez
 *  nem nyúltunk.
 * ------------------------------------------------------------------ */
export const QUOTING_AGENT_ON = false;

/** Az AI árajánló asszisztens appja (a widget innen töltődik). */
export const AGENT_URL = "https://aqua-system-quoiting-agent.vercel.app/";

/* ------------------------------------------------------------------ *
 *  Központi linkek - egy helyen, hogy a CTA-k ne csússzanak szét.
 *
 *  CHATBOT_URL: minden "árajánlatot kérek" jellegű gomb ide vezet.
 *  Bekapcsolt asszisztensnél az asszisztens (pár kérdés után azonnali,
 *  tájékoztató ár), kikapcsolva a kapcsolati űrlap.
 * ------------------------------------------------------------------ */
export const CHATBOT_URL = QUOTING_AGENT_ON ? AGENT_URL : "/kapcsolat#kapcsolat";

/* ------------------------------------------------------------------ *
 *  AZ ELSODLEGES CTA SZOVEGE. Egy helyen all, mert korabban ot kulonbozo
 *  feliratu gomb vitt ugyanoda ("Azonnali árajánlat", "Kérdezek",
 *  "Árajánlat erre a munkára"...). A latogato igy nem ismeri fel, hogy
 *  ugyanaz a lepes ismetlodik, es minden szekcioban ujra donteni kell.
 *
 *  A felirat megmondja, MIT kap es MENNYI IDO alatt. A `CTA_NOTE` pedig
 *  a gomb ala kerul: az ar es a kotelezettseg kerdeset veszi le.
 * ------------------------------------------------------------------ */
export const CTA_PRIMARY = QUOTING_AGENT_ON ? "Árajánlat 2 perc alatt" : "Kérj árajánlatot";
/** Rovid valtozat oda, ahol nincs hely (fejlec, ragados mobil sav). */
export const CTA_PRIMARY_SHORT = "Árajánlat";
export const CTA_NOTE = "Ingyenes, kötelezettség nélkül, hívás nélkül is.";

export const PHONE_DISPLAY = "(06 20) 399 0093";
export const PHONE_HREF = "tel:+36203990093";
