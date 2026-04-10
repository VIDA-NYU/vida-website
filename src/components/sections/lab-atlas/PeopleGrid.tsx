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
    "from-zinc-400 to-zinc-500",
    "from-slate-400 to-slate-500",
    "from-gray-400 to-gray-500",
    "from-neutral-400 to-neutral-500",
    "from-stone-400 to-stone-500",
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
    <SectionShell title="People" eyebrow="Team">
      <div className="mt-6 space-y-12">
        {/* Category sections */}
        <div className="pt-2">
          <div className="space-y-12">
            {CATEGORY_CONFIG.map(({ role, label, hideAvatar }) => {
              const group = peopleByRole[role as CategoryRole] ?? [];
              if (!group.length) return null;

              return (
                <section key={role} className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    {label}
                  </h3>
                  <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.map((person) => (
                      <article
                        key={person.slug}
                        className="group flex flex-col text-sm"
                      >
                        <header className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                            {hideAvatar ? (
                              <div className={`flex h-full w-full items-center justify-center text-sm font-semibold text-white bg-gradient-to-br ${getAvatarColor(person.name)}`}>
                                {getInitials(person.name)}
                              </div>
                            ) : (
                              <PersonAvatar person={person} size="md" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 truncate">
                              {person.name}
                            </h4>
                            {person.position ? (
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                                {person.position}
                              </p>
                            ) : null}
                            {person.lab ? (
                              <p className="text-[11px] text-zinc-500 truncate">
                                {person.lab}
                              </p>
                            ) : null}
                          </div>
                        </header>
                        
                        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                          {person.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] text-zinc-500 dark:text-zinc-400"
                            >
                              • {tag}
                            </span>
                          ))}
                        </div>

                        {person.website && (
                          <div className="mt-3">
                            <Link
                              href={person.website}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Profile ↗
                            </Link>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
