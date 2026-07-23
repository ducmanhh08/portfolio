"use client";

import { motion } from "framer-motion";
import type { ProjectMetric } from "@/lib/projects";

export function ImpactSection({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="border-y border-white/10 py-12 md:py-16"
    >
      <span className="font-mono text-xs text-purple-300">04</span>
      <h2 className="mt-2 text-2xl font-semibold text-white">Impact</h2>
      <p className="mt-4 max-w-2xl leading-7 text-slate-300">
        The result is one connected workflow spanning the browser and the web,
        with the most repetitive Drive tasks condensed into a few deliberate
        actions.
      </p>

      <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-slate-950/90 p-6 md:p-8">
            <dt className="mt-2 text-sm leading-6 text-slate-400">
              {metric.label}
            </dt>
            <dd className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.section>
  );
}
