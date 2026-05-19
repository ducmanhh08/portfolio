"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";

const contactInfo = [
  {
    icon: <Mail size={24} />,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: <Phone size={24} />,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: <MapPin size={24} />,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

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
    <SectionContainer id="contact">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Let's </span>
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out.
            I'm always interested in hearing about new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.href}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              target={info.label === "Location" ? undefined : "_blank"}
              rel={info.label === "Location" ? undefined : "noopener noreferrer"}
            >
              <GlassCard className="p-8 text-center h-full glow-sm">
                <div className="flex justify-center mb-4 text-purple-400">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {info.label}
                </h3>
                <p className="text-gray-400">{info.value}</p>
              </GlassCard>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-white/10 focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-white/10 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-white/10 focus:outline-none transition-all duration-300 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </GlassCard>
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Prefer to send an email directly?
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            <Mail size={20} />
            hello@example.com
          </a>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
