export const RESEARCH_TAGS = [
  "visualization",
  "interaction",
  "urban-data",
  "imaging",
  "neuroanalytics",
  "data-systems",
  "reproducibility",
  "responsible-ai",
] as const;

export type ResearchTag = (typeof RESEARCH_TAGS)[number];

export const PROJECT_TAGS = [
  "dashboards",
  "multimodal",
  "sensemaking",
  "urban-computing",
  "soundscapes",
  "maps",
  "provenance",
  "workflows",
  "debugging",
  "explainability",
  "fairness",
  "evaluation",
  "simulation",
  "planning",
  "scenarios",
  "open-science",
  "infrastructure",
] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number];

export const PUBLICATION_TAGS = [
  "visualization",
  "databases",
  "machine-learning",
  "biomedical",
  "urban-data",
  "explainability",
] as const;

export type PublicationTag = (typeof PUBLICATION_TAGS)[number];
