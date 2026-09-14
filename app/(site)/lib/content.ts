import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";

/* A szerkesztheto tartalom (content/ mappa) olvasoja. Csak szerveren fut:
   a build a repoban levo fajlokbol dolgozik, az ugyfel mentese uj commit,
   amitol az oldal ujraepul. */
export const reader = createReader(process.cwd(), config);
