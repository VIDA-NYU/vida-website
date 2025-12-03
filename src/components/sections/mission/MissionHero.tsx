import Link from "next/link";

type MissionHeroProps = {
  peopleCount?: number;
  publicationsCount?: number;
};

export function MissionHero({ peopleCount, publicationsCount }: MissionHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-sky-950 via-zinc-950 to-zinc-900 p-[1px] shadow-xl">
      <div className="relative flex flex-col gap-8 rounded-[1.35rem] bg-zinc-950/80 px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 flex-1 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-sky-200">
            <span>VIDA</span>
            <span className="h-1 w-1 rounded-full bg-sky-300" />
            <span>Visualization & Data Analytics</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl">
            Visualizing data.
            <br />
            Amplifying understanding.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            The Visualization and Data Analytics Research Center at NYU consists of 
            computer scientists who work closely with domain experts to apply the 
            latest advances in computing to problems of critical societal importance.
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
            We work in the areas of Visualization, Imaging and Data Analysis, 
            generating hypotheses and methods that new data sources and data types demand.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-300">
            <Link
              href="/research"
              className="inline-flex items-center rounded-full bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-950 shadow-sm transition-colors hover:bg-sky-100"
            >
              Explore research
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-zinc-600 px-4 py-2 text-xs font-semibold text-zinc-100 transition-colors hover:border-sky-400 hover:text-sky-100"
            >
              View projects
            </Link>
            <div className="ml-0 flex flex-wrap items-center gap-3 md:ml-4">
              {typeof peopleCount === "number" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900/80 px-3 py-1 text-[11px] text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {peopleCount}+ people
                </span>
              )}
              {typeof publicationsCount === "number" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900/80 px-3 py-1 text-[11px] text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  {publicationsCount}+ publications
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500/10 via-cyan-400/10 to-emerald-400/5" />
          <div className="relative flex flex-col gap-4 rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-4 shadow-2xl">
            <div className="flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-sky-950 via-zinc-900 to-zinc-950 sm:h-52">
              <div className="text-center">
                <div className="text-4xl font-bold text-sky-500/40">VIDA</div>
                <div className="mt-1 text-xs text-zinc-500">Visualization • Imaging • Data Analysis</div>
              </div>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
              NYU Tandon School of Engineering
            </p>
            <p className="text-xs text-zinc-300">
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
