"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import styles from "./Contact.module.css";

const emailAddress = "nducmanh08@gmail.com";

const GitHubIcon = () => (
  <svg
    aria-hidden="true"
    width="22"
    height="22"
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

const LinkedInIcon = () => (
  <svg
    aria-hidden="true"
    width="22"
    height="22"
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

const socialLinks = [
  {
    href: "https://github.com/ducmanhh08",
    label: "GitHub",
    icon: <GitHubIcon />,
  },
  {
    href: "https://www.linkedin.com/in/dmanhng811/",
    label: "LinkedIn",
    icon: <LinkedInIcon />,
  },
];

type CopyState = "idle" | "copied" | "error";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

export function Contact() {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (copyState === "idle") {
      return;
    }

    const timer = window.setTimeout(() => setCopyState("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const handleCopyEmail = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const button = event.currentTarget;
    const copied = await copyText(emailAddress);
    setCopyState(copied ? "copied" : "error");
    button.focus();
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <SectionContainer id="contact" className="overflow-hidden">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-3.5 py-2 text-sm font-medium text-emerald-100"
        >
          <span className={styles.statusDot} aria-hidden="true" />
          Open to new opportunities
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Let&apos;s build something{" "}
          <span className="gradient-text">worth sharing.</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg"
        >
          Have a role, project, or idea in mind? Copy my email and tell me
          about it. I&apos;ll get back to you as soon as I can.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group flex min-h-20 w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white px-5 py-4 text-left text-slate-950 shadow-[0_20px_60px_rgba(99,102,241,0.18)] transition-[transform,background-color,border-color,box-shadow] duration-200 hover:scale-[1.015] hover:border-purple-300 hover:bg-purple-50 hover:shadow-[0_24px_70px_rgba(168,85,247,0.26)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400 active:scale-[0.975] active:bg-purple-100 sm:px-7"
            aria-label={`Copy ${emailAddress} to clipboard`}
          >
            <span className="flex min-w-0 items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition-colors duration-200 group-hover:bg-purple-600 group-active:bg-purple-700">
                <Mail aria-hidden="true" size={21} />
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold sm:text-xl">
                  Email me
                </span>
                <span className="block truncate text-sm text-slate-500">
                  {emailAddress}
                </span>
              </span>
            </span>

            <span className="shrink-0 text-sm font-semibold">
              <AnimatePresence mode="wait" initial={false}>
                {copyState === "copied" ? (
                  <motion.span
                    key="copied"
                    className="inline-flex items-center gap-1.5 text-emerald-700"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.16 }}
                  >
                    <Check aria-hidden="true" size={18} />
                    Copied!
                  </motion.span>
                ) : copyState === "error" ? (
                  <motion.span
                    key="error"
                    className="text-rose-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Try again
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    className="inline-flex items-center gap-1.5 text-slate-600 transition-colors group-hover:text-purple-700"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.16 }}
                  >
                    <Copy aria-hidden="true" size={17} />
                    <span className="hidden sm:inline">Copy email</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>

          <p className="sr-only" role="status" aria-live="polite">
            {copyState === "copied"
              ? "Email address copied to clipboard."
              : copyState === "error"
                ? "Could not copy the email address. Please try again."
                : ""}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center gap-3"
          aria-label="Social profiles"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (opens in a new tab)`}
              className="group relative flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-[transform,background-color,border-color,color] duration-200 hover:scale-110 hover:border-purple-400/50 hover:bg-purple-500/15 hover:text-purple-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400 active:scale-95 active:border-purple-400/70 active:bg-purple-500/25 active:text-white"
            >
              {link.icon}
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-[calc(100%+0.65rem)] left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-white/10 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-[opacity,transform] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                {link.label}
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
