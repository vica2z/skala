"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";

// Click-to-play YouTube embed: loads nothing from YouTube until the user presses play
// (faster pages, no tracking cookies via youtube-nocookie.com), captions on by default.
export default function YouTube({ id, title, lang, autoplay = true }: { id: string; title: string; lang: Lang; autoplay?: boolean }) {
  const [play, setPlay] = useState(false);
  if (play) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&cc_load_policy=1&cc_lang_pref=${lang}&hl=${lang}&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      aria-label={`${lang === "id" ? "Putar video" : "Play video"}: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-brand-900"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:opacity-100 group-hover:scale-105" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" aria-hidden />
      <span className="absolute inset-0 grid place-items-center" aria-hidden>
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-red-600 text-2xl text-white shadow-lg transition group-hover:scale-110">▶</span>
      </span>
      <span className="absolute left-3 bottom-3 rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">YouTube · CC</span>
    </button>
  );
}
