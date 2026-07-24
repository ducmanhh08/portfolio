"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { SocialIcons } from "./SocialIcons";
import { siteContact } from "@/lib/site";

const emailAddress = siteContact.email;

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
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-purple-300">
          05 / Get in touch
        </p>
        <motion.div variants={itemVariants} className="mb-6">
          <AvailabilityBadge />
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

        <motion.div variants={itemVariants} className="mt-8 flex justify-center">
          <SocialIcons />
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
