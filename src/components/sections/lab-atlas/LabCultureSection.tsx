import { SectionShell } from "@/components/layout/SectionShell";

const cultureBlocks = [
  {
    title: "Visual Analytics",
    description:
      "Designing interactive systems that help people explore and make sense of large, high-dimensional data.",
    icon: "📊",
    gradient: "from-sky-600/30 to-cyan-600/20",
    borderColor: "hover:border-sky-500/50",
  },
  {
    title: "Urban Computing",
    description:
      "Connecting lab work to the city: urban data, soundscapes, mobility patterns, and infrastructure.",
    icon: "🏙️",
    gradient: "from-emerald-600/30 to-teal-600/20",
    borderColor: "hover:border-emerald-500/50",
  },
  {
    title: "Reproducibility",
    description:
      "Building tools and systems that enable computational reproducibility across scientific domains.",
    icon: "🔄",
    gradient: "from-amber-600/30 to-orange-600/20",
    borderColor: "hover:border-amber-500/50",
  },
];

export function LabCultureSection() {
  return (
    <SectionShell title="Lab & Culture" eyebrow="Atlas" theme="people">
      <p>
        A quick snapshot of the spaces, artifacts, and practices around the
        people: where multimodal data, whiteboards, and prototypes live.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cultureBlocks.map((block) => (
          <article
            key={block.title}
            className={`group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 shadow-sm transition-all duration-300 ${block.borderColor} hover:shadow-lg`}
          >
            <div className={`relative flex h-28 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br ${block.gradient} md:h-32`}>
              <span className="text-4xl transition-transform duration-300 group-hover:scale-110">{block.icon}</span>
              {/* Animated glow on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="mt-3 space-y-1">
              <h2 className="text-sm font-semibold tracking-tight text-zinc-50">
                {block.title}
              </h2>
              <p className="text-xs leading-relaxed text-zinc-300">
                {block.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
