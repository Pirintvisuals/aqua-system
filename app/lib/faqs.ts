/* Egyetlen forrás a GYIK-hez: a Faq komponens és a FAQPage strukturált
 * adat is innen olvas, hogy a kettő soha ne térjen el egymástól. */
export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Hogyan kapok azonnal árajánlatot?",
    a: "Indítsd el az online árajánló asszisztensünket a gombra kattintva. Pár egyszerű kérdés (milyen készüléked van, mekkora a lakás, mi a gond) után rögtön kapsz egy tájékoztató árat – hívás és várakozás nélkül, a nap 24 órájában. A végleges, fix árat a helyszíni felmérés után erősítjük meg.",
  },
  {
    q: "Tényleg egy nap alatt megvan a csere?",
    a: "A legtöbb gázkészülék cserét egyetlen munkanap alatt elvégezzük: a régi leszerelésétől az új beszereléséig és beüzemeléséig. A pontos időt a helyszíni felmérés után tudjuk megerősíteni.",
  },
  {
    q: "Mennyibe kerül a gázkészülék csere?",
    a: "A leggyorsabb, ha az online árajánló asszisztenssel indulsz: pár perc alatt kapsz egy tájékoztató árat. A végösszeget a helyszíni felmérés után, előre megmondjuk – utólagos ráfizetés és rejtett költség nélkül. Az ár tartalmazza a szerelést, a beüzemelést és az ügyintézést is.",
  },
  {
    q: "Ti intézitek az engedélyeztetést és a papírmunkát?",
    a: "Igen. A teljes folyamatot ránk bízhatod: a megfelelő készülék kiválasztásától az engedélyeztetésen át a dokumentált beüzemelésig mindent mi intézünk.",
  },
  {
    q: "Milyen garanciát adtok?",
    a: "Minden kivitelezésre és a beszerelt új gázkészülékre is hivatalos garanciát adunk. A munka után is elérhetőek maradunk.",
  },
  {
    q: "Honnan tudom, hogy cserélni kell a kazánomat?",
    a: "A gázkazánok átlagos élettartama 10–15 év. Ha a készülék 10 évnél idősebb, zajos, többet fogyaszt vagy már nem működik biztonságosan, érdemes szakemberrel megnézetni. A fenti kazán kalkulátor gyors tájékoztató jelzést ad, az online árajánló asszisztens pedig rögtön egy becsült cseréárat is mutat.",
  },
  {
    q: "Milyen területen vállaltok munkát?",
    a: "Elsősorban Budapesten és az agglomerációban dolgozunk (pl. Érd, Diósd, Tárnok, Halásztelek). Ha bizonytalan vagy, hívj minket, és egyeztetünk.",
  },
];
