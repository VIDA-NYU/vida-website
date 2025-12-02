import { SectionShell } from "@/components/layout/SectionShell";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
  slug: string;
};

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <SectionShell
      title={project.title}
      eyebrow={project.kind === "program" ? "Program" : project.kind === "tool" ? "Tool" : "Project"}
    >
      <div className="space-y-6">
        {project.image ? (
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={640}
              className="h-56 w-full object-cover sm:h-72 md:h-80"
            />
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-300">
          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-0.5 uppercase tracking-[0.16em] text-zinc-400">
            {project.status}
          </span>
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-900 px-2 py-0.5 text-zinc-300"
            >
              {tag}
            </span>
          ))}
          {project.externalUrl ? (
            <Link
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center rounded-full bg-sky-500 px-3 py-1 font-medium text-zinc-950 transition-colors hover:bg-sky-400"
            >
              External site
            </Link>
          ) : null}
        </div>

        <p className="text-sm leading-relaxed text-zinc-200">{project.summary}</p>

        {project.body && (
          <div className="prose prose-invert max-w-none prose-p:text-zinc-200 prose-a:text-sky-300">
            {project.body}
          </div>
        )}
      </div>
    </SectionShell>
  );
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}
