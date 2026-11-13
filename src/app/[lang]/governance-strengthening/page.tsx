import { PageHero } from "@/components/ui";
import { isLang, t, tr, type Lang } from "@/lib/i18n";
import { governanceCycle } from "@/lib/data";

export default async function Governance({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const R = 150, C = 200;
  return (
    <>
      <PageHero title={tr("governance", lang)}
        intro={lang === "id" ? "Siklus delapan langkah dari data hingga pembaruan data. Pilih satu langkah untuk mempelajarinya." : "An eight-step cycle from data to updated data. Open a step to learn more."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("governance", lang) }]} />
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-10 lg:grid-cols-2 items-center">
        <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto" role="img" aria-label={tr("governance", lang)}>
          <circle cx={C} cy={C} r={R} fill="none" stroke="#d5eeeb" strokeWidth="18" />
          {governanceCycle.map((s, i) => {
            const a = (i / governanceCycle.length) * 2 * Math.PI - Math.PI / 2;
            const x = C + R * Math.cos(a), y = C + R * Math.sin(a);
            return (
              <a key={i} href={`#step-${i + 1}`}>
                <circle cx={x} cy={y} r="24" className="fill-brand-600 hover:fill-accent-500" />
                <text x={x} y={y + 5} textAnchor="middle" fontSize="16" fill="white" fontWeight="700">{i + 1}</text>
              </a>
            );
          })}
          <text x={C} y={C} textAnchor="middle" fontSize="18" fontWeight="800" className="fill-brand-900">SKALA</text>
        </svg>
        <ol className="space-y-2">
          {governanceCycle.map((s, i) => (
            <li key={i} id={`step-${i + 1}`}>
              <details className="rounded-xl border border-slate-200 p-4 open:bg-brand-50">
                <summary className="cursor-pointer font-semibold">{i + 1}. {t(s, lang)}</summary>
                <p className="mt-2 text-slate-700">{lang === "id" ? "Penjelasan singkat dan video untuk langkah ini (contoh)." : "A short explanation and video for this step (sample)."}</p>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
