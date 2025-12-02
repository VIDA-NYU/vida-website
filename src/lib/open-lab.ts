import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type OpenLabKind = "dataset" | "repository" | "software";

export type OpenLabResource = {
  slug: string;
  title: string;
  kind: OpenLabKind;
  summary: string;
  area?: string;
  link?: string;
  tags: string[];
  updated: string; // ISO date
};

const OPEN_LAB_DIR = path.join(process.cwd(), "content", "open-lab");

async function readOpenLabFile(fileName: string): Promise<OpenLabResource> {
  const filePath = path.join(OPEN_LAB_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const body = content.trim();
  const summaryFromBody = body
    ? body
        .split(/\n{2,}/)[0]
        .replace(/\s+/g, " ")
        .trim()
    : "";

  const kind = (data.kind as OpenLabKind) ?? "dataset";

  return {
    slug: data.slug as string,
    title: data.title as string,
    kind,
    summary: (data.summary as string) ?? summaryFromBody,
    area: data.area as string | undefined,
    link: data.link as string | undefined,
    tags: (data.tags as string[]) ?? [],
    updated: (data.updated as string) ?? (data.date as string) ?? "1970-01-01",
  };
}

export async function getOpenLabResources(): Promise<OpenLabResource[]> {
  const entries = await fs.readdir(OPEN_LAB_DIR);
  const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

  const resources = await Promise.all(mdxFiles.map((file) => readOpenLabFile(file)));

  return resources.sort((a, b) => {
    if (a.updated !== b.updated) return a.updated < b.updated ? 1 : -1;
    return a.title.localeCompare(b.title);
  });
}
