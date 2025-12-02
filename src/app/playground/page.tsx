import { SectionShell } from "@/components/layout/SectionShell";
import { AstronautScene } from "@/components/playground/AstronautScene";
import { VideoDemo } from "@/components/playground/VideoDemo";
import { AudioDemo } from "@/components/playground/AudioDemo";

export default function PlaygroundPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <SectionShell title="Playground" eyebrow="Demos">
        <p>
          A multimodal sandbox for the lab. These demos use mock content to
          showcase how 3D models, video, and audio assets can be combined in a
          responsive layout.
        </p>
      </SectionShell>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
          3D Scene – Model
        </p>
        <AstronautScene />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <VideoDemo />
        <AudioDemo />
      </div>
    </div>
  );
}
