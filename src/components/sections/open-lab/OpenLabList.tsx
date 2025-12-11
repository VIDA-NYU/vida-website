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
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    bgGradient: "from-cyan-500/20 via-cyan-500/5 to-transparent"
  },
  repository: { 
    label: "Repositories", 
    icon: "📦", 
    color: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    bgGradient: "from-violet-500/20 via-violet-500/5 to-transparent"
  },
  dataset: { 
    label: "Datasets", 
    icon: "📊", 
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    bgGradient: "from-amber-500/20 via-amber-500/5 to-transparent"
  },
};

function ResourceCard({ item }: { item: OpenLabResource }) {
  const config = KIND_CONFIG[item.kind];
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <article 
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/80 transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-900/20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image/Video with hover effect */}
      {(item.image || item.video) && (
        <div className="relative h-36 overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-zinc-950 dark:via-zinc-950/50 pointer-events-none" />
          <div className={`absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-lg border ${config.color} text-sm backdrop-blur-sm`}>
            {config.icon}
          </div>
          <span className={`absolute top-2 right-2 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-sm ${config.color}`}>
            {config.label}
          </span>
          {item.video && !isHovering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/50 p-3 backdrop-blur-sm">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        {!item.image && (
          <div className="mb-3 flex items-center justify-between">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${config.color}`}>
              {config.icon}
            </div>
            <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${config.color}`}>
              {config.label}
            </span>
          </div>
        )}
        
        <h3 className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-50 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
          {item.title}
        </h3>
        <p className="mt-0.5 text-[11px] text-zinc-500">
          {item.area ?? "Cross-cutting"}
        </p>
        
        {item.summary && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            {item.summary}
          </p>
        )}
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded bg-zinc-100 dark:bg-zinc-800/80 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
          {item.link && (
            <Link
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40"
            >
              <span>Open</span>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
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
      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "software", "repository", "dataset"] as const).map((filter) => {
          const isActive = activeFilter === filter;
          const config = filter === "all" ? null : KIND_CONFIG[filter];
          
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "border-purple-400 dark:border-cyan-500/50 bg-purple-100 dark:bg-cyan-500/20 text-purple-700 dark:text-cyan-300"
                  : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              {config && <span>{config.icon}</span>}
              <span>{filter === "all" ? "All" : config?.label}</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                isActive ? "bg-purple-200 dark:bg-cyan-500/30" : "bg-zinc-200 dark:bg-zinc-800"
              }`}>
                {counts[filter]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Resource grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <ResourceCard key={item.slug} item={item} />
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center">
          <p className="text-sm text-zinc-500">No resources found for this category.</p>
        </div>
      )}
    </SectionShell>
  );
}
