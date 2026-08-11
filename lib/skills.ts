export type SkillCategory =
  | "software-engineering"
  | "cloud-devops"
  | "data-apis"
  | "ai-ml";

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  projects: string[];
  position: {
    x: number;
    y: number;
  };
}

export interface AtlasProject {
  id: string;
  name: string;
  skills: string[];
}

export const skillCategories: Record<
  SkillCategory,
  { name: string; color: string }
> = {
  "software-engineering": {
    name: "Software Engineering",
    color: "#a78bfa",
  },
  "cloud-devops": {
    name: "Cloud & DevOps",
    color: "#38bdf8",
  },
  "data-apis": {
    name: "Data & APIs",
    color: "#34d399",
  },
  "ai-ml": {
    name: "AI & Machine Learning",
    color: "#f472b6",
  },
};

export const atlasProjects: AtlasProject[] = [
  {
    id: "link-ai",
    name: "Link AI",
    skills: [
      "openai-api", 
      "nextjs", 
      "typescript",
      "postgresql", 
      "git",
      "gcp",
      "rest-graphql",
    ],
  },
  {
    id: "nimbus-ops",
    name: "Nimbus Ops",
    skills: [
      "python",
      "spring-boot",
      "postgresql",
      "azure",
      "docker",
    ],
  },
  {
    id: "loan-default-prediction",
    name: "Loan Default Prediction",
    skills: [
      "pytorch",
      "tensorflow",
      "react",
      "docker",
      "python"
    ],
  },
  {
    id: "home-invease",
    name: "Home Invease",
    skills: [
      "llms",
      "pytorch",
      "chromadb",
      "tensorflow",
      "java-spring",
      "typescript",
      "azure",
      "ci-cd",
    ],
  },
  {
    id: "moji",
    name: "Moji Chat",
    skills: [
      "nextjs",
      "react",
      "mongodb",
      "rest-graphql",
      "ci-cd",
    ],
  },
];

export const skills: SkillNode[] = [
  {
    id: "java-spring",
    name: "Java & Spring Boot",
    category: "software-engineering",
    projects: ["nimbus-ops", "home-invease"],
    position: { x: 11, y: 12 },
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "software-engineering",
    projects: ["echo-vision", "pulseboard"],
    position: { x: 33, y: 10 },
  },
  {
    id: "react",
    name: "React",
    category: "software-engineering",
    projects: ["echo-vision", "pulseboard"],
    position: { x: 14, y: 34 },
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "software-engineering",
    projects: ["link-ai"],
    position: { x: 44, y: 31 },
  },
  {
    id: "python",
    name: "Python",
    category: "software-engineering",
    projects: ["loan-default-prediction"],
    position: { x: 31, y: 46 },
  },
  {
    id: "azure",
    name: "Azure",
    category: "cloud-devops",
    projects: ["nimbus-ops", "echo-vision"],
    position: { x: 60, y: 10 },
  },
  {
    id: "docker",
    name: "Docker",
    category: "cloud-devops",
    projects: ["nimbus-ops", "echo-vision"],
    position: { x: 82, y: 12 },
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    category: "cloud-devops",
    projects: ["link-ai", "pulseboard"],
    position: { x: 61, y: 34 },
  },
  {
    id: "ci-cd",
    name: "CI/CD",
    category: "cloud-devops",
    projects: ["moji", "home-invease"],
    position: { x: 86, y: 36 },
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "data-apis",
    projects: ["link-ai", "nimbus-ops"],
    position: { x: 11, y: 61 },
  },
  {
    id: "rest-graphql",
    name: "RESTful / GraphQL",
    category: "data-apis",
    projects: ["link-ai", "moji", "home-invease"],
    position: { x: 35, y: 59 },
  },
  {
    id: "chromadb",
    name: "ChromaDB",
    category: "data-apis",
    projects: ["atlas-search"],
    position: { x: 20, y: 84 },
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "data-apis",
    projects: ["nimbus-ops", "link-ai"],
    position: { x: 54, y: 57 },
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "ai-ml",
    projects: ["echo-vision"],
    position: { x: 76, y: 54 },
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "ai-ml",
    projects: ["echo-vision"],
    position: { x: 90, y: 68 },
  },
  {
    id: "llms",
    name: "LLMs",
    category: "ai-ml",
    projects: ["atlas-search"],
    position: { x: 56, y: 82 },
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    category: "ai-ml",
    projects: ["link-ai", "pulseboard"],
    position: { x: 79, y: 84 },
  },
];
