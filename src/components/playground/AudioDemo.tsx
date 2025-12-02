import { SectionShell } from "@/components/layout/SectionShell";

export function AudioDemo() {
  return (
    <SectionShell title="Audio Demo" eyebrow="Sound">
      <p>
        Short audio samples can be embedded directly. This mock segment uses a
        simple chime and ambient clip from the mock assets library.
      </p>
      <div className="mt-4 space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-200">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Chime
          </p>
          <audio src="/mock-assets/audio/chime-01.mp3" controls className="mt-1 w-full" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Ambient
          </p>
          <audio src="/mock-assets/audio/ambient-01.mp3" controls className="mt-1 w-full" />
        </div>
      </div>
    </SectionShell>
  );
}
