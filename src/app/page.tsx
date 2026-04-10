import { MotionSection } from "@/components/MotionSection";
import { MissionHero } from "@/components/sections/mission/MissionHero";
import { MissionHighlightLinks } from "@/components/sections/mission/MissionHighlightLinks";
import { VideoBanner } from "@/components/home/VideoBanner";
import { getPeople } from "@/lib/people";
import { getPublications } from "@/lib/publications";
import { getLogEntries } from "@/lib/log";
import { getProjects } from "@/lib/projects";
import Link from "next/link";
import { PublicationCiteActions } from "@/components/publications/PublicationCiteActions";

export default async function Home() {
  const [people, publications, logEntries, projects] = await Promise.all([
    getPeople(),
    getPublications(),
    getLogEntries(),
    getProjects(),
  ]);

  const latestNews = logEntries.slice(0, 4);
  const featuredPublications = publications.filter(p => p.featured).slice(0, 2);
  const latestPublications = publications.filter(p => !p.featured).slice(0, 4);
  const featuredProjects = projects.filter(p => p.status === "active").slice(0, 3);
  
  // Extract awards from publication bodies (simple text search)
  const awardWinners = publications.filter(pub => 
    pub.body.toLowerCase().includes('award') || 
    pub.body.toLowerCase().includes('best paper') ||
    pub.body.toLowerCase().includes('honorable mention')
  ).slice(0, 4);
  
  // Combine featured content from different types for the hero section
  const featuredContent = [
    ...featuredPublications.map(p => ({ ...p, type: 'publication' as const, authors: p.authors, year: p.year, abstract: p.abstract, venue: p.venue, kind: p.kind })),
    ...latestNews.slice(0, 2).map(n => ({ ...n, type: 'news' as const, date: n.date, summary: n.summary })),
    ...featuredProjects.slice(0, 2).map(p => ({ ...p, type: 'project' as const, kind: p.kind, summary: p.summary, year: undefined }))
  ].slice(0, 4);

  return (
    <div className="">
      {/* Video Banner */}
      <section>
        <VideoBanner />
      </section>

      <div className="py-16 md:py-24">
        <MissionHero
          peopleCount={people.length}
          publicationsCount={publications.length}
        />
      </div>

      {/* Featured Content - Hero + Sidebar Layout */}
      {featuredContent.length > 0 && (
        <section className="relative bg-purple-900 text-white">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-200 border border-purple-700 rounded-full">
                Featured
              </span>
            </div>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-0">
              {/* Hero item */}
              <div className="lg:col-span-8 lg:pr-8 lg:border-r border-purple-700">
                <Link href={featuredContent[0].type === 'publication' ? `/publications/${featuredContent[0].slug}` : 
                           featuredContent[0].type === 'news' ? `/news/${featuredContent[0].slug}` :
                           `/research/${featuredContent[0].slug}`} className="group block">
                  <div className="flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-widest text-purple-200">
                    <span className="font-bold text-white">{featuredContent[0].type}</span>
                    <span>—</span>
                    {'year' in featuredContent[0] && featuredContent[0].year && <span>{featuredContent[0].year}</span>}
                    {'date' in featuredContent[0] && <span>{featuredContent[0].date}</span>}
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 group-hover:text-purple-200 transition-colors">
                    {featuredContent[0].title}
                  </h2>
                  <div className="mb-4">
                    {featuredContent[0].type === 'publication' && 'authors' in featuredContent[0] && (
                      <p className="text-purple-200">
                        {featuredContent[0].authors.slice(0, 4).join(", ")}{featuredContent[0].authors.length > 4 ? " et al." : ""}
                      </p>
                    )}
                  </div>
                  <p className="text-purple-100 text-base leading-relaxed mb-6 line-clamp-3">
                    {featuredContent[0].type === 'publication' && (
                      <>
                        {'abstract' in featuredContent[0] && featuredContent[0].abstract ? featuredContent[0].abstract : 
                        'venue' in featuredContent[0] && featuredContent[0].venue ? featuredContent[0].venue : 
                        'kind' in featuredContent[0] ? featuredContent[0].kind : ''}
                      </>
                    )}
                    {featuredContent[0].type === 'news' && 'summary' in featuredContent[0] && featuredContent[0].summary}
                    {featuredContent[0].type === 'project' && 'summary' in featuredContent[0] && featuredContent[0].summary}
                  </p>
                  {(featuredContent[0].image || featuredContent[0].video || (featuredContent[0].type === 'publication' && 'thumbnail' in featuredContent[0] && featuredContent[0].thumbnail)) && (
                    <div className="aspect-video rounded-xl overflow-hidden bg-purple-800">
                      {featuredContent[0].video ? (
                        <video 
                          src={featuredContent[0].video} 
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img 
                          src={featuredContent[0].image || (featuredContent[0].type === 'publication' && 'thumbnail' in featuredContent[0] ? featuredContent[0].thumbnail : '')} 
                          alt={featuredContent[0].title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}
                </Link>
              </div>
              
              {/* Sidebar items */}
              <div className="lg:col-span-4 lg:pl-8 flex flex-col justify-start">
                <div className="divide-y divide-purple-700">
                  {featuredContent.slice(1, 4).map((item) => (
                    <Link key={item.slug} href={item.type === 'publication' ? `/publications/${item.slug}` : 
                           item.type === 'news' ? `/news/${item.slug}` :
                           `/research/${item.slug}`} className="group flex flex-col py-6">
                      <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-purple-200">
                        <span className="font-bold text-white">{item.type}</span>
                        <span>—</span>
                        {'year' in item && item.year && <span>{item.year}</span>}
                        {'date' in item && <span>{item.date}</span>}
                      </div>
                      <h3 className="font-serif text-xl font-bold leading-snug mb-2 group-hover:text-purple-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-purple-200 text-sm line-clamp-2">
                        {item.type === 'publication' && 'authors' in item && item.authors.slice(0, 3).join(", ")}
                        {item.type === 'news' && 'summary' in item && item.summary}
                        {item.type === 'project' && 'summary' in item && item.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Awards Section - Expanded */}
      {awardWinners.length > 0 && (
        <section className="relative bg-purple-100 dark:bg-purple-950/30 py-20">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-2 block">
                Recognition
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                Awards & Honors
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {awardWinners.map((pub) => (
                <Link
                  key={pub.slug}
                  href={`/publications/${pub.slug}`}
                  className="group"
                >
                  <div className="text-5xl md:text-6xl font-bold text-purple-600 dark:text-purple-400 mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    {pub.year}
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2 line-clamp-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {pub.venue || pub.kind}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News - Newspaper Style */}
      {latestNews.length > 0 && (
        <section className="relative py-20">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Newspaper header */}
            <div className="border-y-4 border-double border-zinc-900 dark:border-zinc-100 py-4 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                <span>The VIDA Gazette</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">News & Updates</span>
                <span>Vol. 1</span>
              </div>
            </div>
            
            {/* Newspaper-style layout - Full-width hero + 3-column asymmetric below */}
            <div className="space-y-10">
              {/* Hero article - full width */}
              <Link href={`/news/${latestNews[0].slug}`} className="group block">
                <div className="flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{latestNews[0].kind}</span>
                  <span>—</span>
                  <span>{latestNews[0].date}</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-900 dark:text-zinc-50 mb-4 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                  {latestNews[0].title}
                </h2>
                {latestNews[0].summary && (
                  <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed font-serif line-clamp-3">
                    {latestNews[0].summary}
                  </p>
                )}
              </Link>
              
              {/* 3-column asymmetric layout below */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                {/* Item 2 - more prominent */}
                {latestNews[1] && (
                  <Link href={`/news/${latestNews[1].slug}`} className="group md:pr-6 md:border-r border-zinc-300 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{latestNews[1].kind}</span>
                      <span>—</span>
                      <span>{latestNews[1].date}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold leading-snug text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                      {latestNews[1].title}
                    </h3>
                    {latestNews[1].summary && (
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 font-serif">
                        {latestNews[1].summary}
                      </p>
                    )}
                  </Link>
                )}
                
                {/* Item 3 - standard */}
                {latestNews[2] && (
                  <Link href={`/news/${latestNews[2].slug}`} className="group md:px-6">
                    <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{latestNews[2].kind}</span>
                      <span>—</span>
                      <span>{latestNews[2].date}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-snug text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                      {latestNews[2].title}
                    </h3>
                    {latestNews[2].summary && (
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 font-serif">
                        {latestNews[2].summary}
                      </p>
                    )}
                  </Link>
                )}
                
                {/* Item 4 - smaller */}
                {latestNews[3] && (
                  <Link href={`/news/${latestNews[3].slug}`} className="group md:pl-6 md:border-l border-zinc-300 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{latestNews[3].kind}</span>
                      <span>—</span>
                      <span>{latestNews[3].date}</span>
                    </div>
                    <h3 className="font-serif text-base font-bold leading-snug text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                      {latestNews[3].title}
                    </h3>
                    {latestNews[3].summary && (
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs line-clamp-2 font-serif">
                        {latestNews[3].summary}
                      </p>
                    )}
                  </Link>
                )}
              </div>
            </div>
            
            <div className="mt-12">
              <Link
                href="/log"
                className="inline-flex items-center text-lg font-semibold text-zinc-900 dark:text-zinc-50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                View full gazette →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Active Projects - Minimalist Horizontal Layout */}
      {featuredProjects.length > 0 && (
        <section className="relative py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-full mb-4">
                Research
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Active Projects
              </h2>
            </div>
            
            <div className="space-y-16">
              {featuredProjects.slice(0, 3).map((project, idx) => (
                <Link
                  key={project.slug}
                  href={`/research/${project.slug}`}
                  className="group block"
                >
                  <div className={`flex flex-col md:flex-row gap-8 md:gap-12 ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Image or Video if available, otherwise show placeholder */}
                    <div className="md:w-1/2">
                      {(project.image || project.video) ? (
                        <div className="overflow-hidden rounded-xl">
                          {project.video ? (
                            <video 
                              src={project.video} 
                              className="w-full h-64 object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-64 object-cover"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-64 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                          <div className="text-center">
                            <span className="text-4xl font-bold text-zinc-300 dark:text-zinc-700">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:w-1/2 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 rounded">
                          {project.kind}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-4">
                        {project.title}
                      </h3>
                      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                        {project.summary}
                      </p>
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-zinc-500 dark:text-zinc-500"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12">
              <Link
                href="/research"
                className="inline-flex items-center text-lg font-semibold text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                View all projects
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Publications - Journal Style */}
      {latestPublications.length > 0 && (
        <section className="relative py-20 bg-zinc-50 dark:bg-zinc-900/20">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Journal header */}
            <div className="border-b-2 border-zinc-900 dark:border-zinc-100 pb-6 mb-10">
              <div>
                <span className="font-serif italic text-zinc-600 dark:text-zinc-400 text-sm block mb-1">
                  VIDA Research Journal
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                  Recent Publications
                </h2>
              </div>
            </div>
            
            {/* Journal-style layout */}
            <div className="grid md:grid-cols-2 gap-8">
              {latestPublications.map((pub) => (
                <div key={pub.slug} className="group">
                  <Link href={`/publications/${pub.slug}`} className="block">
                    <div className="flex items-start gap-4">
                      <div className="md:w-20 flex-shrink-0">
                        <span className="font-mono text-sm text-zinc-500 dark:text-zinc-500">
                          {pub.year}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                          {pub.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">
                          <span className="italic">{pub.authors.slice(0, 4).join(", ")}{pub.authors.length > 4 ? " et al." : ""}</span>
                        </p>
                        {pub.venue && (
                          <p className="text-zinc-500 dark:text-zinc-500 text-sm font-serif italic">
                            {pub.venue}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-start gap-4 mt-3">
                    <div className="md:w-20 flex-shrink-0"></div>
                    <div className="flex-1">
                      <PublicationCiteActions
                        cite={pub.cite || []}
                        bibtex={pub.bibtex || ""}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <Link
                href="/publications"
                className="inline-flex items-center text-lg font-serif font-semibold text-zinc-900 dark:text-zinc-50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Browse all publications →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
