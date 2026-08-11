import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      id={`project-${project.slug}`}
      href={`/work/${project.slug}`}
      aria-label={`View ${project.name} case study`}
      className="group block scroll-mt-24 cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/[0.055] hover:shadow-[0_24px_70px_rgba(90,61,190,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <article className="grid min-h-[30rem] grid-cols-1 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-9 lg:p-12">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
              {project.category}
            </p>
            <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {project.name}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              {project.description}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technology stack">
              {project.stack.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-slate-300"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          <span className="flex items-center gap-2 text-sm font-medium text-white opacity-100 transition-[opacity,transform] duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none">
            View more
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
            />
          </span>
        </div>

        <div className="relative min-h-72 overflow-hidden border-t border-white/10 bg-slate-900 lg:min-h-full lg:border-l lg:border-t-0">
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent"
          />
        </div>
      </article>
    </Link>
  );
}
