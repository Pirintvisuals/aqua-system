import type { StaticImageData } from "next/image";
import kazancsereTarolo from "../assets/munkak/kazancsere-tarolo.jpg";
import kazancsereErgas from "../assets/munkak/kazancsere-ergas.jpg";
import gepeszetKazanhaz from "../assets/munkak/gepeszet-kazanhaz.jpg";
import gepeszetCsovezetek from "../assets/munkak/gepeszet-csovezetek.jpg";
import gepeszetVitodens from "../assets/munkak/gepeszet-vitodens.jpg";
import karbantartas from "../assets/munkak/karbantartas-felulvizsgalat.jpg";
import vezerlopanel from "../assets/munkak/vezerlopanel.jpg";

/* ------------------------------------------------------------------ *
 *  A négy szolgáltatás — EGY forrás a főoldali kártyáknak és a
 *  /szolgaltatasok aloldalnak, hogy a cím és a szöveg ne csússzon szét.
 *
 *  A `photo` mindig valódi, saját munkafotó. A hőszivattyúnál egyelőre
 *  NINCS saját fotó, ezért ott `photo: null` — a felület rajzolt
 *  illusztrációt mutat helyette. Ne tegyünk oda kazánfotót: a
 *  látogatónak félrevezető lenne. Amint van hőszivattyús fotó, elég
 *  ide beimportálni.
 * ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  /** Rövid cím — kártyákon, menüben. */
  title: string;
  /** Hosszabb cím — az aloldali szekció H2-je. */
  heading: string;
  /** Egymondatos összefoglaló a kártyákra. */
  teaser: string;
  /** Két bekezdés az aloldali részletes szekcióba. */
  body: string[];
  /** Mit tartalmaz — pipás lista. */
  includes: string[];
  /** Kiemelt tudnivaló a szekció alján — forrásmegjelöléssel. */
  note?: {
    title: string;
    body: string;
    disclaimer: string;
    sourceLabel: string;
    sourceUrl: string;
  };
  /** A fotóra úszó kis címke: rövid, tényszerű. */
  badge: { label: string; icon: "clock" | "wrench" | "shield" | "leaf" };
  /** A forrásfotó tájolása — ehhez igazul a képkeret, hogy ne vágjuk szét. */
  orientation: "portrait" | "landscape";
  photo: StaticImageData | null;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "egynapos-kazancsere",
    title: "Egynapos kazáncsere",
    heading: "Egynapos kazáncsere",
    teaser:
      "Régi készülék ki, új kondenzációs kazán be – reggeltől estig, egyetlen munkanap alatt.",
    body: [
      "A legtöbb cserét egyetlen nap alatt elvégezzük: reggel leszereljük a régi készüléket, estére fűt az új. Nem kell több napra kiköltöznöd, és nem marad nyitva a fűtésrendszer egy hétvégére sem.",
      "A felméréstől a beüzemelésig mindent mi intézünk – a készülék kiválasztását, a szükséges átalakításokat, az engedélyeztetést és a dokumentációt is. Te annyit érzékelsz belőle, hogy este már meleg van.",
    ],
    includes: [
      "Helyszíni felmérés, fix árajánlat",
      "Készülék kiválasztása és beszerzése",
      "Régi készülék le- és elszállítása",
      "Új kazán beszerelése, bekötése",
      "Beüzemelés és beszabályozás",
      "Engedélyeztetés, teljes dokumentáció",
    ],
    badge: { label: "Egyetlen munkanap", icon: "clock" },
    orientation: "portrait",
    photo: kazancsereTarolo,
    alt: "Frissen beszerelt Viessmann kondenzációs kazán rézcsövezéssel és melegvíz-tárolóval",
  },
  {
    slug: "komplett-gepeszet",
    title: "Komplett gépészet",
    heading: "Családi házak komplett gépészeti szerelése",
    teaser:
      "Új építésnél és felújításnál a teljes gépészet: fűtés, víz, gáz – egy kézben, egy felelőssel.",
    body: [
      "Új építésű vagy felújítás alatt álló családi háznál a teljes gépészetet elvállaljuk: fűtésrendszer, vízhálózat, gázvezeték, kazánház, padlófűtés, radiátorok, melegvíz-tárolás. Nem kell külön szakikat összehangolnod – egy csapat, egy ütemterv, egy felelős.",
      "A tervezéstől a beüzemelésig végigvisszük. Ott vagyunk a többi szakággal való egyeztetéseken, és úgy építjük meg a rendszert, hogy tíz év múlva is szervizelhető legyen: hozzáférhető elzárók, címkézett körök, dokumentált nyomvonalak.",
    ],
    includes: [
      "Fűtésrendszer kiépítése, padlófűtés",
      "Teljes vízhálózat, lefolyók",
      "Gázvezeték építése, engedélyezés",
      "Kazánház, puffer és melegvíz-tároló",
      "Szivattyúk, osztó-gyűjtő, szabályozás",
      "Nyomáspróba, beüzemelés, átadás",
    ],
    badge: { label: "Egy kézben, egy felelőssel", icon: "wrench" },
    orientation: "landscape",
    photo: gepeszetCsovezetek,
    alt: "Elkészült kazánház családi házban: Viessmann kazán, puffertartály, Grundfos szivattyúk és rézcsövezés",
  },
  {
    slug: "atalanydijas-karbantartas",
    title: "Átalánydíjas karbantartás",
    heading: "Átalánydíjas karbantartási munkák",
    teaser:
      "Az éves karbantartás tartja életben a gyári garanciát – fix díjért, határidőkkel együtt.",
    body: [
      "A legtöbben nem tudják, hogy a gyári garancia nem jár automatikusan: a gyártók a kiterjesztett garanciát éves, szakszerviz által végzett karbantartáshoz kötik. Egy kihagyott év akár egy tízéves garanciát is elvihet – pont akkor, amikor a legnagyobb szükség lenne rá.",
      "Az átalánydíjas karbantartás ezt veszi le a válladról: egy előre kialkudott éves díjért elvégezzük a kötelező felülvizsgálatot, tisztítjuk és beszabályozzuk a készüléket, és nyilvántartjuk, mikor mi esedékes. Nem neked kell fejben tartanod a határidőket.",
      "A szerződéses partnereinket hiba esetén soron kívül vesszük fel – nem a várólista végére kerülsz a fűtési szezon közepén. Társasházaknak és több készüléket üzemeltető ügyfeleknek külön ütemtervet készítünk.",
    ],
    includes: [
      "Éves kötelező felülvizsgálat",
      "Készüléktisztítás, beszabályozás",
      "Égéstermék- és nyomásellenőrzés",
      "Fix, előre kiszámítható éves díj",
      "Soron kívüli kiszállás hiba esetén",
      "Vezetett karbantartási napló",
    ],
    note: {
      title: "A gyári garancia feltétele az éves karbantartás",
      body:
        "A Viessmann akár 10 év garanciát vállal a nemesacél hőcserélőre (150 kW-ig) és a Vitocell 300 tárolókra, 5 évet pedig a ViCare alkalmazással internetre kötött készülékekre. A kiterjesztett garancia feltétele a készülék regisztrációja (a 2018. április 1. után szállított termékeknél az első 6 hónapban), valamint a gyártói előírás szerinti éves ellenőrzés és karbantartás – szakszerviz által, eredeti alkatrészekkel.",
      disclaimer:
        "A pontos feltételek készüléktípusonként és csomagonként eltérnek; mindig a készülékhez kapott garanciajegy az irányadó.",
      sourceLabel: "Viessmann garanciafeltételek",
      sourceUrl: "https://www.viessmann.hu/hu/services-and-support/warranty.html",
    },
    badge: { label: "Fix éves díj", icon: "shield" },
    orientation: "portrait",
    photo: karbantartas,
    alt: "Gázkazán elvégzett műszaki felülvizsgálatot igazoló matricával, 2026-os érvényességgel",
  },
  {
    slug: "hoszivattyu-telepites",
    title: "Hőszivattyú telepítés",
    heading: "Hőszivattyú telepítések",
    teaser:
      "Levegő-víz hőszivattyú tervezése és telepítése – gázfüggetlen fűtés, alacsonyabb rezsi.",
    body: [
      "Ha a gázról szeretnél leválni vagy csökkentenéd a rezsit, a levegő-víz hőszivattyú a legkézenfekvőbb út. Felmérjük a ház hőigényét, és megmondjuk, mekkora gép kell hozzá – meg azt is, ha a jelenlegi radiátoraiddal nem lenne gazdaságos.",
      "A telepítés a kültéri egységtől a hidraulikus bekötésen és a puffertárolón át a szabályozásig nálunk van. Meglévő rendszerre hibrid megoldást is építünk, ahol a hőszivattyú viszi az alapterhelést, és a meglévő kazán csak a csúcsokat.",
    ],
    includes: [
      "Hőigény-számítás, géptípus kiválasztása",
      "Kültéri egység telepítése",
      "Hidraulikus bekötés, puffertároló",
      "Meglévő fűtésrendszerre illesztés",
      "Hibrid (kazán + hőszivattyú) üzem",
      "Szabályozás beállítása, betanítás",
    ],
    badge: { label: "Gázfüggetlen fűtés", icon: "leaf" },
    orientation: "landscape",
    photo: null,
    alt: "",
  },
];

/* A galéria-sávhoz: a maradék munkafotók, amik nem kártyaképként szerepelnek. */
export const WORK_PHOTOS = [
  {
    img: gepeszetKazanhaz,
    alt: "Családi ház kazánháza: fali kazán, melegvíz-tároló és puffertartály bekötve",
  },
  {
    img: gepeszetVitodens,
    alt: "Viessmann Vitodens 200 kazán szivattyúkkal és osztó-gyűjtővel egy gépészeti helyiségben",
  },
  {
    img: kazancsereErgas,
    alt: "Beüzemelt kondenzációs kazán 70 fokos előremenő hőmérséklettel, mellette melegvíz-tároló",
  },
  {
    img: vezerlopanel,
    alt: "Kazán magyar nyelvű vezérlőpanelje beüzemelés közben, 42 fokos kazánhőmérséklettel",
  },
];
