import { ProjectsGrid } from "@/components/sections/projects/ProjectsGrid";
import { getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsGrid projects={projects} />;
}
