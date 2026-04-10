"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import type { OpenLabResource, OpenLabKind } from "@/lib/open-lab";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

type Props = {
  resources: OpenLabResource[];
};

const KIND_CONFIG: Record<OpenLabKind, { label: string; icon: string; color: string; bgGradient: string }> = {
  software: { 
    label: "Software", 
    icon: "⚡", 
    color: "text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800",
    bgGradient: "from-zinc-200/50 via-zinc-100/50 to-transparent dark:from-zinc-800/50 dark:via-zinc-900/50 dark:to-transparent"
  },
  repository: { 
    label: "Repositories", 
    icon: "📦", 
    color: "text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800",
    bgGradient: "from-zinc-200/50 via-zinc-100/50 to-transparent dark:from-zinc-800/50 dark:via-zinc-900/50 dark:to-transparent"
  },
  dataset: { 
    label: "Datasets", 
    icon: "📊", 
    color: "text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800",
    bgGradient: "from-zinc-200/50 via-zinc-100/50 to-transparent dark:from-zinc-800/50 dark:via-zinc-900/50 dark:to-transparent"
  },
};

function ResourceCard({ item }: { item: OpenLabResource }) {
  const config = KIND_CONFIG[item.kind];
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <article 
      className="group flex flex-col border-b border-zinc-200 dark:border-zinc-800 bg-transparent py-6 transition-all duration-300 last:border-0 sm:flex-row sm:gap-6 items-start"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image/Video with hover effect */}
      {(item.image || item.video) && (
        <div className="relative w-full sm:w-48 aspect-video overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 shrink-0 mb-4 sm:mb-0">
          {/* Show video on hover if available */}
          {item.video && isHovering ? (
            <iframe
              src={`${item.video}?autoplay=1&mute=1&controls=0&loop=1`}
              title={item.title}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media"
            />
          ) : item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : null}
          {item.video && !isHovering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/50 p-2 backdrop-blur-sm">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-1 flex-col">
        <div className="flex items-start gap-2 mb-1">
          <span className={`text-[10px] font-semibold uppercase tracking-wider text-zinc-500`}>
            {config.label}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500">
            • {item.area ?? "Cross-cutting"}
          </span>
        </div>
        
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.link ? (
            <Link href={item.link} target="_blank" rel="noreferrer">
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h3>
        
        {item.summary && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {item.summary}
          </p>
        )}
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-zinc-500 dark:text-zinc-400"
              >
                • {tag}
              </span>
            ))}
          </div>
          {item.link && (
            <Link
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Open ↗
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function OpenLabList({ resources }: Props) {
  const [activeFilter, setActiveFilter] = useState<OpenLabKind | "all">("all");
  
  const filtered = activeFilter === "all" 
    ? resources 
    : resources.filter(r => r.kind === activeFilter);

  const counts = {
    all: resources.length,
    software: resources.filter(r => r.kind === "software").length,
    repository: resources.filter(r => r.kind === "repository").length,
    dataset: resources.filter(r => r.kind === "dataset").length,
  };

  return (
    <SectionShell title="Open Lab" eyebrow="Code & Data">
      <p>
        Open source software, datasets, and repositories developed by the VIDA lab.
        All resources are freely available for research and education.
      </p>

      {/* Filter tabs */}
      <div className="mt-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 flex flex-wrap gap-6">
        {(["all", "software", "repository", "dataset"] as const).map((filter) => {
          const isActive = activeFilter === filter;
          const config = filter === "all" ? null : KIND_CONFIG[filter];
          
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`inline-flex items-center gap-2 text-sm font-medium transition-all hover:text-zinc-900 dark:hover:text-zinc-100 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-2 -mb-[18px]"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <span>{filter === "all" ? "All Resources" : config?.label}</span>
              <span className={`text-[10px] ${
                isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-500"
              }`}>
                ({counts[filter]})
              </span>
            </button>
          );
        })}
      </div>

      {/* Resource list */}
      <div className="mt-6 flex flex-col">
        {filtered.map((item) => (
          <ResourceCard key={item.slug} item={item} />
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="mt-8 border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center">
          <p className="text-sm text-zinc-500">No resources found for this category.</p>
        </div>
      )}
    </SectionShell>
  );
}
