import Link from "next/link";
import { PageHero } from "@/components/ui";
import YouTube from "@/components/YouTube";
import { isLang, t, tr, type Lang } from "@/lib/i18n";
import { videos } from "@/lib/data";

export default async function Videos({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ cat?: string }> }) {
  const { lang: raw } = await params;
  const { cat } = await searchParams;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const cats: [string, string][] = [["", tr("all", lang)], ["story", lang === "id" ? "Cerita" : "Stories"], ["explainer", lang === "id" ? "Penjelasan" : "Explainers"], ["event", lang === "id" ? "Acara" : "Events"]];
  const list = videos.filter((v) => !cat || v.cat === cat);
  return (
    <>
      <PageHero lang={lang} info="video" kicker={tr("activities", lang)} title="Video" intro={lang === "id" ? "Video disematkan dari kanal YouTube SKALA, lengkap dengan teks." : "Embedded from SKALA's YouTube channel, with captions."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("activities", lang), href: `/${lang}/activities` }, { label: "Video" }]} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map(([k, l]) => (
            <Link key={k} href={`/${lang}/videos${k ? `?cat=${k}` : ""}`} aria-current={(cat ?? "") === k ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold border ${(cat ?? "") === k ? "bg-brand-600 text-white border-brand-600" : "border-slate-300 hover:bg-brand-50"}`}>{l}</Link>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <article key={v.slug} className="group rounded-2xl border border-slate-200 p-3 hover:shadow-lg transition">
              <YouTube id={v.youtube} title={t(v.title, lang)} lang={lang} />
              <div className="p-2"><h2 className="font-semibold leading-snug">{t(v.title, lang)}</h2><p className="mt-1 text-xs text-slate-500">{v.minutes} min · {lang === "id" ? "teks tersedia" : "captions on"}</p></div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
