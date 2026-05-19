"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "./SectionContainer";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { ChevronDown } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Code Commits", value: "10K+" },
];

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <SectionContainer id="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bio */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with a love for creating
              elegant solutions to complex problems. With a background in
              Computer Science, I've spent the last 5 years crafting beautiful
              web experiences that users love.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My expertise spans across modern frontend frameworks, cloud
              infrastructure, and scalable backend systems. I believe in writing
              clean, maintainable code and staying at the forefront of web
              technology.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>
            <motion.div
              variants={itemVariants}
              className="pt-4"
            >
              <Button size="lg" variant="outline">
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <GlassCard className="p-6 h-full flex flex-col justify-center items-center text-center group hover:scale-105">
                  <motion.div
                    className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-sm md:text-base text-gray-400">
                    {stat.label}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
            const element = document.querySelector("#skills");
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
