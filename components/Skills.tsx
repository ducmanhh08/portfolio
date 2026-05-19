"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "./SectionContainer";
import { GlassCard } from "./GlassCard";

const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "AWS", "CI/CD", "Vercel", "GitHub Actions"],
  },
  {
    category: "Design",
    items: ["Figma", "UI/UX", "Responsive Design", "Web Animations", "A11y"],
  },
];

export function Skills() {
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

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <SectionContainer id="skills">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Technical </span>
            <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <GlassCard className="p-8 h-full" glow={true}>
                <h3 className="text-xl font-semibold text-white mb-6">
                  {skillGroup.category}
                </h3>
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={containerVariants}
                >
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={skillItemVariants}
                      whileHover="hover"
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-sm font-medium text-gray-200 cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Tech Stack */}
        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 gradient-border rounded-2xl"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">
            Favorite Tech Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", level: 95 },
              { name: "TypeScript", level: 90 },
              { name: "Next.js", level: 95 },
              { name: "Node.js", level: 85 },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-center">
                  <div className="mb-3">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      ></motion.div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-300">
                    {tech.name}
                  </p>
                  <p className="text-xs text-gray-500">{tech.level}%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
