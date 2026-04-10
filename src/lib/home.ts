import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type BannerVideo = {
  id: string;
  title: string;
  description: string;
};

export type FeaturedItem = {
  type: "publication" | "news" | "project";
  slug: string;
};

export type HomeData = {
  bannerVideos: BannerVideo[];
  featured: FeaturedItem[];
  awards: { slug: string }[];
  activeProjects: { slug: string }[];
  body: string;
};

export async function getHomeData(): Promise<HomeData> {
  const filePath = path.join(process.cwd(), "content", "home", "index.mdx");
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    bannerVideos: (data.bannerVideos as BannerVideo[]) ?? [],
    featured: (data.featured as FeaturedItem[]) ?? [],
    awards: (data.awards as { slug: string }[]) ?? [],
    activeProjects: (data.activeProjects as { slug: string }[]) ?? [],
    body: content.trim(),
  };
}
