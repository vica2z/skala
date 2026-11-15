import { PageHero } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";

export default async function P({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  const id = lang === "id";
  const kind: string = "accessibility";
  const title = kind === "privacy" ? (id ? "Kebijakan Privasi" : "Privacy Policy") : (id ? "Pernyataan Aksesibilitas" : "Accessibility Statement");
  const body = kind === "privacy"
    ? (id ? ["Kami mengumpulkan data pribadi seminimal mungkin dan hanya untuk tujuan yang dinyatakan.", "Pengelolaan data mengikuti UU PDP No. 27/2022 serta kebijakan privasi DT Global dan DFAT.", "Anda dapat meminta akses, koreksi, atau penghapusan data melalui info@skala.or.id."]
          : ["We collect as little personal data as possible, and only for the stated purpose.", "Data is handled under Indonesia's Personal Data Protection Law (UU PDP No. 27/2022) and DT Global and DFAT privacy policies.", "You can ask to see, correct or delete your data by writing to info@skala.or.id."])
    : (id ? ["Situs ini dirancang memenuhi WCAG 2.2 tingkat AA.", "Mendukung pembaca layar, navigasi keyboard penuh, ukuran teks yang dapat diatur, dan kontras warna yang cukup.", "Diuji bersama organisasi penyandang disabilitas. Laporkan kendala ke info@skala.or.id."]
          : ["This site is designed to meet WCAG 2.2 level AA.", "It supports screen readers, full keyboard use, adjustable text size and strong colour contrast.", "It is tested with organisations of persons with disabilities. Report any barrier to info@skala.or.id."]);
  return (
    <>
      <PageHero lang={lang} info="accessibility" title={title} crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: title }]} />
      <div className="prose mx-auto max-w-3xl px-4 py-12 text-lg">{body.map((b) => <p key={b}>{b}</p>)}</div>
    </>
  );
}
