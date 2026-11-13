"use client";

import { useMemo, useState } from "react";
import { tr, type Lang } from "@/lib/i18n";
import { glossary } from "@/lib/data";

export default function GlossaryList({ lang }: { lang: Lang }) {
  const [q, setQ] = useState("");
  const [letter, setLetter] = useState("");
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const have = new Set(glossary.map((g) => g[0][0].toUpperCase()));
  const list = useMemo(() => {
    const s = q.toLowerCase();
    return glossary
      .filter((g) => !letter || g[0].toUpperCase().startsWith(letter))
      .filter((g) => !s || g.join(" ").toLowerCase().includes(s))
      .sort((a, b) => a[0].localeCompare(b[0]));
  }, [q, letter]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <label htmlFor="gq" className="sr-only">{tr("search", lang)}</label>
        <input id="gq" type="search" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder={lang === "id" ? "Cari singkatan atau artinya…" : "Search an acronym or its meaning…"}
          className="grow rounded-full border border-slate-300 px-5 py-3" />
        <button onClick={() => { setOpen(true); setSent(false); }} className="rounded-full bg-brand-600 text-white px-5 py-3 font-semibold">{tr("suggest", lang)}</button>
      </div>
      <nav aria-label="A–Z" className="mt-5 flex flex-wrap gap-1">
        <button onClick={() => setLetter("")} aria-pressed={!letter} className={`h-9 px-3 rounded-lg text-sm font-semibold ${!letter ? "bg-brand-600 text-white" : "hover:bg-brand-50"}`}>{tr("all", lang)}</button>
        {letters.map((l) => (
          <button key={l} disabled={!have.has(l)} onClick={() => setLetter(l)} aria-pressed={letter === l}
            className={`h-9 w-9 rounded-lg text-sm font-semibold disabled:opacity-30 ${letter === l ? "bg-brand-600 text-white" : "hover:bg-brand-50"}`}>{l}</button>
        ))}
      </nav>
      <p className="mt-5 text-sm text-slate-600" aria-live="polite"><strong>{list.length}</strong> {tr("results", lang)}</p>
      <dl className="mt-3 divide-y divide-slate-200 rounded-2xl border border-slate-200">
        {list.map(([abbr, idTerm, enTerm]) => (
          <div key={abbr} className="grid md:grid-cols-4 gap-1 p-4">
            <dt className="font-extrabold text-brand-800">{abbr}</dt>
            <dd className="md:col-span-3">
              <span lang="id" className="font-semibold">{idTerm}</span>
              <span className="block text-slate-600" lang="en">{enTerm}</span>
            </dd>
          </div>
        ))}
      </dl>

      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby="sg" className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <form className="w-full max-w-lg rounded-2xl bg-white p-6 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <h2 id="sg" className="text-xl font-bold">{tr("suggest", lang)}</h2>
            {sent ? (
              <p className="rounded-lg bg-brand-50 p-4">{lang === "id" ? "Terima kasih. Usulan Anda akan ditinjau tim KM SKALA." : "Thank you. The SKALA KM team will review your suggestion."}</p>
            ) : (
              <>
                {[[lang === "id" ? "Singkatan" : "Acronym", "a"], [lang === "id" ? "Arti" : "Meaning", "m"], [lang === "id" ? "Mengapa penting" : "Why it matters", "w"]].map(([l, id]) => (
                  <div key={id}><label htmlFor={`s${id}`} className="text-sm font-semibold">{l}</label><input required id={`s${id}`} className="mt-1 w-full rounded-lg border px-3 py-2" /></div>
                ))}
                <button className="rounded-full bg-brand-600 text-white px-5 py-2.5 font-semibold">{lang === "id" ? "Kirim" : "Submit"}</button>
              </>
            )}
            <button type="button" onClick={() => setOpen(false)} className="ml-3 text-sm underline">{lang === "id" ? "Tutup" : "Close"}</button>
          </form>
        </div>
      )}
    </div>
  );
}
