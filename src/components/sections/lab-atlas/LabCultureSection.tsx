import { SectionShell } from "@/components/layout/SectionShell";
import Image from "next/image";

const cultureBlocks = [
  {
    title: "Whiteboard Sessions",
    description:
      "Sketching models, pipelines, and storyboards together before they become systems or papers.",
    image: "/mock-assets/images/projects/project-01.jpg",
  },
  {
    title: "Lab & City",
    description:
      "Connecting lab work to the city outside: urban data, soundscapes, and infrastructure.",
    image: "/mock-assets/images/projects/project-02.jpg",
  },
  {
    title: "Screens & Experiments",
    description:
      "Dashboards, prototypes, and experiments in progress across multiple domains.",
    image: "/mock-assets/images/projects/project-03.jpg",
  },
];

export function LabCultureSection() {
  return (
    <SectionShell title="Lab & Culture" eyebrow="Atlas">
      <p>
        A quick snapshot of the spaces, artifacts, and practices around the
        people: where multimodal data, whiteboards, and prototypes live.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cultureBlocks.map((block) => (
          <article
            key={block.title}
            className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 shadow-sm"
          >
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              <Image
                src={block.image}
                alt={block.title}
                width={480}
                height={260}
                className="h-28 w-full object-cover md:h-32"
              />
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
