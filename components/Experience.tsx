"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "./SectionContainer";
import { GlassCard } from "./GlassCard";

const experiences = [
  {
    title: "AI Full Stack Engineer",
    company: "Home Invease",
    period: "2024 - 2025",
    description:
      "Engineering mobile AI-powered solutions for home inventory applications.",
    achievements: [
      "Developed integration workflows on integrated Ollama and LangSmith platforms to enhance user query handling and response generation.",
      "Implemented custom ChromaDB vector database management system to optimize data retrieval latency by 40% and storage for AI applications.",
      "Constructed automated item recognition pipelines using PyTorch and OpenCV, achieving 95% accuracy in identifying household items from user-uploaded images and receipts.",
    ],
    tags: ["React", "TypeScript", "Next.js", "FastAPI", "Firebase", "JWT"],
  },
];

export function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <SectionContainer id="experience">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Work </span>
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 z-10 md:flex hidden items-center justify-center">
                <div className="w-2 h-2 bg-slate-950 rounded-full"></div>
              </div>

              {/* Timeline line */}
              <div className="absolute left-2 md:left-1/2 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent md:flex hidden"></div>

              {/* Content - Alternating layout for desktop */}
              <div
                className={`md:grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Text Content */}
                <div
                  className={`md:col-span-1 ${index % 2 === 0
                    ? "md:text-right md:pr-8"
                    : "md:pl-8 md:text-left"
                    }`}
                >
                  <GlassCard className="p-6 md:bg-transparent md:border-0 md:p-0">
                    <div className="flex items-start gap-4 md:gap-0 md:block">
                      <div className="md:hidden w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <div className="inline-block md:block">
                          <h3 className="text-xl font-bold text-white">
                            {experience.title}
                          </h3>
                          <p className="text-purple-400 font-medium">
                            {experience.company}
                          </p>
                          <p className="text-sm text-gray-500">
                            {experience.period}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* Description Content */}
                <div className="md:col-span-1">
                  <GlassCard className="p-6">
                    <p className="text-gray-300 mb-4">{experience.description}</p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-white mb-2">
                        Key Achievements:
                      </p>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-400 flex items-start gap-2"
                          >
                            <span className="text-purple-400 flex-shrink-0">
                              •
                            </span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {experience.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
