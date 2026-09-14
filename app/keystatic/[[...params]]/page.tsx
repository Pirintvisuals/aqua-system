/* Statikus exportnal csak a /keystatic oldal keszul el; a melyebb cimeket
   (/keystatic/singleton/...) a tarhely .htaccess-e irja erre at, a
   szerkeszto pedig a bongeszoben valt kepernyot. */
export function generateStaticParams() {
  return [{ params: [] }];
}

export default function Page() {
  return null;
}
