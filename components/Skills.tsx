"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Boxes, Network, Sparkles } from "lucide-react";
import {
  atlasProjects,
  skillCategories,
  skills,
  type SkillCategory,
  type SkillNode,
} from "@/lib/skills";
import { SectionContainer } from "./SectionContainer";

const categoryEntries = Object.entries(skillCategories) as [
  SkillCategory,
  (typeof skillCategories)[SkillCategory],
][];

const skillById = new Map(skills.map((skill) => [skill.id, skill]));

const projectConnections = atlasProjects.flatMap((project) =>
  project.skills.slice(1).flatMap((skillId, index) => {
    const from = skillById.get(project.skills[index]);
    const to = skillById.get(skillId);
    return from && to
      ? [{ id: `${project.id}-${from.id}-${to.id}`, projectId: project.id, from, to }]
      : [];
  }),
);

function LitConnection({
  from,
  to,
  color,
  index,
  reducedMotion,
}: {
  from: SkillNode;
  to: SkillNode;
  color: string;
  index: number;
  reducedMotion: boolean | null;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: reducedMotion ? 0 : index * 0.035,
        duration: reducedMotion ? 0 : 0.2,
      }}
    >
      <line
        x1={from.position.x}
        y1={from.position.y}
        x2={to.position.x}
        y2={to.position.y}
        stroke={color}
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
        opacity="0.42"
        filter="url(#atlas-glow)"
      />
      <motion.line
        x1={from.position.x}
        y1={from.position.y}
        x2={to.position.x}
        y2={to.position.y}
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray="3 3"
        vectorEffect="non-scaling-stroke"
        animate={{
          strokeDashoffset: reducedMotion ? 0 : [0, -24],
        }}
        transition={{
          duration: 1.15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      {!reducedMotion && (
        <motion.circle
          r="0.85"
          fill="#ffffff"
          initial={{ cx: from.position.x, cy: from.position.y, opacity: 0 }}
          animate={{
            cx: [from.position.x, to.position.x],
            cy: [from.position.y, to.position.y],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            delay: index * 0.12,
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ filter: `drop-shadow(0 0 5px ${color})` }}
        />
      )}
    </motion.g>
  );
}

