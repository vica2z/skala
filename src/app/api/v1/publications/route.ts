import { NextResponse } from "next/server";
import { publications, pubTypes, themes } from "@/lib/data";

export async function GET(req: Request) {
  const u = new URL(req.url);
  const lang = u.searchParams.get("lang") === "en" ? "en" : "id";
  const type = u.searchParams.get("type");
  const theme = u.searchParams.get("theme");
  const province = u.searchParams.get("province");
  const items = publications
    .filter((p) => (!type || p.type === type) && (!theme || p.theme === theme) && (!province || p.province === province))
    .map((p) => ({
      id: p.slug,
      skala_one_id: p.skalaOneId,
      type: p.type,
      type_label: pubTypes[p.type][lang],
      theme: p.theme,
      theme_label: themes[p.theme][lang],
      province: p.province ?? null,
      title: p.title[lang],
      summary: p.summary[lang],
      date_published: p.date,
      url: `/${lang}/publications/${p.slug}`,
      file: "/sample-publication.pdf",
    }));
  return NextResponse.json({ api_version: "v1", lang, count: items.length, items }, { headers: { "Access-Control-Allow-Origin": "*" } });
}
