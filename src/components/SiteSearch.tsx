"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { t, tr, type Lang } from "@/lib/i18n";
import { glossary, posts, publications, pubTypes } from "@/lib/data";

export default function SiteSearch({ lang }: { lang: Lang }) {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hit = (s: string) => words.length > 0 && words.every((w) => s.toLowerCase().includes(w));

  const pubs = publications.filter((p) => hit(`${p.title.en} ${p.title.id} ${p.summary.en} ${p.summary.id}`));
  const news = posts.filter((p) => hit(`${p.title.en} ${p.title.id} ${p.lead.en} ${p.lead.id}`));
  const terms = glossary.filter((g) => hit(g.join(" ")));
  const total = pubs.length + news.length + terms.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <label htmlFor="sq" className="sr-only">{tr("search", lang)}</label>
      <input id="sq" type="search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr("searchPlaceholder", lang)}
        className="w-full rounded-full border border-slate-300 px-6 py-4 text-lg" />
      {words.length > 0 && <p className="mt-4 text-sm text-slate-600" aria-live="polite"><strong>{total}</strong> {tr("results", lang)}</p>}
      {[
        [tr("publications", lang), pubs.map((p) => ({ k: p.slug, href: `/${lang}/publications/${p.slug}`, title: t(p.title, lang), meta: t(pubTypes[p.type], lang) }))],
        [tr("activities", lang), news.map((p) => ({ k: p.slug, href: `/${lang}/activities/${p.slug}`, title: t(p.title, lang), meta: p.date }))],
        [tr("glossary", lang), terms.map((g) => ({ k: g[0], href: `/${lang}/glossary`, title: `${g[0]} – ${lang === "id" ? g[1] : g[2]}`, meta: tr("glossary", lang) }))],
      ].map(([label, items]) =>
        (items as { k: string; href: string; title: string; meta: string }[]).length > 0 && (
          <section key={label as string} className="mt-8">
            <h2 className="text-lg font-bold text-brand-900">{label as string}</h2>
            <ul className="mt-3 space-y-2">
              {(items as { k: string; href: string; title: string; meta: string }[]).map((i) => (
                <li key={i.k} className="rounded-xl border border-slate-200 p-4 hover:bg-brand-50">
                  <Link href={i.href} className="font-semibold">{i.title}</Link>
                  <p className="text-xs text-slate-500 mt-1">{i.meta}</p>
                </li>
              ))}
            </ul>
          </section>
        ),
      )}
      {words.length > 0 && total === 0 && <p className="mt-8 rounded-xl bg-slate-50 p-8 text-center">{tr("noResults", lang)}</p>}
    </div>
  );
}
