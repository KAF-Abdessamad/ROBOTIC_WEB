"use client";

import React, { useTransition, useState } from "react";
import Link from "next/link";
import { loginAdmin, ActionResult } from "@/app/actions";
import { Shield, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionResult | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await loginAdmin(null, formData);
      if (result) {
        setState(result);
      }
    });
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors text-sm shadow-sm";

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 pt-24 sm:pt-28 pb-12 sm:pb-16 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="glass-panel w-full max-w-md p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 relative z-10 shadow-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au site public
        </Link>

        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 mx-auto mb-4 shadow-lg shadow-cyan-500/20">
            <Shield className="w-7 h-7 text-slate-950" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Espace Administrateur
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
            Robotics Club UPF • Accès Sécurisé
          </p>
        </div>

        {state && !state.success && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Adresse email administrateur
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue="admin.robotics@upf.ac.ma"
              placeholder="admin@upf.ac.ma"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••••••"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-xl font-bold text-center block text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {isPending ? (
              <span className="inline-flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                Vérification des accès...
              </span>
            ) : (
              "Se connecter à l'administration"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
