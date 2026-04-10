# VIDA Website

The official website for the Visualization Imaging and Data Analysis (VIDA) Center at NYU Tandon School of Engineering.

Built with Next.js 15, TypeScript, and Tailwind CSS.

## Quick Start

### Prerequisites

- Node.js 18+ (recommended: Node.js 22)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser. The page auto-updates as you edit files.

### Build and Preview

```bash
npm run build
npm run start
```

## Project Structure

```
vida-website/
├── content/              # MDX content files (all site content)
│   ├── log/              # News and events
│   ├── open-lab/         # Open source tools and datasets
│   ├── people/           # Team member profiles
│   ├── playground/       # Interactive demos
│   ├── projects/         # Research projects
│   ├── publications/     # Academic publications
│   └── research-areas/   # Research area descriptions
├── public/               # Static assets (images, models, etc.)
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── config/           # Configuration files
│   └── lib/              # Data fetching and utilities
└── package.json
```

## Content Management

All website content is managed through MDX files in the `content/` directory. Each content type has its own folder with a specific frontmatter schema.

### Adding a New Person

Create a new file in `content/people/`:

```mdx
---
slug: "firstname-lastname"
name: "First Last"
role: "faculty"
position: "Professor"
affiliation: "NYU Tandon School of Engineering"
status: "current"
order: 1
website: "https://example.com"
email: "email@example.com"
image: "https://example.com/photo.jpg"
lab: "VIDA"
researchAreas:
  - "visualization"
  - "data-analysis"
tags:
  - "visualization"
---

Brief biography goes here. This text appears on the person's profile page.
```

**Required fields:** `slug`, `name`, `role`, `status`, `order`, `researchAreas`, `tags`, `bio` (content after frontmatter)
**Optional fields:** `position`, `affiliation`, `website`, `email`, `image`, `lab`

Role options: `faculty`, `research-associate`, `phd`, `masters`, `alumni`, `staff`, `collaborator`
Status options: `current`, `active`, `alumni`

### Adding a New Publication

Create a new file in `content/publications/`:

```mdx
---
slug: "2024-paper-title"
title: "Full Paper Title"
authors:
  - "Author One"
  - "Author Two"
year: 2024
venue: "Conference or Journal Name"
kind: "paper"
externalUrl: "https://doi.org/..."
doi: "https://doi.org/..."
githubUrl: "https://github.com/VIDA-NYU/repo"
cite:
  - style: "MLA"
    text: "Author One, Author Two. \"Full Paper Title.\" Conference or Journal Name, 2024."
  - style: "APA"
    text: "Author One, A., & Author Two, B. (2024). Full Paper Title. Conference or Journal Name."
bibtex: |
  @article{2024-paper-title,
    title={Full Paper Title},
    author={Author One and Author Two},
    journal={Conference or Journal Name},
    year={2024}
  }
tags:
  - "visualization"
  - "machine-learning"
featured: true
thumbnail: "https://example.com/paper-thumbnail.jpg"
image: "https://example.com/paper-figure.jpg"
video: "https://www.youtube.com/embed/VIDEO_ID"
abstract: "Paper abstract text..."
---

Additional content or notes about the publication.
```

**Required fields:** `slug`, `title`, `authors`, `year`, `kind`, `tags`, `cite`, `bibtex`, `body` (content after frontmatter)
**Optional fields:** `venue`, `externalUrl`, `doi`, `githubUrl`, `featured`, `thumbnail`, `image`, `video`, `abstract`

Kind options: `paper`, `preprint`, `talk`, `thesis`

### Adding a New Project

Create a new file in `content/projects/`:

```mdx
---
slug: "project-name"
title: "Project Title"
kind: "project"
summary: "Brief one-line description."
status: "active"
externalUrl: "https://project-website.com"
relatedAreas:
  - "visualization"
tags:
  - "urban-computing"
  - "machine-learning"
image: "https://example.com/project-image.jpg"
video: "https://www.youtube.com/embed/VIDEO_ID"
---

Detailed project description in markdown format.

## Features

- Feature one
- Feature two

## Related Publications

List related papers here.
```

