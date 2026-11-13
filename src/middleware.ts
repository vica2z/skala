import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/") {
    const pref = req.headers.get("accept-language") || "";
    const lang = pref.toLowerCase().startsWith("en") ? "en" : "id";
    return NextResponse.redirect(new URL(`/${lang}`, req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
