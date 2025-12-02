import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { PROJECT_TAGS, type ProjectTag } from "@/config/tags";

export type Project = {
  slug: string;
  title: string;
  kind: "program" | "project" | "tool";
  summary: string;
  status: "active" | "archived" | "legacy";
  externalUrl?: string;
  relatedAreas: string[];
  tags: ProjectTag[];
  image?: string;
  video?: string;
  body: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

async function readProjectFile(fileName: string): Promise<Project> {
  const filePath = path.join(PROJECTS_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const rawTags = (data.tags as string[]) ?? [];
  const tags = rawTags.filter((tag): tag is ProjectTag =>
    (PROJECT_TAGS as readonly string[]).includes(tag),
  );

  return {
    slug: data.slug as string,
    title: data.title as string,
    kind: (data.kind as Project["kind"]) ?? "project",
    summary: (data.summary as string) ?? "",
    status: (data.status as Project["status"]) ?? "active",
    externalUrl: data.externalUrl as string | undefined,
    relatedAreas: (data.relatedAreas as string[]) ?? [],
    tags,
    image: data.image as string | undefined,
    video: data.video as string | undefined,
    body: content.trim(),
  };
}

export async function getProjects(): Promise<Project[]> {
  const entries = await fs.readdir(PROJECTS_DIR);
  const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

  const projects = await Promise.all(mdxFiles.map((file) => readProjectFile(file)));

  return projects.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
