import React from "react";
import { Loader2, AlertCircle, FolderX } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Chargement des modules robotiques..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-4">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
        <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
      </div>
      <p className="text-slate-300 font-medium text-sm">{message}</p>
      <span className="text-xs text-slate-500 font-mono mt-1">Initialisation des flux télémétriques</span>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export function EmptyState({
  title = "Aucun élément trouvé",
  description = "Aucune information n'est disponible pour le moment dans cette section.",
  actionText,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="glass-panel rounded-2xl p-12 text-center max-w-lg mx-auto border border-slate-800">
      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
        <FolderX className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">{description}</p>
      {actionText && actionHref && (
        <a
          href={actionHref}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:opacity-90 transition-opacity"
        >
          {actionText}
        </a>
      )}
    </div>
  );
}

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export function ErrorState({
  title = "Erreur de chargement",
  message,
}: ErrorMessageProps) {
  return (
    <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/40 text-red-300 flex items-start gap-3 my-4">
      <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
      <div>
        <h4 className="font-semibold text-sm text-red-200">{title}</h4>
        <p className="text-xs text-red-300/90 mt-1 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
