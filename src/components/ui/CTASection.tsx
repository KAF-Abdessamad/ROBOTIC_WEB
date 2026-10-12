import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export function CTASection({
  title = "Prêt à repousser les limites de la robotique ?",
  description = "Rejoignez une équipe d'étudiants passionnés, développez des compétences concrètes en ingénierie mécatronique et participez aux plus grandes compétitions.",
  buttonLabel = "Postuler maintenant",
  buttonHref = "/join",
}: CTASectionProps) {
  return (
    <section className="relative my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-cyan-500/30 p-8 sm:p-12 md:p-16 text-center">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recrutement Ouvert</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 text-base"
            >
              {buttonLabel}
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-500 transition-all"
            >
              Poser une question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
