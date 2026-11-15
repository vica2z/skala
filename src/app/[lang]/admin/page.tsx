import { isLang, t, type Lang } from "@/lib/i18n";
import Info from "@/components/Info";
import { publications, pubTypes } from "@/lib/data";

export const metadata = { title: "CMS preview" };

export default async function Admin({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const states = ["Published", "In review", "Draft", "Published", "Scheduled"];
  const color: Record<string, string> = { Published: "bg-emerald-100 text-emerald-800", "In review": "bg-amber-100 text-amber-800", Draft: "bg-slate-100 text-slate-700", Scheduled: "bg-sky-100 text-sky-800" };
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 text-sm">{lang === "id" ? "Tampilan contoh panel editor CMS (headless). Tidak ada data nyata." : "Sample view of the headless CMS editor panel. No real data."}</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-5 [&>*]:min-w-0">
        <aside className="rounded-2xl bg-brand-900 text-brand-100 p-5 space-y-2 text-sm lg:col-span-1">
          <p className="text-white font-bold mb-3 flex items-center gap-2">SKALA CMS <Info k="cms" lang={lang} tone="dark" /></p>
          {["Dashboard", "Publications", "Activities", "Glossary", "Media library", "Translations", "Users & roles", "Audit log"].map((m, i) => (
            <p key={m} className={`rounded-lg px-3 py-2 ${i === 1 ? "bg-white/15 text-white" : ""}`}>{m}</p>
          ))}
        </aside>
        <section className="lg:col-span-4 space-y-6 min-w-0">
          <div className="grid gap-4 sm:grid-cols-4">
            {[["Draft → Review → Publish", "3-step workflow"], ["ID / EN", "Translation status"], ["4 roles", "Admin, Editor, Author, Translator"], ["Audit log", "Every change tracked"]].map(([a, b]) => (
              <div key={a} className="rounded-xl border border-slate-200 p-4"><p className="font-bold">{a}</p><p className="text-xs text-slate-500">{b}</p></div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left"><tr>{["Title", "Type", "Status", "ID", "EN", "Updated"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
              <tbody>
                {publications.slice(0, 8).map((p, i) => {
                  const s = states[i % states.length];
                  return (
                    <tr key={p.slug} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium">{t(p.title, lang)}</td>
                      <td className="px-4 py-3">{t(pubTypes[p.type], lang)}</td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${color[s]}`}>{s}</span></td>
                      <td className="px-4 py-3">✅</td>
                      <td className="px-4 py-3">{i % 3 === 2 ? "⏳" : "✅"}</td>
                      <td className="px-4 py-3 text-slate-500">{p.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
