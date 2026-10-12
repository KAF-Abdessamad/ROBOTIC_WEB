import React from "react";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionTitle({
  badge,
  title,
  subtitle,
  centered = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 ${centered ? "mx-auto" : ""}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
