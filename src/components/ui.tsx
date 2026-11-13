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

export function PageHero({ title, intro, crumbs }: { title: string; intro?: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-3">
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">/</span>}
              {c.href ? <Link className="hover:text-brand-700 underline-offset-2 hover:underline" href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900">{title}</h1>
        {intro && <p className="mt-3 max-w-3xl text-lg text-slate-600">{intro}</p>}
      </div>
    </section>
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
      <span className="font-semibold mr-1">{tr("share", lang)}:</span>
      {items.map(([n, h]) => (
        <a key={n} href={h} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-3 py-1 hover:bg-brand-50">{n}</a>
      ))}
    </div>
  );
}
