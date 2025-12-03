import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Person = {
  slug: string;
  name: string;
  role: string;
  position?: string;
  affiliation?: string;
  status: "current" | "alumni";
  order: number;
  website?: string;
  image?: string;
  lab?: string;
  researchAreas: string[];
  tags: string[];
  bio: string;
};

const PEOPLE_DIR = path.join(process.cwd(), "content", "people");

// Normalize role names to display format
export function normalizeRole(role: string): string {
  const roleMap: Record<string, string> = {
    "faculty": "Faculty",
    "research-associate": "Research Associate",
    "student": "Student",
    "alumni": "Alumni",
    "staff": "Staff",
    "collaborator": "Collaborators and Associated Faculty",
  };
  return roleMap[role.toLowerCase()] ?? role;
}

function roleWeight(role: string): number {
  const normalized = role.toLowerCase();
  switch (normalized) {
    case "faculty":
      return 0;
    case "research-associate":
      return 1;
    case "collaborator":
      return 2;
    case "student":
      return 3;
    case "alumni":
      return 4;
    case "staff":
      return 5;
    default:
      return 6;
  }
}

async function readPersonFile(fileName: string): Promise<Person> {
  const filePath = path.join(PEOPLE_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  // Handle empty image strings
  const rawImage = data.image as string | undefined;
  const image = rawImage && rawImage.trim() !== "" ? rawImage : undefined;

  return {
    slug: data.slug as string,
    name: data.name as string,
    role: normalizeRole(data.role as string),
    position: data.position as string | undefined,
    affiliation: data.affiliation as string | undefined,
    status: (data.status as Person["status"]) ?? "current",
    order: (data.order as number) ?? 0,
    website: data.website as string | undefined,
    image,
    lab: data.lab as string | undefined,
    researchAreas: (data.researchAreas as string[]) ?? [],
    tags: (data.tags as string[]) ?? [],
    bio: content.trim(),
  };
}

export async function getPeople(): Promise<Person[]> {
  const entries = await fs.readdir(PEOPLE_DIR);
  const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

  const people = await Promise.all(mdxFiles.map((file) => readPersonFile(file)));

  return people.sort((a, b) => {
    const roleDiff = roleWeight(a.role) - roleWeight(b.role);
    if (roleDiff !== 0) return roleDiff;
    const orderDiff = a.order - b.order;
    if (orderDiff !== 0) return orderDiff;
    return a.name.localeCompare(b.name);
  });
}
