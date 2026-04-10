import { SectionShell } from "@/components/layout/SectionShell";
import Image from "next/image";

const cultureBlocks = [
  {
    title: "Visual Analytics",
    description:
      "Designing interactive systems that help people explore and make sense of large, high-dimensional data.",
    icon: "📊",
    gradient: "from-zinc-400/30 to-zinc-500/20",
    borderColor: "hover:border-zinc-400/50",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    title: "Urban Computing",
    description:
      "Connecting lab work to the city: urban data, soundscapes, mobility patterns, and infrastructure.",
    icon: "🏙️",
    gradient: "from-zinc-400/30 to-zinc-500/20",
    borderColor: "hover:border-zinc-400/50",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
  },
  {
    title: "Reproducibility",
    description:
      "Building tools and systems that enable computational reproducibility across scientific domains.",
    icon: "🔄",
    gradient: "from-zinc-400/30 to-zinc-500/20",
    borderColor: "hover:border-zinc-400/50",
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
            className={`group flex flex-col justify-between overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-transparent py-4 text-sm transition-all duration-200 last:border-0`}
          >
            <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={block.image}
                alt={block.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                <span className="mr-2">{block.icon}</span>
                {block.title}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {block.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
