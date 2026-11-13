import { Cover, PageHero } from "@/components/ui";
import { isLang, t, tr, type Lang } from "@/lib/i18n";
import { podcasts } from "@/lib/data";

export default async function Media({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  return (
    <>
      <PageHero title={tr("media", lang)} intro={lang === "id" ? "Video disematkan dari kanal YouTube SKALA beserta teksnya." : "Videos are embedded from SKALA's YouTube channel, with captions."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("media", lang) }]} />
      <div className="mx-auto max-w-7xl px-4 py-10 space-y-12">
        <section>
          <h2 className="text-2xl font-extrabold text-brand-900">Podcast</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {podcasts.map((p) => (
              <article key={p.slug} className="rounded-2xl border border-slate-200 p-3">
                <Cover seed={p.slug} label="Podcast" />
                <h3 className="p-2 font-bold">{t(p.title, lang)}</h3>
                <div className="px-2 pb-2"><div className="h-12 rounded-full bg-slate-100 flex items-center gap-3 px-4 text-sm text-slate-600"><span aria-hidden>▶</span>{lang === "id" ? "Pemutar audio (Spotify/YouTube)" : "Audio player (Spotify/YouTube)"}</div></div>
              </article>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-brand-900">Video</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <article key={i} className="rounded-2xl border border-slate-200 p-3">
                <div className="relative"><Cover seed={`video-${i}`} label="YouTube" /><span className="absolute inset-0 grid place-items-center text-4xl text-white" aria-hidden>▶</span></div>
                <h3 className="p-2 text-sm font-semibold">{lang === "id" ? `Video kegiatan SKALA ${i + 1} (contoh)` : `SKALA activity video ${i + 1} (sample)`}</h3>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
