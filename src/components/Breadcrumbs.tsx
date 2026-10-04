import Link from "next/link";

export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((t, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {t.href ? (
              <Link href={t.href} className="hover:text-blue-600 hover:underline">
                {t.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-slate-700">{t.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
