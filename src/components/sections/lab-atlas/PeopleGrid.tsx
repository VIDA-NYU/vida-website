import { SectionShell } from "@/components/layout/SectionShell";
import type { Person } from "@/lib/people";
import Image from "next/image";
import Link from "next/link";

type Props = {
  people: Person[];
};

type CategoryConfig = {
  role: string;
  label: string;
  layout: "featured" | "standard" | "text";
  columns?: "1" | "2" | "3" | "4";
};

const CATEGORY_CONFIG: CategoryConfig[] = [
  { role: "Faculty", label: "Faculty", layout: "featured", columns: "4" },
  { role: "Research Associate", label: "Research Associates", layout: "standard", columns: "3" },
  { role: "Collaborators and Associated Faculty", label: "Collaborators", layout: "standard", columns: "3" },
  { role: "PhD Student", label: "PhD Students", layout: "standard", columns: "4" },
  { role: "Masters Student", label: "Masters Students", layout: "standard", columns: "4" },
  { role: "Alumni", label: "Alumni", layout: "text", columns: "4" },
  { role: "Staff", label: "Staff", layout: "text", columns: "4" },
];

type CategoryRole = CategoryConfig["role"];

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0]!.charAt(0)!.toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

// Featured card for faculty - stark, large editorial layout
function FeaturedPersonCard({ person }: { person: Person }) {
  return (
    <article className="group flex flex-col gap-4">
      {person.image && (
        <div className="w-full max-w-[240px] aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={person.image}
            alt={person.name}
            width={480}
            height={600}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col">
        <h4 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
          <Link href={`/people/${person.slug}`} className="hover:underline">{person.name}</Link>
        </h4>
        {person.position && (
          <p className="mt-1 text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {person.position}
          </p>
        )}
        {person.researchAreas.length > 0 && (
          <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {person.researchAreas.join(" • ")}
          </p>
        )}
      </div>
    </article>
  );
}

// Standard card for research associates, students - minimal, clean circle avatars
function StandardPersonCard({ person }: { person: Person }) {
  return (
    <article className="group flex items-start gap-4">
      {person.image && (
        <div className="w-16 h-16 shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 mt-0.5">
          <Image
            src={person.image}
            alt={person.name}
            width={320}
            height={320}
            quality={100}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-black dark:group-hover:text-white">
          <Link href={`/people/${person.slug}`} className="hover:underline">{person.name}</Link>
        </h4>
        {person.position && (
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {person.position}
          </p>
        )}
      </div>
    </article>
  );
}

// Text card for alumni, staff - ultra dense editorial list
function TextPersonCard({ person }: { person: Person }) {
  return (
    <article className="group flex items-center gap-4 py-3 border-t border-zinc-200 dark:border-zinc-800/80">
      {person.image && (
        <div className="w-10 h-10 shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={person.image}
            alt={person.name}
            width={160}
            height={160}
            quality={100}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col min-w-0">
        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-black dark:group-hover:text-white">
          <Link href={`/people/${person.slug}`} className="hover:underline">
            {person.name}
          </Link>
        </h4>
        {(person.position || person.affiliation) && (
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
            {person.position || person.affiliation}
          </p>
        )}
      </div>
    </article>
  );
}

export function PeopleGrid({ people }: Props) {
  const peopleByRole = people.reduce<Record<string, Person[]>>((acc, person) => {
    if (!acc[person.role]) acc[person.role] = [];
    acc[person.role].push(person);
    return acc;
  }, {});

  const getGridColumnClass = (columns: CategoryConfig["columns"]) => {
    switch (columns) {
      case "1": return "grid-cols-1";
      case "2": return "grid-cols-1 sm:grid-cols-2";
      case "3": return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case "4": return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      default: return "grid-cols-1";
    }
  };

  const renderPersonCard = (person: Person, layout: CategoryConfig["layout"]) => {
    switch (layout) {
      case "featured": return <FeaturedPersonCard key={person.slug} person={person} />;
      case "standard": return <StandardPersonCard key={person.slug} person={person} />;
      case "text": return <TextPersonCard key={person.slug} person={person} />;
    }
  };

  return (
    <SectionShell title="People" eyebrow="Our Team">
      <div className="mt-12 space-y-24">
        {CATEGORY_CONFIG.map(({ role, label, layout, columns }) => {
          const group = peopleByRole[role as CategoryRole] ?? [];
          if (!group.length) return null;

          return (
            <section key={role} className="flex flex-col">
              <div className="flex items-baseline gap-4 mb-10 pb-4 border-b border-zinc-900 dark:border-zinc-100">
                <h2 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                  {label}
                </h2>
                <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                  {group.length} {group.length === 1 ? 'MEMBER' : 'MEMBERS'}
                </span>
              </div>
              <div className={`grid gap-x-8 ${layout === 'featured' ? 'gap-y-16' : layout === 'standard' ? 'gap-y-10' : 'gap-y-0'} ${getGridColumnClass(columns)}`}>
                {group.map((person) => renderPersonCard(person, layout))}
              </div>
            </section>
          );
        })}
      </div>
    </SectionShell>
  );
}
