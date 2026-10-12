import React from "react";
import { Hero } from "@/components/ui/Hero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JoinForm } from "@/components/forms/JoinForm";
import { Award, Users, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidater au Club | Robotics Club UPF",
  description: "Formulaire officiel de candidature pour rejoindre le Robotics Club de l'Université Privée de Fès.",
};

export default function JoinPage() {
  const perks = [
    {
      icon: <Award className="w-5 h-5 text-cyan-400" />,
      title: "Expérience Concrète",
      desc: "Travaillez sur de véritables bancs d'essais, robots autonomes et drones.",
    },
    {
      icon: <Users className="w-5 h-5 text-blue-400" />,
      title: "Réseau d'Ingénieurs UPF",
      desc: "Collaborez avec des étudiants passionnés de toutes les filières de l'université.",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
      title: "Mentorat & Ateliers Pratiques",
      desc: "Accédez à des formations exclusives en ROS 2, CAO 3D et IA appliquée.",
    },
  ];

  return (
    <div className="space-y-24 pb-12">
      <Hero
        badge="Recrutement Ouvert • Année Universitaire 2025-2026"
        title="Rejoignez la Nouvelle Génération de"
        highlightedText="Makers & Ingénieurs UPF"
        description="Que vous soyez en Cycle Préparatoire ou en fin de cycle ingénieur d'État, votre curiosité et votre esprit d'initiative sont les bienvenus."
        primaryCta={{ label: "Remplir le formulaire", href: "#form" }}
        secondaryCta={{ label: "En savoir plus sur le club", href: "/club" }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {perks.map((p) => (
            <div
              key={p.title}
              className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                {p.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div id="form" className="scroll-mt-28">
          <SectionTitle
            badge="Dossier d'Adhésion"
            title="Formulaire de Candidature"
            subtitle="Remplissez les informations ci-dessous. Le bureau étudiera votre profil sous 48 à 72 heures pour un premier contact."
            centered
          />
          <JoinForm />
        </div>
      </section>
    </div>
  );
}
