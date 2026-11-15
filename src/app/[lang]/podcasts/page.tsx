import Link from "next/link";
import { Cover, PageHero } from "@/components/ui";
import { fmtDate, isLang, t, tr, type Lang } from "@/lib/i18n";
import { podcastDetail, podcasts } from "@/lib/data";

export default async function Podcasts({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  return (
    <>
      <PageHero lang={lang} info="podcast" kicker={tr("activities", lang)} title="Podcast" intro={lang === "id" ? "Percakapan tentang tata kelola, data, dan inklusi bersama para praktisi." : "Conversations on governance, data and inclusion with the people doing the work."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("activities", lang), href: `/${lang}/activities` }, { label: "Podcast" }]} />
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
        {podcasts.map((p, i) => {
          const d = podcastDetail[p.slug];
          return (
            <article key={p.slug} className="group grid gap-6 md:grid-cols-4 items-center rounded-2xl border border-slate-200 p-4 hover:shadow-lg transition">
              <Cover seed={p.slug} label={`EP ${podcasts.length - i}`} />
              <div className="md:col-span-3">
                <p className="text-xs text-slate-500">{fmtDate(d.date, lang)} · {d.minutes} min · {t(d.guests, lang)}</p>
                <h2 className="mt-1 text-xl font-bold group-hover:text-brand-700"><Link href={`/${lang}/podcasts/${p.slug}`}>{t(p.title, lang)}</Link></h2>
                <p className="mt-2 text-slate-600">{t(d.summary, lang)}</p>
                <Link href={`/${lang}/podcasts/${p.slug}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-400 px-4 py-2 text-sm font-bold text-ink hover:bg-accent-500"><span aria-hidden>▶</span>{lang === "id" ? "Dengarkan" : "Listen"}</Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
