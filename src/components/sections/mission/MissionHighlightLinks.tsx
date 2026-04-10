import Link from "next/link";

export function MissionHighlightLinks() {
  const items = [
    {
      label: "Research",
      href: "/research",
      description: "Visualization, imaging, and data analytics across domains.",
    },
    {
      label: "Playground",
      href: "/playground",
      description: "Multimodal demos using 3D scenes, video, and sound.",
    },
    {
      label: "Open Lab",
      href: "/open-lab",
      description: "Open-source software, datasets, and reproducible artifacts.",
    },
  ];

  return (
    <section className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Explore the lab
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-4 text-sm text-zinc-700 dark:text-zinc-200 shadow-sm transition-colors hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                {item.label}
              </p>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-50">
                {item.description}
              </p>
            </div>
            <span className="mt-3 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200">
              Visit {item.label} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
