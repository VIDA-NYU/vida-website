import { SectionShell } from "@/components/layout/SectionShell";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{
  slug: string;
}>;

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={640}
              className="h-56 w-full object-cover sm:h-72 md:h-80"
            />
          </div>
        ) : null}

        {/* Video Section */}
        {project.video && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Video
            </h3>
            <div className="aspect-video overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-black">
              <iframe
                src={`${project.video}?rel=0&modestbranding=1`}
                title={`${project.title} Video`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-300">
          <span className="rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 px-3 py-0.5 uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            {project.status}
          </span>
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 text-zinc-600 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
          {project.externalUrl ? (
            <Link
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center rounded-full bg-purple-500 px-3 py-1 font-medium text-white transition-colors hover:bg-purple-400"
            >
              External site
            </Link>
          ) : null}
        </div>

        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">{project.summary}</p>

        {project.body && (
          <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-zinc-700 dark:prose-p:text-zinc-200 prose-a:text-purple-600 dark:prose-a:text-purple-300">
            {project.body}
          </div>
        )}

        {/* Back button */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}
