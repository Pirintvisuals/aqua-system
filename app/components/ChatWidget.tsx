"use client";

import { useEffect } from "react";
import { CHATBOT_URL } from "../lib/links";

/* ------------------------------------------------------------------ *
 *  Árajánló widget — a valódi asszisztens ül a sarokban.
 *
 *  Nem iframe-be ágyazott demó oldal (widget a widgetben), hanem maga
 *  az asszisztens `widget.js`-e, közvetlenül ide betöltve. A script a
 *  saját lebegő gombját + panelját teszi a `document.body`-ra.
 *
 *  Mivel a script egy másik origin-ről jön (a quoting agent appja), az
 *  `AQUA_CONFIG`-gal megmondjuk neki, hova küldje az API-hívásokat és
 *  honnan töltse az asseteket. A backend CORS-a `*`, így ez működik.
 * ------------------------------------------------------------------ */

// A quoting agent origin-je, záró perjel nélkül (pl. https://…vercel.app).
const AGENT_ORIGIN = CHATBOT_URL.replace(/\/+$/, "");

declare global {
  interface Window {
    AQUA_CONFIG?: { apiUrl?: string; assetsUrl?: string };
  }
}

// Megnyitja a sarokban ülő widgetet (a saját lebegő gombja lekattintásával).
// A script aszinkron tölt, ezért pár próbát teszünk, amíg a gomb megjelenik.
function openWidget(attempt = 0) {
  const launcher = document.querySelector<HTMLButtonElement>(".faq-chat-launcher");
  if (launcher) {
    // A gomb váltó (toggle): csak akkor kattintsuk, ha épp zárva van.
    if (!launcher.classList.contains("active")) launcher.click();
    return;
  }
  if (attempt < 20) setTimeout(() => openWidget(attempt + 1), 150);
}

export default function ChatWidget() {
  useEffect(() => {
    // A scriptet csak egyszer töltsük be (StrictMode kétszer futtat).
    if (!document.getElementById("aqua-widget-script")) {
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

    // A "árajánlatot kérek" CTA-k az asszisztensre mutatnak. JS-sel ne új
    // oldalt nyissanak, hanem itt helyben a widgetet. A href megmarad
    // fallbacknek (JS nélkül / új lapon nyitáskor továbbra is működik).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const link = (e.target as HTMLElement | null)?.closest("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith(AGENT_ORIGIN)) return;
      e.preventDefault();
      openWidget();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
