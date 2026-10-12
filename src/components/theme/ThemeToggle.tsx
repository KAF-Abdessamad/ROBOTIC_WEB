"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-slate-700/40 bg-slate-900/40 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      className={`relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 ${
        isDark
          ? "bg-slate-900/90 text-amber-300 hover:text-amber-200 hover:bg-slate-800 border border-slate-800 shadow-md shadow-amber-500/10"
          : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 shadow-md shadow-slate-400/20"
      } ${className}`}
    >
      <span className="sr-only">Changer le thème</span>
      {isDark ? (
        <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 rotate-0 scale-100 text-blue-600" />
      )}
    </button>
  );
}
