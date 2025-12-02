"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ResearchArea } from "@/lib/research-areas";

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

  return (
    <article
      className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-sm transition-colors hover:border-sky-500/60"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex-1 text-left md:cursor-default"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <header className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight text-zinc-50">
            {area.title}
          </h2>
          {area.tags.length ? (
            <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              {area.tags.join(" · ")}
            </p>
          ) : null}
        </header>
        <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-zinc-300 md:line-clamp-5">
          {area.body}
        </p>
      </button>

      {hasVideo && (
        <>
          {/* Desktop / tablet hover preview */}
          <div className="mt-3 hidden md:block">
            <div className="relative h-32 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              {hasImage && (
                <Image
                  src={area.image!}
                  alt={area.title}
                  width={320}
                  height={180}
                  className="h-full w-full object-cover"
                />
              )}
              <video
                ref={desktopVideoRef}
                src={area.video!}
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </div>

          {/* Mobile tap-to-expand preview */}
          <div className="mt-3 md:hidden">
            {expanded && (
              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                <video
                  ref={mobileVideoRef}
                  src={area.video!}
                  controls
                  playsInline
                  className="h-40 w-full object-cover"
                />
              </div>
            )}
          </div>
        </>
      )}
    </article>
  );
}
