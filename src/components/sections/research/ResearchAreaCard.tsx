"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ResearchArea } from "@/lib/research-areas";

// Research area to theme mapping
const AREA_THEMES: Record<string, { gradient: string; icon: string; borderHover: string }> = {
  "visualization": { gradient: "from-sky-600/20 to-cyan-600/10", icon: "📊", borderHover: "hover:border-sky-500/60" },
  "imaging": { gradient: "from-rose-600/20 to-pink-600/10", icon: "🧠", borderHover: "hover:border-rose-500/60" },
  "data-analysis": { gradient: "from-emerald-600/20 to-teal-600/10", icon: "💻", borderHover: "hover:border-emerald-500/60" },
};

const DEFAULT_THEME = { gradient: "from-violet-600/20 to-purple-600/10", icon: "🔬", borderHover: "hover:border-violet-500/60" };

function getAreaTheme(slug: string) {
  return AREA_THEMES[slug] ?? DEFAULT_THEME;
}

type Props = {
  area: ResearchArea;
};

export function ResearchAreaCard({ area }: Props) {
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  const hasVideo = Boolean(area.video);
  const hasImage = Boolean(area.image);

  useEffect(() => 
{
    if (!mobileVideoRef.current) return;
    if (!hasVideo) return;

    const v = mobileVideoRef.current;
    if (!v) return;

    if (expanded) {
      v.play().catch(() => undefined);
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [expanded, hasVideo]);

  function handleMouseEnter() {
    const v = desktopVideoRef.current;
    if (!v || !hasVideo) return;
    v.play().catch(() => undefined);
  }

  function handleMouseLeave() {
    const v = desktopVideoRef.current;
    if (!v || !hasVideo) return;
    v.pause();
    v.currentTime = 0;
  }

  const theme = getAreaTheme(area.slug);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition-all duration-300 ${theme.borderHover} hover:shadow-2xl hover:shadow-zinc-900/50`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hero image section */}
      {hasImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={area.image!}
            alt={area.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          
          {/* Floating icon */}
          <div className={`absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.gradient.replace('/20', '/80').replace('/10', '/60')} text-2xl shadow-lg backdrop-blur-sm`}>
            {theme.icon}
          </div>
        </div>
      )}
      
      <div className="relative flex flex-1 flex-col p-5">
        <button
          type="button"
          className="flex-1 text-left md:cursor-default"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <header className="space-y-2">
            {!hasImage && (
              <span className="text-3xl">{theme.icon}</span>
            )}
            <h2 className="text-xl font-bold tracking-tight text-zinc-50 group-hover:text-emerald-300 transition-colors">
              {area.title}
            </h2>
            {area.tags.length ? (
              <div className="flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
            {area.body}
          </p>
        </button>

        {/* Video section */}
        {hasVideo && (
          <div className="mt-4">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              {/* YouTube embed */}
              {area.video?.includes('youtube') ? (
                <iframe
                  src={area.video}
                  title={area.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={desktopVideoRef}
                  src={area.video!}
                  muted
                  loop
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
