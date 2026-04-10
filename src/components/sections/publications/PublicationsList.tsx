"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { PublicationCiteActions } from "@/components/publications/PublicationCiteActions";
import type { Publication } from "@/lib/publications";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

const ITEMS_PER_PAGE = 10;

type Props = {
  publications: Publication[];
};

export function PublicationsList({ publications }: Props) {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const allYears = useMemo(() => {
    const years = Array.from(new Set(publications.map((p) => p.year)));
    return years.sort((a, b) => b - a);
  }, [publications]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publications.forEach((p) => {
      p.tags.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [publications]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((pub) => {
      if (yearFilter !== "all" && pub.year.toString() !== yearFilter) return false;
      if (kindFilter !== "all" && pub.kind !== kindFilter) return false;
      if (tagFilter !== "all" && !pub.tags.includes(tagFilter as typeof pub.tags[number])) return false;

      if (!q) return true;

      const haystack = [
        pub.title,
        pub.venue ?? "",
        pub.authors.join(" "),
        pub.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [publications, query, yearFilter, kindFilter, tagFilter]);

  const filteredCount = filtered.length;
  const totalPages = Math.ceil(filteredCount / ITEMS_PER_PAGE);
  const paginatedPublications = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <SectionShell title="Publications" eyebrow="Research Output" theme="publications">

      {/* Search and filters */}
      <div className="mt-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2">
          <svg className="h-4 w-4 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search publications by title, author, venue, or tag..."
            className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
          />
          <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:text-zinc-300">
            {filteredCount} results
          </span>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Year:</span>
            <select
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border-none bg-transparent text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              {allYears.map((year) => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Type:</span>
            <select
              value={kindFilter}
              onChange={(e) => {
                setKindFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border-none bg-transparent text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="paper">Papers</option>
              <option value="preprint">Preprints</option>
              <option value="talk">Talks</option>
              <option value="thesis">Theses</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Topic:</span>
            <select
              value={tagFilter}
              onChange={(e) => {
                setTagFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border-none bg-transparent text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          {(yearFilter !== "all" || kindFilter !== "all" || tagFilter !== "all" || query) && (
            <button
              onClick={() => {
                setYearFilter("all");
                setKindFilter("all");
                setTagFilter("all");
                setQuery("");
                setCurrentPage(1);
              }}
              className="ml-auto text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Publications List */}
      <div className="mt-8 flex flex-col space-y-6">
        {paginatedPublications.map((pub) => (
          <article
            key={pub.slug}
            className="flex flex-col gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-6 last:border-0"
          >
            <Link href={`/publications/${pub.slug}`} className="block">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {pub.title}
              </h3>
            </Link>
            
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              {pub.authors.length > 0 && (
                <span>{pub.authors.join(", ")} • </span>
              )}
              <span className="text-zinc-500 dark:text-zinc-400">
                {pub.venue ? `${pub.venue} (${pub.year})` : pub.year}
              </span>
            </div>
            
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/publications/${pub.slug}`}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline"
              >
                Details
              </Link>
              {pub.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-zinc-400 dark:text-zinc-500"
                >
                  • {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <PublicationCiteActions cite={pub.cite} bibtex={pub.bibtex} />
              {pub.externalUrl && (
                <a
                  href={pub.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-400"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Read Paper
                </a>
              )}
              {pub.githubUrl && (
                <a
                  href={pub.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-400"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Code
                </a>
              )}
            </div>
          </article>
        ))}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Previous
            </button>
            <span className="text-sm text-zinc-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Next
            </button>
          </div>
        )}
      </div>
      
      {filtered.length === 0 && (
        <div className="mt-8 border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center">
          <p className="text-zinc-500">No publications found matching your criteria.</p>
        </div>
      )}
    </SectionShell>
  );
}
