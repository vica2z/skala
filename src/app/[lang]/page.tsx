import Link from "next/link";
import { isLang, t, tr, type Lang } from "@/lib/i18n";
import { dataSystems, outcomes, podcasts, posts, provinces, publications, testimonials } from "@/lib/data";
import { PostCard, PubCard } from "@/components/ui";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const X = (lng: number) => ((lng - 94) / 48) * 1000;
  const Y = (lat: number) => ((7 - lat) / 19) * 400;
  const off: Record<string, [number, number, "start" | "end" | "middle"]> = {
    ntb: [-12, 28, "end"], ntt: [12, 28, "start"], "west-papua": [0, -16, "middle"],
    "central-papua": [-14, 26, "end"], "highland-papua": [6, 30, "middle"], papua: [-12, -12, "end"], maluku: [-14, 5, "end"],
  };

  return (
    <>
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#138a7f,transparent_50%),radial-gradient(circle_at_80%_60%,#e08e14,transparent_45%)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm">{lang === "id" ? "Sinergi dan Kolaborasi untuk Percepatan Layanan Dasar" : "Synergy and Collaboration for Basic Service Acceleration"}</p>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">
              {lang === "id" ? "Layanan dasar yang lebih baik untuk setiap daerah" : "Better basic services for every region"}
            </h1>
            <p className="mt-5 text-lg text-brand-100 max-w-2xl">{tr("partnership", lang)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${lang}/publications`} className="rounded-full bg-accent-400 px-6 py-3 font-bold text-ink hover:bg-accent-500">{tr("publications", lang)}</Link>
              <Link href={`/${lang}/about`} className="rounded-full border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">{tr("about", lang)}</Link>
            </div>
          </div>
          <dl className="md:col-span-2 grid grid-cols-2 gap-4">
            {[
              ["12", lang === "id" ? "provinsi mitra" : "partner provinces"],
              [String(provinces.reduce((a, p) => a + p.districts, 0)), lang === "id" ? "kabupaten/kota" : "districts and cities"],
              [String(publications.length) + "+", lang === "id" ? "produk pengetahuan" : "knowledge products"],
              ["2", lang === "id" ? "bahasa, satu platform" : "languages, one platform"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white/10 p-5">
                <dt className="sr-only">{l}</dt>
                <dd className="text-3xl font-extrabold">{n}</dd>
                <dd className="text-sm text-brand-100">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-900">{tr("latestNews", lang)}</h2>
          <Link className="font-semibold text-brand-700 hover:underline" href={`/${lang}/activities`}>{tr("viewAll", lang)} →</Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {posts.filter((p) => p.kind === "update").slice(0, 3).map((p) => <PostCard key={p.slug} p={p} lang={lang} />)}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-900">{tr("latestPubs", lang)}</h2>
            <Link className="font-semibold text-brand-700 hover:underline" href={`/${lang}/publications`}>{tr("viewAll", lang)} →</Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {publications.slice(0, 4).map((p) => <PubCard key={p.slug} p={p} lang={lang} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-900">{tr("whereWeWork", lang)}</h2>
        <p className="mt-2 text-slate-600">{lang === "id" ? "Klik provinsi untuk melihat publikasinya." : "Select a province to see its publications."}</p>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 to-brand-50 p-4">
          <svg viewBox="0 0 1000 400" className="w-full h-auto" role="img" aria-label={tr("whereWeWork", lang)}>
            {provinces.map((p) => (
              <a key={p.slug} href={`/${lang}/publications?province=${p.slug}`}>
                <circle cx={X(p.lng)} cy={Y(p.lat)} r="11" className="fill-brand-500/30" />
                <circle cx={X(p.lng)} cy={Y(p.lat)} r="5" className="fill-brand-700" />
                <text x={X(p.lng) + (off[p.slug]?.[0] ?? 10)} y={Y(p.lat) + (off[p.slug]?.[1] ?? -10)} textAnchor={off[p.slug]?.[2] ?? "start"} fontSize="15" className="fill-ink font-semibold">{t(p.name, lang)}</text>
              </a>
            ))}
          </svg>
        </div>
      </section>

      <section className="bg-brand-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-900">{tr("goal", lang)}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {outcomes.map((o, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 border border-brand-100">
                <p className="text-sm font-bold text-brand-600">EOPO {i + 1}</p>
                <p className="mt-2 font-semibold">{t(o, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-900">{tr("dataSystems", lang)}</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {dataSystems.map((d) => <li key={d} className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700">{d}</li>)}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-ink text-white p-8">
          <h2 className="text-2xl font-extrabold">{tr("ourPodcast", lang)}</h2>
          <ul className="mt-5 space-y-3">
            {podcasts.map((p) => (
              <li key={p.slug} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-400 text-ink" aria-hidden>▶</span>
                <Link className="hover:underline" href={`/${lang}/media`}>{t(p.title, lang)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 p-8">
          <h2 className="text-2xl font-extrabold text-brand-900">{tr("testimonials", lang)}</h2>
          {testimonials.map((q, i) => (
            <figure key={i} className="mt-5">
              <blockquote className="text-lg">“{t(q.quote, lang)}”</blockquote>
              <figcaption className="mt-1 text-sm text-slate-500">— {t(q.who, lang)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-900 text-white p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold">{tr("getInTouch", lang)}</h2>
            <p className="mt-1 text-brand-100">{lang === "id" ? "Dapatkan kabar terbaru SKALA langsung di ponsel Anda." : "Get SKALA news straight to your phone."}</p>
          </div>
          <a href="#" className="rounded-full bg-white text-brand-900 px-6 py-3 font-bold">{tr("whatsapp", lang)}</a>
        </div>
      </section>
    </>
  );
}
