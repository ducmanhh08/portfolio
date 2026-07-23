"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, BrainCircuit, ChevronDown, Code2, MapPin } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { GlassCard } from "./GlassCard";

const tabs = {
  Background: [
    "I build polished web products with a strong focus on performance, clarity, and maintainable architecture.",
    "My path into software development started with curiosity about how thoughtful interfaces and reliable systems can shape everyday experiences.",
  ],
  Currently: [
    "I’m refining full-stack workflows with Next.js, TypeScript, and cloud-ready APIs while keeping the UI experience smooth and intentional.",
    "Right now I’m shaping a fewside projects that sit at the intersection of product thinking and practical engineering.",
  ],
  Interests: [
    "I’m especially drawn to AI-assisted tools, design systems, and developer experience improvements that make complex products feel simple.",
    "When I step away from the keyboard, I’m usually exploring new ideas, reading about product design, or experimenting with creative builds.",
  ],
} as const;

type TabKey = keyof typeof tabs;

const facts = [
  {
    icon: BookOpen,
    title: "Learning",
    text: "Next.js patterns",
  },
  {
    icon: MapPin,
    title: "Based in",
    text: "Vancouver, BC",
  },
  {
    icon: Code2,
    title: "Building",
    text: "Product-led apps",
  },
] as const;

export function About() {
  const [activeTab, setActiveTab] = useState<TabKey>("Background");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <SectionContainer id="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-10"
      >
        <motion.div variants={itemVariants} className="mb-8 md:mb-10">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="text-white">About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <GlassCard
              glow
              variant="gradient"
              className="relative w-full max-w-[420px] overflow-hidden border border-purple-500/30 p-3 sm:p-4"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_55%)]" />
              <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/70 p-2">
                <img
                  src="/person.png"
                  alt="Manh Nguyen"
                  className="h-full w-full rounded-[1.1rem] object-cover"
                />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <GlassCard className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(tabs) as TabKey[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white shadow-lg shadow-purple-500/10"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-slate-900/70 p-5 sm:p-6">
                {tabs[activeTab].map((paragraph, index) => (
                  <p
                    key={`${activeTab}-${index}`}
                    className={`text-sm leading-7 text-gray-300 sm:text-[0.95rem] ${index > 0 ? "mt-3" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {facts.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-[1rem] border border-white/10 bg-white/5 p-3"
                  >
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-300">
                      <Icon size={16} />
                    </div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-gray-400">{text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="mt-12 flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <button
          onClick={() => {
            const element = document.querySelector("#projects");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="rounded-full border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/10"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} className="text-purple-400" />
        </button>
      </motion.div>
    </SectionContainer>
  );
}