"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { Button } from "./Button";
import { SocialIcons } from "./SocialIcons";
import { GlassCard } from "./GlassCard";

const floatingCards = [
  { icon: "⚡", label: "Fast" },
  { icon: "🎨", label: "Creative" },
  { icon: "💡", label: "Innovative" },
];

export function Hero() {
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
    <SectionContainer id="home" className="pt-32">
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
            className="flex items-center gap-2 w-fit"
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-white mb-2">Creative</span>
              <span className="gradient-text bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-300% animate-gradient">
                Developer
              </span>
              <span className="block text-white">Experience</span>
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

        {/* Right Side - Floating Cards */}
        <motion.div
          className="relative h-96 md:h-[500px] flex items-center justify-center"
          variants={itemVariants}
        >
          {/* Background gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>

          {/* Floating Cards */}
          {floatingCards.map((card, index) => (
            <motion.div
              key={index}
              className="absolute"
              animate={{
                y: [0, -20, 0],
                x: [-10, 10, -10],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
              }}
              style={{
                left: `${20 + index * 30}%`,
                top: `${20 + (index % 2) * 30}%`,
              }}
            >
              <GlassCard className="p-6 w-24 h-24 flex flex-col items-center justify-center gap-2 glow-sm">
                <span className="text-4xl">{card.icon}</span>
                <span className="text-xs text-center text-gray-300">
                  {card.label}
                </span>
              </GlassCard>
            </motion.div>
          ))}

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
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="flex justify-center mt-20"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <button
          onClick={() => {
            const element = document.querySelector("#about");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} className="text-purple-400" />
        </button>
      </motion.div>
    </SectionContainer>
  );
}
