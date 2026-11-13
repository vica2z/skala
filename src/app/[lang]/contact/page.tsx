import { PageHero } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const f = lang === "id" ? ["Nama", "Email", "Instansi", "Pesan"] : ["Name", "Email", "Organisation", "Message"];
  return (
    <>
      <PageHero title={tr("contact", lang)} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("contact", lang) }]} />
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-10 md:grid-cols-2">
        <form className="space-y-4" action="#">
          {f.map((l, i) => (
            <div key={l}>
              <label htmlFor={`c${i}`} className="font-semibold text-sm">{l}</label>
              {i === 3
                ? <textarea id={`c${i}`} rows={5} required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
                : <input id={`c${i}`} type={i === 1 ? "email" : "text"} required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />}
            </div>
          ))}
          <label className="flex gap-2 text-sm"><input type="checkbox" required /> {lang === "id" ? "Saya menyetujui kebijakan privasi (UU PDP No. 27/2022)." : "I agree to the privacy policy (UU PDP No. 27/2022)."}</label>
          <button className="rounded-full bg-brand-600 text-white px-6 py-3 font-bold">{lang === "id" ? "Kirim pesan" : "Send message"}</button>
        </form>
        <div className="space-y-4">
          <div className="rounded-2xl bg-brand-50 p-6"><p className="font-bold">SKALA</p><p>Jakarta, Indonesia</p><p>info@skala.or.id</p></div>
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-sky-100 to-brand-100 grid place-items-center text-slate-600">{lang === "id" ? "Peta lokasi kantor" : "Office location map"}</div>
        </div>
      </div>
    </>
  );
}
