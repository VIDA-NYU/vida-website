"use client";

import { type PlaygroundItem } from "@/lib/playground";
import { AstronautScene } from "./AstronautScene";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

type Props = {
  items: PlaygroundItem[];
};

// Kind-specific icons
const kindIcons: Record<string, string> = {
  "3d": "cube",
  video: "play",
  audio: "waveform",
  image: "image",
  interactive: "sparkles",
};

const kindLabels: Record<string, string> = {
  "3d": "3D Visualization",
  video: "Video",
  audio: "Audio",
  image: "Image",
  interactive: "Interactive",
};

// Different card sizes for visual variety
const cardSizes = [
  "col-span-2 row-span-2", // Large
  "col-span-1 row-span-1", // Small
  "col-span-2 row-span-1", // Wide
  "col-span-1 row-span-2", // Tall
];

function getCardSize(index: number, kind: string): string {
  // 3D items always get large cards
  if (kind === "3d") return "col-span-2 row-span-2 lg:col-span-2";
  // Videos get wide cards
  if (kind === "video") return "col-span-2 row-span-1 lg:col-span-1 lg:row-span-1";
  // Audio gets standard cards
  if (kind === "audio") return "col-span-2 row-span-1 sm:col-span-1";
  // Images vary based on position
  return cardSizes[index % cardSizes.length];
}

// 3D Demo Component
function ThreeDDemo({ item }: { item: PlaygroundItem }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">
            {kindLabels[item.kind]}
          </p>
          <h2 className="mt-1 text-lg font-bold text-zinc-800 dark:text-zinc-50">
            {item.title}
          </h2>
        </div>
        {item.instructions && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {item.instructions}
          </p>
        )}
      </div>
      <div className="flex-1 min-h-[300px]">
        <AstronautScene />
      </div>
      <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
        {item.summary}
      </p>
    </div>
  );
}

// Video Demo Component
function VideoDemo({ item }: { item: PlaygroundItem }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">
          {kindLabels[item.kind]}
        </p>
        <h2 className="mt-1 text-base font-bold text-zinc-800 dark:text-zinc-50">
          {item.title}
        </h2>
      </div>
      {item.video && (
        <div className="aspect-video overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-black">
          <iframe
            src={`${item.video}?rel=0&modestbranding=1`}
            title={item.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
        {item.summary}
      </p>
      {item.relatedProject && (
        <Link
          href={`/projects/${item.relatedProject}`}
          className="mt-2 inline-flex items-center text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500"
        >
          View project details
        </Link>
      )}
    </div>
  );
}

// Audio Demo Component
function AudioDemo({ item }: { item: PlaygroundItem }) {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const handlePlay = (index: number) => {
    // Stop all other tracks
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setActiveTrack(index);
  };

  const handleEnded = () => {
    setActiveTrack(null);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-600 dark:text-green-400">
          {kindLabels[item.kind]}
        </p>
        <h2 className="mt-1 text-base font-bold text-zinc-800 dark:text-zinc-50">
          {item.title}
        </h2>
      </div>
      <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400">
        {item.summary}
      </p>
      {item.audio && item.audio.length > 0 && (
        <div className="space-y-2">
          {item.audio.map((track, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                activeTrack === index
                  ? "border-green-300 dark:border-green-500/40 bg-green-50 dark:bg-green-500/10"
                  : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50"
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  {activeTrack === index ? (
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  {track.label}
                </p>
                <audio
                  ref={(el) => { audioRefs.current[index] = el; }}
                  src={track.src}
                  onPlay={() => handlePlay(index)}
                  onEnded={handleEnded}
                  onPause={handleEnded}
                  controls
                  className="mt-1 h-8 w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {item.relatedProject && (
        <Link
          href={`/projects/${item.relatedProject}`}
          className="mt-3 inline-flex items-center text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-500"
        >
          View project details
        </Link>
      )}
    </div>
  );
}

// Image Demo Component
function ImageDemo({ item }: { item: PlaygroundItem }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">
          {kindLabels[item.kind]}
        </p>
        <h2 className="mt-1 text-base font-bold text-zinc-800 dark:text-zinc-50">
          {item.title}
        </h2>
      </div>
      {item.image && (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
        {item.summary}
      </p>
      {item.relatedProject && (
        <Link
          href={`/projects/${item.relatedProject}`}
          className="mt-2 inline-flex items-center text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500"
        >
          View project details
        </Link>
      )}
    </div>
  );
}

// Main card component that renders the appropriate demo type
function PlaygroundCard({ item, index }: { item: PlaygroundItem; index: number }) {
  const cardSize = getCardSize(index, item.kind);
  
  const renderContent = () => {
    switch (item.kind) {
      case "3d":
        return <ThreeDDemo item={item} />;
      case "video":
        return <VideoDemo item={item} />;
      case "audio":
        return <AudioDemo item={item} />;
      case "image":
        return <ImageDemo item={item} />;
      default:
        return <VideoDemo item={item} />;
    }
  };

  return (
    <article
      className={`${cardSize} rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 transition-all hover:border-purple-300 dark:hover:border-purple-500/30 hover:shadow-lg`}
    >
      {renderContent()}
    </article>
  );
}

export function PlaygroundGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center">
        <p className="text-zinc-500">No playground items available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-auto gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <PlaygroundCard key={item.slug} item={item} index={index} />
      ))}
    </div>
  );
}
