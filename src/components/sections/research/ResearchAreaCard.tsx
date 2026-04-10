"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ResearchArea } from "@/lib/research-areas";

// Research area to theme mapping
const AREA_THEMES: Record<string, { gradient: string; icon: string; borderHover: string }> = {
  "visualization": { gradient: "from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900", icon: "📊", borderHover: "hover:border-zinc-400 dark:hover:border-zinc-600" },
  "imaging": { gradient: "from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900", icon: "🧠", borderHover: "hover:border-zinc-400 dark:hover:border-zinc-600" },
  "data-analysis": { gradient: "from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900", icon: "💻", borderHover: "hover:border-zinc-400 dark:hover:border-zinc-600" },
};

const DEFAULT_THEME = { gradient: "from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900", icon: "🔬", borderHover: "hover:border-zinc-400 dark:hover:border-zinc-600" };

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
      className={`group relative flex flex-col border-b border-zinc-200 dark:border-zinc-800 bg-transparent py-8 transition-all duration-300 last:border-0`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hero image section */}
      {hasImage && (
        <div className="relative mb-6 w-full aspect-video overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={area.image!}
            alt={area.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="relative flex flex-1 flex-col">
        <button
          type="button"
          className="flex-1 text-left md:cursor-default"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <header className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xl">
                {theme.icon}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {area.title}
              </h2>
            </div>
            {area.tags.length ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {area.tags.map((tag) => (
                  <span key={tag} className="text-xs text-zinc-500 dark:text-zinc-400">
                    • {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {area.body}
          </p>
        </button>

        {/* Video section */}
        {hasVideo && (
          <div className="mt-4">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
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
