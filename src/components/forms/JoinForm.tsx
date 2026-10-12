"use client";

import React, { useState, useTransition } from "react";
import { submitJoinApplication, ActionResult } from "@/app/actions";
import { UPF_MAJORS } from "@/lib/validations";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function JoinForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionResult | null>(null);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = (formData.get("fullName") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const facultyMajor = (formData.get("facultyMajor") as string || "").trim();
    const motivation = (formData.get("motivation") as string || "").trim();

    const errors: Record<string, string> = {};
    if (fullName.length < 3) errors.fullName = "Le nom et prénom doit comporter au moins 3 caractères.";
    if (!email.includes("@") || !email.includes(".")) errors.email = "Adresse email invalide.";
    if (!facultyMajor) errors.facultyMajor = "Veuillez sélectionner votre filière UPF.";
    if (motivation.length < 5) errors.motivation = "Votre motivation doit comporter au moins 5 caractères.";

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    setClientErrors({});

    startTransition(async () => {
      const result = await submitJoinApplication(null, formData);
      setState(result);
      if (result.success) {
        form.reset();
      }
    });
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors text-sm shadow-sm";

  return (
    <div className="glass-panel p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 dark:border-cyan-500/30 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Halo discret */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {state?.success ? (
        <div className="py-10 sm:py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Candidature enregistrée !</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            {state.message}
          </p>
          <div className="pt-4">
            <a
              href="/"
              className="inline-flex px-6 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md"
            >
              Retour à l&apos;accueil
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10">
          {/* Honeypot invisible */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_url_hp">Ne pas remplir ce champ si vous êtes humain</label>
            <input
              type="text"
              id="website_url_hp"
              name="website_url_hp"
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

          {/* Nom complet */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Nom et Prénom (Full Name) <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Ex : Othmane El Amrani"
              className={inputClass}
            />
            {clientErrors.fullName && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{clientErrors.fullName}</p>
            )}
            {state?.errors?.fullName && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{state.errors.fullName[0]}</p>
            )}
          </div>

          {/* Email & Téléphone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Adresse Email <span className="text-cyan-600 dark:text-cyan-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="prenom.nom@upf.ac.ma"
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
                Téléphone (WhatsApp)
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+212 6 XX XX XX XX"
                className={inputClass}
              />
            </div>
          </div>

          {/* Filière UPF */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Filière à l&apos;UPF <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <select
              name="facultyMajor"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>Sélectionnez votre filière UPF...</option>
              {UPF_MAJORS.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
            {clientErrors.facultyMajor && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{clientErrors.facultyMajor}</p>
            )}
            {state?.errors?.facultyMajor && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{state.errors.facultyMajor[0]}</p>
            )}
          </div>

          {/* Niveau d'études */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Niveau d&apos;études <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <select
              name="studyLevel"
              required
              defaultValue="1A"
              className={inputClass}
            >
              <option value="1A">1ère année (Cycle Préparatoire / Tronc Commun)</option>
              <option value="2A">2ème année (Cycle Préparatoire)</option>
              <option value="3A">3ème année (1ère année Cycle Ingénieur d&apos;État)</option>
              <option value="4A">4ème année (2ème année Cycle Ingénieur d&apos;État)</option>
              <option value="5A">5ème année (Dernière année Cycle Ingénieur)</option>
              <option value="Master">Master Spécialisé</option>
              <option value="Doctorat">Doctorat</option>
              <option value="Autre">Autre cycle</option>
            </select>
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Motivation pour rejoindre le club <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <textarea
              name="motivation"
              required
              rows={4}
              placeholder="Expliquez ce qui vous passionne en robotique, vos compétences ou ce que vous aimeriez apprendre..."
              className={inputClass}
            />
            {clientErrors.motivation && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{clientErrors.motivation}</p>
            )}
            {state?.errors?.motivation && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{state.errors.motivation[0]}</p>
            )}
          </div>

          {/* Expérience facultative */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Expérience ou projets antérieurs (Facultatif)
            </label>
            <input
              type="text"
              name="experience"
              placeholder="Ex : Arduino, Python, impression 3D, C++, projets de lycée..."
              className={inputClass}
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 sm:py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50 text-sm hover:scale-[1.01] active:scale-[0.99]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Transmission sécurisée...</span>
              </>
            ) : (
              <>
                <span>Transmettre ma candidature</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
