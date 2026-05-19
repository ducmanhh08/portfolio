"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";

// Custom GitHub icon
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

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with real-time inventory management, payment integration, and analytics dashboard.",
    image: "🛍️",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    stats: { rating: 4.9, reviews: 128 },
  },
  {
    title: "AI Chat Application",
    description:
      "Real-time messaging platform with AI-powered suggestions and natural language processing capabilities.",
    image: "💬",
    tags: ["Next.js", "WebSocket", "OpenAI", "Prisma"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    stats: { rating: 4.8, reviews: 95 },
  },
  {
    title: "Task Management Tool",
    description:
      "Collaborative task management application with real-time updates, team features, and productivity analytics.",
    image: "✓",
    tags: ["React", "Firebase", "Tailwind", "Redux"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
  {
    title: "Portfolio Template",
    description:
      "Modern, responsive portfolio template with dark theme and smooth animations for developers.",
    image: "🎨",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
];

export function Projects() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
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
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <GlassCard className="p-8 h-full flex flex-col gap-6 group" glow={true}>
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      {project.stats && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < Math.floor(project.stats.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">
                            ({project.stats.reviews})
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-4xl">{project.image}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 flex-grow">{project.description}</p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30"
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all duration-300"
                    >
                      <GithubIcon />
                      Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/50 text-sm font-medium transition-all duration-300"
                    >
                      <ExternalLinkIcon size={16} />
                      Live Demo
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
        </motion.div>

        {/* Other Projects */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <GlassCard className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <h4 className="text-lg font-bold text-white">
                      {project.title}
                    </h4>
                    <span className="text-3xl">{project.image}</span>
                  </div>
                  <p className="text-sm text-gray-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <GithubIcon />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                    >
                      <ExternalLinkIcon size={14} /> Live
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center pt-12"
        >
          <Button size="lg" variant="outline">
            View All Projects
          </Button>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
