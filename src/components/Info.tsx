"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "@/lib/i18n";
import { reqs, type ReqKey } from "@/lib/requirements";

const GAP = 8; // space between the "i" button and the tip box
const EDGE = 12; // smallest distance from the tip box to the edge of the screen

type Pos = { left: number; top: number; maxH: number };

/**
 * The "i" button that explains which SKALA requirement a feature meets.
 * The tip box is drawn at the end of <body> with fixed positioning, so it never inherits styles
 * from where the button sits (no-wrap menus, uppercase labels, hero headings), is never clipped by
 * cards or scroll areas, always sits above other content, and is kept inside the screen.
 */
export default function Info({ k, lang, tone = "light", align = "left" }: { k: ReqKey; lang: Lang; tone?: "light" | "dark"; align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(true);
  const [pos, setPos] = useState<Pos | null>(null);
  const id = useId();
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const r = reqs[k];

  useEffect(() => {
    const sync = () => { try { setOn(localStorage.getItem("skala-info") !== "off"); } catch {} };
    sync();
    window.addEventListener("skala-info", sync);
    return () => window.removeEventListener("skala-info", sync);
  }, []);

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    setPos(null);
    if (refocus) btn.current?.focus({ preventScroll: true });
  }, []);

  // Work out where the tip box fits: under the button if there is room, otherwise above it,
  // and always at least EDGE pixels inside the screen.
  const place = useCallback(() => {
    const b = btn.current?.getBoundingClientRect();
    const p = panel.current;
    if (!b || !p) return;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    if (b.bottom < 0 || b.top > vh) { close(false); return; } // the button has scrolled out of view
    const w = p.offsetWidth;
    const h = p.scrollHeight;
    let left = align === "right" ? b.right - w : b.left;
    left = Math.max(EDGE, Math.min(left, vw - w - EDGE));
    const below = vh - b.bottom - GAP - EDGE;
    const above = b.top - GAP - EDGE;
    let top: number, maxH: number;
    if (h <= below || below >= above) {
      maxH = Math.max(below, 120);
      top = b.bottom + GAP;
    } else {
      maxH = above;
      top = b.top - GAP - Math.min(h, above);
    }
    top = Math.max(EDGE, Math.min(top, vh - EDGE - Math.min(h, maxH)));
    setPos((old) => (old && old.left === Math.round(left) && old.top === Math.round(top) && old.maxH === Math.floor(maxH) ? old : { left: Math.round(left), top: Math.round(top), maxH: Math.floor(maxH) }));
  }, [align, close]);

  // Place the box before it is painted, so it never flashes in the wrong spot.
  useLayoutEffect(() => { if (open) place(); }, [open, place]);

  // Move keyboard focus into the box once it is placed, so screen-reader and keyboard users land on it.
  const placed = pos !== null;
  useEffect(() => { if (open && placed) panel.current?.focus({ preventScroll: true }); }, [open, placed]);

  useEffect(() => {
    if (!open) return;
    let raf = 0;
    const follow = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(place); };
    const outside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!btn.current?.contains(t) && !panel.current?.contains(t)) close(false);
    };
    const keys = (e: KeyboardEvent) => { if (e.key === "Escape") close(true); };
    const ro = new ResizeObserver(follow);
    if (panel.current) ro.observe(panel.current);
    window.addEventListener("scroll", follow, true);
    window.addEventListener("resize", follow);
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", keys);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", follow, true);
      window.removeEventListener("resize", follow);
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", keys);
    };
  }, [open, place, close]);

  if (!on) return null;

  const title = lang === "id" ? "Memenuhi kebutuhan SKALA" : "Meets SKALA's requirement";
  return (
    <span className="inline-flex shrink-0 align-middle normal-case tracking-normal">
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-haspopup="dialog"
        aria-label={lang === "id" ? `Kebutuhan SKALA: ${r.title.id}` : `SKALA requirement: ${r.title.en}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (open) close(false); else setOpen(true); }}
        className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold italic font-serif leading-none normal-case tracking-normal shadow-sm ring-2 transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
          tone === "dark" ? "bg-accent-400 text-ink ring-white/30" : "bg-accent-400 text-ink ring-white"
        }`}
      >
        i
      </button>
      {open &&
        createPortal(
          <div
            ref={panel}
            id={id}
            role="dialog"
            aria-label={`${title}: ${r.title[lang]}`}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              // Tab past the last link (or back before the box) returns to the "i" button.
              if (e.key !== "Tab") return;
              const links = panel.current?.querySelectorAll<HTMLElement>("a[href]");
              const last = links?.[links.length - 1];
              if ((!e.shiftKey && document.activeElement === last) || (e.shiftKey && document.activeElement === panel.current)) {
                e.preventDefault();
                close(true);
              }
            }}
            style={{ left: pos?.left ?? 0, top: pos?.top ?? 0, maxHeight: pos?.maxH, visibility: pos ? "visible" : "hidden" }}
            className="fixed z-[70] w-80 max-w-[calc(100vw-24px)] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm font-normal not-italic normal-case leading-normal tracking-normal whitespace-normal break-words text-ink shadow-2xl outline-none"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent-500">{title}</p>
            <p className="mt-1 text-base font-bold leading-snug text-brand-900">{r.title[lang]}</p>
            <div className="mt-3">
              <p className="text-xs font-bold uppercase text-slate-500">{lang === "id" ? "Kebutuhan" : "Need"}</p>
              <p>{r.need[lang]}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold uppercase text-slate-500">{lang === "id" ? "Solusi kami" : "How we meet it"}</p>
              <p>{r.how[lang]}</p>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3 border-t border-slate-100 pt-2 text-xs">
              <span className="min-w-0 text-slate-500">{r.ref}</span>
              <Link href={`/${lang}/requirements#${k}`} className="shrink-0 font-semibold text-brand-700 hover:underline">{lang === "id" ? "Semua" : "All"} →</Link>
            </div>
          </div>,
          document.body,
        )}
    </span>
  );
}

export function InfoToggle({ lang }: { lang: Lang }) {
  const [on, setOn] = useState(true);
  useEffect(() => { try { setOn(localStorage.getItem("skala-info") !== "off"); } catch {} }, []);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => {
        const v = !on;
        setOn(v);
        try { localStorage.setItem("skala-info", v ? "on" : "off"); } catch {}
        window.dispatchEvent(new Event("skala-info"));
      }}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 hover:bg-white/20"
    >
      <span className="grid h-4 w-4 place-items-center rounded-full bg-accent-400 text-[10px] font-bold italic font-serif text-ink">i</span>
      {lang === "id" ? (on ? "Sembunyikan info kebutuhan" : "Tampilkan info kebutuhan") : on ? "Hide requirement tips" : "Show requirement tips"}
    </button>
  );
}
