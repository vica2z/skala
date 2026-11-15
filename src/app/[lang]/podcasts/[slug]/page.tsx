import { notFound } from "next/navigation";
import { Cover, PageHero, ShareBar } from "@/components/ui";
import { fmtDate, isLang, langs, t, tr, type Lang } from "@/lib/i18n";
import { podcastDetail, podcasts, SAMPLE_YT } from "@/lib/data";
import YouTube from "@/components/YouTube";

export function generateStaticParams() {
  return langs.flatMap((lang) => podcasts.map((p) => ({ lang, slug: p.slug })));
}

export default async function Episode({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const p = podcasts.find((x) => x.slug === slug);
  if (!p) notFound();
  const d = podcastDetail[p.slug];
  return (
    <>
      <PageHero lang={lang} info="podcast" kicker="Podcast" title={t(p.title, lang)} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: "Podcast", href: `/${lang}/podcasts` }]} />
      <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
        <div className="grid gap-6 md:grid-cols-3 items-center">
          <Cover seed={p.slug} label="Podcast" />
          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">{fmtDate(d.date, lang)} · {d.minutes} min</p>
            <p className="mt-1 font-semibold">{t(d.guests, lang)}</p>
            <div className="mt-4"><YouTube id={SAMPLE_YT} title={t(p.title, lang)} lang={lang} /></div>
          </div>
        </div>
        <p className="text-lg leading-relaxed">{t(d.summary, lang)}</p>
        <details className="rounded-2xl border border-slate-200 p-5">
          <summary className="cursor-pointer font-semibold">{lang === "id" ? "Transkrip" : "Transcript"}</summary>
          <p className="mt-3 text-slate-600">{lang === "id" ? "Transkrip lengkap tersedia untuk aksesibilitas (contoh)." : "A full transcript is provided for accessibility (sample)."}</p>
        </details>
        <ShareBar lang={lang} title={t(p.title, lang)} />
      </div>
    </>
  );
}
