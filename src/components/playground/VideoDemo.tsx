import { SectionShell } from "@/components/layout/SectionShell";

export function VideoDemo() {
  return (
    <SectionShell title="Video Demo" eyebrow="Multimodal">
      <p>
        A short looping video clip used as mock content. In a real deployment,
        this could showcase interactive systems, visualization walk-throughs, or
        recorded experiments.
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-black">
        <video
          src="/mock-assets/video/demo-01.mp4"
          className="h-full w-full"
          controls
          loop
          muted
        />
      </div>
    </SectionShell>
  );
}
