"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "About", href: "#about", id: "about" },
];

function MLogo() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
      <span className="text-lg font-bold text-white">M</span>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (activeEntry) setActiveSection(activeEntry.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveSection(href.slice(1));
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "max-w-6xl mx-auto my-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 justify-center items-center"
          : "flex bg-transparent border-b border-white/5 px-8 py-4 justify-center items-center"
          }`}
      >
        <div className="flex w-full max-w-5xl items-center justify-between gap-6">
          {/* Logo and Brand Name */}
          <motion.button
            onClick={handleLogoClick}
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
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
                aria-current={activeSection === item.id ? "page" : undefined}
                initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.05 }}
                className={`group relative cursor-pointer text-sm font-medium transition-colors duration-300 ${activeSection === item.id ? "text-white" : "text-gray-300 hover:text-white"}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </motion.a>
            ))}
          </div>

          {/* Contact Button */}
          <motion.button
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
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
          className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
        >
          <MLogo />
          <span className="text-base font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Matthew
          </span>
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -20 }}
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
              aria-current={activeSection === item.id ? "page" : undefined}
              className={`cursor-pointer rounded-lg px-4 py-2 transition-colors ${activeSection === item.id ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}`}
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
