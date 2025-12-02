import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type LogEntry = {
  slug: string;
  title: string;
  date: string; // ISO-like date string, e.g. 2025-02-18
  kind: "event" | "news" | "release" | "talk" | "visit";
  summary: string;
  link?: string;
};

const LOG_DIR = path.join(process.cwd(), "content", "log");

async function readLogFile(fileName: string): Promise<LogEntry> {
  const filePath = path.join(LOG_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const body = content.trim();
  const summaryFromBody = body
    ? body
        .split(/\n{2,}/)[0]
        .replace(/\s+/g, " ")
        .trim()
    : "";

  const kind = (data.kind as LogEntry["kind"]) ?? "news";

  return {
    slug: data.slug as string,
    title: data.title as string,
    date: (data.date as string) ?? "1970-01-01",
    kind,
    summary: (data.summary as string) ?? summaryFromBody,
    link: data.link as string | undefined,
  };
}

export async function getLogEntries(): Promise<LogEntry[]> {
  const entries = await fs.readdir(LOG_DIR);
  const mdxFiles = entries.filter((file) => file.endsWith(".mdx"));

  const logs = await Promise.all(mdxFiles.map((file) => readLogFile(file)));

  return logs.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1; // newest first
    return a.title.localeCompare(b.title);
  });
}
