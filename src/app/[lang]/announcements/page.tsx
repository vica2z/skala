import { PageHero, PostCard } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";
import { posts } from "@/lib/data";

export default async function Announcements({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  return (
    <>
      <PageHero lang={lang} info="news" kicker={tr("activities", lang)} title={tr("announcements", lang)} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("activities", lang), href: `/${lang}/activities` }, { label: tr("announcements", lang) }]} />
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-6 md:grid-cols-3">
        {posts.filter((p) => p.kind === "announcement").map((p) => <PostCard key={p.slug} p={p} lang={lang} />)}
      </div>
    </>
  );
}
