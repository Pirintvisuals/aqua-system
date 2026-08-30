import Image from "next/image";
import aboutImg from "../assets/stock/about-team.jpg";
import Reveal from "./Reveal";

const HIGHLIGHTS = [
  { value: "50", suffix: " év", label: "Tapasztalat az épületgépészetben" },
  { value: "Családi", suffix: "", label: "Vállalkozásként működünk" },
  { value: "Víz · Gáz · Fűtés", suffix: "", label: "Teljes körű szerelés" },
];

export default function About() {
  return (
    <section id="rolunk" className="scroll-mt-24 py-20 lg:py-28">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* company photo */}
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-sky-200 shadow-[0_40px_80px_-30px_rgba(15,42,94,0.45)]">
            <Image
              src={aboutImg}
              alt="Aqua System szerelő gázkészüléken dolgozik"
              placeholder="blur"
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-5 right-6 rounded-2xl border border-sky-200 bg-white/90 px-5 py-3 shadow-[0_18px_40px_-18px_rgba(15,42,94,0.4)] backdrop-blur">
            <span className="font-display text-lg font-bold text-brand">Családi vállalkozás</span>
            <span className="mt-0.5 block text-xs font-medium text-ink-soft">1970-es évek óta</span>
          </div>
        </div>

        {/* text */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            Rólunk
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Az Aqua System Service Kft.-ről
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Majdnem öt évtizede foglalkozunk épületgépészeti kivitelezéssel,
            családi vállalkozásként. Tapasztalatunk a víz-, gáz- és
            fűtésszerelési munkák teljes körére kiterjed, így pontosan tudjuk, mi
            számít a megbízható, biztonságos és hosszú távon is működő rendszerek
            kialakításánál.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            A gázkészülékcsere szolgáltatásunkat azért hoztuk létre, hogy a régi,
            elavult berendezéseket gyorsan, szabályosan és átláthatóan váltsuk
            korszerű, energiatakarékos megoldásokra.
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="rounded-2xl border border-sky-200 bg-white p-4">
                <dt className="font-display text-lg font-bold text-ink">
                  {h.value}
                  <span className="text-brand">{h.suffix}</span>
                </dt>
                <dd className="mt-1 text-xs leading-snug text-ink-soft">
                  {h.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
