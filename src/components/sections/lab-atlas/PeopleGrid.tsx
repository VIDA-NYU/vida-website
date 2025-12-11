import { SectionShell } from "@/components/layout/SectionShell";
import type { Person } from "@/lib/people";
import Image from "next/image";
import Link from "next/link";

type Props = {
  people: Person[];
};

function groupByLab(people: Person[]): Record<string, Person[]> {
  return people.reduce<Record<string, Person[]>>((acc, person) => {
    const key = person.lab ?? "Lab";
    if (!acc[key]) acc[key] = [];
    acc[key].push(person);
    return acc;
  }, {});
}

type CategoryConfig = {
  role: string;
  label: string;
  hideAvatar?: boolean;
};

const CATEGORY_CONFIG: CategoryConfig[] = [
  { role: "Faculty", label: "Faculty" },
  { role: "Research Associate", label: "Research Associates" },
  {
    role: "Collaborators and Associated Faculty",
    label: "Collaborators & Associated Faculty",
  },
  { role: "Student", label: "Students" },
  { role: "Alumni", label: "Alumni" },
  { role: "Visiting Researcher", label: "Visiting Researchers", hideAvatar: true },
  { role: "Past Visitor", label: "Past Visitors", hideAvatar: true },
  { role: "Staff", label: "Staff" },
];

type CategoryRole = CategoryConfig["role"];

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0]!.charAt(0)!.toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

// Generate a consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    "from-sky-500 to-cyan-500",
    "from-violet-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
    "from-pink-500 to-rose-500",
    "from-blue-500 to-indigo-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length]!;
}

function PersonAvatar({ person, size = "md" }: { person: Person; size?: "sm" | "md" }) {
  const sizeClasses = size === "sm" ? "h-8 w-8 text-[10px]" : "h-10 w-10 text-xs";
  const imgSize = size === "sm" ? 32 : 40;
  
  if (person.image) {
    return (
      <Image
        src={person.image}
        alt={person.name}
        width={imgSize}
        height={imgSize}
        className={`${sizeClasses} object-cover`}
      />
    );
  }
  
  return (
    <div className={`flex ${sizeClasses} items-center justify-center bg-gradient-to-br ${getAvatarColor(person.name)} font-semibold text-white`}>
      {getInitials(person.name)}
    </div>
  );
}

export function PeopleGrid({ people }: Props) {
  const groups = groupByLab(people);
  const labs = Object.keys(groups);

  const peopleByRole = people.reduce<Record<string, Person[]>>((acc, person) => {
    if (!acc[person.role]) acc[person.role] = [];
    acc[person.role].push(person);
    return acc;
  }, {});

  return (
    <SectionShell title="Lab Atlas" eyebrow="People & Labs" theme="people">
      <p>
        A snapshot of the people and lab clusters that make up this space. The
        collage for each lab gives a quick visual sense of who is there.
      </p>
      <div className="mt-6 space-y-6">
        {/* Lab collages */}
        {labs.map((lab) => {
          const group = groups[lab];
          return (
            <section key={lab} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {lab}
                </h2>
                <span className="text-[11px] text-zinc-400">
                  {group.length} people
                </span>
              </div>

              {/* Lab collage */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {group.slice(0, 7).map((person, index) => (
                    <div
                      key={person.slug}
                      className="h-8 w-8 overflow-hidden rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-900"
                      style={{ zIndex: group.length - index }}
                    >
                      <PersonAvatar person={person} size="sm" />
                    </div>
                  ))}
                  {group.length > 7 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-[10px] text-zinc-600 dark:text-zinc-300">
                      +{group.length - 7}
                    </div>
                  )}
                </div>
                <span className="rounded-full bg-purple-100 dark:bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-700 dark:text-sky-200">
                  {group.length} members
                </span>
              </div>
            </section>
          );
        })}

        {/* Category sections */}
        {CATEGORY_CONFIG.map(({ role, label, hideAvatar }) => {
          const group = peopleByRole[role as CategoryRole] ?? [];
          if (!group.length) return null;

          return (
            <section key={role} className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                {label}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((person) => (
                  <article
                    key={person.slug}
                    className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-4 text-sm shadow-sm transition-all duration-200 hover:border-purple-300 dark:hover:border-violet-500/40 hover:shadow-lg hover:shadow-purple-100 dark:hover:shadow-violet-900/10"
                  >
                    <header className="flex items-start gap-3">
                      <div className="mt-0.5 h-10 w-10 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                        {hideAvatar ? (
                          <div className={`flex h-full w-full items-center justify-center text-xs font-semibold text-white bg-gradient-to-br ${getAvatarColor(person.name)}`}>
                            {getInitials(person.name)}
                          </div>
                        ) : (
                          <PersonAvatar person={person} size="md" />
                        )}
                      </div>
                      <h3 className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-50">
                        {person.name}
                        {person.position ? (
                          <span className="block text-xs font-normal text-zinc-600 dark:text-zinc-300">
                            {person.position}
                          </span>
                        ) : null}
                        {person.affiliation ? (
                          <span className="block text-[11px] text-zinc-500">
                            {person.affiliation}
                          </span>
                        ) : null}
                        {person.lab ? (
                          <span className="mt-0.5 inline-block rounded-full bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 text-[10px] font-normal text-zinc-600 dark:text-zinc-300">
                            {person.lab}
                          </span>
                        ) : null}
                      </h3>
                    </header>
                    {person.bio ? (
                      <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {person.bio}
                      </p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                      {person.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 text-zinc-600 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {person.website ? (
                        <Link
                          href={person.website}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex items-center rounded-full bg-purple-500 px-2.5 py-0.5 font-medium text-white transition-colors hover:bg-purple-400"
                        >
                          Profile
                        </Link>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </SectionShell>
  );
}
