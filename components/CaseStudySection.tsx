"use client";

import { motion } from "framer-motion";
import type { CaseStudySection as CaseStudySectionType } from "@/lib/projects";

interface CaseStudySectionProps {
  index: number;
  section: CaseStudySectionType;
}

export function CaseStudySection({
  index,
  section,
}: CaseStudySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="grid gap-5 border-t border-white/10 py-12 md:grid-cols-[10rem_1fr] md:gap-12 md:py-16"
    >
      <div>
        <span className="font-mono text-xs text-purple-300">
          0{index + 1}
        </span>
        <h2 className="mt-2 text-xl font-semibold text-white">
          {section.title}
        </h2>
      </div>

      <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-300 md:text-lg">
        {section.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.points && (
          <ul className="grid gap-3 pt-2 text-sm leading-6 text-slate-200 sm:grid-cols-2">
            {section.points.map((point) => (
              <li
                key={point}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
              >
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.section>
  );
}
