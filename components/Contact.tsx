"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Phone, Send } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { GlassCard } from "./GlassCard";

const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const emailAddress = "nducmanh08@gmail.com";
const phoneNumber = "+61 414 343 129";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/dmanhng811/",
    label: "LinkedIn",
    icon: <LinkedInIcon size={16} />,
  },
  {
    href: "https://github.com/ducmanhh08",
    label: "GitHub",
    icon: <GitHubIcon size={16} />,
  },
];

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "A short message helps me respond faster.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setShakeKey((prev) => prev + 1);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleCopyEmail = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(emailAddress);
    setCopied(true);
  };

  const inputClassName =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-purple-400/70 focus:bg-white/10";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65 },
    },
  };

  return (
    <SectionContainer id="contact">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={itemVariants} className="mb-8 text-center lg:text-left">
          <h2 className="mb-3 text-4xl font-bold md:text-5xl">
            <span className="text-white">Let's </span>
            <span className="gradient-text">Connect</span>
          </h2>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
            <span className="status-dot h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span>Open to new opportunities</span>
          </div>
          <p className="max-w-xl text-lg leading-7 text-gray-400 md:text-xl">
            I’m available for freelance work, product collaborations, and thoughtful product buildouts.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div variants={itemVariants} className="space-y-4">
            <GlassCard className="p-5 sm:p-6">
              <div className="space-y-3">
                <motion.button
                  type="button"
                  onClick={handleCopyEmail}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-colors hover:border-purple-400/40 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Email</p>
                    <p className="mt-1 truncate text-sm font-medium text-white">{emailAddress}</p>
                  </div>
                  <div className="text-sm text-slate-400">
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="inline-flex items-center gap-1 text-emerald-300"
                        >
                          <Check size={14} />
                          Copied!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                <a
                  href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-purple-400/40 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Phone</p>
                    <p className="mt-1 text-sm font-medium text-white">{phoneNumber}</p>
                  </div>
                </a>
              </div>
            </GlassCard>

            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition-colors hover:border-purple-400/40 hover:bg-white/10"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <motion.div
                    key={`${shakeKey}-name`}
                    initial={false}
                    animate={errors.name ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                      Name
                    </label>
                    <div className={`flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 ${errors.name ? "border-rose-400/70 bg-rose-500/10" : ""}`}>
                      <Mail size={16} className="text-slate-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full border-0 bg-transparent py-1 text-sm text-white placeholder:text-slate-400 outline-none"
                      />
                    </div>
                    {errors.name ? (
                      <p className="mt-2 text-sm text-rose-300">{errors.name}</p>
                    ) : null}
                  </motion.div>

                  <motion.div
                    key={`${shakeKey}-email`}
                    initial={false}
                    animate={errors.email ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                      Email
                    </label>
                    <div className={`flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 ${errors.email ? "border-rose-400/70 bg-rose-500/10" : ""}`}>
                      <Mail size={16} className="text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full border-0 bg-transparent py-1 text-sm text-white placeholder:text-slate-400 outline-none"
                      />
                    </div>
                    {errors.email ? (
                      <p className="mt-2 text-sm text-rose-300">{errors.email}</p>
                    ) : null}
                  </motion.div>
                </div>

                <motion.div
                  key={`${shakeKey}-message`}
                  initial={false}
                  animate={errors.message ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className={`${inputClassName} min-h-[140px] resize-none ${errors.message ? "border-rose-400/70 bg-rose-500/10" : ""}`}
                  />
                  {errors.message ? (
                    <p className="mt-2 text-sm text-rose-300">{errors.message}</p>
                  ) : null}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -1, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/35 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
