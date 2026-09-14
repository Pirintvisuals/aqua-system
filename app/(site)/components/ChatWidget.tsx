"use client";

import { useEffect } from "react";
import { CHATBOT_URL } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  Árajánló widget. A valódi asszisztens ül a sarokban: nem iframe-be
 *  ágyazott demó, hanem maga a `widget.js`, közvetlenül ide töltve.
 *
 *  FONTOS: a scriptet KÉSLELTETVE töltjük, az első felhasználói
 *  interakcióra (görgetés, koppintás, billentyű). Mérve: a widget
 *  buborékja korábban 5 másodperccel rontotta a legnagyobb tartalmi
 *  festést (LCP 9,7 mp -> 4,6 mp), mert a saját tooltipje lett az
 *  oldal legnagyobb, legkésőbb megjelenő eleme. Mobilon minden
 *  másodperc nagyjából 7 százalék konverziót visz.
 *
 *  Mivel a betöltés interakcióhoz kötött, a tooltip már nem tud az
 *  LCP-be beleszámítani, viszont minden valódi látogató megkapja,
 *  amint görget vagy kattint egyet.
 *
 *  A script másik originről jön (a quoting agent appja), ezért az
 *  `AQUA_CONFIG`-gal mondjuk meg, hova küldje az API-hívásokat.
 * ------------------------------------------------------------------ */

const AGENT_ORIGIN = CHATBOT_URL.replace(/\/+$/, "");

declare global {
  interface Window {
    AQUA_CONFIG?: { apiUrl?: string; assetsUrl?: string };
  }
}

function loadWidget() {
  if (document.getElementById("aqua-widget-script")) return;

  window.AQUA_CONFIG = {
    apiUrl: `${AGENT_ORIGIN}/api/faq-agent`,
    assetsUrl: AGENT_ORIGIN,
  };

  const script = document.createElement("script");
  script.id = "aqua-widget-script";
  script.src = `${AGENT_ORIGIN}/widget.js`;
  script.async = true;
  document.body.appendChild(script);
}

/* Megnyitja a sarokban ülő widgetet a saját lebegő gombjával. A script
   ilyenkor még tölthet, ezért türelmesen próbálkozunk (kb. 9 mp-ig). */
function openWidget(attempt = 0) {
  const launcher = document.querySelector<HTMLButtonElement>(
    ".faq-chat-launcher",
  );
  if (launcher) {
    if (!launcher.classList.contains("active")) launcher.click();
    return;
  }
  if (attempt < 60) setTimeout(() => openWidget(attempt + 1), 150);
}

export default function ChatWidget() {
  useEffect(() => {
    // Első interakcióra töltünk. A `once` miatt magától leszerel.
    const events = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
    const onFirstInteraction = () => {
      loadWidget();
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
    };
    events.forEach((e) =>
      window.addEventListener(e, onFirstInteraction, {
        once: true,
        passive: true,
      }),
    );

    // Az "árajánlatot kérek" CTA-k az asszisztensre mutatnak. JS-sel ne
    // új oldalt nyissanak, hanem itt helyben a widgetet. A href megmarad
    // fallbacknek (JS nélkül / új lapon nyitáskor továbbra is működik).
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const link = (e.target as HTMLElement | null)?.closest("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith(AGENT_ORIGIN)) return;
      e.preventDefault();
      // Ha a látogató a CTA-val kezd, itt indul a betöltés.
      loadWidget();
      openWidget();
    };

    document.addEventListener("click", onClick);
    return () => {
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
