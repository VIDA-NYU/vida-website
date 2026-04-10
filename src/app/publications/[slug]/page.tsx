import { SectionShell } from "@/components/layout/SectionShell";
import { PublicationCiteActions } from "@/components/publications/PublicationCiteActions";
import { getPublicationBySlug, getPublications } from "@/lib/publications";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{
  slug: string;
}>;

export default async function PublicationDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  return (
    <SectionShell
      title={publication.title}
      eyebrow={`${publication.year} · ${publication.venue || publication.kind}`}
      theme="publications"
    >
      <div className="space-y-8">
        {/* Hero image */}
        {publication.image && (
          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Image
              src={publication.image}
              alt={publication.title}
              width={1200}
              height={640}
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        )}

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/40 p-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Cite this work
          </h3>
          <PublicationCiteActions cite={publication.cite} bibtex={publication.bibtex} />
        </div>

        {/* Video - show prominently if available */}
        {publication.video && (
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Video Presentation
            </h3>
            <div className="aspect-video overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-black">
              <iframe
                src={`${publication.video}?rel=0&modestbranding=1`}
                title={publication.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300">
            {publication.year}
          </span>
          {publication.venue && (
            <span className="rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-sm text-zinc-600 dark:text-zinc-300">
              {publication.venue}
            </span>
          )}
          {publication.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Authors */}
        {publication.authors.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Authors
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {publication.authors.join(", ")}
            </p>
          </div>
        )}

        {/* Abstract */}
        {publication.abstract && (
          <div className="rounded-2xl border border-purple-200 dark:border-purple-500/20 bg-purple-50 dark:bg-purple-950/20 p-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Abstract
            </h3>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {publication.abstract}
            </p>
          </div>
        )}

        {/* Body content */}
        {publication.body && (
          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:text-zinc-800 dark:prose-headings:text-zinc-50 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200">
            <div dangerouslySetInnerHTML={{ __html: publication.body.replace(/\n/g, '<br/>') }} />
          </div>
        )}

        {/* External links */}
        <div className="flex flex-wrap items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          {publication.externalUrl && (
            <a
              href={publication.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Read Paper
            </a>
          )}
          {publication.githubUrl && (
            <a
              href={publication.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub Repository
            </a>
          )}
          {publication.doi && (
            <Link
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-all hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-white"
            >
              DOI: {publication.doi}
            </Link>
          )}
          <Link
            href="/publications"
            className="ml-auto inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            ← Back to publications
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

export async function generateStaticParams() {
  const publications = await getPublications();
  return publications.map((pub) => ({ slug: pub.slug }));
}
