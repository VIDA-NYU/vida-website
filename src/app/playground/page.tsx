import { getPlaygroundItems, type PlaygroundItem } from "@/lib/playground";
import { getProjects } from "@/lib/projects";
import { PlaygroundGrid } from "@/components/playground/PlaygroundGrid";
import Link from "next/link";

export default async function PlaygroundPage() {
  const [items, projects] = await Promise.all([
    getPlaygroundItems(),
    getProjects(),
  ]);

  // Get related projects for quick links
  const relatedProjectSlugs = items
    .filter((item) => item.relatedProject)
    .map((item) => item.relatedProject);
  
  const relatedProjects = projects
    .filter((p) => relatedProjectSlugs.includes(p.slug))
    .slice(0, 4);

  // Add some additional featured projects if we don't have enough
  const additionalProjects = projects
    .filter((p) => !relatedProjectSlugs.includes(p.slug) && p.status === "active")
    .slice(0, Math.max(0, 4 - relatedProjects.length));

  const quickLinks = [...relatedProjects, ...additionalProjects].slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-20">
      {/* Header */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">
          Interactive Demos
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-50 sm:text-4xl">
          Research Playground
        </h1>
        <div className="mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-purple-500/50 to-transparent" />
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Explore interactive demonstrations of VIDA lab research. This page showcases
          3D visualization, data exploration tools, and research project highlights
          across multiple modalities.
        </p>
      </section>

      {/* Dynamic Playground Grid */}
      <PlaygroundGrid items={items} />

      {/* Quick Links to Related Projects */}
      {quickLinks.length > 0 && (
        <section>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-600 dark:text-green-400">
              Related Projects
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-50">
              Explore More
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 transition-all hover:border-green-300 dark:hover:border-green-500/40 hover:shadow-md"
              >
                <h3 className="font-semibold text-zinc-800 dark:text-zinc-50 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {project.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
