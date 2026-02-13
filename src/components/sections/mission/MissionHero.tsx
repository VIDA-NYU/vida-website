import Link from "next/link";
import Image from "next/image";

type MissionHeroProps = {
  peopleCount?: number;
  publicationsCount?: number;
};

export function MissionHero({ peopleCount, publicationsCount }: MissionHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-purple-50 via-white to-zinc-50 dark:from-purple-950/50 dark:via-zinc-950 dark:to-zinc-900 p-[1px] shadow-xl">
      <div className="relative flex flex-col gap-8 rounded-[1.35rem] bg-white/80 dark:bg-zinc-950/80 px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative z-10 flex-1 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-300 dark:border-purple-500/40 bg-purple-100 dark:bg-purple-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-purple-700 dark:text-purple-200">
            <span className="text-purple-600 dark:text-purple-300">VIDA</span>
            <span className="h-1 w-1 rounded-full bg-green-500 dark:bg-green-400" />
            <span>Visualization Imaging & Data Analysis</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-50 sm:text-4xl md:text-5xl">
            Visualizing data.
            <br />
            Amplifying understanding.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base">
            The Visualization Imaging and Data Analysis Center at NYU consists of 
            computer scientists who work closely with domain experts to apply the 
            latest advances in computing to problems of critical societal importance.
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            We work in the areas of Visualization, Imaging and Data Analysis, 
            generating hypotheses and methods that new data sources and data types demand.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <Link
              href="/research"
              className="inline-flex items-center rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-purple-500"
            >
              Explore research
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-100 transition-colors hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300"
            >
              View projects
            </Link>
            <div className="ml-0 flex flex-wrap items-center gap-3 md:ml-4">
              {typeof peopleCount === "number" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-900/80 px-3 py-1 text-[11px] text-zinc-600 dark:text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400" />
                  {peopleCount}+ people
                </span>
              )}
              {typeof publicationsCount === "number" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-900/80 px-3 py-1 text-[11px] text-zinc-600 dark:text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
                  {publicationsCount}+ publications
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-500/10 via-green-400/10 to-purple-400/5" />
          <div className="relative flex flex-col gap-4 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/80 p-4 shadow-2xl">
            <div className="flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-gradient-to-br from-purple-50 dark:from-purple-950/50 via-zinc-50 dark:via-zinc-900 to-white dark:to-zinc-950 sm:h-52">
              <Image
                src="/assets/VIDA Logo.png"
                alt="VIDA - Visualization Imaging and Data Analysis Center"
                width={400}
                height={200}
                className="h-auto w-full max-w-[280px] sm:max-w-[340px]"
                priority
              />
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              NYU Tandon School of Engineering
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              Co-directed by Professors Claudio Silva and Juliana Freire, VIDA brings 
              together researchers working on visualization, data management, machine 
              learning, and urban analytics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
