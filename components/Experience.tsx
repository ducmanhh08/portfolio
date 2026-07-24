"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { GlassCard } from "./GlassCard";

interface TimelineEntry {
  id: string;
  dateRange: string;
  title: string;
  organization: string;
  bullets: string[];
  type: "work" | "education";
  description?: string;
  tags?: string[];
}

const timelineEntries: TimelineEntry[] = [
  {
    id: "home-invease-ai-engineer",
    dateRange: "2024 — 2025",
    title: "AI Full Stack Engineer",
    organization: "Home Invease",
    type: "work",
    description:
      "Engineering mobile AI-powered solutions for home inventory applications.",
    bullets: [
      "Developed integration workflows on integrated Ollama and LangSmith platforms to enhance user query handling and response generation.",
      "Implemented custom ChromaDB vector database management system to optimize data retrieval latency by 40% and storage for AI applications.",
      "Constructed automated item recognition pipelines using PyTorch and OpenCV, achieving 95% accuracy in identifying household items from user-uploaded images and receipts.",
    ],
    tags: ["React", "TypeScript", "Next.js", "FastAPI", "Firebase", "JWT"],
  },
  {
    id: "uow-computer-science",
    dateRange: "2022 — 2025",
    title: "Bachelor of Computer Science",
    organization: "University of Wollongong",
    type: "education",
    bullets: [
      "Double Major in Artificial Intelligence & Big Data, and Software Engineering — graduated with Distinction in Advanced Programming, Database Systems, and Modern AI and Big Data courses.",
      "Co-founded a 10-member project pitched at stakeholder tradeshow and received $10,000 AUD funding from UOW iAccelerate",
      "Explored AI and Big Data principles throughout the degree, including machine learning, NLP, and data analytics, and applied them in practical projects and researches.",
    ],
  },
  {
    id: "gifted-high-school",
    dateRange: "2017 — 2021",
    title: "Mathematics and Computer Science",
    organization: "High School for Gifted Students, Hanoi, Vietnam",
    type: "education",
    bullets: [
      "Studied advanced mathematics and programming courses, developing a strong foundation in both areas.",
      "IMC Gold Medalist 2017 in Singapore, representing Vietnam in the International Mathematics Competition for high school students.",
    ],
  },
];

export function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionContainer id="experience">
      <div>
        <div className="mb-12 md:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-purple-300">
            02 / Professional experience
          </p>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="text-white">Professional </span>
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            The roles, education, and practical work that shaped how I build software.
          </p>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
        </div>

        <div role="list" className="relative space-y-8 md:space-y-10">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[1.125rem] top-8 w-px bg-white/15 md:left-[11.5rem]"
          />

          {timelineEntries.map((entry, index) => {
            const isWork = entry.type === "work";
            const accent = isWork
              ? "text-purple-300 border-purple-400/50 bg-purple-500/15"
              : "text-sky-300 border-sky-400/50 bg-sky-500/15";
            const lineAccent = isWork ? "bg-purple-400" : "bg-sky-400";
            const Icon = isWork ? BriefcaseBusiness : GraduationCap;
            const hasNextEntry = index < timelineEntries.length - 1;

            return (
              <motion.div
                key={entry.id}
                role="listitem"
                initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.55, delay: index * 0.1, ease: "easeOut" }
                }
                className="group relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 md:grid-cols-[10rem_3rem_minmax(0,1fr)] md:gap-x-4"
              >
                <div className="col-start-2 mb-2 pr-2 md:col-start-1 md:mb-0 md:pt-5 md:text-right">
                  <time className="text-sm font-semibold tracking-wide text-slate-300">
                    {entry.dateRange}
                  </time>
                </div>

                <div className="col-start-1 row-start-1 flex justify-center pt-0.5 md:col-start-2 md:pt-4">
                  <span
                    className={`relative z-10 flex size-5 items-center justify-center rounded-full border bg-[#0b0f19] transition-all duration-300 group-hover:scale-110 ${accent}`}
                  >
                    <Icon aria-hidden="true" className="size-3" strokeWidth={2.5} />
                  </span>
                </div>

                {hasNextEntry && (
                  <div
                    aria-hidden="true"
                    className={`absolute left-[1.125rem] top-7 h-[calc(100%+2.5rem)] w-px origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 md:left-[11.5rem] ${lineAccent}`}
                  />
                )}

                <GlassCard className="col-start-2 row-start-2 p-5 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10 md:col-start-3 md:row-start-1 md:p-6">
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div>
                      <h3 className="text-xl font-bold text-white">{entry.title}</h3>
                      <p className={`mt-1 font-medium ${isWork ? "text-purple-300" : "text-sky-300"}`}>
                        {entry.organization}
                      </p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${accent}`}>
                      {isWork ? "Work" : "Education"}
                    </span>
                  </div>

                  {entry.description && (
                    <p className="mb-5 text-sm leading-6 text-slate-300">{entry.description}</p>
                  )}

                  <ul className="space-y-3">
                    {entry.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={`${entry.id}-bullet-${bulletIndex}`}
                        className={`flex items-start gap-3 text-sm leading-6 ${bullet ? "text-slate-300" : "text-slate-500"}`}
                      >
                        <span aria-hidden="true" className={`mt-2 size-1.5 shrink-0 rounded-full ${lineAccent}`} />
                        {bullet || <span className="italic">Add achievement</span>}
                      </li>
                    ))}
                  </ul>

                  {entry.tags && (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
