import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

/* A tartalomszerkeszto felulete. Sajat root layout: nincs rajta a weboldal
   navigacioja, lablece es chatje, es a globals.css sem szol bele a
   kinezetebe. */
export const metadata: Metadata = {
  title: "Tartalomszerkesztő | Aqua System",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  return (
    <html lang="hu">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
