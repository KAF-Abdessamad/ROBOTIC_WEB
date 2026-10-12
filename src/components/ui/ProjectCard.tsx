import React from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu } from "lucide-react";
import { ProjectItem } from "@/lib/data/demo-data";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isCompleted = project.status === "completed";

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-slate-800/80">
      {/* Image container avec overlay gradient */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Badge Statut */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
              isCompleted
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                : "bg-cyan-950/80 text-cyan-300 border-cyan-500/40"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCompleted ? "bg-emerald-400" : "bg-cyan-400 animate-pulse"
              }`}
            />
            {project.statusLabel}
          </span>
        </div>

        {/* Date ou Année */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-700/60 backdrop-blur-md">
            {project.projectDate}
          </span>
        </div>
      </div>

      {/* Contenu textuel */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
            {project.summary}
          </p>

          {/* Tags technologiques */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-900 text-cyan-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 rounded-md text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Lien / Action */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Robotique UPF
          </span>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
          >
            Détails
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
