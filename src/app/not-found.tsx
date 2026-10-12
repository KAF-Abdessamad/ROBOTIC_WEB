import React from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-slate-800 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/40">
          Erreur 404
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-2">
          Page Introuvable
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          La ressource, le projet ou l'événement robotique demandé n'existe pas ou a été déplacé.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
