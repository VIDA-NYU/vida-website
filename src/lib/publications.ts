import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { PUBLICATION_TAGS, type PublicationTag } from "@/config/tags";

export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  year: number;
  venue?: string;
  kind: "paper" | "preprint" | "thesis" | "talk";
  externalUrl?: string;
  doi?: string;
  tags: PublicationTag[];
  featured?: boolean;
  thumbnail?: string;
  image?: string;
  video?: string;
  abstract?: string;
  body: string;
};

const PUBLICATIONS_DIR = path.join(process.cwd(), "content", "publications");

async function readPublicationFile(fileName: string): Promise<Publication> {
  const filePath = path.join(PUBLICATIONS_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const rawTags = (data.tags as string[]) ?? [];
  const tags = rawTags.filter((tag): tag is PublicationTag =>
    (PUBLICATION_TAGS as readonly string[]).includes(tag),
  );

  return {
    slug: data.slug as string,
    title: data.title as string,
    authors: (data.authors as string[]) ?? [],
    year: data.year as number,
    venue: data.venue as string | undefined,
    kind: (data.kind as Publication["kind"]) ?? "paper",
    externalUrl: data.externalUrl as string | undefined,
    doi: data.doi as string | undefined,
    tags,
    featured: data.featured as boolean | undefined,
    thumbnail: data.thumbnail as string | undefined,
    image: data.image as string | undefined,
    video: data.video as string | undefined,
    abstract: data.abstract as string | undefined,
    body: content.trim(),
  };
}

export async function getPublications(): Promise<Publication[]> {
  const entries = await fs.readdir(PUBLICATIONS_DIR);
  const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

  const pubs = await Promise.all(mdxFiles.map((file) => readPublicationFile(file)));

  return pubs.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });
}

export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  const entries = await fs.readdir(PUBLICATIONS_DIR);
  const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

  for (const file of mdxFiles) {
    const pub = await readPublicationFile(file);
    if (pub.slug === slug) {
      return pub;
    }
  }
  return null;
}
