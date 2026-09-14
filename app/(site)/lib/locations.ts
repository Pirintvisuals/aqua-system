import { REVIEWS, type Review } from "./reviews";

/* ------------------------------------------------------------------ *
 *  Települési oldalak.
 *
 *  FONTOS elv: CSAK olyan településnek készül önálló oldal, ahonnan
 *  valódi ügyfélvéleményünk van. Így minden oldalon van egyedi, saját
 *  tartalom (idézetek, évszámok), nem csak a településnév cserélődik.
 *
 *  A pusztán névcserés, egyébként azonos oldalak "doorway page"-nek
 *  minősülnek, és a Google bünteti őket. A többi kiszolgált település
 *  ezért listaként szerepel, nem külön oldalként.
 * ------------------------------------------------------------------ */

export type Location = {
  slug: string;
  /** Település neve, ahogy kiírjuk. */
  name: string;
  /** "Érden", "Budaörsön" - a ragozott alak a címekhez. */
  inName: string;
  reviews: Review[];
};

/** Ékezetek nélküli, URL-barát alak. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* A magyar helyhatározó rag nem szabályos, ezért kézzel soroljuk fel.
   Ha új település jön be, ide is vedd fel, különben a cím döcögni fog. */
const IN_FORM: Record<string, string> = {
  Érd: "Érden",
  Törökbálint: "Törökbálinton",
  Budaörs: "Budaörsön",
  Budapest: "Budapesten",
  Göd: "Gödön",
  Martonvásár: "Martonvásáron",
  Páty: "Pátyon",
  Százhalombatta: "Százhalombattán",
  Diósd: "Diósdon",
  Tárnok: "Tárnokon",
  Halásztelek: "Halásztelken",
};

/** "Budapest, XII. kerület" -> "Budapest" */
function townOf(place: string): string {
  return place.split(",")[0].trim();
}

const grouped = new Map<string, Review[]>();
for (const review of REVIEWS) {
  const town = townOf(review.place);
  const list = grouped.get(town);
  if (list) list.push(review);
  else grouped.set(town, [review]);
}

export const LOCATIONS: Location[] = [...grouped.entries()]
  // A legtöbb visszajelzéssel rendelkező település elöl.
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "hu"))
  .map(([name, reviews]) => ({
    slug: slugify(name),
    name,
    inName: IN_FORM[name] ?? `${name} településen`,
    reviews,
  }));

export function findLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