**Required fields:** `slug`, `title`, `kind`, `summary`, `status`, `relatedAreas`, `tags`, `body` (content after frontmatter)
**Optional fields:** `externalUrl`, `image`, `video`

Kind options: `program`, `project`, `tool`
Status options: `active`, `archived`, `legacy`

### Adding a News/Log Entry

Create a new file in `content/log/`:

```mdx
---
slug: "2024-01-event-name"
title: "Event or News Title"
date: "2024-01-15"
kind: "news"
summary: "Brief summary of the news item."
link: "https://external-link.com"
image: "https://example.com/news-image.jpg"
video: "https://www.youtube.com/embed/VIDEO_ID"
---

Full content of the news item goes here.
```

**Required fields:** `slug`, `title`, `date`, `kind`, `summary`, `body` (content after frontmatter)
**Optional fields:** `link`, `image`, `video`

Kind options: `event`, `news`, `release`, `talk`, `visit`

### Adding an Open Lab Resource

Create a new file in `content/open-lab/`:

```mdx
---
slug: "tool-name"
title: "Tool Name"
kind: "software"
summary: "Brief description of the tool."
area: "data-analysis"
link: "https://github.com/VIDA-NYU/tool-name"
tags:
  - "reproducibility"
updated: "2024-01-01"
image: "https://example.com/tool-screenshot.jpg"
video: "https://www.youtube.com/embed/VIDEO_ID"
---

Detailed description of the tool and its capabilities.
```

**Required fields:** `slug`, `title`, `kind`, `summary`, `tags`, `updated`, `body` (content after frontmatter)
**Optional fields:** `area`, `link`, `image`, `video`

Kind options: `dataset`, `repository`, `software`

### Adding a Playground Demo

Create a new file in `content/playground/`:

```mdx
---
slug: "demo-name"
title: "Demo Title"
kind: "video"
summary: "Brief description of the demo."
order: 1
featured: true
video: "https://www.youtube.com/embed/VIDEO_ID"
relatedProject: "project-slug"
tags:
  - "visualization"
---

Description of what the demo showcases.
```

**Required fields:** `slug`, `title`, `kind`, `summary`, `order`, `featured`, `tags`, `body` (content after frontmatter)
**Optional fields:** `model`, `video`, `audio`, `image`, `instructions`, `relatedProject`

Kind options: `3d`, `video`, `audio`, `image`, `interactive`

For audio demos, use this format:

```mdx
---
slug: "audio-demo"
title: "Audio Demo"
kind: "audio"
summary: "Description"
order: 2
audio:
  - label: "Sample 1"
    src: "https://example.com/audio1.mp3"
  - label: "Sample 2"
    src: "https://example.com/audio2.mp3"
tags:
  - "audio"
---
```

### Adding a Research Area

Create a new file in `content/research-areas/`:

```mdx
---
slug: "visualization"
title: "Visualization"
shortTitle: "Viz"
order: 1
tags:
  - "visualization"
image: "https://example.com/area-image.jpg"
video: "https://www.youtube.com/embed/VIDEO_ID"
---

Detailed description of the research area.
```

**Required fields:** `slug`, `title`, `order`, `tags`, `body` (content after frontmatter)
**Optional fields:** `shortTitle`, `image`, `video`

### Homepage Content Management

The homepage content is controlled by a single MDX configuration file at `content/home/index.mdx`. This file allows you to manage:

- **Banner videos**: YouTube videos displayed in the hero carousel
- **Featured content**: Highlighted publications, news items, or projects
- **Awards & honors**: Award-winning publications or projects
- **Active projects**: Currently active research projects to showcase

#### Example Configuration

