/*
  Simple mock content generator: creates additional MDX files for people and
  publications so you can stress-test the content system.

  Run once from the project root:

    node scripts/generate-mock-content.cjs
*/

const fs = require("node:fs/promises");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "content");
const peopleDir = path.join(contentDir, "people");
const publicationsDir = path.join(contentDir, "publications");

const PEOPLE_COUNT = 50;
const PUBLICATIONS_COUNT = 100;

const areas = ["visualization", "imaging", "data-analysis"];
const personTags = [
  "visual-analytics",
  "urban-computing",
  "biomedicine",
  "reproducibility",
  "human-centered-ai",
  "systems",
];

const pubTags = [
  "visualization",
  "databases",
  "machine-learning",
  "biomedical",
  "urban-data",
  "explainability",
];

const avatarPaths = [
  "/mock-assets/images/people/avatar-01.jpg",
  "/mock-assets/images/people/avatar-02.jpg",
  "/mock-assets/images/people/avatar-03.jpg",
  "/mock-assets/images/people/avatar-04.jpg",
  "/mock-assets/images/people/avatar-05.jpg",
  "/mock-assets/images/people/avatar-06.jpg",
  "/mock-assets/images/people/avatar-07.jpg",
  "/mock-assets/images/people/avatar-08.jpg",
];

const pubThumbPaths = [
  "/mock-assets/images/pubs/pub-01.jpg",
  "/mock-assets/images/pubs/pub-02.jpg",
  "/mock-assets/images/pubs/pub-03.jpg",
];

const labNames = [
  "Visualization & Interfaces Lab",
  "Urban Data & Cities Lab",
  "Imaging & Neuroanalytics Lab",
  "Systems & Reproducibility Lab",
];

function pick(arr, i) {
  return arr[i % arr.length];
}

async function ensureDirs() {
  await fs.mkdir(peopleDir, { recursive: true });
  await fs.mkdir(publicationsDir, { recursive: true });
}

async function generatePeople() {
  const writes = [];
  for (let i = 1; i <= PEOPLE_COUNT; i++) {
    const index = String(i).padStart(2, "0");
    const slug = `mock-person-${index}`;
    const name = `Mock Researcher ${index}`;
    let role = "Student";
    if (i <= 10) role = "Faculty";
    else if (i <= 20) role = "Research Associate";
    else if (i <= 40) role = "Student";
    else role = "Alumni";

    const positionMap = {
      Faculty: "Professor",
      "Research Associate": "Research Scientist",
      Student: "Ph.D. Student",
      Alumni: "Alumni",
    };

    const body = `Mock bio for ${name}. This person works on experimental
interfaces for multimodal data, combining visualization, imaging, and
data analysis.`;

    const mdx = `---
slug: "${slug}"
name: "${name}"
role: "${role}"
position: "${positionMap[role]}"
affiliation: "VIDA Lab"
status: "current"
order: ${i}
website: "https://example.com/${slug}"
image: "${pick(avatarPaths, i - 1)}"
lab: "${pick(labNames, i - 1)}"
researchAreas:
  - ${pick(areas, i - 1)}
tags:
  - ${pick(personTags, i - 1)}
  - ${pick(personTags, i)}
---

${body}
`;

    const filePath = path.join(peopleDir, `${slug}.mdx`);
    writes.push(fs.writeFile(filePath, mdx, "utf8"));
  }
  await Promise.all(writes);
}

async function generatePublications() {
  const writes = [];
  const startYear = 2016;
  for (let i = 1; i <= PUBLICATIONS_COUNT; i++) {
    const index = String(i).padStart(3, "0");
    const year = startYear + ((i - 1) % 10); // span ~10 years
    const slug = `mock-publication-${year}-${index}`;
    const title = `Mock Publication ${index} on Multimodal Analytics`;

    const authors = [
      `Alex Rivera`,
      `Jordan Kim`,
      `Taylor Singh`,
      `Casey Zhang`,
      `Morgan Lee`,
    ];

    const mdx = `---
slug: "${slug}"
title: "${title}"
authors:
  - "${pick(authors, i - 1)}"
  - "${pick(authors, i)}"
year: ${year}
venue: "Mock Conference on Visual Analytics ${year}"
kind: "paper"
externalUrl: "https://doi.org/10.1234/mock-doi-${index}"
thumbnail: "${pick(pubThumbPaths, i - 1)}"
tags:
  - ${pick(pubTags, i - 1)}
  - ${pick(pubTags, i)}
featured: ${i <= 5 ? "true" : "false"}
---

Short abstract for ${title}. This mock entry is used to
stress-test the publications listing and filtering UI.
`;

    const filePath = path.join(publicationsDir, `${slug}.mdx`);
    writes.push(fs.writeFile(filePath, mdx, "utf8"));
  }
  await Promise.all(writes);
}

async function main() {
  await ensureDirs();
  await generatePeople();
  await generatePublications();
  // eslint-disable-next-line no-console
  console.log("Mock people and publications generated.");
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
