import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPersonBySlug, getPeople } from "@/lib/people";
import { SectionShell } from "@/components/layout/SectionShell";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const people = await getPeople();
  return people.map((person) => ({
    slug: person.slug,
  }));
}

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0]!.charAt(0)!.toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

export default async function PersonPage({ params }: Props) {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);

  if (!person) {
    notFound();
  }

  return (
    <div className="pt-24 pb-32">
      <SectionShell title="Profile" eyebrow="People">
        <div className="mb-12 mt-4">
          <Link
            href="/people"
            className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors group"
          >
            <span className="mr-1.5 transition-transform group-hover:-translate-x-0.5">←</span>
            Back to People
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column: Image & Quick Info */}
          <div className="lg:w-1/3 flex flex-col gap-8 shrink-0">
            {person.image && (
              <div className="w-full aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-none relative">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className={`flex flex-col gap-6 ${person.image ? 'pt-4 border-t border-zinc-200 dark:border-zinc-800' : ''}`}>
              {/* Contact & Links */}
              <div className="flex flex-col gap-3">
                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                  >
                    Email
                  </a>
                )}
                {person.website && (
                  <a
                    href={person.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors group"
                  >
                    Personal Website
                    <span className="ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">→</span>
                  </a>
                )}
              </div>

              {/* Research Areas */}
              {person.researchAreas && person.researchAreas.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
                    Research Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {person.researchAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 text-xs font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300 rounded-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {person.tags && person.tags.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
                    Expertise & Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {person.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Bio & Content */}
          <div className="lg:w-2/3">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
                {person.name}
              </h1>
              <div className="flex flex-col gap-1.5 text-lg text-zinc-600 dark:text-zinc-400 font-light">
                {person.role && <span>{person.role}</span>}
                {person.position && <span>{person.position}</span>}
                {person.affiliation && <span>{person.affiliation}</span>}
              </div>
            </header>

            <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-medium prose-a:font-normal prose-a:underline-offset-4 hover:prose-a:text-zinc-900 dark:hover:prose-a:text-zinc-100">
              {person.bio ? (
                <div dangerouslySetInnerHTML={{ __html: person.bio.replace(/\n\n/g, '<br/><br/>') }} />
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400 italic">No biography available.</p>
              )}
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
