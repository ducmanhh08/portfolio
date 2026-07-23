import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/CaseStudySection";
import { ImpactSection } from "@/components/ImpactSection";
import { getProject, projects } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.name} — Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative z-10 min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
          />
          Back to selected work
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          Case study
        </span>
      </nav>

      <article className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 md:pt-20 lg:px-10">
        <header className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-purple-300">
            {project.category}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            {project.description}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technology stack">
            {project.stack.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-slate-300"
              >
                {technology}
              </li>
            ))}
          </ul>
        </header>

        <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/30 md:mt-20 md:rounded-[2rem]">
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover object-top"
          />
        </div>

        <div className="mt-16 md:mt-24">
          {project.caseStudy.map((section, index) => (
            <CaseStudySection
              key={section.title}
              index={index}
              section={section}
            />
          ))}
          <ImpactSection metrics={project.metrics} />
        </div>

        <div className="pt-16 text-center md:pt-24">
          <p className="text-sm text-slate-400">Want to see more?</p>
          <Link
            href="/#projects"
            className="mt-3 inline-flex text-lg font-medium text-white underline decoration-purple-400/60 underline-offset-8 transition-colors hover:text-purple-200"
          >
            Explore selected work
          </Link>
        </div>
      </article>
    </main>
  );
}
