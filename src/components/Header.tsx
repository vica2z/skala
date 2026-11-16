"use client";

import Info, { InfoToggle } from "@/components/Info";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { tr, type Lang } from "@/lib/i18n";
import { pubTypes } from "@/lib/data";

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

  const pubLinks = Object.entries(pubTypes).map(([k, v]) => ({ label: v[lang], href: `/${lang}/publications/type/${k}` }));
  const nav: { label: string; href?: string; children?: { label: string; href: string }[] }[] = [
    { label: tr("home", lang), children: [
      { label: tr("about", lang), href: `/${lang}/about` },
      { label: tr("governance", lang), href: `/${lang}/governance-strengthening` },
      { label: tr("whereWeWork", lang), href: `/${lang}/provinces` },
      { label: tr("contact", lang), href: `/${lang}/contact` },
    ] },
    { label: tr("activities", lang), children: [
      { label: tr("activityUpdates", lang), href: `/${lang}/activities` },
      { label: tr("announcements", lang), href: `/${lang}/announcements` },
      { label: "Podcast", href: `/${lang}/podcasts` },
      { label: "Video", href: `/${lang}/videos` },
    ] },
    { label: tr("publications", lang), children: [{ label: tr("all", lang) + " " + tr("publications", lang).toLowerCase(), href: `/${lang}/publications` }, ...pubLinks] },
    { label: tr("glossary", lang), href: `/${lang}/glossary` },
    { label: tr("opportunities", lang), children: [
      { label: tr("vacancies", lang), href: `/${lang}/opportunities/vacancies` },
      { label: tr("procurement", lang), href: `/${lang}/opportunities/procurement` },
      { label: tr("internship", lang), href: `/${lang}/opportunities/internship` },
    ] },
  ];


  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="bg-brand-900 text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 py-1.5 flex items-center justify-between gap-2">
          <span className="flex flex-wrap items-center gap-3"><span className="opacity-90 hidden md:inline">{tr("banner", lang)}</span><span className="opacity-90 md:hidden">{lang === "id" ? "Prototipe · konten contoh" : "Prototype · sample content"}</span><span className="hidden sm:inline"><InfoToggle lang={lang} /></span></span>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="sr-only md:not-sr-only opacity-80">{tr("textSize", lang)}</span>
            <button aria-label="A-" className="px-1.5 rounded hover:bg-white/10" onClick={() => setSize(Math.max(14, size - 1))}>A-</button>
            <button aria-label="A+" className="px-1.5 rounded hover:bg-white/10" onClick={() => setSize(Math.min(22, size + 1))}>A+</button>
            <Info k="textSize" lang={lang} tone="dark" align="right" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-2 lg:gap-x-6">
        <Link href={`/${lang}`} className="flex min-w-0 items-center gap-2" aria-label="SKALA">
          <span className="grid shrink-0 place-items-center h-10 w-10 rounded-xl bg-brand-600 text-white font-black">S</span>
          <span className="leading-tight">
            <span className="block font-extrabold tracking-wide text-brand-900">SKALA</span>
            <span className="hidden sm:block text-[11px] text-slate-500">Australia–Indonesia Partnership</span>
          </span>
        </Link>

        <nav className="hidden lg:flex flex-wrap items-center gap-0.5 text-[15px] font-medium whitespace-nowrap" aria-label="Main">
          {nav.map((n) =>
            n.children ? (
              <div key={n.label} className="relative group">
                <button className="px-3 py-2 rounded-lg hover:bg-brand-50" aria-haspopup="true">{n.label} ▾</button>
                <div className={`hidden group-hover:block group-focus-within:block absolute top-full pt-2 z-50 ${n.children.length > 6 ? "left-1/2 -translate-x-1/2" : "left-0"}`}>
                  <ul className={`${n.children.length > 6 ? "grid grid-cols-2 w-[min(30rem,calc(100vw-2rem))]" : "min-w-60"} rounded-xl border border-slate-200 bg-white shadow-lg p-2`}>
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
          <Info k="navigation" lang={lang} />
        </nav>

        <form
          className="ml-auto hidden xl:flex items-center"
          role="search"
          onSubmit={(e) => { e.preventDefault(); router.push(`/${lang}/search?q=${encodeURIComponent(q)}`); }}
        >
          <label htmlFor="hq" className="sr-only">{tr("search", lang)}</label>
          <input id="hq" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr("searchPlaceholder", lang)}
            className="w-56 min-w-0 rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-brand-500" />
          <span className="ml-1.5"><Info k="siteSearch" lang={lang} align="right" /></span>
        </form>

        <div className="ml-auto xl:ml-0 shrink-0 flex items-center rounded-full border border-slate-300 text-sm font-semibold overflow-hidden" role="group" aria-label="Language">
          <Link href={lang === "id" ? pathname : switchHref} onClick={lang === "id" ? undefined : keepQuery} className={`px-3 py-1.5 ${lang === "id" ? "bg-brand-600 text-white" : ""}`} hrefLang="id" lang="id">ID</Link>
          <Link href={lang === "en" ? pathname : switchHref} onClick={lang === "en" ? undefined : keepQuery} className={`px-3 py-1.5 ${lang === "en" ? "bg-brand-600 text-white" : ""}`} hrefLang="en" lang="en">EN</Link>
        </div>

        <span className="shrink-0"><Info k="bilingual" lang={lang} align="right" /></span>

        <button className="lg:hidden shrink-0 rounded-lg border px-3 py-2" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
          ☰<span className="sr-only">Menu</span>
        </button>
      </div>

      {open && (
        <nav id="mnav" className="lg:hidden border-t border-slate-200 bg-white px-4 pb-4" aria-label="Mobile">
          <div className="sm:hidden pt-3 [&_button]:bg-brand-900 [&_button]:text-white [&_button]:text-xs"><InfoToggle lang={lang} /></div>
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
