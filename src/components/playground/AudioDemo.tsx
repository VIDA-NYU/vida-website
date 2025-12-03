import { SectionShell } from "@/components/layout/SectionShell";

export function AudioDemo() {
  return (
    <SectionShell title="SONYC Project" eyebrow="Urban Sound">
      <p>
        The SONYC (Sounds of New York City) project uses machine listening to 
        monitor and analyze urban noise pollution across the city.
      </p>
      <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-black">
        <iframe
          src="https://www.youtube.com/embed/HJ9Bz5VIYxU"
          title="SONYC - Sounds of New York City"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </SectionShell>
  );
}
