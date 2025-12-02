import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { RESEARCH_TAGS, type ResearchTag } from "@/config/tags";

export type ResearchArea = {
  slug: string;
  title: string;
  shortTitle: string;
  order: number;
  tags: ResearchTag[];
  image?: string;
  video?: string;
  body: string;
};

const RESEARCH_AREAS_DIR = path.join(process.cwd(), "content", "research-areas");

async function readResearchAreaFile(fileName: string): Promise<ResearchArea> {
  const filePath = path.join(RESEARCH_AREAS_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const rawTags = (data.tags as string[]) ?? [];
  const tags = rawTags.filter((tag): tag is ResearchTag =>
    (RESEARCH_TAGS as readonly string[]).includes(tag),
  );

  return {
    slug: data.slug as string,
    title: data.title as string,
    shortTitle: (data.shortTitle as string) ?? (data.title as string),
    order: (data.order as number) ?? 0,
    tags,
    image: data.image as string | undefined,
    video: data.video as string | undefined,
    body: content.trim(),
  };
}

export async function getResearchAreas(): Promise<ResearchArea[]> {
  const entries = await fs.readdir(RESEARCH_AREAS_DIR);
  const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

  const areas = await Promise.all(mdxFiles.map((file) => readResearchAreaFile(file)));

  return areas.sort((a, b) => a.order - b.order);
}
