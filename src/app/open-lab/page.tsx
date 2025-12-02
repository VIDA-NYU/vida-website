import { OpenLabList } from "@/components/sections/open-lab/OpenLabList";
import { getOpenLabResources } from "@/lib/open-lab";

export default async function OpenLabPage() {
  const resources = await getOpenLabResources();

  return <OpenLabList resources={resources} />;
}
