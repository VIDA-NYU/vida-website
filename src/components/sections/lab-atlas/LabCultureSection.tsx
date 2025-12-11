import { SectionShell } from "@/components/layout/SectionShell";
import Image from "next/image";

const cultureBlocks = [
  {
    title: "Visual Analytics",
    description:
      "Designing interactive systems that help people explore and make sense of large, high-dimensional data.",
    icon: "📊",
    gradient: "from-sky-600/30 to-cyan-600/20",
    borderColor: "hover:border-sky-500/50",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    title: "Urban Computing",
    description:
      "Connecting lab work to the city: urban data, soundscapes, mobility patterns, and infrastructure.",
    icon: "🏙️",
    gradient: "from-emerald-600/30 to-teal-600/20",
    borderColor: "hover:border-emerald-500/50",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
  },
  {
    title: "Reproducibility",
    description:
      "Building tools and systems that enable computational reproducibility across scientific domains.",
    icon: "🔄",
    gradient: "from-amber-600/30 to-orange-600/20",
    borderColor: "hover:border-amber-500/50",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
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
            className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 shadow-sm transition-all duration-300 ${block.borderColor} hover:shadow-lg`}
          >
            <div className="relative h-36 overflow-hidden md:h-40">
              <Image
                src={block.image}
                alt={block.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-white/50 dark:via-zinc-950/50 to-transparent" />
              <div className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${block.gradient} text-xl shadow-lg backdrop-blur-sm`}>
                {block.icon}
              </div>
            </div>
            <div className="p-4 space-y-1">
              <h2 className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-50">
                {block.title}
              </h2>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                {block.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
