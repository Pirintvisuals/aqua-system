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
  /**
   * Hosszabb, szakmai blokkok az aloldal aljára. Ez az a tudás, amit a
   * felmérésen szoktunk elmondani: itt van leírva, hogy előre lehessen
   * olvasni. Kereséssel is ezeket a kérdéseket írják be.
   */
  deep?: { title: string; body: string[] }[];
  /** Gyakori kérdések erre a szolgáltatásra. */
  faq?: { q: string; a: string }[];
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
    deep: [
      {
        title: "A kazáncsere nem csak a kazán cseréje",
        body: [
          "A régi készülék helyére nem lehet egyszerűen felakasztani egy újat. A kondenzációs kazán égésterméke jóval hidegebb, és savas kondenzvizet ad, amit a régi, kéménybe kötött rendszer nem visel el: ilyenkor a kéményt bélelni kell, jellemzően műanyag vagy nemesacél béléssel. Ez a csere egyik legnagyobb rejtett tétele, ezért mi már a felmérésen megnézzük.",
          "Kell hozzá kondenzvíz-elvezetés is a csatorna felé, és ellenőrizni kell, hogy a meglévő gázvezeték átmérője elbírja-e az új készüléket. Ha a rendszerben évtizedes iszap van, azt is kezelni kell, különben az új hőcserélő fogja beszedni. Ezért szerepel a munkában rendszermosás és szűrő is, ahol indokolt.",
        ],
      },
      {
        title: "Ettől fér bele egy napba",
        body: [
          "Az egynapos csere nem sietségből jön, hanem előkészítésből. A felméréskor eldől a készülék típusa, a kémény sorsa és minden szerelvény, amire szükség lesz, és ezek a csere napján már az autóban vannak. A munkára nem egy ember érkezik, hanem a csapat, előre kiosztott feladatokkal.",
          "Ezért nincs olyan, hogy a fél munka után derül ki valami, és ott áll a ház fűtés nélkül a hétvégén. A cél mindig ugyanaz: reggel bontunk, estére meleg van.",
        ],
      },
    ],
    faq: [
      {
        q: "Mennyi ideig marad fűtés nélkül a ház?",
        a: "Jellemzően egy munkanapig, reggeltől estig. A régi készülék leszerelése és az új beüzemelése ugyanazon a napon megtörténik, tehát nem kell éjszakára hideg házban maradni.",
      },
      {
        q: "Kell-e engedély a kazáncseréhez?",
        a: "A készülékcseréhez tervdokumentáció és a gázszolgáltató felé történő ügyintézés is tartozik, és gázkészüléket csak regisztrált gázszerelő cserélhet. Ezt a részt teljes egészében mi visszük végig, neked nem kell hivatalt járnod.",
      },
      {
        q: "Mi lesz a régi készülékkel?",
        a: "Leszereljük és elszállítjuk, ez benne van az árban. Nem marad nálad egy bontott kazán, amivel kezdened kell valamit.",
      },
      {
        q: "Használható marad a régi kémény?",
        a: "Kondenzációs kazánnál általában nem, mert az égéstermék hidegebb és savas kondenzvizet ad. Ilyenkor bélelés kell, amit szintén mi csinálunk meg. A felmérésen ez az egyik első dolog, amit megnézünk.",
      },
      {
        q: "Mit kell előkészítenem a csere napjára?",
        a: "Gyakorlatilag semmit, csak a szabad hozzáférést a kazánhoz és a kéményhez. A takarítás és a rendrakás a munka része.",
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
    deep: [
      {
        title: "A nyomvonal a legfontosabb döntés",
        body: [
          "Egy gépészeti rendszer nagy része a falban és az aljzatban tűnik el, és onnan tíz év múlva már nem lehet olcsón előszedni. Ezért a nyomvonalakat előre végiggondoljuk és dokumentáljuk: hol fut a cső, hol van elzáró, melyik kör hova tartozik.",
          "Ugyanezért kerülnek hozzáférhető helyre az elzárók, és ezért címkézzük az osztó-gyűjtő köreit. Ez a néhány óra többletmunka az, ami miatt egy későbbi szerelő nem a falat fogja bontani, hanem elzár egy csapot.",
        ],
      },
      {
        title: "Padlófűtés és radiátor egy rendszerben",
        body: [
          "A padlófűtés alacsony, jellemzően 35-40 fokos előremenő vízzel dolgozik, a radiátor viszont ennél melegebbet kér. A kettő egy rendszerben csak akkor működik jól, ha külön kör és keverőszelep szolgálja ki őket, és a köröket a végén tényleg beszabályozzák.",
          "Ez azért nem részletkérdés, mert a kondenzációs kazán éppen az alacsony előremenő hőmérsékleten hozza a legjobb hatásfokot. Egy jól méretezett padlófűtéssel a készülék abban a tartományban dolgozik, ahol a legtöbbet adja vissza a gázból.",
        ],
      },
    ],
    faq: [
      {
        q: "Mikor érdemes bevonni a gépészt?",
        a: "Minél előbb, ideális esetben még a tervek véglegesítése előtt. A legdrágább hibák ott keletkeznek, ahol a gépészet csak kész falakhoz érkezik meg.",
      },
      {
        q: "Lehet padlófűtést építeni régi házba?",
        a: "Sok esetben igen, de nem mindegy, milyen a szigetelés és mennyi az aljzatra rendelkezésre álló magasság. Ezt felmérés és hőigény-számítás után tudjuk megmondani, találgatni nem szoktunk.",
      },
      {
        q: "Ki intézi az engedélyeket és a gázos ügyintézést?",
        a: "Mi. A gázvezeték kiépítéséhez tervdokumentáció és szolgáltatói ügyintézés tartozik, ez a munka része.",
      },
      {
        q: "Mit jelent a nyomáspróba?",
        a: "A kész, de még nem takart rendszert nyomás alá helyezzük, és figyeljük, tartja-e. Ez az a lépés, ami után nyugodtan lehet betonozni és burkolni.",
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
    deep: [
      {
        title: "Mi történik egy karbantartáson",
        body: [
          "A karbantartás nem egy pillantás a készülékre. Megtisztítjuk az égőt és a hőcserélőt, ellenőrizzük az égéstermék összetételét, a gáznyomást és a biztonsági elemek működését, átnézzük a tágulási tartály előnyomását és a fűtővíz állapotát.",
          "Ezek azok a dolgok, amik lassan romlanak, és ezért nem tűnnek fel: a rendszernyomás lassan elszivárog, a tágulási tartály lelappad, a hőcserélőn vízkő rakódik. Ha évente egyszer valaki ránéz, ezekből nem lesz szezon közepi leállás.",
        ],
      },
      {
        title: "Ez nem ugyanaz, mint a kéményseprő",
        body: [
          "A kéményellenőrzés az égéstermék-elvezetőre vonatkozik, és külön szolgáltatás. A gázkészülék karbantartása ettől független, és a tulajdonos felelőssége marad akkor is, ha a kéményseprő éppen járt a háznál.",
          "A gyártók kiterjesztett garanciája is ehhez a karbantartáshoz kötődik, nem a kéményellenőrzéshez. Egy kihagyott év akár egy tízéves garanciát is elvihet.",
        ],
      },
    ],
    faq: [
      {
        q: "Kötelező az éves karbantartás?",
        a: "A gyártói garancia feltételeként igen: a kiterjesztett garancia szakszerviz által végzett, évenkénti ellenőrzéshez kötött. Ezen túl a saját érdeked is, mert a szezon közepi meghibásodások jelentős része megelőzhető.",
      },
      {
        q: "Mi történik, ha kihagyok egy évet?",
        a: "A készülék ettől még működhet, de a gyári kiterjesztett garancia elveszhet, és pont akkor derül ki, amikor egy drága alkatrész megy tönkre.",
      },
      {
        q: "Mennyi ideig tart egy karbantartás?",
        a: "Jellemzően egy-két óra készülékenként, a rendszer állapotától függően. A végén jegyzőkönyvet kapsz róla.",
      },
      {
        q: "Idegen készüléket is karbantartotok?",
        a: "A karbantartási szerződéseinket elsősorban az általunk beépített rendszerekre kötjük, mert azok teljes előéletét ismerjük. Javítást, hibakeresést önálló szolgáltatásként nem vállalunk: a profilunk a kazáncsere.",
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
    deep: [
      {
        title: "Mikor éri meg, és mikor nem",
        body: [
          "A hőszivattyú annál gazdaságosabb, minél alacsonyabb hőmérsékletű vízzel elég fűteni a házat. Padlófűtéssel vagy nagy felületű radiátorokkal ez adott, egy régi, 70-80 fokos előremenőre méretezett radiátoros rendszernél viszont a gép folyamatosan a rossz tartományban dolgozna.",
          "Ezért kezdjük mindig hőigény-számítással, és ezért mondjuk meg őszintén, ha a jelenlegi leadókkal nem érné meg. Egy rosszul illesztett hőszivattyú nem olcsóbb fűtés, csak drágább villanyszámla.",
        ],
      },
      {
        title: "Hibrid üzem a meglévő kazánnal",
        body: [
          "Nem muszáj mindent egyszerre lecserélni. Hibrid üzemben a hőszivattyú viszi az alapterhelést az év nagy részében, és csak a leghidegebb napokon kapcsol be mellé a gázkazán.",
          "Így a meglévő rendszer megmarad tartaléknak, a beruházás pedig lépcsőzetesen megy végbe. Azt a pontot, ahol a váltás történik, a beszabályozásnál mi állítjuk be.",
        ],
      },
    ],
    faq: [
      {
        q: "Elég lesz a meglévő radiátor?",
        a: "Attól függ, mekkora felületűek és milyen a ház szigetelése. A hőigény-számítás után meg tudjuk mondani, hogy elég-e, kell-e néhány leadót cserélni, vagy ebben a formában nem érné meg.",
      },
      {
        q: "Mennyire hangos a kültéri egység?",
        a: "A mai készülékek halkak, de nem néma gépek. A telepítés helyét ezért is beszéljük meg előre, figyelve a hálószobákra és a szomszéd telekhatárára.",
      },
      {
        q: "Működik télen, fagyban is?",
        a: "Igen, a levegő-víz hőszivattyúk mínuszban is fűtenek, csak romlik a hatékonyságuk. Éppen ezért ajánlunk sok helyre hibrid üzemet, ahol a leghidegebb napokat a kazán viszi.",
      },
      {
        q: "Kell hozzá külön villamos bekötés?",
        a: "A gép teljesítményétől függően igen, és a szolgáltató felé bejelentési kötelezettség is tartozhat hozzá. Ezt a felmérésen tisztázzuk, mielőtt bármit megrendelnél.",
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
