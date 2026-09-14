// Statikus export utan fut (npm run build).
//
// A Next 16 oldalvaltas elott elore letolti a kovetkezo oldal darabjait.
// A bongeszo ezeket lapitott nevvel keri:
//   /rolunk/__next.!KHNpdGUp.rolunk.__PAGE__.txt
// az export viszont mappakba irja oket:
//   out/rolunk/__next.!KHNpdGUp/rolunk/__PAGE__.txt
// Vercelen a szerver elvegzi a megfeleltetest, sima tarhelyen minden ilyen
// keres 404 lenne. Ez a szkript a mappas fajlok melle odamasolja a lapitott
// nevu peldanyt, igy barmilyen tarhelyen mukodik, .htaccess szabaly nelkul.

import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(process.argv[2] ?? "out");

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let copied = 0;

function flattenSegmentDir(segmentDir) {
  const parent = path.dirname(segmentDir);
  const prefix = path.basename(segmentDir); // pl. __next.!KHNpdGUp
  for (const file of walk(segmentDir)) {
    const rel = path.relative(segmentDir, file).split(path.sep).join(".");
    const target = path.join(parent, `${prefix}.${rel}`);
    if (!fs.existsSync(target)) {
      fs.copyFileSync(file, target);
      copied++;
    }
  }
}

function visit(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) flattenSegmentDir(full);
    else if (entry.name !== "_next") visit(full);
  }
}

if (!fs.existsSync(OUT)) {
  console.error(`flatten-segment-prefetch: nincs ${OUT} mappa`);
  process.exit(1);
}
visit(OUT);
console.log(`flatten-segment-prefetch: ${copied} fájl másolva`);
