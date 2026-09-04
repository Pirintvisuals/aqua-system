/* ------------------------------------------------------------------ *
 *  VALÓS ügyfélvélemények - szó szerint, ahogy az ügyfelek megírták.
 *
 *  Ezek nem minták: a szövegen ne "szépíts", ne rövidítsd bele az
 *  értelmét, és ne találj ki újat. Ha egy vélemény lekerül, töröld
 *  innen - a `rating` mindig az legyen, amit az ügyfél adott.
 *
 *  Csillagok: 11 db ötcsillagos + 1 db négycsillagos.
 * ------------------------------------------------------------------ */

export type Review = {
  name: string;
  place: string;
  year: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Bekezdésenként tördelve, ahogy az eredeti szöveg állt. */
  body: string[];
  /** Kiemelt vélemény - ez kerül előre és a rövid nézetbe. */
  featured?: boolean;
};

export const REVIEWS: Review[] = [
  {
    name: "P. Erzsébet",
    place: "Törökbálint",
    year: "2024",
    rating: 5,
    featured: true,
    body: [
      "Közel húsz éve, hogy Aqua System Service Kft. szakemberei először dolgoztak az otthonunkban. Azóta számos alkalommal voltak segítségünkre. A csaptelep cserétől a kazáncserén át, a teljes fűtési és vízrendszer telepítésig mindenben számíthattunk rájuk. Gyorsan, pontosan, korrekt áron dolgoznak, és a munkájukért mindig garanciát vállalnak. Nem könnyű ma megbízható szakembert találni, jó hogy tudunk kihez fordulni. Szívből ajánlom őket.",
    ],
  },
  {
    name: "CS.K. Ildikó",
    place: "Érd",
    year: "2025",
    rating: 5,
    featured: true,
    body: [
      "A cég két alkalommal dolgozott nálunk, első alkalommal komplett fűtést, melegvizet és központi porszívót szereltek, másodjára kazánt cseréltek – 17 év különbséggel, Érden. Ez önmagában is sokat elmond: ha valakihez ennyi idő után is bizalommal fordulunk, az nem véletlen. Számomra a legfontosabb értékek a korrektség, megbízhatóság és kiszámíthatóság. Azt várom, hogy a munkát akkor, úgy és annyiért végezzék el, ahogyan megállapodtunk – és ez mindkét alkalommal maximálisan teljesült. Pontosak, tisztességesek, és a szakértelmük megkérdőjelezhetetlen. Csak ajánlani tudom őket mindenkinek, aki megbízható, kiszámítható szerelőt keres.",
    ],
  },
  {
    name: "M. György",
    place: "Érd",
    year: "2025",
    rating: 5,
    featured: true,
    body: [
      "25 éve veszem igénybe a szolgáltatásukat. (vízhálózat, gázszerelés, kondenzációs gázkazán csere stb.)",
      "Megbízható, jó minőségű munkavégzés a jellemző. Korrekt szakmai tanácsok, új berendezések-eszközök beszerzése, kezelésének a bemutatása.",
      "Mindenkinek ajánlom Őket.",
    ],
  },
  {
    name: "K. Zoltán",
    place: "Budaörs",
    year: "2025",
    rating: 5,
    body: [
      "Bátran tudom ajánlani az Aqua System-et. Régi nyílt égésterű kazánomat cseréltettem modern kondenzációs és tárolóval kiegészített kazánra. Minden gördülékenyen működött, pontos felmérés és árajánlat adás után megoldották a kémény bélelést, fűtés csővezetékek áthelyezését és falba süllyesztését, radiátor cseréket, engedélyeztetést és dokumentációt, beüzemelést. Nagyon flexibilisek és segítőkészek, megvárták amíg a fürdőszoba felújítás is megtörtént, hogy az új kazán már az újra csempézett falra kerüljön rá, a rendszer hibamentesen üzemel 2025 ősz óta.",
    ],
  },
  {
    name: "B. Brigitta",
    place: "Érd",
    year: "2025",
    rating: 5,
    body: [
      "A tulajdonost már ismertem korábbról, dolgoztunk is együtt, úgyhogy amikor kiderült, hogy le kéne cserélnünk a kazánt, nem is nagyon gondolkodtam másban, automatikusan őt kerestem meg. Ráadásul mindketten érdiek vagyunk, ami még jól is jött.",
      "Az egész folyamat meglepően egyszerű volt, gyorsan kijöttek, átnéztek mindent, elmondták, hogy mire számítsunk, és úgy is történt. A beszerelés napján időben érkeztek, gyorsan és tisztán dolgoztak. Még a régi kazánt is elvitték.",
      "Az új kazán azóta is jól működik. Őszintén ajánlom őket mindenkinek, aki készülékcserében gondolkodik.",
    ],
  },
  {
    name: "F. Tibor",
    place: "Budapest, XII. kerület",
    year: "2025",
    rating: 5,
    body: [
      "Régi Buderus márkájú gázkazánomat Viessman Vitodens kazánra cseréltem. A cserét és az ezzel párhuzamosan szükségessé váló kisebb átalakításokat az Aqua System Kft végezte. Munkájukkal és a hozzáállásukkal maradéktalanul meg vagyok elégedve. Ez már a második fűtési idény, és a rendszer kiválóan működik. A menet közben felmerülő kisebb problémák kezelésére mindig készségesen és gyorsan kijönnek. Nagy Ferenc cégvezetővel különösen jó, gördülékeny kapcsolatom alakult ki.",
    ],
  },
  {
    name: "N.V. László",
    place: "Érd",
    year: "2025",
    rating: 5,
    body: [
      "Szeretném megköszönni a nálam elvégzett munkát! Minden rendben volt. A megállapodásnak megfelelően történt minden. Az Ön által ajánlott készülék kiválóan üzemel!",
      "Külön köszönöm, hogy szakemberei olyan rendben és tisztán hagytak mindent, mint amilyen a munka megkezdése előtt volt.",
      "Jó szívvel fogom ajánlani cégüket mindenkinek, aki hasonló átalakítást tervez!",
    ],
  },
  {
    name: "Németh László",
    place: "Göd",
    year: "2025",
    rating: 5,
    body: [
      "Nagyon gördülékenyen ment az Aqua-System Kft-vel a kazáncsere. Minden a megbeszélt időben és keretek között történt. Sokkal komfortosabb lett a házunk.",
      "Ezen túlmenően pedig nem csak a cégvezető, hanem az összes kolléga, akivel kapcsolatba kerültem a céggel, nagyon udvariasan és profin szolgálta ki az igényeinket, illetve segítettek átgondolni a lehetséges megoldásokat.",
    ],
  },
  {
    name: "K. Zoltán",
    place: "Martonvásár",
    year: "2025",
    rating: 5,
    body: [
      "Nagyon gyorsan és precízen végezték a munkát! Reggel a megbeszélt időpontban érkeztek és az ígért időpontra végeztek, maguk után takarítanak, tisztán adják át a munkát. Azóta is hibátlanul működik a kazán.",
    ],
  },
  {
    name: "S. János",
    place: "Páty",
    year: "2025",
    rating: 5,
    body: [
      "Az Aqua System csapata gyorsan rendelkezésre állt, mindenben profi tanácsot és segítséget kaptam, a kivitelezés is teljesen zökkenőmentes zajlott.",
      "A kazán és a melegvíz-tároló már 4 éve hibátlanul működik.",
      "Ajánlom őket mindenkinek, aki megbízható és szakszerű megoldást keres!",
    ],
  },
  {
    name: "P. Tamás",
    place: "Százhalombatta",
    year: "2025",
    rating: 5,
    body: [
      "Csak ajánlani tudom a céget.",
      "Minden a megbeszéltek szerint zajlott, az egyedi kéréseket maximálisan figyelembe vették.",
      "Gyors, pontos, tiszta munkát végeztek, udvarias, segítőkész szerelőkkel találkoztam.",
    ],
  },
  {
    name: "C. Péter",
    place: "Érd",
    year: "2025",
    rating: 4,
    body: [
      "Szeretném teljes elégedettségemet kifejezni az Önök által elvégzett kazáncserével kapcsolatos munkájukkal kapcsolatosan: gyors, a piaci viszonyoknak megfelelő árajánlat, profi kivitelezés, szakszerű munkavégzés, rövid határidővel befejezett, kifogástalan munka.",
      "Köszönöm, minden jót kívánva.",
    ],
  },
];

/** Átlag és darabszám - mindig a fenti tömbből számolva, kézzel ne írd át. */
export const REVIEW_COUNT = REVIEWS.length;
export const REVIEW_AVERAGE =
  Math.round((REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEW_COUNT) * 10) /
  10;
