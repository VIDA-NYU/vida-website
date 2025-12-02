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
      description: "Mock software, datasets, and reproducible artifacts.",
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
            className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-200 shadow-sm transition-colors hover:border-sky-500/60 hover:bg-zinc-950"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                {item.label}
              </p>
              <p className="text-sm font-medium text-zinc-50">
                {item.description}
              </p>
            </div>
            <span className="mt-3 text-[11px] font-semibold text-sky-300 group-hover:text-sky-200">
              Visit {item.label} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
