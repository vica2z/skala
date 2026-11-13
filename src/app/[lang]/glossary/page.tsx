import GlossaryList from "@/components/GlossaryList";
import { PageHero } from "@/components/ui";
import { isLang, tr, type Lang } from "@/lib/i18n";

export default async function Glossary({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLang(raw) ? raw : "id") as Lang;
  return (
    <>
      <PageHero title={tr("glossary", lang)}
        intro={lang === "id" ? "Temukan dan pahami singkatan yang sering dipakai dalam tata kelola pemerintahan daerah." : "Find and understand the acronyms used in Indonesian subnational governance."}
        crumbs={[{ label: tr("home", lang), href: `/${lang}` }, { label: tr("glossary", lang) }]} />
      <GlossaryList lang={lang} />
    </>
  );
}
