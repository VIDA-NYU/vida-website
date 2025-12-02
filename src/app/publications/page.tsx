import { PublicationsList } from "@/components/sections/publications/PublicationsList";
import { getPublications } from "@/lib/publications";

export default async function PublicationsPage() {
  const publications = await getPublications();

  return <PublicationsList publications={publications} />;
}
