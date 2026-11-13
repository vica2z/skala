import { publications } from "@/lib/data";

export async function GET() {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const items = publications.slice(0, 20).map((p) =>
    `<item><title>${esc(p.title.en)}</title><link>https://skala.or.id/en/publications/${p.slug}</link><guid>${p.skalaOneId}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.summary.en)}</description></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>SKALA publications (prototype)</title><link>https://skala.or.id</link><description>Latest SKALA knowledge products</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
