import type { StaticImageData } from "next/image";
import kazancsereTarolo from "../assets/munkak/kazancsere-tarolo.jpg";
import kazancsereErgas from "../assets/munkak/kazancsere-ergas.jpg";
import gepeszetKazanhaz from "../assets/munkak/gepeszet-kazanhaz.jpg";
import gepeszetCsovezetek from "../assets/munkak/gepeszet-csovezetek.jpg";
import gepeszetVitodens from "../assets/munkak/gepeszet-vitodens.jpg";
import karbantartas from "../assets/munkak/karbantartas-felulvizsgalat.jpg";
import vezerlopanel from "../assets/munkak/vezerlopanel.jpg";

/* ------------------------------------------------------------------ *
 *  A négy szolgáltatás - EGY forrás a főoldali kártyáknak és a
 *  /szolgaltatasok aloldalnak, hogy a cím és a szöveg ne csússzon szét.
 *
 *  A `photo` mindig valódi, saját munkafotó. A hőszivattyúnál egyelőre
 *  NINCS saját fotó, ezért ott `photo: null` - a felület rajzolt
 *  illusztrációt mutat helyette. Ne tegyünk oda kazánfotót: a
 *  látogatónak félrevezető lenne. Amint van hőszivattyús fotó, elég
 *  ide beimportálni.
 * ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  /** Rövid cím - kártyákon, menüben. */
  title: string;
  /** Hosszabb cím - az aloldali szekció H2-je. */
  heading: string;
  /** Egymondatos összefoglaló a kártyákra. */
  teaser: string;
  /** Két bekezdés az aloldali részletes szekcióba. */
  body: string[];
  /** Mit tartalmaz - pipás lista. */
  includes: string[];
  /** Kiemelt tudnivaló a szekció alján - forrásmegjelöléssel. */
  note?: {
    title: string;
    body: string;
    disclaimer: string;
    sourceLabel: string;
    sourceUrl: string;
  };
  /** A fotóra úszó kis címke: rövid, tényszerű. */
  badge: { label: string; icon: "clock" | "wrench" | "shield" | "leaf" };
  /** Aloldali fejléc-szöveg: rövidebb, konkrétabb, mint a teaser. */
  intro: string;
  /** Három szám a sötét tény-sávba az aloldal tetején. */
  facts: { value: string; label: string }[];
  /** Kinek való ez a szolgáltatás. */
  who: string[];
  /** Így zajlik: lépések az aloldalon. */
  steps: { title: string; body: string }[];
  /** A forrásfotó tájolása - ehhez igazul a képkeret, hogy ne vágjuk szét. */
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
    intro:
      "Reggel leszereljük a régit, estére fűt az új. A felméréstől az engedélyeztetésig mindent mi intézünk, fix áron.",
    facts: [
      { value: "1 nap", label: "a legtöbb csere ennyi idő" },
      { value: "500+", label: "elvégzett készülékcsere" },
      { value: "Fix ár", label: "felmérés után, írásban" },
    ],
    who: [
      "A kazán 15 évnél idősebb, és egyre többet fogyaszt",
      "Nyílt égésterű készülék van a lakásban",
      "Már volt egy nagyobb hiba, és jön a következő",
      "Új kazán kell, de nem akarsz hetekre fűtés nélkül maradni",
    ],
    steps: [
      {
        title: "Felmérés és fix ár",
        body: "Kimegyünk, megnézzük a meglévő rendszert, a kéményt és a gázvezetéket. Ezután kapsz egy fix árat, írásban. Nem becslés, nem sávos ár.",
      },
      {
        title: "Készülék és időpont",
        body: "Kiválasztjuk a házhoz illő teljesítményű készüléket, beszerezzük, és egyeztetünk egy konkrét napot. Nem kell heteket várnod a szállításra.",
      },
      {
        title: "A csere napja",
        body: "Reggel érkezünk, leszereljük és elszállítjuk a régi készüléket, beszereljük és bekötjük az újat. A helyiséget úgy hagyjuk, ahogy találtuk.",
      },
      {
        title: "Beüzemelés és papírok",
        body: "Beüzemeljük, beszabályozzuk, megmutatjuk a kezelését. Az engedélyeztetést és a dokumentációt is mi intézzük.",
      },
    ],
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
    intro:
      "Fűtés, víz és gáz egy kézben, egy ütemtervvel és egy felelőssel. Új építésnél és teljes felújításnál.",
    facts: [
      { value: "3 szakág", label: "fűtés, víz és gáz együtt" },
      { value: "1 felelős", label: "nem neked kell hangolni" },
      { value: "50 év", label: "épületgépészeti tapasztalat" },
    ],
    who: [
      "Új családi ház épül, és kell a teljes gépészet",
      "Teljes felújítás, ahol a régi rendszer megy a konténerbe",
      "Padlófűtés, puffertároló, több fűtési kör",
      "Nem akarsz külön vízszerelőt, gázszerelőt és fűtésszerelőt hangolni",
    ],
    steps: [
      {
        title: "Tervek és egyeztetés",
        body: "Átnézzük a terveket, és a többi szakággal is egyeztetünk. Ilyenkor derülnek ki azok az ütközések, amiket később már drága javítani.",
      },
      {
        title: "Nyomvonalak, alapszerelés",
        body: "Kiépítjük a fűtési, vizes és gázvezetékeket, a padlófűtés köreit, az osztó-gyűjtő helyét. Minden nyomvonalat dokumentálunk.",
      },
      {
        title: "Kazánház és készülékek",
        body: "Beépítjük a kazánt, a puffert és a melegvíz-tárolót, a szivattyúkat és a szabályozást. Úgy, hogy tíz év múlva is hozzá lehessen férni.",
      },
      {
        title: "Nyomáspróba és átadás",
        body: "Nyomáspróba, beüzemelés, beszabályozás, majd átadás dokumentációval és a rendszer bemutatásával.",
      },
    ],
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
    intro:
      "Egy fix éves díjért gondozzuk a rendszeredet, és életben tartjuk a gyári garanciát. A határidőket mi tartjuk fejben.",
    facts: [
      { value: "10 évig", label: "élhet a gyári garancia" },
      { value: "Fix díj", label: "előre kiszámítható, éves" },
      { value: "Soron kívül", label: "szerződéses partnereinket" },
    ],
    who: [
      "Új kazánod van, és nem akarod elveszíteni a gyári garanciát",
      "Nem szeretnéd fejben tartani, mikor esedékes a felülvizsgálat",
      "Társasház vagy több készüléket üzemeltetsz",
      "Fontos, hogy hiba esetén ne a várólista végére kerülj",
    ],
    steps: [
      {
        title: "Felvesszük a rendszered adatait",
        body: "Rögzítjük a készülék típusát, korát, a garancia lejáratát és a kötelező felülvizsgálat idejét. Innentől ezt mi tartjuk nyilván.",
      },
      {
        title: "Éves karbantartás",
        body: "Évente egyszer jövünk: tisztítás, beszabályozás, égéstermék- és nyomásellenőrzés, a gyártói előírás szerint, eredeti alkatrészekkel.",
      },
      {
        title: "Jegyzőkönyv és emlékeztető",
        body: "Minden alkalomról jegyzőkönyv készül, és szólunk, mielőtt a következő esedékes lenne. A garanciád így nem tud véletlenül lejárni.",
      },
      {
        title: "Hiba esetén soron kívül",
        body: "Szerződéses partnereinket hiba esetén előre vesszük. A fűtési szezon közepén ez nem apróság.",
      },
    ],
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
    intro:
      "Levegő-víz hőszivattyú felméréssel, hőigény-számítással és őszinte beszéddel arról, mikor éri meg és mikor nem.",
    facts: [
      { value: "Felmérés", label: "hőigény-számítás előre" },
      { value: "Hibrid", label: "kazánnal együtt is működik" },
      { value: "Alacsony", label: "üzemi hőmérséklet, kisebb rezsi" },
    ],
    who: [
      "Csökkentenéd a rezsit, vagy leválnál a gázról",
      "Padlófűtés van, vagy tervben van a kiépítése",
      "Új ház épül, és most dől el a fűtés módja",
      "Meglévő kazán mellé keresel kiegészítést",
    ],
    steps: [
      {
        title: "Hőigény-számítás",
        body: "Kiszámoljuk, mennyi hőt igényel a ház. Ebből derül ki a gép mérete, és az is, ha a jelenlegi radiátorokkal nem lenne gazdaságos. Ezt előre megmondjuk.",
      },
      {
        title: "Rendszerterv",
        body: "Eldöntjük, mi legyen: önálló hőszivattyú vagy hibrid üzem a meglévő kazánnal. Megtervezzük a kültéri egység helyét és a hidraulikát.",
      },
      {
        title: "Telepítés",
        body: "Kültéri egység, hidraulikus bekötés, puffertároló, szabályozás. A meglévő fűtésrendszerre illesztjük, nem kell mindent újraépíteni.",
      },
      {
        title: "Beszabályozás és betanítás",
        body: "Beállítjuk a fűtésgörbét és a szabályozást, majd megmutatjuk a használatát. Az első szezonban is elérhetők vagyunk kérdésekkel.",
      },
    ],
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
