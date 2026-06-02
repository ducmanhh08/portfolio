"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "./SectionContainer";
import { Button } from "./Button";
import { ChevronDown } from "lucide-react";

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
        viewport={{ once: true, margin: "0px" }}
      >

        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </motion.div>

        {/* Stats Grid Above About Content */}


        {/* About Content with Image Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
          <motion.div variants={itemVariants} className="space-y-6">
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
            <motion.div variants={itemVariants} className="pt-4">
              <a
                href="/ManhNguyen_SWE_Resume.pdf"
                download
                className="inline-flex items-center justify-center rounded-lg border-2 border-purple-500 px-8 py-4 text-lg font-medium text-purple-400 transition-all duration-300 hover:bg-purple-500/10 hover:shadow-lg"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
            <img
              src="/person.png"
              alt="Manh Nguyen"
              className="w-full max-w-[360px] rounded-[1.5rem] object-cover"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="flex justify-center mt-12"
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
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} className="text-purple-400" />
        </button>
      </motion.div>
    </SectionContainer>
  );
}