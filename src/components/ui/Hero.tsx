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
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32 tech-grid">
      {/* Halo lumineux en arrière-plan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-slate-900/80 border border-cyan-500/30 text-cyan-400 mb-8 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{badge}</span>
        </div>

        {/* Titre principal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
          {title}{" "}
          {highlightedText && (
            <span className="gradient-text block sm:inline">
              {highlightedText}
            </span>
          )}
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Boutons d'action */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95"
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-500 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
