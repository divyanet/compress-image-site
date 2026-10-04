import Link from "next/link";
import { Fragment } from "react";

/** Renders [[slug|anchor]] placeholders as internal links. */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\[\[.*?\]\])/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const m = part.match(/^\[\[(.*?)\|(.*)\]\]$/);
        if (m) {
          return (
            <Link key={i} href={`/${m[1]}/`} className="font-medium text-blue-600 hover:underline">
              {m[2]}
            </Link>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </span>
  );
}
