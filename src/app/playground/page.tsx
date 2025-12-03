import { SectionShell } from "@/components/layout/SectionShell";
import { AstronautScene } from "@/components/playground/AstronautScene";
import { VideoDemo } from "@/components/playground/VideoDemo";
import { AudioDemo } from "@/components/playground/AudioDemo";
import Link from "next/link";

export default function PlaygroundPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <SectionShell title="Research Playground" eyebrow="Interactive Demos">
        <p>
          Explore interactive demonstrations of VIDA lab research. This page showcases
          3D visualization, data exploration tools, and research project highlights.
        </p>
      </SectionShell>

      {/* 3D Point Cloud Visualization */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              3D Visualization
            </p>
            <h2 className="mt-1 text-lg font-bold text-zinc-50">Point Cloud Explorer</h2>
          </div>
          <div className="text-xs text-zinc-400">
            Drag to rotate • Scroll to zoom
          </div>
        </div>
        <AstronautScene />
        <p className="text-xs text-zinc-500">
          Interactive 3D point cloud visualization. This demo uses Three.js and React Three Fiber
          to render point cloud data captured from real-world scenes.
        </p>
      </div>

      {/* Research Showcases */}
      <div className="grid gap-8 lg:grid-cols-2">
        <VideoDemo />
        <AudioDemo />
      </div>

      {/* Quick Links to Projects */}
      <SectionShell title="Explore More" eyebrow="Related Projects">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Urban Pulse", href: "/projects/urban-pulse", desc: "City rhythm visualization" },
            { name: "ReproZip", href: "/projects/reprozip", desc: "Reproducibility tools" },
            { name: "SONYC", href: "/projects/sonyc", desc: "Urban sound monitoring" },
            { name: "ITK-SNAP", href: "/projects/itk-snap", desc: "Medical image segmentation" },
          ].map((project) => (
            <Link
              key={project.name}
              href={project.href}
              className="group rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 transition-all hover:border-sky-500/40 hover:bg-zinc-900/50"
            >
              <h3 className="font-semibold text-zinc-50 group-hover:text-sky-300 transition-colors">
                {project.name}
              </h3>
              <p className="mt-1 text-xs text-zinc-500">{project.desc}</p>
            </Link>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
