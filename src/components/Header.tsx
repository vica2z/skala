"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { tr, type Lang } from "@/lib/i18n";

export default function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(16);
  const [q, setQ] = useState("");
  const other: Lang = lang === "id" ? "en" : "id";
  const switchHref = pathname.replace(/^\/(id|en)/, `/${other}`) || `/${other}`;
  const keepQuery = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.location.search) { e.preventDefault(); router.push(switchHref + window.location.search); }
  };

  useEffect(() => {
    try {
      const s = Number(localStorage.getItem("skala-size"));
      if (s) setSize(s);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--base-size", `${size}px`);
    try { localStorage.setItem("skala-size", String(size)); } catch {}
  }, [size]);

  const nav: { label: string; href?: string; children?: { label: string; href: string }[] }[] = [
    { label: tr("home", lang), children: [
      { label: tr("about", lang), href: `/${lang}/about` },
      { label: tr("governance", lang), href: `/${lang}/governance-strengthening` },
      { label: tr("contact", lang), href: `/${lang}/contact` },
    ] },
    { label: tr("activities", lang), children: [
      { label: tr("activityUpdates", lang), href: `/${lang}/activities` },
      { label: tr("announcements", lang), href: `/${lang}/activities?kind=announcement` },
      { label: tr("media", lang), href: `/${lang}/media` },
    ] },
    { label: tr("publications", lang), href: `/${lang}/publications` },
    { label: tr("glossary", lang), href: `/${lang}/glossary` },
    { label: tr("opportunities", lang), href: `/${lang}/opportunities` },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="bg-brand-900 text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <span className="opacity-90">{tr("banner", lang)}</span>
          <div className="flex items-center gap-3">
            <span className="sr-only sm:not-sr-only opacity-80">{tr("textSize", lang)}</span>
            <button aria-label="A-" className="px-1.5 rounded hover:bg-white/10" onClick={() => setSize(Math.max(14, size - 1))}>A-</button>
            <button aria-label="A+" className="px-1.5 rounded hover:bg-white/10" onClick={() => setSize(Math.min(22, size + 1))}>A+</button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3 lg:gap-6">
        <Link href={`/${lang}`} className="flex items-center gap-2 shrink-0" aria-label="SKALA">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-brand-600 text-white font-black">S</span>
          <span className="leading-tight">
            <span className="block font-extrabold tracking-wide text-brand-900">SKALA</span>
            <span className="hidden sm:block text-[11px] text-slate-500">Australia–Indonesia Partnership</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-[15px] font-medium" aria-label="Main">
          {nav.map((n) =>
            n.children ? (
              <div key={n.label} className="relative group">
                <button className="px-3 py-2 rounded-lg hover:bg-brand-50" aria-haspopup="true">{n.label} ▾</button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition absolute left-0 top-full pt-2">
                  <ul className="min-w-60 rounded-xl border border-slate-200 bg-white shadow-lg p-2">
                    {n.children.map((c) => (
                      <li key={c.href}><Link className="block rounded-lg px-3 py-2 hover:bg-brand-50" href={c.href}>{c.label}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={n.label} href={n.href!} className={`px-3 py-2 rounded-lg hover:bg-brand-50 ${pathname.startsWith(n.href!) ? "text-brand-700" : ""}`}>{n.label}</Link>
            ),
          )}
        </nav>

        <form
          className="ml-auto hidden md:flex items-center"
          role="search"
          onSubmit={(e) => { e.preventDefault(); router.push(`/${lang}/search?q=${encodeURIComponent(q)}`); }}
        >
          <label htmlFor="hq" className="sr-only">{tr("search", lang)}</label>
          <input id="hq" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr("searchPlaceholder", lang)}
            className="w-64 rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-brand-500" />
        </form>

        <div className="ml-auto md:ml-0 shrink-0 flex items-center rounded-full border border-slate-300 text-sm font-semibold overflow-hidden" role="group" aria-label="Language">
          <Link href={lang === "id" ? pathname : switchHref} onClick={lang === "id" ? undefined : keepQuery} className={`px-3 py-1.5 ${lang === "id" ? "bg-brand-600 text-white" : ""}`} hrefLang="id" lang="id">ID</Link>
          <Link href={lang === "en" ? pathname : switchHref} onClick={lang === "en" ? undefined : keepQuery} className={`px-3 py-1.5 ${lang === "en" ? "bg-brand-600 text-white" : ""}`} hrefLang="en" lang="en">EN</Link>
        </div>

        <button className="lg:hidden rounded-lg border px-3 py-2" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
          ☰<span className="sr-only">Menu</span>
        </button>
      </div>

      {open && (
        <nav id="mnav" className="lg:hidden border-t border-slate-200 bg-white px-4 pb-4" aria-label="Mobile">
          <form className="py-3" onSubmit={(e) => { e.preventDefault(); setOpen(false); router.push(`/${lang}/search?q=${encodeURIComponent(q)}`); }}>
            <input aria-label={tr("search", lang)} value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr("searchPlaceholder", lang)} className="w-full rounded-full border px-4 py-2" />
          </form>
          {nav.map((n) => (
            <div key={n.label} className="py-1">
              {n.children ? (
                <>
                  <p className="font-semibold py-1">{n.label}</p>
                  {n.children.map((c) => <Link onClick={() => setOpen(false)} key={c.href} href={c.href} className="block pl-4 py-1.5 text-slate-700">{c.label}</Link>)}
                </>
              ) : (
                <Link onClick={() => setOpen(false)} href={n.href!} className="block font-semibold py-1">{n.label}</Link>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
