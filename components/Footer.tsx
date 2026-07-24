"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { siteContact } from "@/lib/site";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const links = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-transparent to-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="mb-8 grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto] md:items-start">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
                Matthew Nguyen
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building innovative web experiences with modern technologies
                and creative solutions.
              </p>
              <address className="mt-5 flex flex-col items-start gap-2 not-italic">
                <a
                  href={`mailto:${siteContact.email}`}
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-purple-300"
                >
                  <Mail aria-hidden="true" size={16} className="text-purple-300" />
                  {siteContact.email}
                </a>
                <a
                  href={`tel:${siteContact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-purple-300"
                >
                  <Phone aria-hidden="true" size={16} className="text-purple-300" />
                  {siteContact.phone}
                </a>
              </address>
            </motion.div>

            <motion.div variants={itemVariants} className="md:text-right">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="cursor-pointer text-sm text-gray-400 transition-colors hover:text-purple-400"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Copyright */}
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>© {currentYear} Matthew Nguyen. All rights reserved.</span>
            </div>



            <div className="flex items-center gap-3">
              <SocialIcons
                variant="minimal"
                includeEmail={false}
                className="gap-2"
              />
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-lg border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} className="text-purple-400" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
