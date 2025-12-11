import { SectionShell } from "@/components/layout/SectionShell";
import { getLogEntryBySlug, getLogEntries } from "@/lib/log";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{
  slug: string;
}>;

const KIND_LABELS: Record<string, { label: string; color: string }> = {
  event: { label: "Event", color: "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300" },
  news: { label: "News", color: "bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300" },
  release: { label: "Release", color: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
  talk: { label: "Talk", color: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300" },
  visit: { label: "Visit", color: "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300" },
};

export default async function NewsDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const entry = await getLogEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const kindConfig = KIND_LABELS[entry.kind] || KIND_LABELS.news;

  return (
    <SectionShell
      title={entry.title}
      eyebrow={new Date(entry.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    >
      <div className="space-y-8">
        {/* Hero image */}
        {entry.image && (
          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Image
              src={entry.image}
              alt={entry.title}
              width={1200}
              height={640}
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${kindConfig.color}`}>
            {kindConfig.label}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {entry.date}
          </span>
        </div>

        {/* Summary */}
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          {entry.summary}
        </p>

        {/* Video */}
        {entry.video && (
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              Video
            </h3>
            <div className="aspect-video overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-black">
              <iframe
                src={entry.video}
                title={entry.title}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Body content */}
        {entry.body && (
          <div className="prose dark:prose-invert max-w-none prose-headings:text-zinc-800 dark:prose-headings:text-zinc-50 prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-a:text-purple-600 dark:prose-a:text-sky-400">
            <div dangerouslySetInnerHTML={{ __html: entry.body.replace(/\n/g, '<br/>') }} />
          </div>
        )}

        {/* External link */}
        <div className="flex flex-wrap gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          {entry.link && (
            <Link
              href={entry.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition-all hover:bg-sky-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Learn More
            </Link>
          )}
          <Link
            href="/log"
            className="ml-auto inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            ← Back to logs
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

export async function generateStaticParams() {
  const entries = await getLogEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}
