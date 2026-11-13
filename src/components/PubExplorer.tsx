"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { t, tr, type Lang } from "@/lib/i18n";
import { provinces, pubTypes, publications, themes } from "@/lib/data";
import { PubCard } from "./ui";

const PAGE = 8;

export default function PubExplorer({ lang }: { lang: Lang }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [shown, setShown] = useState(PAGE);
  const type = sp.get("type") ?? "";
  const theme = sp.get("theme") ?? "";
  const province = sp.get("province") ?? "";
  const year = sp.get("year") ?? "";

  function set(key: string, val: string) {
    const n = new URLSearchParams(sp.toString());
    if (val) n.set(key, val); else n.delete(key);
    setShown(PAGE);
    router.replace(`${pathname}?${n.toString()}`, { scroll: false });
  }

  const years = [...new Set(publications.map((p) => p.date.slice(0, 4)))];
  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return publications.filter((p) => {
      if (type && p.type !== type) return false;
      if (theme && p.theme !== theme) return false;
      if (province && p.province !== province) return false;
      if (year && !p.date.startsWith(year)) return false;
      const hay = (p.title.en + " " + p.title.id + " " + p.summary.en + " " + p.summary.id).toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [q, type, theme, province, year]);

  const sel = "w-full rounded-lg border border-slate-300 px-3 py-2 bg-white";
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1 space-y-5" aria-label={tr("filters", lang)}>
        <div>
          <label htmlFor="pq" className="font-semibold text-sm">{tr("search", lang)}</label>
          <input id="pq" type="search" value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }}
            placeholder={tr("searchPlaceholder", lang)} className={sel + " mt-1"} />
        </div>
        <fieldset>
          <legend className="font-semibold text-sm mb-2">{tr("type", lang)}</legend>
          <div className="flex flex-wrap gap-2">
            {[["", tr("all", lang)] as [string, string], ...Object.entries(pubTypes).map(([k, v]) => [k, t(v, lang)] as [string, string])].map(([k, v]) => (
              <button key={k} onClick={() => set("type", k)} aria-pressed={type === k}
                className={`rounded-full px-3 py-1 text-sm border ${type === k ? "bg-brand-600 text-white border-brand-600" : "border-slate-300 hover:bg-brand-50"}`}>{v}</button>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="ft" className="font-semibold text-sm">{tr("theme", lang)}</label>
          <select id="ft" className={sel + " mt-1"} value={theme} onChange={(e) => set("theme", e.target.value)}>
            <option value="">{tr("all", lang)}</option>
            {Object.entries(themes).map(([k, v]) => <option key={k} value={k}>{t(v, lang)}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="fp" className="font-semibold text-sm">{tr("province", lang)}</label>
          <select id="fp" className={sel + " mt-1"} value={province} onChange={(e) => set("province", e.target.value)}>
            <option value="">{tr("all", lang)}</option>
            {provinces.map((p) => <option key={p.slug} value={p.slug}>{t(p.name, lang)}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="fy" className="font-semibold text-sm">{tr("year", lang)}</label>
          <select id="fy" className={sel + " mt-1"} value={year} onChange={(e) => set("year", e.target.value)}>
            <option value="">{tr("all", lang)}</option>
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
        <button className="text-sm font-semibold text-brand-700 hover:underline" onClick={() => { setQ(""); router.replace(pathname); }}>{tr("clear", lang)}</button>
      </aside>

      <section className="lg:col-span-3" aria-live="polite">
        <p className="text-sm text-slate-600 mb-4"><strong>{list.length}</strong> {tr("results", lang)}</p>
        {list.length === 0 ? (
          <p className="rounded-xl bg-slate-50 p-8 text-center text-slate-600">{tr("noResults", lang)}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.slice(0, shown).map((p) => <PubCard key={p.slug} p={p} lang={lang} />)}
          </div>
        )}
        {shown < list.length && (
          <div className="mt-8 text-center">
            <button onClick={() => setShown(shown + PAGE)} className="rounded-full border border-brand-600 px-6 py-2.5 font-semibold text-brand-700 hover:bg-brand-50">{tr("loadMore", lang)}</button>
          </div>
        )}
      </section>
    </div>
  );
}
