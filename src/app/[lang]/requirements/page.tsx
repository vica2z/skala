import { PageHero } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";
import { reqs, type ReqKey } from "@/lib/requirements";

export const metadata = { title: "Requirements map" };

export default async function Requirements({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const id = lang === "id";
  const keys = Object.keys(reqs) as ReqKey[];
  return (
    <>
      <PageHero kicker="RFT SKALA-JK/032/RFT/2026" title={id ? "Peta Kebutuhan SKALA" : "SKALA Requirements Map"}
        intro={id ? `${keys.length} kebutuhan dari Kerangka Acuan dan Addendum No. 1, dan bagaimana prototipe ini memenuhinya. Tombol "i" di seluruh situs menautkan ke sini.` : `${keys.length} requirements from the Terms of Reference and Addendum No. 1, and how this prototype meets each one. The "i" buttons across the site link here.`}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: id ? "Peta Kebutuhan" : "Requirements map" }]} />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <caption className="sr-only">{id ? "Peta kebutuhan" : "Requirements map"}</caption>
            <thead className="bg-brand-900 text-white text-left">
              <tr>
                <th scope="col" className="px-4 py-3 w-10">#</th>
                <th scope="col" className="px-4 py-3">{id ? "Fitur" : "Feature"}</th>
                <th scope="col" className="px-4 py-3">{id ? "Kebutuhan SKALA" : "SKALA's need"}</th>
                <th scope="col" className="px-4 py-3">{id ? "Solusi kami" : "How we meet it"}</th>
                <th scope="col" className="px-4 py-3">{id ? "Rujukan" : "Reference"}</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k, i) => {
                const r = reqs[k];
                return (
                  <tr key={k} id={k} className="border-t border-slate-100 align-top scroll-mt-28 target:bg-accent-400/15 even:bg-slate-50/60">
                    <td className="px-4 py-4 text-slate-400">{i + 1}</td>
                    <th scope="row" className="px-4 py-4 text-left font-bold text-brand-900">{r.title[lang]}</th>
                    <td className="px-4 py-4">{r.need[lang]}</td>
                    <td className="px-4 py-4">{r.how[lang]}</td>
                    <td className="px-4 py-4 text-xs text-slate-500">{r.ref}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
