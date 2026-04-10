import { PeopleGrid } from "@/components/sections/lab-atlas/PeopleGrid";
import { getPeople } from "@/lib/people";

export default async function PeoplePage() {
  const people = await getPeople();

  return (
    <div className="space-y-10 md:space-y-12">
      <PeopleGrid people={people} />
    </div>
  );
}
