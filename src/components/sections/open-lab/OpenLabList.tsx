import { SectionShell } from "@/components/layout/SectionShell";
import type { OpenLabResource, OpenLabKind } from "@/lib/open-lab";
import Link from "next/link";

type Props = {
  resources: OpenLabResource[];
};

const KIND_LABEL: Record<OpenLabKind, string> = {
  dataset: "Datasets",
  repository: "Repositories",
  software: "Software",
};

export function OpenLabList({ resources }: Props) {
  const byKind: Record<OpenLabKind, OpenLabResource[]> = {
    dataset: [],
    repository: [],
    software: [],
  };

  for (const r of resources) {
    byKind[r.kind].push(r);
  }

  return (
    <SectionShell title="Open Lab" eyebrow="Code & Datasets">
      <p>
        Mock entries for datasets, repositories, and software that illustrate
        how the lab could share reproducible artifacts. All content is
        placeholder and can be replaced later.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {(Object.keys(byKind) as OpenLabKind[]).map((kind) => {
          const list = byKind[kind];
          if (!list.length) return null;

          return (
            <section key={kind} className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                {KIND_LABEL[kind]}
              </h2>
              <div className="space-y-3 text-xs text-zinc-300">
                {list.map((item) => (
                  <article
                    key={item.slug}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 shadow-sm"
                  >
                    <h3 className="text-sm font-semibold tracking-tight text-zinc-50">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-zinc-400">
                      {item.area ?? "Cross-cutting"}
                    </p>
                    {item.summary ? (
                      <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-zinc-300">
                        {item.summary}
                      </p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-900 px-2 py-0.5 text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.link ? (
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex items-center rounded-full bg-sky-500 px-2.5 py-0.5 font-medium text-zinc-950 transition-colors hover:bg-sky-400"
                        >
                          Open
                        </Link>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </SectionShell>
  );
}
