"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { Button } from "./Button";
import { GlassCard } from "./GlassCard";
import { SocialIcons } from "./SocialIcons";
import { AvailabilityBadge } from "./AvailabilityBadge";

const technologies = [
  { name: "Java", color: "from-orange-500 to-red-500" },
  { name: "React", color: "from-blue-400 to-cyan-400" },
  { name: "SpringBoot", color: "from-green-500 to-emerald-500" },
  { name: "NodeJS", color: "from-green-600 to-lime-600" },
  { name: "Docker", color: "from-blue-500 to-cyan-600" },
];

const stats = [
  { label: "Years of Professional Experience", value: "2+" },
  { label: "Years in Software Development", value: "4+" },
  { label: "Projects Completed", value: "10+" },
  { label: "Lines of Code Committed", value: "10K+" },
];

const terminalLines = [
  "> whoami",
  "Matthew Nguyen — AI Full-stack Engineer",
  "> cat focus.txt",
  "Building AI-powered tools people actually use",
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function TerminalIntro() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [completedLines, setCompletedLines] = useState<string[]>(() =>
    prefersReducedMotion ? terminalLines : []
  );
  const [currentLineIndex, setCurrentLineIndex] = useState(() =>
    prefersReducedMotion ? terminalLines.length : 0
  );
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isCursorVisible, setIsCursorVisible] = useState(() => !prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion || currentLineIndex >= terminalLines.length) {
      return;
    }

    const currentLine = terminalLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = window.setTimeout(() => {
        setCurrentCharIndex((value) => value + 1);
      }, 28);

      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setCompletedLines((prev) => [...prev, currentLine]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }, 420);

    return () => window.clearTimeout(timeout);
  }, [currentCharIndex, currentLineIndex, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || currentLineIndex < terminalLines.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCompletedLines([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [currentLineIndex, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setIsCursorVisible((value) => !value);
    }, 500);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const currentLine = currentLineIndex < terminalLines.length ? terminalLines[currentLineIndex] : "";
  const renderedLines = completedLines.map((line, index) => (
    <div key={`line-${index}`} className="whitespace-pre-wrap">
      {line}
    </div>
  ));

  if (currentLineIndex < terminalLines.length) {
    renderedLines.push(
      <div key="active-line" className="flex whitespace-pre-wrap">
        <span>{currentLine.slice(0, currentCharIndex)}</span>
        <span
          className={`ml-0.5 text-cyan-300 transition-opacity duration-150 ${isCursorVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          ▋
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-xl">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-purple-950/30 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="min-h-52 p-4 font-mono text-sm leading-7 text-slate-200 sm:p-6 sm:text-[0.95rem]">
          {prefersReducedMotion ? (
            <div className="space-y-2 whitespace-pre-wrap">
              {terminalLines.map((line, index) => (
                <div key={`reduced-line-${index}`}>{line}</div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">{renderedLines}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % technologies.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <SectionContainer id="home" className="relative overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-blob hero-blob--one" />
        <div className="hero-blob hero-blob--two" />
      </div>

      <motion.div
        className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
        variants={containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
      >
        <div className="flex flex-col gap-8">
          <motion.div
            variants={itemVariants}
            className="flex w-fit items-center gap-2 pt-7"
          >
            <GlassCard className="flex items-center gap-2 px-4 py-2">
              <Sparkles size={16} className="text-purple-400" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-300">00 / Introduction</span>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              <span className="mb-2 block text-white">Building Intelligent</span>
              <span className="mb-2 block text-white">Systems with</span>
              <motion.span
                key={currentTechIndex}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                className={`block gradient-text bg-gradient-to-r ${technologies[currentTechIndex].color} bg-300% ${prefersReducedMotion ? "" : "animate-gradient"}`}
              >
                {technologies[currentTechIndex].name}
              </motion.span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AvailabilityBadge />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-lg text-lg leading-relaxed text-gray-400 md:text-xl"
          >
            Crafting beautiful, high-performance web experiences with modern
            technologies. 
            <br />
            Let&apos;s build something extraordinary together.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => {
                const element = document.querySelector("#projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              View My Work
            </Button>
            <a
              href="/ManhNguyen_SWE_Resume.pdf"
              download
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-purple-500 px-8 py-4 text-lg font-medium text-purple-400 transition-all duration-300 hover:bg-purple-500/10 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Download aria-hidden="true" size={20} />
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="mb-4 text-sm text-gray-400">Follow me on social</p>
            <SocialIcons />
          </motion.div>
        </div>

        <motion.div
          className="relative flex min-h-[24rem] items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-4 sm:min-h-[28rem] sm:p-8"
          variants={itemVariants}
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 blur-3xl" />
          <TerminalIntro />
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassCard className="relative flex h-full min-h-[200px] flex-col justify-between rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 text-left shadow-xl shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl hover:shadow-black/25">
              <div className="absolute inset-x-6 top-6 h-px rounded-full bg-white/10" />
              <div className="space-y-4">
                <motion.div
                  className="text-4xl font-semibold leading-tight text-white md:text-5xl"
                  animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.03, 1] }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 2,
                    repeat: prefersReducedMotion ? 0 : Infinity,
                    delay: prefersReducedMotion ? 0 : index * 0.2,
                  }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  {stat.label}
                </p>
              </div>
              <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-80" />
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
