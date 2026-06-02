"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "./SectionContainer";
import { GlassCard } from "./GlassCard";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const ExternalLinkIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const projects = [
  {
    title: "Link AI Assistant",
    overview:
      "An full stack application and Chrome extension that enhances Google Drive with AI-powered content generation, summarization, and smart file management.",
    tags: ["React", "Node.js", "Express.js", "Chrome Manifest V3", "OpenAI API", "Google Cloud Platform"],
    github: "https://github.com/ducmanhh08/LINK-project.git",
    live: "https://example.com",
    featured: true,
    screenshots: [
      {
        label: "Landing Page",
        src: "/landing-page.png",
      },
      {
        label: "Drive Directory",
        src: "/drive-directory.png",
      },
      {
        label: "Chrome Extension Dashboard",
        src: "/chrome-extension.png",
      },
    ],
    description: [
      "Integrated Google Drive API with OAuth 2.0, ensuring secure, real-time access and user file management.",
      "Engineered an intelligent file analysis algorithm to read, interpret, and classify documents, generating automated suggestions for file renaming and folder reorganization.",
    ],
  },
];

function ProjectSection({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) =>
        project.screenshots.length > 0
          ? (current + 1) % project.screenshots.length
          : 0
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [project.screenshots.length]);

  useEffect(() => {
    setActiveSlide(0);
  }, [project]);

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
    >
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-transparent shadow-none">
          <div className="p-10 min-h-[420px] flex flex-col justify-between gap-6 bg-transparent">
            <div>
              <span className="inline-flex rounded-full bg-purple-500/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-purple-200">
                Screen {activeSlide + 1} of {project.screenshots.length}
              </span>
            </div>
            <div className="flex-grow flex flex-col justify-center gap-4 text-center">
              {project.screenshots[activeSlide].src ? (
                <img
                  src={project.screenshots[activeSlide].src}
                  alt={`${project.screenshots[activeSlide].label} screenshot`}
                  className="mx-auto max-h-[300px] w-full object-contain rounded-3xl"
                />
              ) : (
                <div className="mx-auto flex h-[300px] w-full items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 px-6 text-sm text-gray-400">
                  Add a screenshot source to display the preview.
                </div>
              )}
              <div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {project.screenshots.map((screen, index) => (
            <button
              key={screen.label}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`rounded-3xl border p-3 text-left transition-all duration-300 ${index === activeSlide
                ? "border-purple-400/40 bg-white/10 text-white shadow-lg shadow-purple-500/10"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10"
                }`}
            >
              <p className="text-sm uppercase tracking-[0.18em] text-purple-200 mb-1">
                {index + 1}
              </p>
              <p className="text-sm font-semibold">{screen.label}</p>
            </button>
          ))}
        </div>
      </div>

      <GlassCard className="p-10 h-full flex flex-col justify-between gap-8 glow bg-transparent border-none shadow-none" glow>
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm uppercase tracking-[0.22em] text-purple-300/80">
              {project.title}
            </span>
            <h3 className="text-4xl font-bold text-white">{project.title}</h3>
            <p className="text-gray-300 text-lg leading-8">{project.overview}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm uppercase tracking-[0.18em] text-gray-400 mb-3">
                Tech stack
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.18em] text-gray-400 mb-3">
                Description
              </h4>
              <ul className="space-y-3 list-disc pl-5 text-gray-300 leading-7">
                {project.description.map((point, index) => (
                  <li key={`${project.title}-description-${index}`}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-white transition hover:border-purple-400/40 hover:bg-white/10"
          >
            <GithubIcon size={18} />
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 text-sm font-medium text-white transition hover:shadow-lg hover:shadow-purple-500/30"
          >
            <ExternalLinkIcon size={18} />
            Live Demo
          </a>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <SectionContainer id="projects">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </motion.div>

        <div className="space-y-20">
          {featuredProjects.map((project) => (
            <ProjectSection key={project.title} project={project} />
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
