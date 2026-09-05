import Image, { type StaticImageData } from "next/image";
import Reveal from "./Reveal";
import szaboBela from "../assets/team/szabo-bela.png";
import berghammerBalazs from "../assets/team/berghammer-balazs.png";
import nagyAndrea from "../assets/team/nagy-andrea.png";
import ozsvathBalint from "../assets/team/ozsvath-balint.png";
import rebbenszkiGabor from "../assets/team/rebbenszki-gabor.png";
import molnarLaszlo from "../assets/team/molnar-laszlo.png";
import nagyFerenc from "../assets/team/nagy-ferenc.png";

type Member = { name: string; role: string; photo: StaticImageData };

const TEAM: Member[] = [
  { name: "Nagy Ferenc", role: "Tulajdonos / Cégvezetés", photo: nagyFerenc },
  { name: "Nagy Andrea", role: "Tulajdonos / Adminisztráció", photo: nagyAndrea },
  { name: "Szabó Béla", role: "Műszaki vezető", photo: szaboBela },
  { name: "Molnár László", role: "Műszaki előkészítő", photo: molnarLaszlo },
  { name: "Berghammer Balázs", role: "Szerelő", photo: berghammerBalazs },
  { name: "Ozsváth Bálint", role: "Szerelő", photo: ozsvathBalint },
  { name: "Rebbenszki Gábor", role: "Szerelő", photo: rebbenszkiGabor },
];

export default function Team() {
  return (
    <section
      id="csapat"
      className="relative isolate overflow-clip scroll-mt-36 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Ismerd meg a csapatunkat
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Ők azok, akik nap mint nap azon dolgoznak, hogy biztonságosan,
            gyorsan és átláthatóan cseréljük le a régi gázkészülékeket.
          </p>
        </div>

        <Reveal stagger step={60} className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {TEAM.map((m) => (
            <figure
              key={m.name}
              className="group overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-[0_20px_45px_-30px_rgba(15,42,94,0.4)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={m.photo}
                  alt={`${m.name} – ${m.role}, Aqua System`}
                  placeholder="blur"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="p-4">
                <div className="font-display text-base font-bold text-ink">
                  {m.name}
                </div>
                <div className="mt-0.5 text-sm text-ink-soft">{m.role}</div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