export function Skills() {
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeSkillId = hoveredSkillId ?? selectedSkillId;

  const activeSkill = useMemo(
    () => skills.find((skill) => skill.id === activeSkillId) ?? null,
    [activeSkillId],
  );

  const activeProjects = useMemo(
    () =>
      activeSkill
        ? atlasProjects.filter((project) =>
            project.skills.includes(activeSkill.id),
          )
        : [],
    [activeSkill],
  );

  const connectedSkills = useMemo(() => {
    if (!activeSkill) return [];
    const ids = new Set(activeProjects.flatMap((project) => project.skills));
    ids.delete(activeSkill.id);
    return skills.filter((skill) => ids.has(skill.id));
  }, [activeProjects, activeSkill]);

  const connectedSkillIds = useMemo(
    () => new Set(connectedSkills.map((skill) => skill.id)),
    [connectedSkills],
  );

  return (
    <SectionContainer id="skills">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeOut" }}
      >
        <div className="mb-9 max-w-3xl md:mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-purple-300">
            03/ &nbsp; Capabilities
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-white">Skill </span>
            <span className="gradient-text">Atlas</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            A map of the languages, frameworks, and tools I work with — grouped by
            discipline, connected to the projects they shipped in.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(19rem,2fr)]">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080d19]/90 shadow-[0_24px_100px_-30px_rgba(124,58,237,0.65)] backdrop-blur-xl">
            <div className="flex flex-col gap-5 border-b border-white/10 px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Network aria-hidden="true" className="h-4 w-4 text-purple-300" />
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-200">
                    Project systems graph
                  </p>
                </div>
                <p className="hidden text-xs text-slate-500 sm:block">
                  Select a node to illuminate its projects
                </p>
              </div>

              <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Skill categories">
                {categoryEntries.map(([id, category]) => (
                  <li key={id} className="flex items-center gap-2 text-xs text-slate-400">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: category.color,
                        boxShadow: `0 0 12px ${category.color}`,
                      }}
                    />
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="relative h-[37rem] w-full sm:h-[40rem]"
              role="group"
              aria-label="Interactive project and skill connection map"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-45"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(148,163,184,.14) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                  maskImage:
                    "radial-gradient(ellipse at center, black 35%, transparent 82%)",
                }}
              />

              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="atlas-blur" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="1.4" />
                  </filter>
                  <filter id="atlas-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.4" />
                  </filter>
                </defs>

                {projectConnections.map((connection) => {
                  const belongsToActiveProject = activeProjects.some(
                    (project) => project.id === connection.projectId,
                  );
                  return (
                    <g
                      key={connection.id}
                      className="transition-opacity duration-300 motion-reduce:transition-none"
                      style={{
                        opacity: activeSkill
                          ? belongsToActiveProject
                            ? 0.7
                            : 0.13
                          : 1,
                      }}
                    >
                      <line
                        x1={connection.from.position.x}
                        y1={connection.from.position.y}
                        x2={connection.to.position.x}
                        y2={connection.to.position.y}
                        stroke="#94a3b8"
                        strokeWidth="3.5"
                        vectorEffect="non-scaling-stroke"
                        opacity="0.13"
                        filter="url(#atlas-blur)"
                      />
                      <line
                        x1={connection.from.position.x}
                        y1={connection.from.position.y}
                        x2={connection.to.position.x}
                        y2={connection.to.position.y}
                        stroke="#cbd5e1"
                        strokeWidth="0.55"
                        strokeDasharray="1.3 2.6"
                        vectorEffect="non-scaling-stroke"
                        opacity="0.24"
                      />
                    </g>
                  );
                })}

                <AnimatePresence>
                  {activeSkill &&
                    connectedSkills.map((skill, index) => (
                      <LitConnection
                        key={`${activeSkill.id}-${skill.id}`}
                        from={activeSkill}
                        to={skill}
                        color={skillCategories[activeSkill.category].color}
                        index={index}
                        reducedMotion={prefersReducedMotion}
                      />
                    ))}
                </AnimatePresence>
              </svg>

              {skills.map((skill, index) => {
                const category = skillCategories[skill.category];
                const isActive = activeSkillId === skill.id;
                const isSelected = selectedSkillId === skill.id;
                const isConnected = connectedSkillIds.has(skill.id);
                const isDimmed = Boolean(activeSkill) && !isActive && !isConnected;

                return (
                  <div
                    key={skill.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${skill.position.x}%`, top: `${skill.position.y}%` }}
                  >
                    <motion.button
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={`${skill.name}, ${category.name}`}
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, y: 14, scale: 0.8 }
                      }
                      whileInView={{
                        opacity: isDimmed ? 0.24 : 1,
                        y: 0,
                        scale: isActive ? 1.12 : 1,
                      }}
                      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{
                        opacity: { duration: prefersReducedMotion ? 0 : 0.2 },
                        scale: { type: "spring", stiffness: 340, damping: 22 },
                        y: {
                          delay: prefersReducedMotion ? 0 : index * 0.025,
                          duration: prefersReducedMotion ? 0 : 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                      onMouseEnter={() => setHoveredSkillId(skill.id)}
                      onMouseLeave={() => setHoveredSkillId(null)}
                      onFocus={() => setHoveredSkillId(skill.id)}
                      onBlur={() => setHoveredSkillId(null)}
                      onClick={() =>
                        setSelectedSkillId((current) =>
                          current === skill.id ? null : skill.id,
                        )
                      }
                      className="group relative flex w-[4.7rem] flex-col items-center gap-2 text-center outline-none sm:w-24"
                    >
                      <span className="relative flex">
                        {isActive && (
                          <motion.span
                            aria-hidden="true"
                            className="absolute -inset-2 rounded-full border"
                            style={{ borderColor: category.color }}
                            animate={
                              prefersReducedMotion
                                ? { opacity: 0.55 }
                                : { scale: [0.85, 1.45], opacity: [0.75, 0] }
                            }
                            transition={{
                              duration: 1.25,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeOut",
                            }}
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className="relative h-9 w-9 rounded-full border-2 border-white/30 transition-[filter,box-shadow] duration-200 group-hover:brightness-125 group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-slate-950 sm:h-11 sm:w-11 motion-reduce:transition-none"
                          style={{
                            background: `radial-gradient(circle at 32% 25%, #ffffffb8 0%, ${category.color} 30%, ${category.color} 72%, #0f172a 150%)`,
                            boxShadow: isActive
                              ? `0 0 14px ${category.color}, 0 0 38px ${category.color}`
                              : isConnected
                                ? `0 0 18px ${category.color}aa`
                                : `0 7px 18px rgba(0,0,0,.45), 0 0 12px ${category.color}55`,
                          }}
                        />
                      </span>
                      <span
                        className="max-w-24 text-[0.64rem] font-semibold leading-tight tracking-wide text-slate-300 transition-colors duration-200 group-hover:text-white sm:text-xs motion-reduce:transition-none"
                        style={{ color: isActive ? category.color : undefined }}
                      >
                        {skill.name}
                      </span>
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="relative min-h-80 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-8 lg:min-h-full">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl"
            />
            <div className="relative flex h-full flex-col">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                System details
              </p>

              <div className="relative mt-8 flex min-h-72 flex-1">
                <AnimatePresence mode="wait" initial={false}>
                  {activeSkill ? (
                    <motion.div
                      key={activeSkill.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                      className="w-full"
                      aria-live="polite"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className="h-10 w-10 shrink-0 rounded-full border-2 border-white/30"
                          style={{
                            backgroundColor:
                              skillCategories[activeSkill.category].color,
                            boxShadow: `0 0 24px ${skillCategories[activeSkill.category].color}88`,
                          }}
                        />
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            {activeSkill.name}
                          </h3>
                          <p
                            className="mt-1 text-sm"
                            style={{
                              color:
                                skillCategories[activeSkill.category].color,
                            }}
                          >
                            {skillCategories[activeSkill.category].name}
                          </p>
                        </div>
                      </div>

                      <div className="mt-9">
                        <div className="flex items-center gap-2">
                          <Boxes aria-hidden="true" className="h-4 w-4 text-slate-500" />
                          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-slate-500">
                            Project systems
                          </p>
                        </div>
                        <ul className="mt-4 space-y-3">
                          {activeProjects.map((project) => {
                            const projectSkills = project.skills
                              .map((id) => skillById.get(id))
                              .filter((skill): skill is SkillNode => Boolean(skill));
                            return (
                              <li
                                key={project.id}
                                className="rounded-2xl border border-white/10 bg-slate-950/45 p-4"
                              >
                                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                  <Sparkles
                                    aria-hidden="true"
                                    className="h-3.5 w-3.5 text-purple-300"
                                  />
                                  {project.name}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                  {projectSkills.map((skill) => (
                                    <span
                                      key={skill.id}
                                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[0.65rem] text-slate-400"
                                    >
                                      <span
                                        className="h-1.5 w-1.5 rounded-full"
                                        style={{
                                          backgroundColor:
                                            skillCategories[skill.category].color,
                                        }}
                                      />
                                      {skill.name}
                                    </span>
                                  ))}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="mt-8">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                          <Network aria-hidden="true" className="h-3.5 w-3.5" />
                          Connected through projects
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {connectedSkills.map((skill) => (
                            <span
                              key={skill.id}
                              className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-slate-300"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                      className="flex max-w-xs flex-col justify-center"
                    >
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/10 shadow-[0_0_32px_rgba(168,85,247,0.12)]">
                        <Network aria-hidden="true" className="h-6 w-6 text-purple-300" />
                      </div>
                      <h3 className="text-xl font-medium leading-8 text-slate-200">
                        Select a skill to illuminate its project systems
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        Each project crosses disciplines—AI, engineering, data, and
                        delivery working together.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
