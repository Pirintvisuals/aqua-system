import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import StructuredData from "./components/StructuredData";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./lib/site";

const lexend = Lexend({
  variable: "--font-lexend",
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
      className={`${lexend.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <StructuredData />
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
