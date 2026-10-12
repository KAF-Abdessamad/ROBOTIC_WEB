import React from "react";
import { MemberCard } from "@/components/ui/MemberCard";
import { getPublicMembers } from "@/lib/data/data-service";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Staff & Équipe | Robotics Club UPF",
  description:
    "Découvrez les membres du Robotics Club de l'Université Privée de Fès — leadership, communication et expertise technique.",
};

const SECTIONS = [
  {
    key: "Leadership",
    badge: "Direction",
    title: "Leadership",
    subtitle:
      "Gouvernance générale, stratégie et relations institutionnelles avec l'UPF.",
    color: "cyan",
  },
  {
    key: "Communication & Médias",
    badge: "Comm & Médias",
    title: "Communication & Médias",
    subtitle:
      "Gestion des réseaux sociaux, production de contenu et communication externe.",
    color: "blue",
  },
  {
    key: "Ressources & Gestion",
    badge: "Gestion",
    title: "Ressources & Gestion",
    subtitle: "Logistique, suivi budgétaire et administration des ressources.",
    color: "violet",
  },
  {
    key: "Expertise & Conseil",
    badge: "Expertise",
    title: "Expertise & Conseil",
    subtitle:
      "Référents techniques et conseillers stratégiques sur les projets R&D.",
    color: "emerald",
  },
];

const COLOR_MAP: Record<string, { badge: string; bar: string; text: string }> =
  {
    cyan: {
      badge: "bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-800/60",
      bar: "from-cyan-500 to-blue-500",
      text: "text-cyan-600 dark:text-cyan-400",
    },
    blue: {
      badge: "bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800/60",
      bar: "from-blue-500 to-indigo-500",
      text: "text-blue-600 dark:text-blue-400",
    },
    violet: {
      badge: "bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-400 border-violet-300 dark:border-violet-800/60",
      bar: "from-violet-500 to-purple-500",
      text: "text-violet-600 dark:text-violet-400",
    },
    emerald: {
      badge: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800/60",
      bar: "from-emerald-500 to-teal-500",
      text: "text-emerald-600 dark:text-emerald-400",
    },
  };

export default async function MembersPage() {
  const allMembers = await getPublicMembers();
  return (
    <div className="pb-20 min-h-screen bg-transparent">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-slate-900 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>Communauté &amp; Gouvernance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Notre <span className="gradient-text-cyan">Équipe</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Une équipe multidisciplinaire d&apos;étudiants UPF passionnés, investis
            pour faire avancer l&apos;innovation robotique et technologique.
          </p>
        </div>
      </section>

      {/* ── SECTIONS PAR PÔLE ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 mt-4">
        {SECTIONS.map((section) => {
          const membersList = allMembers.filter((m) => m.team === section.key);
          if (membersList.length === 0) return null;
          const colors = COLOR_MAP[section.color];

          return (
            <section key={section.key}>
              {/* Section Header */}
              <div className="mb-8">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${colors.badge} mb-3`}
                >
                  {section.badge}
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`h-1 w-10 rounded-full bg-gradient-to-r ${colors.bar}`}
                  />
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                  {section.subtitle}
                </p>
              </div>

              {/* Grid des membres */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {membersList.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Membres d'autres pôles ou nouvelles sections */}
        {(() => {
          const standardKeys = new Set(SECTIONS.map((s) => s.key));
          const others = allMembers.filter((m) => !standardKeys.has(m.team));
          if (others.length === 0) return null;

          return (
            <section>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-800/60 mb-3">
                  Autres Pôles & Responsables
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Membres Actifs & Spécialistes
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {others.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          );
        })()}
      </div>
    </div>
  );
}
