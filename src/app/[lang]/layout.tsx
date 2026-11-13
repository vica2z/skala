import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { isLang, langs, tr, type Lang } from "@/lib/i18n";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "SKALA – Prototype", template: "%s | SKALA (prototype)" },
  description: "Prototype of the new bilingual SKALA website (RFT SKALA-JK/032/RFT/2026). Sample content.",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  return (
    <html lang={lang}>
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow">{tr("skip", lang)}</a>
        <Header lang={lang} />
        <main id="main">{children}</main>
        <footer className="mt-20 bg-brand-900 text-brand-100">
          <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4 text-sm">
            <div className="md:col-span-2">
              <p className="text-white font-extrabold text-lg">SKALA</p>
              <p className="mt-2 max-w-md">{tr("partnership", lang)}</p>
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Partners">
                {["Kemenkeu", "Kemendagri", "Bappenas", "Australian Embassy"].map((p) => (
                  <span key={p} className="rounded-md border border-white/20 px-2.5 py-1 text-xs">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-semibold">{tr("contact", lang)}</p>
              <p className="mt-2">Jakarta, Indonesia<br />info@skala.or.id</p>
            </div>
            <div className="space-y-1.5">
              <Link className="block hover:text-white" href={`/${lang}/developers`}>{tr("developers", lang)}</Link>
              <Link className="block hover:text-white" href={`/${lang}/admin`}>{tr("cms", lang)}</Link>
              <a className="block hover:text-white" href="/rss.xml">RSS</a>
              <p className="pt-3 text-xs opacity-80">{tr("managedBy", lang)}</p>
            </div>
          </div>
          <p className="border-t border-white/10 py-4 text-center text-xs opacity-70">© 2026 SKALA · {tr("banner", lang)}</p>
        </footer>
      </body>
    </html>
  );
}
