import { notFound } from "next/navigation";
import { PageHero, PostCard, PubCard, SectionTitle } from "@/components/ui";
import { isLang, langs, t, tr, type Lang } from "@/lib/i18n";
import { posts, provinces, publications } from "@/lib/data";

export function generateStaticParams() {
  return langs.flatMap((lang) => provinces.map((p) => ({ lang, slug: p.slug })));
}

export default async function Province({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const p = provinces.find((x) => x.slug === slug);
  if (!p) notFound();
  const n = [...p.slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const ind = [
    { l: { en: "Districts with MSS plans", id: "Kabupaten dengan rencana SPM" }, v: 40 + (n % 55) },
    { l: { en: "Budget tagged for basic services", id: "Anggaran bertanda layanan dasar" }, v: 30 + (n % 45) },
    { l: { en: "Villages with updated data", id: "Desa dengan data terbarui" }, v: 25 + (n % 70) },
    { l: { en: "Officials trained", id: "Pejabat terlatih" }, v: 50 + (n % 45) },
  ];
  const pubs = publications.filter((x) => x.province === slug);
  const news = posts.filter((x) => x.province === slug);
  return (
    <>
      <PageHero lang={lang} info="provinces" kicker={tr("province", lang)} title={t(p.name, lang)} intro={t(p.focus, lang)}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("whereWeWork", lang), href: `/${lang}/provinces` }, { label: t(p.name, lang) }]}>
        <dl className="mt-8 flex flex-wrap gap-4">
          <div className="rounded-2xl bg-white/10 px-5 py-3"><dd className="text-2xl font-extrabold">{p.districts}</dd><dt className="text-xs text-brand-100">{lang === "id" ? "kabupaten/kota" : "districts and cities"}</dt></div>
          <div className="rounded-2xl bg-white/10 px-5 py-3"><dd className="text-2xl font-extrabold">{pubs.length}</dd><dt className="text-xs text-brand-100">{tr("publications", lang)}</dt></div>
        </dl>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 py-12 space-y-14">
        <section>
          <SectionTitle>{lang === "id" ? "Indikator utama (contoh)" : "Key indicators (sample)"}</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {ind.map((i) => (
              <div key={i.l.en} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex justify-between text-sm font-semibold"><span>{t(i.l, lang)}</span><span>{i.v}%</span></div>
                <div className="mt-3 h-3 rounded-full bg-slate-100" role="img" aria-label={`${t(i.l, lang)}: ${i.v}%`}><div className="h-3 rounded-full bg-brand-600" style={{ width: `${i.v}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
        {pubs.length > 0 && <section><SectionTitle href={`/${lang}/publications?province=${slug}`} more={tr("viewAll", lang)}>{tr("publications", lang)}</SectionTitle><div className="grid gap-6 md:grid-cols-3">{pubs.slice(0, 3).map((x) => <PubCard key={x.slug} p={x} lang={lang} />)}</div></section>}
        {news.length > 0 && <section><SectionTitle>{tr("activityUpdates", lang)}</SectionTitle><div className="grid gap-6 md:grid-cols-3">{news.map((x) => <PostCard key={x.slug} p={x} lang={lang} />)}</div></section>}
      </div>
    </>
  );
}
