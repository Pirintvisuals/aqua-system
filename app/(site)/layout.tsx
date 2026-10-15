import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import StickyCta from "./components/StickyCta";
import StructuredData from "./components/StructuredData";
import { QUOTING_AGENT_ON } from "./lib/links";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./lib/site";

/* Cimsorok: Fraunces. A DM Serif Display tul szogletes es merev volt, az
   Archivo jellegtelen, a Lexend tul jatekos. A Fraunces talpas marad (illik
   egy otven eves csaladi ceghez), de a SOFT tengellyel lekerekitett, a
   WONK-kal kicsit hajlo betukkel baratsagosabb. A tengelyeket a
   globals.css allitja be (font-variation-settings). */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const TITLE = "Aqua System Service Kft. – Egynapos gázkészülék csere";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Aqua System",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "gázkészülék csere",
    "kazáncsere",
    "gázkazán csere",
    "egynapos kazáncsere",
    "Budapest",
    "Érd",
  ],
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hu"
      className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink pb-[76px] lg:pb-0">
        <StructuredData />
        <Navbar />
        {children}
        <Footer />
        {QUOTING_AGENT_ON && <ChatWidget />}
        <StickyCta />
        {/* Website analytics (PostHog): page views, phone/email clicks, forms. Stores nothing in the browser. */}
        <Script src="/site-analytics.js" data-site="aqua-system" strategy="afterInteractive" />
      </body>
    </html>
  );
}
