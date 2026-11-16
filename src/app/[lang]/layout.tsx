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
          <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 text-sm">
            <div className="sm:col-span-2">
              <p className="text-white font-extrabold text-xl">SKALA</p>
              <p className="mt-2 max-w-md">{tr("partnership", lang)}</p>
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Partners">
                {["Kemenkeu", "Kemendagri", "Bappenas", "Australian Embassy"].map((p) => (
                  <span key={p} className="rounded-md border border-white/20 px-2.5 py-1 text-xs">{p}</span>
                ))}
              </div>
              <p className="mt-6">Jakarta, Indonesia · info@skala.or.id</p>
            </div>
            {[
              [tr("activities", lang), [[tr("activityUpdates", lang), "activities"], [tr("announcements", lang), "announcements"], ["Podcast", "podcasts"], ["Video", "videos"], [tr("whereWeWork", lang), "provinces"]]],
              [tr("publications", lang), [[tr("publications", lang), "publications"], [tr("glossary", lang), "glossary"], [tr("search", lang), "search"], [tr("developers", lang), "developers"], [tr("cms", lang), "admin"], [lang === "id" ? "Peta kebutuhan" : "Requirements map", "requirements"]]],
              [tr("about", lang), [[tr("about", lang), "about"], [tr("governance", lang), "governance-strengthening"], [tr("opportunities", lang), "opportunities"], [tr("contact", lang), "contact"], [lang === "id" ? "Privasi" : "Privacy", "privacy"], [lang === "id" ? "Aksesibilitas" : "Accessibility", "accessibility"]]],
            ].map(([h, links]) => (
              <nav key={h as string} aria-label={h as string}>
                <p className="text-white font-semibold mb-3">{h as string}</p>
                <ul className="space-y-1.5">{(links as string[][]).map(([l, href]) => <li key={href}><Link className="hover:text-white" href={`/${lang}/${href}`}>{l}</Link></li>)}</ul>
              </nav>
            ))}
          </div>
          <div className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row justify-between gap-2 text-xs opacity-80">
              <span>© 2026 SKALA · {tr("prototypeBy", lang)} <a className="underline hover:text-white" href="https://www.techtarn.com" target="_blank" rel="noopener noreferrer">TECHTARN</a></span>
              <span>{tr("banner", lang)} · <a className="underline" href="/rss.xml">RSS</a></span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
