"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { reqs, type ReqKey } from "@/lib/requirements";

export default function Info({ k, lang, tone = "light", align = "left" }: { k: ReqKey; lang: Lang; tone?: "light" | "dark"; align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(true);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const r = reqs[k];

  useEffect(() => {
    const sync = () => { try { setOn(localStorage.getItem("skala-info") !== "off"); } catch {} };
    sync();
    window.addEventListener("skala-info", sync);
    return () => window.removeEventListener("skala-info", sync);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", close); };
  }, [open]);

  if (!on) return null;
  return (
    <span ref={ref} className="relative inline-flex align-middle normal-case tracking-normal font-normal text-left">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={lang === "id" ? `Kebutuhan SKALA: ${r.title.id}` : `SKALA requirement: ${r.title.en}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}
        className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold italic font-serif shadow-sm ring-2 transition hover:scale-110 ${
          tone === "dark" ? "bg-accent-400 text-ink ring-white/30" : "bg-accent-400 text-ink ring-white"
        }`}
      >
        i
      </button>
      {open && (
        <span
          id={id}
          role="dialog"
          className={`absolute top-7 z-50 w-80 max-w-[85vw] rounded-2xl border border-slate-200 bg-white p-4 text-sm text-ink shadow-2xl ${align === "right" ? "right-0" : "left-0"}`}
        >
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-accent-500">
            {lang === "id" ? "Memenuhi kebutuhan SKALA" : "Meets SKALA's requirement"}
          </span>
          <span className="mt-1 block text-base font-bold text-brand-900">{r.title[lang]}</span>
          <span className="mt-3 block"><strong className="text-slate-500 text-xs uppercase">{lang === "id" ? "Kebutuhan" : "Need"}</strong><span className="block">{r.need[lang]}</span></span>
          <span className="mt-2 block"><strong className="text-slate-500 text-xs uppercase">{lang === "id" ? "Solusi kami" : "How we meet it"}</strong><span className="block">{r.how[lang]}</span></span>
          <span className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2 text-xs">
            <span className="text-slate-500">{r.ref}</span>
            <Link href={`/${lang}/requirements#${k}`} className="shrink-0 font-semibold text-brand-700 hover:underline">{lang === "id" ? "Semua" : "All"} →</Link>
          </span>
        </span>
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
