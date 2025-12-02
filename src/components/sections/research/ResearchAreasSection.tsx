import { SectionShell } from "@/components/layout/SectionShell";
import type { ResearchArea } from "@/lib/research-areas";
import { ResearchAreaCard } from "@/components/sections/research/ResearchAreaCard";

type Props = {
  areas: ResearchArea[];
};

export function ResearchAreasSection({ areas }: Props) {
  return (
    <SectionShell title="Research" eyebrow="Areas">
      <p>
        Our work spans visualization, imaging, and data analysis. These areas
        are tightly connected and often come together in interdisciplinary
        projects.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <ResearchAreaCard key={area.slug} area={area} />
        ))}
      </div>
    </SectionShell>
  );
}
