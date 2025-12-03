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

const kindColors: Record<Project["kind"], string> = {
  program: "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500/30",
  project: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-500/30",
  tool: "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500/30",
};

// Featured projects shown as large cards
function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 dark:from-zinc-900 to-white dark:to-zinc-950">
      {/* Background image with overlay */}
      {project.image && (
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-20 dark:opacity-30 transition-all duration-500 group-hover:scale-105 group-hover:opacity-30 dark:group-hover:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-white/80 dark:via-zinc-950/80 to-transparent" />
        </div>
      )}
      
      <div className="relative flex min-h-[320px] flex-col justify-end p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${kindColors[project.kind]}`}>
            {kindLabel[project.kind]}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider ${
            project.status === "active" 
              ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300" 
              : "bg-zinc-200 dark:bg-zinc-700/50 text-zinc-600 dark:text-zinc-400"
          }`}>
            {project.status}
          </span>
        </div>
        
        <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-white md:text-2xl">
          {project.title}
        </h2>
        
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {project.summary}
        </p>
        
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-200/80 dark:bg-white/10 px-2.5 py-0.5 text-[11px] text-zinc-700 dark:text-zinc-300 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-green-400"
          >
            Learn more →
          </Link>
          {project.externalUrl && (
            <Link
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-zinc-300 dark:border-white/20 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-white transition-all hover:bg-zinc-100 dark:hover:bg-white/10"
            >
              Visit site
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

// Regular project cards
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 transition-all duration-300 hover:border-green-300 dark:hover:border-green-500/40 hover:shadow-xl hover:shadow-green-500/5">
      {/* Image header */}
      {project.image && (
        <div className="relative h-36 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ${kindColors[project.kind]}`}>
              {kindLabel[project.kind]}
            </span>
          </div>
        </div>
      )}
      
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-50">
            {project.title}
          </h2>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider ${
            project.status === "active" 
              ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300" 
              : "bg-zinc-200 dark:bg-zinc-700/50 text-zinc-600 dark:text-zinc-400"
          }`}>
            {project.status}
          </span>
        </div>
        
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="text-[11px] font-semibold text-green-600 dark:text-green-400 transition-colors hover:text-green-500"
          >
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectsGrid({ projects }: Props) {
  // Split into featured (tools) and regular projects
  const featured = projects.filter(p => p.kind === "tool" || p.status === "active").slice(0, 3);
  const regular = projects.filter(p => !featured.includes(p));

  return (
    <SectionShell title="Projects" eyebrow="Tools & Initiatives" theme="projects">
      <p className="text-zinc-600 dark:text-zinc-400">
        A selection of ongoing and past research programs, projects, and tools
        developed by the VIDA lab.
      </p>
      
      {/* Featured projects - large cards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {featured.map((project) => (
          <FeaturedProject key={project.slug} project={project} />
        ))}
      </div>
      
      {/* Regular projects - smaller grid */}
      {regular.length > 0 && (
        <>
          <h3 className="mt-12 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            More Projects
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {regular.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </>
      )}
    </SectionShell>
  );
}
