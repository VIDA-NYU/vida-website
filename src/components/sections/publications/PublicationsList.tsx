"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import type { Publication } from "@/lib/publications";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  publications: Publication[];
};

function groupByYear(publications: Publication[]): Record<number, Publication[]> {
  return publications.reduce<Record<number, Publication[]>>((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});
}

export function PublicationsList({ publications }: Props) {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");

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
      if (tagFilter !== "all" && !pub.tags.includes(tagFilter)) return false;

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

  const groups = groupByYear(filtered);
  const years = Object.keys(groups)
    .map((y) => Number(y))
    .sort((a, b) => b - a);

  const totalCount = publications.length;
  const filteredCount = filtered.length;

  return (
    <SectionShell title="Publications">
      <p>
        Selected publications from the lab, organized by year. Use the search
        and filters to quickly find relevant work.
      </p>

      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 text-xs text-zinc-200 md:flex-row md:items-end md:justify-between">
        <div className="flex-1 space-y-2">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Search
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, venue, or tag"
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-50 placeholder:text-zinc-500 focus:border-sky-500 focus:outline-none focus:ring-0"
          />
        </div>

        <div className="flex flex-1 flex-wrap gap-3 md:justify-end">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Year
            </label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="min-w-[6rem] rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-50 focus:border-sky-500 focus:outline-none"
            >
              <option value="all">All years</option>
              {allYears.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Type
            </label>
            <select
              value={kindFilter}
              onChange={(e) => setKindFilter(e.target.value)}
              className="min-w-[7rem] rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-50 focus:border-sky-500 focus:outline-none"
            >
              <option value="all">All types</option>
              <option value="paper">Papers</option>
              <option value="preprint">Preprints</option>
              <option value="talk">Talks</option>
              <option value="thesis">Theses</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Tag
            </label>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="min-w-[7rem] rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-50 focus:border-sky-500 focus:outline-none"
            >
              <option value="all">All tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-1 text-[11px] text-zinc-400 md:mt-0">
            {filteredCount === totalCount
              ? `${totalCount} items`
              : `${filteredCount} of ${totalCount} items`}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {years.map((year) => (
          <section key={year} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {year}
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-200">
              {groups[year].map((pub) => (
                <li
                  key={pub.slug}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 shadow-sm"
                >
                  <div className="flex gap-3">
                    <div className="hidden h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-900 sm:block">
                      <Image
                        src={
                          pub.thumbnail ??
                          "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                        }
                        alt={pub.title}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-zinc-50">{pub.title}</p>
                      {pub.authors.length ? (
                        <p className="mt-0.5 text-xs text-zinc-300">
                          {pub.authors.join(", ")}
                        </p>
                      ) : null}
                      {pub.venue ? (
                        <p className="mt-0.5 text-xs text-zinc-400">{pub.venue}</p>
                      ) : null}
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                    {pub.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-900 px-2 py-0.5 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {pub.externalUrl ? (
                      <Link
                        href={pub.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto inline-flex items-center rounded-full bg-sky-500 px-2.5 py-0.5 font-medium text-zinc-950 transition-colors hover:bg-sky-400"
                      >
                        View
                      </Link>
                    ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SectionShell>
  );
}
