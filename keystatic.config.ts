import { config, fields, singleton } from "@keystatic/core";

/* Tartalomszerkeszto (Keystatic).

   Fejlesztes kozben (npm run dev) a mentes kozvetlenul a content/ mappaba
   ir. Elesben a Keystatic Cloud-on at a GitHub repoba commitol, amitol a
   Vercel ujraepiti az oldalt, kb. egy perc alatt.

   A mezok cimkei magyarok, mert az ugyfel ezeket latja. A kulcsok angolok,
   mert azokat csak a kod latja. */

/* Csak felkover kiemeles: se cimsor, se lista, se link. Igy a szoveg nem
   tudja szetverni a szekcio kinezetet. */
const boldOnly = {
  bold: true,
  italic: false,
  strikethrough: false,
  code: false,
  heading: [],
  blockquote: false,
  orderedList: false,
  unorderedList: false,
  table: false,
  link: false,
  image: false,
  divider: false,
  codeBlock: false,
} as const;

const shortText = (label: string, max: number, description?: string) =>
  fields.text({
    label,
    description: description ?? `Legfeljebb ${max} karakter.`,
    validation: { length: { min: 1, max } },
  });

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : { kind: "cloud" },
  cloud: {
    // A keystatic.cloud-on letrehozott csapat/projekt neve.
    project: "aqua-system/aqua-system",
  },
  ui: {
    brand: { name: "Aqua System" },
    navigation: {
      Főoldal: ["homeHero"],
      Rólunk: ["team"],
    },
  },
  singletons: {
    homeHero: singleton({
      label: "Nyitó szekció",
      path: "content/fooldal/hero/",
      schema: {
        eyebrowStrong: shortText(
          "Felső felirat – kiemelt rész",
          20,
          "A címsor fölötti kis sor félkövér eleje, pl. „50+ év”.",
        ),
        eyebrowText: shortText(
          "Felső felirat – folytatás",
          30,
          "A kiemelt rész után álló szöveg, pl. „tapasztalat”.",
        ),
        titleHighlight: shortText(
          "Címsor – kék rész",
          40,
          "A nagy címsor kék színű eleje. Legfeljebb 40 karakter.",
        ),
        title: shortText(
          "Címsor – folytatás",
          70,
          "A kék rész után álló, sötét színű szöveg. Legfeljebb 70 karakter.",
        ),
        intro: fields.markdoc({
          label: "Bevezető szöveg",
          description:
            "Kiemeléshez jelöld ki a szavakat, és nyomd meg a B gombot (vagy Ctrl+B).",
          options: boldOnly,
        }),
        trustPoints: fields.array(shortText("Pont", 40), {
          label: "Pipás pontok a gombok alatt",
          description: "Legfeljebb 4 rövid pont.",
          itemLabel: (props) => props.value || "Új pont",
          validation: { length: { min: 1, max: 4 } },
        }),
        photo: fields.image({
          label: "Fotó",
          description:
            "Álló vagy négyzetes kép működik a legjobban. A kép közepe mindig látszik, a széleiből a képernyőtől függően levágódhat.",
          directory: "public/images/fooldal",
          publicPath: "/images/fooldal/",
          validation: { isRequired: true },
        }),
        photoAlt: shortText(
          "Mi látszik a fotón?",
          150,
          "Rövid leírás a Google-nek és a képernyőolvasóknak, pl. „Frissen beüzemelt kazán egy elkészült cserénél”.",
        ),
        guaranteeValue: fields.integer({
          label: "Garancia kártya – szám (%)",
          validation: { isRequired: true, min: 0, max: 100 },
        }),
        guaranteeText: shortText("Garancia kártya – szöveg", 40),
        chipText: shortText(
          "Kis címke a fotó sarkában",
          25,
          "Pl. „1 nap alatt kész”. Legfeljebb 25 karakter.",
        ),
        stats: fields.array(
          fields.object({
            value: fields.integer({
              label: "Szám",
              description: "Csak a szám, pl. 500. A számláló innen fut fel.",
              validation: { isRequired: true, min: 0 },
            }),
            suffix: fields.text({
              label: "Utána",
              description: "Pl. +, %, év, nap. Lehet üres is.",
              validation: { length: { max: 8 } },
            }),
            label: shortText("Felirat", 25),
          }),
          {
            label: "Számok a sötétkék sávban",
            description: "Pontosan 4 szám fér ki egy sorba.",
            itemLabel: (props) =>
              `${props.fields.value.value ?? ""}${props.fields.suffix.value} – ${props.fields.label.value}`,
            validation: { length: { min: 4, max: 4 } },
          },
        ),
      },
    }),

    team: singleton({
      label: "Csapat",
      path: "content/rolunk/csapat/",
      schema: {
        title: shortText("Cím", 60),
        intro: fields.text({
          label: "Bevezető szöveg",
          multiline: true,
          validation: { length: { min: 1, max: 300 } },
        }),
        members: fields.array(
          fields.object({
            name: shortText("Név", 40),
            role: shortText("Beosztás", 40),
            photo: fields.image({
              label: "Fotó",
              description:
                "Álló (3:4 arányú) portré. Ugyanabból a sorozatból érdemes, hogy a kártyák egységesek maradjanak.",
              directory: "public/images/csapat",
              publicPath: "/images/csapat/",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Csapattagok",
            description:
              "A sorrend húzással módosítható. Az utolsó sor automatikusan középre kerül.",
            itemLabel: (props) =>
              props.fields.name.value
                ? `${props.fields.name.value} – ${props.fields.role.value}`
                : "Új csapattag",
            validation: { length: { min: 1 } },
          },
        ),
      },
    }),
  },
});
