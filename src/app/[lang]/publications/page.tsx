import { Suspense } from "react";
import PubExplorer from "@/components/PubExplorer";
import { PageHero } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";

export default async function Publications({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  return (
    <>
      <PageHero lang={lang} info="repository"
        title={tr("publications", lang)}
        intro={lang === "id"
          ? "Semua produk pengetahuan SKALA di satu tempat: cari, saring berdasarkan jenis, tema, provinsi, dan tahun, lalu pratinjau sebelum mengunduh."
          : "All SKALA knowledge products in one place: search, filter by type, theme, province and year, then preview before you download."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("publications", lang) }]}
      />
      <Suspense>
        <PubExplorer lang={lang} />
      </Suspense>
    </>
  );
}
