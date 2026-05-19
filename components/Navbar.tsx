"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/5 px-8 py-4 justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
        >
          Portfolio
        </motion.div>

        <div className="flex gap-8 items-center">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </div>

        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#contact");
          }}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
        >
          Get in Touch
        </motion.a>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/5 px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Portfolio
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed top-16 left-0 right-0 z-40 glass-effect border-b border-white/5 p-4 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center font-medium"
          >
            Get in Touch
          </a>
        </motion.div>
      )}
    </>
  );
}
