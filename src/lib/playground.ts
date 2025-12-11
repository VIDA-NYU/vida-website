import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type PlaygroundKind = "3d" | "video" | "audio" | "image" | "interactive";

export type AudioTrack = {
  label: string;
  src: string;
};

export type PlaygroundItem = {
  slug: string;
  title: string;
  kind: PlaygroundKind;
  summary: string;
  body: string;
  order: number;
  featured: boolean;
  // Media fields - different items use different media types
  model?: string;
  video?: string;
  audio?: AudioTrack[];
  image?: string;
  instructions?: string;
  relatedProject?: string;
  tags: string[];
};

const PLAYGROUND_DIR = path.join(process.cwd(), "content", "playground");

async function readPlaygroundFile(fileName: string): Promise<PlaygroundItem> {
  const filePath = path.join(PLAYGROUND_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  // Parse audio tracks if present
  let audio: AudioTrack[] | undefined;
  if (data.audio && Array.isArray(data.audio)) {
    audio = data.audio.map((track: { label?: string; src?: string }) => ({
      label: track.label ?? "Audio",
      src: track.src ?? "",
    }));
  }

  return {
    slug: data.slug as string,
    title: data.title as string,
    kind: (data.kind as PlaygroundKind) ?? "interactive",
    summary: (data.summary as string) ?? "",
    body: content.trim(),
    order: (data.order as number) ?? 99,
    featured: (data.featured as boolean) ?? false,
    model: data.model as string | undefined,
    video: data.video as string | undefined,
    audio,
    image: data.image as string | undefined,
    instructions: data.instructions as string | undefined,
    relatedProject: data.relatedProject as string | undefined,
    tags: (data.tags as string[]) ?? [],
  };
}

export async function getPlaygroundItems(): Promise<PlaygroundItem[]> {
  try {
    const entries = await fs.readdir(PLAYGROUND_DIR);
    const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

    const items = await Promise.all(mdxFiles.map((file) => readPlaygroundFile(file)));

    // Sort by order, then by featured status
    return items.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
  } catch {
    return [];
  }
}

export async function getPlaygroundItemBySlug(slug: string): Promise<PlaygroundItem | undefined> {
  const items = await getPlaygroundItems();
  return items.find((item) => item.slug === slug);
}
