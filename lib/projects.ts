export interface CaseStudySection {
  title: "Problem" | "Approach" | "Architecture";
  body: string[];
  points?: string[];
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  thumbnail: {
    src: string;
    alt: string;
  };
  caseStudy: CaseStudySection[];
  metrics: ProjectMetric[];
}

export const projects: Project[] = [
  {
    slug: "link-ai-assistant",
    name: "Link AI Assistant",
    category: "AI productivity platform",
    description:
      "A full-stack app and Chrome extension that brings AI-powered content tools and smarter organisation to Google Drive.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "Manifest V3",
      "OpenAI API",
      "Google Cloud",
    ],
    thumbnail: {
      src: "/landing-page.png",
      alt: "Link AI Assistant landing page interface",
    },
    caseStudy: [
      {
        title: "Problem",
        body: [
          "Google Drive is excellent at storing files, but as a workspace grows, finding, understanding, and organising those files becomes increasingly manual.",
          "The challenge was to add useful AI assistance without forcing people into a separate workflow or compromising the permissions model they already trust.",
        ],
      },
      {
        title: "Approach",
        body: [
          "I designed Link as a companion to Drive: a focused web application for deeper file management and a lightweight browser extension for actions in context.",
          "The experience centres on a small set of repeatable tasks—summarise content, generate new material, suggest clearer names, and recommend a better folder structure.",
        ],
        points: [
          "Keep common actions close to the user’s existing Drive workflow",
          "Make every AI suggestion reviewable before it changes a file",
          "Use OAuth 2.0 so access stays scoped to the signed-in user",
        ],
      },
      {
        title: "Architecture",
        body: [
          "The React clients share a Node.js and Express service layer. That service coordinates authenticated Google Drive requests, extracts document context, and sends narrowly scoped prompts to the OpenAI API.",
          "Separating the interface, file orchestration, and AI layer keeps each concern replaceable and makes it easier to add new file actions without coupling them to a single client.",
        ],
        points: [
          "React web app and Manifest V3 Chrome extension",
          "Express API for authentication, orchestration, and file operations",
          "Google Drive API with OAuth 2.0 and OpenAI-powered analysis",
        ],
      },
    ],
    metrics: [
      { value: "2", label: "Connected client experiences" },
      { value: "4", label: "Core AI-assisted workflows" },
      { value: "OAuth 2.0", label: "Scoped Drive access" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
