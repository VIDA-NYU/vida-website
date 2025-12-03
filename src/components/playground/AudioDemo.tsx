import { SectionShell } from "@/components/layout/SectionShell";

export function AudioDemo() {
  return (
    <SectionShell title="Machine Learning" eyebrow="Research Videos">
      <p>
        Explore how neural networks and deep learning are transforming 
        data analysis and scientific discovery.
      </p>
      <div className="mt-4 space-y-4">
        <div className="aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-black">
          <iframe
            src="https://www.youtube.com/embed/aircAruvnKk?rel=0&modestbranding=1"
            title="What is a Neural Network?"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-2">
          <h3 className="font-semibold text-zinc-50">What is a Neural Network?</h3>
          <p className="mt-1 text-xs text-zinc-400">3Blue1Brown explains deep learning with beautiful visualizations</p>
        </div>
      </div>
    </SectionShell>
  );
}
