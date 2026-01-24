const fs = require("node:fs/promises");
const path = require("node:path");
const matter = require("gray-matter");

const CONTENT_ROOT = path.join(process.cwd(), "content");

const SCHEMAS = [
  {
    name: "people",
    required: {
      slug: "string",
      name: "string",
      role: "string",
      status: "string",
      order: "number",
      researchAreas: "stringArray",
      tags: "stringArray",
    },
  },
  {
    name: "publications",
    required: {
      slug: "string",
      title: "string",
      authors: "stringArray",
      year: "number",
    },
  },
  {
    name: "projects",
    required: {
      slug: "string",
      title: "string",
      kind: "string",
      summary: "string",
      status: "string",
      relatedAreas: "stringArray",
    },
  },
  {
    name: "log",
    required: {
      slug: "string",
      title: "string",
      date: "string",
      kind: "string",
    },
  },
  {
    name: "open-lab",
    required: {
      slug: "string",
      title: "string",
      kind: "string",
    },
    customChecks: (data, file) => {
      if (!data.updated && !data.date) {
        return [`${file}: expected "updated" or "date" in frontmatter`];
      }
      return [];
    },
  },
  {
    name: "playground",
    required: {
      slug: "string",
      title: "string",
      kind: "string",
    },
  },
  {
    name: "research-areas",
    required: {
      slug: "string",
      title: "string",
      order: "number",
      tags: "stringArray",
    },
  },
];

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNumberLike(value) {
  if (typeof value === "number") {
    return Number.isFinite(value);
  }
  if (typeof value === "string" && value.trim() !== "") {
    return Number.isFinite(Number(value));
  }
  return false;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim() !== "");
}

function validateField(type, value) {
  switch (type) {
    case "string":
      return isNonEmptyString(value);
    case "number":
      return isNumberLike(value);
    case "stringArray":
      return isStringArray(value);
    default:
      return false;
  }
}

async function getContentFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(dirPath, entry.name));
}

async function validateDirectory(schema) {
  const dirPath = path.join(CONTENT_ROOT, schema.name);
  const files = await getContentFiles(dirPath);
  const errors = [];
  const slugSet = new Set();

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    const fileSlug = path.basename(filePath, ".mdx");
    const relativeFile = path.relative(CONTENT_ROOT, filePath);

    if (!data || Object.keys(data).length === 0) {
      errors.push(`${relativeFile}: missing frontmatter`);
      continue;
    }

    if (!isNonEmptyString(data.slug)) {
      errors.push(`${relativeFile}: missing required field "slug"`);
    } else if (data.slug !== fileSlug) {
      errors.push(`${relativeFile}: slug "${data.slug}" does not match filename "${fileSlug}"`);
    }

    for (const [field, type] of Object.entries(schema.required)) {
      if (field === "slug") continue;
      const value = data[field];
      if (!validateField(type, value)) {
        errors.push(`${relativeFile}: invalid or missing "${field}" (${type})`);
      }
    }

    if (isNonEmptyString(data.slug)) {
      if (slugSet.has(data.slug)) {
        errors.push(`${relativeFile}: duplicate slug "${data.slug}"`);
      } else {
        slugSet.add(data.slug);
      }
    }

    if (schema.customChecks) {
      errors.push(...schema.customChecks(data, relativeFile));
    }
  }

  return errors;
}

async function run() {
  const allErrors = [];

  for (const schema of SCHEMAS) {
    try {
      const errors = await validateDirectory(schema);
      allErrors.push(...errors);
    } catch (error) {
      allErrors.push(`Failed to validate ${schema.name}: ${error.message}`);
    }
  }

  if (allErrors.length > 0) {
    console.error("Content sanity check failed:\n");
    for (const error of allErrors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Content sanity check passed.");
}

run();
