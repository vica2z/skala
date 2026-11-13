import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cover, PageHero, PostCard, ShareBar } from "@/components/ui";
import { fmtDate, isLang, langs, t, tr, type Lang } from "@/lib/i18n";
import { posts, themes } from "@/lib/data";

export function generateStaticParams() {
  return langs.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

type P = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p || !isLang(lang)) return {};
  return { title: t(p.title, lang), description: t(p.lead, lang) };
}

export default async function Article({ params }: P) {
  const { lang: raw, slug } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug && x.kind === p.kind).slice(0, 3);
  return (
    <>
      <PageHero title={t(p.title, lang)} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("activities", lang), href: `/${lang}/activities` }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-slate-500">{fmtDate(p.date, lang)} · <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-brand-700">{t(themes[p.theme], lang)}</span></p>
        <div className="mt-6"><Cover seed={p.slug} label={tr("activityUpdates", lang)} /></div>
        <p className="mt-8 text-xl italic text-slate-700">{t(p.lead, lang)}</p>
        <div className="prose mt-6 text-lg">{p.body.map((b, i) => <p key={i}>{t(b, lang)}</p>)}</div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3" aria-label="Gallery">
          {[1, 2, 3, 4].map((i) => <Cover key={i} seed={p.slug + i} label={`${i}/4`} />)}
        </div>
        <div className="mt-8"><ShareBar lang={lang} title={t(p.title, lang)} /></div>
      </article>
      {more.length > 0 && (
        <section className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-extrabold text-brand-900 mb-6">{tr("related", lang)}</h2>
          <div className="grid gap-6 md:grid-cols-3">{more.map((m) => <PostCard key={m.slug} p={m} lang={lang} />)}</div>
        </section>
      )}
    </>
  );
}
