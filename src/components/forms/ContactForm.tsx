"use client";

import React, { useState, useTransition } from "react";
import { submitContactMessage, ActionResult } from "@/app/actions";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionResult | null>(null);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = (formData.get("fullName") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const subject = (formData.get("subject") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    const errors: Record<string, string> = {};
    if (fullName.length < 2) errors.fullName = "Le nom doit comporter au moins 2 caractères.";
    if (!email.includes("@") || !email.includes(".")) errors.email = "Adresse email invalide.";
    if (subject.length < 4) errors.subject = "Le sujet doit comporter au moins 4 caractères.";
    if (message.length < 15) errors.message = "Le message doit comporter au moins 15 caractères.";

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    setClientErrors({});

    startTransition(async () => {
      const result = await submitContactMessage(null, formData);
      setState(result);
      if (result.success) {
        form.reset();
      }
    });
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors text-sm shadow-sm";

  return (
    <div className="glass-panel p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
      {state?.success ? (
        <div className="py-10 sm:py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Message transmis !</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            {state.message}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Honeypot invisible contre le spam */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="business_website_hp">Ne rien saisir ici</label>
            <input
              type="text"
              id="business_website_hp"
              name="business_website_hp"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {state && !state.success && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Nom complet <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Votre nom et prénom"
              className={inputClass}
            />
            {clientErrors.fullName && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{clientErrors.fullName}</p>
            )}
            {state?.errors?.fullName && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{state.errors.fullName[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Adresse email <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="votre.email@exemple.com"
              className={inputClass}
            />
            {clientErrors.email && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{clientErrors.email}</p>
            )}
            {state?.errors?.email && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{state.errors.email[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Sujet de votre demande <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <input
              type="text"
              name="subject"
              required
              placeholder="Ex : Partenariat, question technique, visite du FabLab..."
              className={inputClass}
            />
            {clientErrors.subject && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{clientErrors.subject}</p>
            )}
            {state?.errors?.subject && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{state.errors.subject[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Message <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Écrivez votre message à l'attention du bureau..."
              className={inputClass}
            />
            {clientErrors.message && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{clientErrors.message}</p>
            )}
            {state?.errors?.message && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{state.errors.message[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 sm:py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 text-sm hover:scale-[1.01] active:scale-[0.99]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <span>Transmettre le message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
