import { Suspense } from "react";
import SiteSearch from "@/components/SiteSearch";
import { PageHero } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";

export default async function Search({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  return (
    <>
      <PageHero title={tr("search", lang)} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("search", lang) }]} />
      <Suspense><SiteSearch lang={lang} /></Suspense>
    </>
  );
}
