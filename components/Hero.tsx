"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { Button } from "./Button";
import { GlassCard } from "./GlassCard";
import { SocialIcons } from "./SocialIcons";

const technologies = [
  { name: "Java", color: "from-orange-500 to-red-500" },
  { name: "React", color: "from-blue-400 to-cyan-400" },
  { name: "SpringBoot", color: "from-green-500 to-emerald-500" },
  { name: "NodeJS", color: "from-green-600 to-lime-600" },
  { name: "Docker", color: "from-blue-500 to-cyan-600" },
];

const stats = [
  { label: "Years of Professional Experience", value: "1+" },
  { label: "Years in Software Development", value: "4+" },
  { label: "Projects Completed", value: "10+" },
  { label: "Lines of Code Committed", value: "10K+" },
];

const TechLogo = ({ tech }: { tech: string }) => {
  const icons: { [key: string]: React.ReactNode } = {
    Java: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.851 18.56s-.917.534.652.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-7.942-1.149zm-.789-3.137s-1.032.767.545 1.132c2.027.451 3.613.348 6.362-.471 0 0 .384.384 1.011.594-5.631 1.646-11.89.158-7.918-1.255z" />
        <path d="M13.216 13.544c1.162 1.34-.305 2.543-.305 2.543s2.956-1.524 1.598-3.431c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.3 6.576z" />
        <path d="M19.341 20.283s.684.564-.756.997c-2.738.786-11.385 1.022-13.792.032-.799-.361.699-1.062 1.176-1.191 2.484-.668 4.296-.614 7.338.211 2.858.746 5.34 1.63 5.034-1.049zm-9.087-13.201c-4.427 0-8.27-3.844-8.27-8.27 0-4.427 3.843-8.27 8.27-8.27s8.27 3.843 8.27 8.27c0 4.426-3.843 8.27-8.27 8.27z" />
      </svg>
    ),
    React: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1.04-.84 1.87-1.87 1.87S10.13 13.04 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.8.48 2.1-.46 3.35-3.55.3-.84.54-1.67.72-2.45-2.54-.29-4.41-1.7-5.08-3.39.6-2.23-.07-4.41-1.95-5.44C3.08 4.03 1.68 4.56.81 5.59c-1.31 1.63-.74 4.62 1.88 7.86 2.62 3.24 6.54 5.15 9.82 5.55.21.93.48 1.81.8 2.69-1.52 2.14-3.37 3.31-4.94 3.31z" />
      </svg>
    ),
    SpringBoot: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.28 2.28a4.06 4.06 0 0 0-4.06 4.06v11.32a4.06 4.06 0 0 0 4.06 4.06h3.44a4.06 4.06 0 0 0 4.06-4.06V6.34a4.06 4.06 0 0 0-4.06-4.06zm0 1.5h3.44a2.56 2.56 0 0 1 2.56 2.56v11.32a2.56 2.56 0 0 1-2.56 2.56h-3.44a2.56 2.56 0 0 1-2.56-2.56V6.34a2.56 2.56 0 0 1 2.56-2.56z" />
      </svg>
    ),
    NodeJS: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8m3.5-9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-7 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m3.5 4a3 3 0 0 1-3-3v-2a1 1 0 0 1 2 0v2a1 1 0 0 0 2 0v-2a1 1 0 0 1 2 0v2a3 3 0 0 1-3 3z" />
      </svg>
    ),
    Docker: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.66 6.35h-2.1V4.25h2.1m3.95 0h-2.1V4.25h2.1m4 0h-2.1V4.25h2.1M8.7 6.35H6.6V4.25h2.1m3.96 2.1h-2.1v-2.1h2.1m3.95 0h-2.1v-2.1h2.1m3.99 0h-2.1v-2.1h2.1M6.6 10.3h2.1V8.2H6.6m3.96 0h-2.1V8.2h2.1m3.95 0h-2.1V8.2h2.1m3.99 0h-2.1V8.2h2.1M3.65 17.13c0 .35-.06.68-.15 1.01.33.62.87 1.11 1.52 1.33.2-1.04.66-1.98 1.32-2.73-.62-.07-1.23-.16-1.82-.27-.54.28-.87.85-.87 1.66m6.95.24c1.27 0 2.45-.37 3.46-.98.75-.45 1.39-1.08 1.88-1.82.49-.74.82-1.57.98-2.45.16-.88.16-1.78 0-2.67-.16-.87-.49-1.71-.98-2.45-.49-.74-1.13-1.38-1.88-1.82-2.02-1.22-4.5-1.22-6.52 0-.75.45-1.39 1.08-1.88 1.82-.49.74-.82 1.57-.98 2.45-.16.88-.16 1.78 0 2.67.16.87.49 1.71.98 2.45.49.74 1.13 1.38 1.88 1.82 1.01.61 2.19.98 3.46.98" />
      </svg>
    ),
  };
  return icons[tech] || null;
};

