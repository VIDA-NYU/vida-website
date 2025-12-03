import { SectionShell } from "@/components/layout/SectionShell";

export function VideoDemo() {
  return (
    <SectionShell title="Data Visualization" eyebrow="Research Videos">
      <p>
        Watch how data visualization transforms complex information into 
        understandable insights.
      </p>
      <div className="mt-4 space-y-4">
        <div className="aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-black">
          <iframe
            src="https://www.youtube.com/embed/5Zg-C8AAIGg?rel=0&modestbranding=1"
            title="The Beauty of Data Visualization"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-2">
          <h3 className="font-semibold text-zinc-50">The Beauty of Data Visualization</h3>
          <p className="mt-1 text-xs text-zinc-400">David McCandless shows how data visualization can reveal hidden patterns</p>
        </div>
      </div>
    </SectionShell>
  );
}
