import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export function Hero({
  badge = "Club de Robotique & IA • UPF Fès",
  title,
  highlightedText,
  description,
  primaryCta = { label: "Rejoindre le club", href: "/join" },
  secondaryCta = { label: "Découvrir nos projets", href: "/projects" },
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-32 tech-grid">
      {/* Halo lumineux en arrière-plan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/3 left-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-slate-100 dark:bg-slate-900/80 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 mb-6 sm:mb-8 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{badge}</span>
        </div>

        {/* Titre principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-tight">
          {title}{" "}
          {highlightedText && (
            <span className="gradient-text block sm:inline">
              {highlightedText}
            </span>
          )}
        </h1>

        {/* Description */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-2">
          {description}
        </p>

        {/* Boutons d'action */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/60 hover:border-slate-400 dark:hover:border-slate-500 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm text-sm sm:text-base"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
