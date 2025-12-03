import { SectionShell } from "@/components/layout/SectionShell";

export function VideoDemo() {
  return (
    <SectionShell title="Video Demo" eyebrow="Visualization">
      <p>
        Research visualization demos from VIDA lab projects showcasing 
        interactive systems and data exploration tools.
      </p>
      <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-black">
        <iframe
          src="https://www.youtube.com/embed/FvYvPpGDvzQ"
          title="VIDA Research Demo"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </SectionShell>
  );
}
