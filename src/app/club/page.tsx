import React from "react";
import { Hero } from "@/components/ui/Hero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTASection } from "@/components/ui/CTASection";
import { Target, Compass, Sparkles, Cpu, Wrench, BookOpen, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Club | Robotics Club UPF - Mission, Vision & Valeurs",
  description: "Découvrez la vision, la mission pédagogique et l'engagement d'innovation technologique du Robotics Club de l'Université Privée de Fès.",
};

export default function ClubPage() {
  const values = [
    {
      title: "Apprentissage Pratique par Projet",
      desc: "Sortir du cadre purement théorique pour concevoir de vrais prototypes fonctionnels testés sur le terrain.",
    },
    {
      title: "Esprit d'Équipe & Pluridisciplinarité",
      desc: "Faire collaborer des étudiants en génie informatique, mécatronique, systèmes embarqués et énergies renouvelables.",
    },
    {
      title: "Excellence & Ambition Compétitive",
      desc: "Représenter dignement l'Université Privée de Fès lors de hackathons et compétitions nationales et internationales.",
    },
    {
      title: "Partage Open-Source & Restitution",
      desc: "Organiser des ateliers, des démonstrations et partager nos connaissances avec la communauté étudiante.",
    },
  ];

  const pillars = [
    {
      icon: <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      title: "R&D Robotique & Systèmes Autonomes",
      desc: "Étude et fabrication de robots mobiles tout-terrain, drones d'inspection et bras manipulateurs industriels.",
    },
    {
      icon: <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Accès Privilégié au FabLab UPF",
      desc: "Mise à disposition d'imprimantes 3D haute précision, bancs d'essais électroniques et composants microcontrôleurs.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Formations Spécialisées & Bootcamps",
      desc: "Sessions intensives sur ROS 2 (Robot Operating System), programmation C++/Python embarqué, et vision par ordinateur.",
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Communauté & Réseau Professionnel",
      desc: "Rencontres régulières avec des diplômés ingénieurs et des partenaires industriels de la région Fès-Meknès.",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24 pb-12">
      {/* Hero */}
      <Hero
        badge="Notre Identité"
        title="L'ingénierie robotique au service de l'innovation à"
        highlightedText="l'UPF"
        description="Le Robotics Club UPF est le pôle d'expérimentation technologique où les étudiants ingénieurs transforment leurs idées en systèmes autonomes et intelligents."
        primaryCta={{ label: "Rejoindre le club", href: "/join" }}
        secondaryCta={{ label: "Consulter nos activités", href: "/activities" }}
      />

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 relative overflow-hidden shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">Notre Mission</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Donner aux étudiants ingénieurs de l&apos;UPF les moyens matériels, méthodologiques et techniques pour concevoir des technologies robotiques de pointe. Nous stimulons l&apos;audace technique à travers la conception de mécatronique avancée, de systèmes embarqués et d&apos;algorithmes d&apos;IA appliquée.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/20 relative overflow-hidden shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">Notre Vision</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Devenir une référence académique et compétitive au Maroc et en Afrique dans le domaine de la robotique autonome et de l&apos;automatisation intelligente, tout en formant des leaders techniques prêts pour les défis industriels modernes.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Activités Clés */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Domaines d'Action"
          title="Ce que Nous Faisons au Quotidien"
          subtitle="Une structure d'ingénierie collaborative centrée sur les projets réels."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex items-start gap-4 sm:gap-5 shadow-sm"
            >
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Valeurs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Nos Piliers"
          title="Les Valeurs qui Nous Animent"
          subtitle="Chaque projet et chaque membre contribue à une culture d'ingénierie rigoureuse et collaborative."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                0{i + 1}.
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
