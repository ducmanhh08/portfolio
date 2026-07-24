"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "./SectionContainer";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <SectionContainer id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mb-10 md:mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-purple-300">
            01 / Selected work
          </p>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl">
            A closer look at what I build.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            A selection of product-focused work, from AI-assisted tools to polished web experiences.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
