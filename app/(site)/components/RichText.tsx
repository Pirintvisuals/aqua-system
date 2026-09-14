import type { ReactNode } from "react";

/* A szerkesztobol jovo szoveg (Markdoc) megjelenitese. A szerkeszto csak
   bekezdest es felkovert enged, ezert eleg egy kis sajat bejaro: igy a
   kiemeles pontosan a meglevo stilust kapja, es nem kerul <p> a <p>-be.

   A tipus szandekosan csak a hasznalt mezoket irja le: a Keystatic sajat
   Markdoc peldanyt hoz, aminek a Node tipusa nem egyezik a mienkkel. */
type Node = {
  type: string;
  attributes: Record<string, unknown>;
  children: Node[];
};
export default function RichText({
  node,
  strongClassName = "font-semibold text-ink",
}: {
  node: Node;
  strongClassName?: string;
}) {
  const render = (n: Node, key: number): ReactNode => {
    const children = n.children.map(render);
    switch (n.type) {
      case "paragraph":
        return <p key={key}>{children}</p>;
      case "text":
        return String(n.attributes.content ?? "");
      case "strong":
        return (
          <strong key={key} className={strongClassName}>
            {children}
          </strong>
        );
      case "em":
        return <em key={key}>{children}</em>;
      case "softbreak":
        return " ";
      case "hardbreak":
        return <br key={key} />;
      default:
        return children.length ? <span key={key}>{children}</span> : null;
    }
  };
  return <>{node.children.map(render)}</>;
}
