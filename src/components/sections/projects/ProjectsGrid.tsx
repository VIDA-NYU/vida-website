import { SectionShell } from "@/components/layout/SectionShell";
import type { Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

type Props = {
  projects: Project[];
};

const kindLabel: Record<Project["kind"], string> = {
  program: "Program",
  project: "Project",
  tool: "Tool",
};

export function ProjectsGrid({ projects }: Props) {
  return (
    <SectionShell title="Projects">
      <p>
        A selection of ongoing and past research programs, projects, and tools.
        Each entry is driven by structured content so it can be extended over
        time.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-sm"
          >
            {project.image ? (
              <div className="mb-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={480}
                  height={260}
                  className="h-32 w-full object-cover"
                />
              </div>
            ) : null}
            <header className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {kindLabel[project.kind]}
                </p>
                <span
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-zinc-400"
                >
                  {project.status}
                </span>
              </div>
              <h2 className="text-sm font-semibold tracking-tight text-zinc-50">
                {project.title}
              </h2>
            </header>
            <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-zinc-300">
              {project.summary}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-900 px-2 py-0.5 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
              <Link
                href={`/projects/${project.slug}`}
                className="ml-auto inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-0.5 font-medium text-zinc-950 transition-colors hover:bg-sky-100"
              >
                View project
              </Link>
              {project.externalUrl ? (
                <Link
                  href={project.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-zinc-600 px-2.5 py-0.5 font-medium text-zinc-100 transition-colors hover:border-sky-400 hover:text-sky-100"
                >
                  External
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
