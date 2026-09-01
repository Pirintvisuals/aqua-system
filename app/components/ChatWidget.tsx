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

export default function ChatWidget() {
  useEffect(() => {
    // Csak egyszer töltsük be (React StrictMode kétszer futtathatja az effectet).
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
  }, []);

  return null;
}
