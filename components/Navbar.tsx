"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // M Logo component
  const MLogo = () => (
    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-lg">M</span>
    </div>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "max-w-6xl mx-auto my-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 justify-center items-center"
          : "flex bg-transparent border-b border-white/5 px-8 py-4 justify-center items-center"
          }`}
      >
        <div className="flex items-center gap-50 max-w-7xl justify-between">
          {/* Logo and Brand Name */}
          <motion.button
            onClick={handleLogoClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <MLogo />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent p-2">
              Matthew Nguyen
            </span>
          </motion.button>

          {/* Navigation Items */}
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

          {/* Contact Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className="group flex items-center gap-2 px-6 py-2 rounded-4xl bg-transparent text-white/90 border border-white/10 text-sm font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-lg hover:shadow-purple-500/40 transition-colors duration-200"
          >
            <span className="pointer-events-none">Contact me</span>
            <span className="transform transition-transform duration-200 group-hover:translate-x-2">
              <ArrowRight size={16} />
            </span>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5 px-4 py-4 flex justify-between items-center">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <MLogo />
          <span className="text-base font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Matthew
          </span>
        </button>
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
          className="md:hidden fixed top-16 left-0 right-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/5 p-4 flex flex-col gap-4"
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
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className="group flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-transparent text-white/90 border border-white/10 font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white transition-colors duration-200"
          >
            <span className="pointer-events-none">Contact me</span>
            <span className="transform transition-transform duration-200 group-hover:translate-x-2">
              <ArrowRight size={16} />
            </span>
          </button>
        </motion.div>
      )}
    </>
  );
}
