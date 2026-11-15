import Link from "next/link";
import { PageHero, PostCard } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";
import { posts } from "@/lib/data";

export default async function Activities({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ kind?: string }> }) {
  const { lang: raw } = await params;
  const { kind } = await searchParams;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const k = kind === "announcement" ? "announcement" : "update";
  const tabs: [string, string][] = [["update", tr("activityUpdates", lang)], ["announcement", tr("announcements", lang)]];
  return (
    <>
      <PageHero lang={lang} info="news" title={tr("activities", lang)} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("activities", lang) }]} />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div role="tablist" className="flex gap-2 border-b border-slate-200 mb-8">
          {tabs.map(([v, l]) => (
            <Link key={v} role="tab" aria-selected={k === v} href={v === "announcement" ? `/${lang}/announcements` : `/${lang}/activities`}
              className={`px-4 py-2.5 -mb-px border-b-2 font-semibold ${k === v ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500 hover:text-ink"}`}>{l}</Link>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.filter((p) => p.kind === k).map((p) => <PostCard key={p.slug} p={p} lang={lang} />)}
        </div>
      </div>
    </>
  );
}