```mdx
---
title: "Home"
bannerVideos:
  - id: "5Zg-C8AAIGg"
    title: "The Beauty of Data Visualization"
    description: "David McCandless on turning data into art"
  - id: "ll5LY7wI_Xc"
    title: "VIDA Research Overview"
    description: "An introduction to our research areas"
featured:
  - type: "publication"
    slug: "2020-gpu-spatial"
  - type: "news"
    slug: "2024-01-new-grant"
  - type: "project"
    slug: "vida-atlas"
awards:
  - slug: "2020-bugdoc"
  - slug: "2023-best-paper"
activeProjects:
  - slug: "vida-atlas"
  - slug: "urban-computing"
---

Welcome to the VIDA Center at NYU Tandon School of Engineering.
```

#### Getting YouTube Video IDs

To add a video to the banner, you need the YouTube video ID:

- From a standard URL: `https://www.youtube.com/watch?v=VIDEO_ID` → copy the `VIDEO_ID` part
- From a short URL: `https://youtu.be/VIDEO_ID` → copy the `VIDEO_ID` part
- Example: `https://www.youtube.com/watch?v=ll5LY7wI_Xc` → use `id: "ll5LY7wI_Xc"`

#### Content References

- **Featured items**: Can reference publications, news, or projects by their `slug` and `type`
- **Awards**: Reference publications or projects that have won awards by their `slug`
- **Active projects**: Reference active projects by their `slug`

The homepage automatically pulls the latest news and publications dynamically, so you only need to configure the banner videos, featured highlights, awards, and active projects in this file.

## Images and Media

### External Images

The site is configured to load images from these domains:
- images.unsplash.com
- engineering.nyu.edu
- cs.nyu.edu
- github.com
- avatars.githubusercontent.com

To add a new domain, update `next.config.ts`.

### Local Assets

Place static files in the `public/` directory:
- Images: `public/images/`
- 3D Models: `public/models/`

Reference them with absolute paths: `/images/photo.jpg`

### YouTube Videos

Use the embed URL format: `https://www.youtube.com/embed/VIDEO_ID`

## Theming

The site supports light and dark themes. Theme preference is stored in localStorage.

To add theme support to a component, use Tailwind's dark mode classes:

```tsx
<div className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
  Content
</div>
```

## Development Guidelines

### File Naming

- MDX files: Use kebab-case with date prefix for time-sensitive content
  - Publications: `2024-paper-title.mdx`
  - Log entries: `2024-01-event-name.mdx`
  - Other content: `item-name.mdx`

### Slug Conventions

- Use lowercase kebab-case
- Include year for publications: `2024-paper-title`
- Match the filename (without extension)

### Tags

Use consistent tag names across content types. Common tags:
- `visualization`
- `machine-learning`
- `urban-computing`
- `medical-imaging`
- `reproducibility`
- `data-analysis`

## Testing

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

### Build Test

```bash
npm run build
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure the build
3. Push to main branch to trigger deployment

### Manual Deployment

```bash
npm run build
```

The output will be in the `.next/` directory. Deploy using any Node.js hosting platform.

### Environment Variables

No environment variables are required for basic deployment. For analytics or other services, add them in your hosting platform's dashboard.

## Troubleshooting

### Content Not Appearing

1. Check that the MDX file has valid frontmatter (YAML between `---` markers)
2. Verify the slug matches what you expect
3. Restart the dev server after adding new content directories

### Images Not Loading

1. Verify the image URL is accessible
2. Check if the domain is in the allowed list in `next.config.ts`
3. For local images, ensure they are in the `public/` directory

### Build Errors

1. Run `npx tsc --noEmit` to check for TypeScript errors
2. Verify all MDX frontmatter fields match the expected types
3. Check for missing required fields in MDX files

## Contributing

1. Create a new branch for your changes
2. Add or update content in the `content/` directory
3. Test locally with `npm run dev`
4. Run `npm run build` to verify the build succeeds
5. Submit a pull request
