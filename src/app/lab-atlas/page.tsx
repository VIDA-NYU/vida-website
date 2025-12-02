import { PeopleGrid } from "@/components/sections/lab-atlas/PeopleGrid";
import { LabCultureSection } from "@/components/sections/lab-atlas/LabCultureSection";
import { getPeople } from "@/lib/people";

export default async function LabAtlasPage() {
  const people = await getPeople();

  return (
    <div className="space-y-10 md:space-y-12">
      <LabCultureSection />
      <PeopleGrid people={people} />
    </div>
  );
}
