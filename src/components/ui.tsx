import Info from "./Info";
import type { ReqKey } from "@/lib/requirements";
import Link from "next/link";
import { fmtDate, t, tr, type Lang } from "@/lib/i18n";
import { pubTypes, themes, type Publication, type Post } from "@/lib/data";

const palette = ["from-brand-600 to-brand-900", "from-amber-500 to-orange-700", "from-sky-600 to-indigo-800", "from-emerald-500 to-teal-800", "from-rose-500 to-fuchsia-800", "from-cyan-600 to-blue-900"];

export function Cover({ seed, label, tall = false }: { seed: string; label: string; tall?: boolean }) {
  const n = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (
    <div aria-hidden className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${palette[n % palette.length]} ${tall ? "aspect-[3/4]" : "aspect-[16/9]"}`}>
      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx={20 + (n % 60)} cy={30} r="40" fill="white" />
        <circle cx={80} cy={90 - (n % 30)} r="25" fill="white" />
      </svg>
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-slate-800">{label}</span>
    </div>
  );
}

export function PageHero({ title, intro, crumbs, kicker, children, info, lang }: { title: string; intro?: string; crumbs: { label: string; href?: string }[]; kicker?: string; children?: React.ReactNode; info?: ReqKey; lang?: Lang }) {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      <div aria-hidden className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_85%_20%,#138a7f,transparent_45%),radial-gradient(circle_at_10%_90%,#e08e14,transparent_40%)]" />
      <svg aria-hidden className="absolute -right-10 -top-10 h-72 w-72 opacity-10" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="24" /><circle cx="100" cy="100" r="30" fill="white" /></svg>
      <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-100/80 mb-4">
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2 opacity-60">/</span>}
              {c.href ? <Link className="hover:text-white underline-offset-2 hover:underline" href={c.href}>{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
            </span>
          ))}
        </nav>
        {kicker && <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">{kicker}</p>}
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl">{title}{info && lang && <span className="ml-3 relative -top-1"><Info k={info} lang={lang} tone="dark" /></span>}</h1>
        {intro && <p className="mt-4 max-w-3xl text-lg text-brand-100">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({ children, href, more, info, lang }: { children: React.ReactNode; href?: string; more?: string; info?: ReqKey; lang?: Lang }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <h2 className="text-2xl md:text-3xl font-extrabold text-brand-900"><span className="block h-1 w-10 rounded bg-accent-400 mb-3" aria-hidden />{children}{info && lang && <span className="ml-2"><Info k={info} lang={lang} /></span>}</h2>
      {href && <Link className="shrink-0 font-semibold text-brand-700 hover:underline" href={href}>{more} →</Link>}
    </div>
  );
}

export function PubCard({ p, lang }: { p: Publication; lang: Lang }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-3 hover:shadow-lg transition">
      <Cover seed={p.slug} label={t(pubTypes[p.type], lang)} />
      <div className="p-2 flex flex-col grow">
        <p className="text-xs text-slate-500 mt-2">{fmtDate(p.date, lang)} · {t(themes[p.theme], lang)}</p>
        <h3 className="mt-1 font-bold text-ink leading-snug group-hover:text-brand-700">
          <Link href={`/${lang}/publications/${p.slug}`} className="after:absolute relative">{t(p.title, lang)}</Link>
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{t(p.summary, lang)}</p>
      </div>
    </article>
  );
}

export function PostCard({ p, lang }: { p: Post; lang: Lang }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-3 hover:shadow-lg transition">
      <Cover seed={p.slug} label={p.kind === "update" ? tr("activityUpdates", lang) : tr("announcements", lang)} />
      <div className="p-2">
        <p className="text-xs text-slate-500 mt-2">{fmtDate(p.date, lang)}</p>
        <h3 className="mt-1 font-bold leading-snug group-hover:text-brand-700"><Link href={`/${lang}/activities/${p.slug}`}>{t(p.title, lang)}</Link></h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{t(p.lead, lang)}</p>
      </div>
    </article>
  );
}

export function ShareBar({ lang, title }: { lang: Lang; title: string }) {
  const enc = encodeURIComponent(title);
  const items = [
    ["WhatsApp", `https://wa.me/?text=${enc}`],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=https://skala.or.id`],
    ["X", `https://x.com/intent/post?text=${enc}`],
    ["Email", `mailto:?subject=${enc}`],
  ];
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="font-semibold mr-1">{tr("share", lang)}:</span><Info k="share" lang={lang} />
      {items.map(([n, h]) => (
        <a key={n} href={h} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-3 py-1 hover:bg-brand-50">{n}</a>
      ))}
    </div>
  );
}
