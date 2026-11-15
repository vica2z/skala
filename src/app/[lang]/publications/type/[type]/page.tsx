import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import PubExplorer from "@/components/PubExplorer";
import { PageHero } from "@/components/ui";
import { isLang, langs, t, tr, type Lang } from "@/lib/i18n";
import { pubTypeIntro, pubTypes, publications, type PubType } from "@/lib/data";

export function generateStaticParams() {
  return langs.flatMap((lang) => Object.keys(pubTypes).map((type) => ({ lang, type })));
}

export default async function TypePage({ params }: { params: Promise<{ lang: string; type: string }> }) {
  const { lang: raw, type } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  if (!(type in pubTypes)) notFound();
  const k = type as PubType;
  const count = publications.filter((p) => p.type === k).length;
  return (
    <>
      <PageHero lang={lang} info="pubTypes" kicker={tr("publications", lang)} title={t(pubTypes[k], lang)} intro={t(pubTypeIntro[k], lang)}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("publications", lang), href: `/${lang}/publications` }, { label: t(pubTypes[k], lang) }]}>
        <p className="mt-6 text-sm text-brand-100"><strong className="text-white text-lg">{count}</strong> {lang === "id" ? "dokumen" : "documents"}</p>
      </PageHero>
      <nav aria-label={tr("type", lang)} className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 flex gap-1 overflow-x-auto">
          {(Object.keys(pubTypes) as PubType[]).map((x) => (
            <Link key={x} href={`/${lang}/publications/type/${x}`} aria-current={x === k ? "page" : undefined}
              className={`whitespace-nowrap px-4 py-3.5 text-sm font-semibold border-b-2 ${x === k ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500 hover:text-ink"}`}>{t(pubTypes[x], lang)}</Link>
          ))}
        </div>
      </nav>
      <Suspense><PubExplorer lang={lang} lockedType={k} /></Suspense>
    </>
  );
}
