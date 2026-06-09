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
  const logos: { [key: string]: string } = {
    Java: "/java-logo.webp",
    React: "/react-logo.png",
    SpringBoot: "/springboot-logo.png",
    NodeJS: "/nodejs-icon.svg",
    Docker: "/docker.png",
  };

  const logoSrc = logos[tech];
  return logoSrc ? (
    <img
      src={logoSrc}
      alt={`${tech} logo`}
      className="w-12 h-12 object-contain"
    />
  ) : null;
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
