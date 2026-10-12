"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeProvider";

export function GlobalBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || theme === "dark";

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden select-none transition-colors duration-500">
      {/* ── IMAGE DE FOND DU SITE : robotique.webp ── */}
      <div className="absolute inset-0">
        <Image
          src="/robotique.webp"
          alt="Robotics Club UPF Robot Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-all duration-700 ease-out"
          style={{
            opacity: isDark ? 0.65 : 0.45,
            filter: isDark
              ? "brightness(0.92) contrast(1.15) saturate(1.1)"
              : "brightness(1.05) contrast(1.08) saturate(1.1)",
          }}
        />
      </div>

      {/* ── OVERLAY DE FOND ADAPTATIF POUR CONTRASTE PARFAIT DU TEXTE ── */}
      {/* Mode Sombre : Fond Cyber sombre / Mode Clair : Fond Lumineux équilibré */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-b from-slate-950/80 via-slate-950/65 to-slate-950/88"
            : "bg-gradient-to-b from-white/78 via-slate-50/72 to-white/82"
        }`}
      />

      {/* Vignette radiale subtile */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(2,6,23,0.7)_100%)]"
            : "bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(241,245,249,0.6)_100%)]"
        }`}
      />

      {/* ── GRILLE TECHNOLOGIQUE ── */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDark ? "opacity-[0.04]" : "opacity-[0.035]"
        }`}
        style={{
          backgroundImage: `linear-gradient(${isDark ? "#06b6d4" : "#0284c7"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#06b6d4" : "#0284c7"} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── LUMIÈRES GLOW CYBERNETIQUES ── */}
      <div
        className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          isDark ? "bg-cyan-500/10" : "bg-cyan-500/08"
        }`}
      />
      <div
        className={`absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none transition-all duration-700 ${
          isDark ? "bg-blue-600/08" : "bg-blue-500/05"
        }`}
      />
    </div>
  );
}
