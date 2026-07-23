"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionContainer } from "./SectionContainer";

type SkillNode = {
  id: string;
  name: string;
  projects?: string[];
};

type SkillCategory = {
  id: string;
  name: string;
  skills: SkillNode[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    skills: [
      { id: "typescript", name: "TypeScript", projects: ["Link AI Assistant"] },
      { id: "javascript", name: "JavaScript", projects: ["Link AI Assistant"] },
      { id: "python", name: "Python", projects: ["AI automation prototypes"] },
    ],
  },
  {
    id: "frameworks",
    name: "Frameworks / Libraries",
    skills: [
      { id: "react", name: "React", projects: ["Link AI Assistant", "Portfolio site"] },
      { id: "nextjs", name: "Next.js", projects: ["Portfolio site"] },
      { id: "tailwind", name: "Tailwind CSS", projects: ["Portfolio site"] },
    ],
  },
  {
    id: "ai",
    name: "AI / ML",
    skills: [
      { id: "langchain", name: "LangChain", projects: ["Link AI Assistant"] },
      { id: "openai", name: "OpenAI API", projects: ["Link AI Assistant"] },
      { id: "prompting", name: "Prompt Design", projects: ["AI copilots"] },
    ],
  },
  {
    id: "tools",
    name: "Tools & Platforms",
    skills: [
      { id: "github", name: "GitHub", projects: ["Portfolio site", "Link AI Assistant"] },
      { id: "vercel", name: "Vercel", projects: ["Portfolio site"] },
      { id: "docker", name: "Docker", projects: ["Service deployments"] },
    ],
  },
];

export function Skills() {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const selectedSkillId = hoveredSkillId ?? activeSkillId;

  const selectedSkill = useMemo(() => {
    return skillCategories
      .flatMap((category) => category.skills.map((skill) => ({ ...skill, categoryId: category.id })))
      .find((skill) => skill.id === selectedSkillId);
  }, [selectedSkillId]);

  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <SectionContainer id="skills">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8"
      >
        <motion.div variants={containerVariants} className="max-w-3xl">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="text-white">Skill </span>
            <span className="gradient-text">Map</span>
          </h2>
          <p className="max-w-2xl text-lg text-slate-400">
            A simple view of the tools and systems I use to build thoughtful digital products.
          </p>
          <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
        </motion.div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_80px_-30px_rgba(168,85,247,0.45)] backdrop-blur-xl md:p-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-purple-400/30 bg-gradient-to-br from-purple-600 to-blue-600 text-xl font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            >
              M
            </motion.div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {skillCategories.map((category) => {
                const categoryIsActive = selectedSkillId
                  ? category.skills.some((skill) => skill.id === selectedSkillId)
                  : false;

                return (
                  <div
                    key={category.id}
                    className={`rounded-2xl border p-4 transition-all duration-200 ${categoryIsActive ? "border-purple-400/50 bg-purple-500/10" : "border-white/10 bg-white/5"}`}
                  >
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                      {category.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => {
                        const isActive = selectedSkillId === skill.id;

                        return (
                          <motion.button
                            key={skill.id}
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            onMouseEnter={() => setHoveredSkillId(skill.id)}
                            onMouseLeave={() => setHoveredSkillId(null)}
                            onClick={() => setActiveSkillId((current) => (current === skill.id ? null : skill.id))}
                            className={`rounded-full border px-3 py-1.5 text-sm transition ${isActive ? "border-cyan-300/70 bg-cyan-500/15 text-cyan-100" : "border-white/10 bg-slate-900/80 text-slate-200 hover:border-white/20"}`}
                          >
                            {skill.name}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300">
            {selectedSkill ? (
              <>
                <p className="font-semibold text-white">{selectedSkill.name}</p>
                <p className="mt-1 text-slate-400">
                  Used in: {selectedSkill.projects?.join(", ")}
                </p>
              </>
            ) : (
              <p className="text-slate-400">Hover or tap a skill to see where I’ve used it.</p>
            )}
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
