import { ResearchAreasSection } from "@/components/sections/research/ResearchAreasSection";
import { getResearchAreas } from "@/lib/research-areas";

export default async function ResearchPage() {
  const areas = await getResearchAreas();

  return <ResearchAreasSection areas={areas} />;
}
