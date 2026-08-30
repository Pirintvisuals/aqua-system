import type { Metadata } from "next";
import HeroC from "../components/HeroC";

// Koncepció-változat — ne kerüljön a keresőindexbe (duplikált tartalom).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function ConceptC() {
  return (
    <main className="flex-1">
      <HeroC />
    </main>
  );
}