export function Hero() {
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % technologies.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <SectionContainer id="home" className="pt-28">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          {/* Floating Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 w-fit pt-7"
          >
            <GlassCard className="px-4 py-2 flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-sm text-gray-300">
                Welcome to my portfolio
              </span>
            </GlassCard>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block text-white mb-2">Building Intelligent</span>
              <span className="block text-white mb-2">Systems with</span>
              <motion.span
                key={currentTechIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className={`block gradient-text bg-gradient-to-r ${technologies[currentTechIndex].color} bg-300% animate-gradient`}
              >
                {technologies[currentTechIndex].name}
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed"
          >
            Crafting beautiful, high-performance web experiences with modern
            technologies. Let's build something extraordinary together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" onClick={() => {
              const element = document.querySelector("#projects");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}>
              View My Work
            </Button>
            <Button size="lg" variant="outline" onClick={() => {
              const element = document.querySelector("#contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}>
              Let's Connect
            </Button>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={itemVariants}>
            <p className="text-sm text-gray-400 mb-4">Follow me on social</p>
            <SocialIcons />
          </motion.div>
        </div>

        {/* Right Side - Animated Containers */}
        <motion.div
          className="relative h-96 md:h-[500px] flex items-center justify-center"
          variants={itemVariants}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Background gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>

          {/* Animated Tech Containers */}
          {technologies.map((tech, index) => {
            const angle = (index / technologies.length) * Math.PI * 2;
            const radius = isHovering ? 120 : 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={index}
                className="absolute"
                animate={{
                  x: isHovering ? x : 0,
                  y: isHovering ? y : 0,
                  scale: isHovering ? 1 : 0.8,
                  rotate: isHovering ? index * 72 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.6,
                }}
              >
                <motion.div
                  animate={{
                    y: isHovering ? [0, -10, 0] : [0, -5, 0],
                    rotate: isHovering ? 360 : 0,
                  }}
                  transition={{
                    duration: isHovering ? 3 : 4,
                    repeat: Infinity,
                  }}
                  className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-transparent cursor-pointer hover:border-white/50 transition-all duration-300`}
                  style={{
                    background: `linear-gradient(135deg, ${tech.color.includes("orange")
                      ? "rgba(251, 146, 60, 0.1)"
                      : tech.color.includes("blue")
                        ? "rgba(59, 130, 246, 0.1)"
                        : tech.color.includes("green")
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgba(30, 144, 255, 0.1)"
                      })`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <motion.div
                    className={`text-white bg-gradient-to-r ${tech.color} p-3 rounded-xl`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring" }}
                  >
                    <TechLogo tech={tech.name} />
                  </motion.div>
                  <span className="text-sm font-semibold text-gray-200 text-center">
                    {tech.name}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Center decorative element */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <motion.div
              animate={{
                boxShadow: isHovering
                  ? "0 0 40px rgba(147, 51, 234, 0.4)"
                  : "0 0 20px rgba(147, 51, 234, 0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20"
            ></motion.div>
          </motion.div>

          {/* Hover hint text */}
          {!isHovering && (
            <motion.div
              className="absolute bottom-0 text-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-xs text-gray-500">Hover for animation</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassCard className="relative p-6 h-full min-h-[200px] flex flex-col justify-between text-left group transition-all duration-300 rounded-[1.75rem] border border-white/10 bg-slate-950/80 shadow-xl shadow-black/15 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/25 hover:border-white/15">
              <div className="absolute inset-x-6 top-6 h-px bg-white/10 rounded-full"></div>
              <div className="space-y-4">
                <motion.div
                  className="text-4xl md:text-5xl font-semibold text-white leading-tight"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  {stat.label}
                </p>
              </div>
              <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-80"></div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

    </SectionContainer>
  );
}
