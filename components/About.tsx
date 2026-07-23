"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Code2, MapPin } from "lucide-react";
import { SectionContainer } from "./SectionContainer";

const quickFacts = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Vancouver, BC",
  },
  {
    icon: BookOpen,
    label: "Learning",
    value: "Next.js patterns",
  },
  {
    icon: Code2,
    label: "Building",
    value: "Product-led apps",
  },
] as const;

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer id="about">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="mb-8 md:mb-10">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="text-white">About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.2fr)] md:items-center lg:gap-14">
          <div className="mx-auto w-full max-w-sm md:mx-0">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_20px_70px_-35px_rgba(168,85,247,0.55)]">
              <div className="relative aspect-[2/3] overflow-hidden rounded-[1.4rem] bg-slate-900">
                <Image
                  src="/person.png"
                  alt="Portrait of Manh Nguyen"
                  fill
                  sizes="(max-width: 767px) calc(100vw - 56px), 360px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="space-y-4 text-base leading-8 text-slate-300 sm:text-lg">
              <p>
                I&apos;m a software developer who enjoys turning thoughtful ideas into polished,
                dependable web products. I care about clear interfaces, strong foundations, and
                code that stays easy to work with.
              </p>
              <p>
                Right now, I&apos;m focused on full-stack work with Next.js, TypeScript, and
                cloud-ready APIs, while building product-led apps that feel fast and intentional.
              </p>
              <p>
                I&apos;m especially interested in AI-assisted tools, design systems, and developer
                experience. Away from the keyboard, I&apos;m usually reading about product design
                or experimenting with a new idea.
              </p>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Quick facts">
              {quickFacts.map(({ icon: Icon, label, value }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200"
                >
                  <Icon aria-hidden="true" size={15} className="shrink-0 text-cyan-300" />
                  <span className="text-slate-400">{label}</span>
                  <span className="font-medium text-slate-100">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
