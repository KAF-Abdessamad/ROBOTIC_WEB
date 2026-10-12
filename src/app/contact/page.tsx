import React from "react";
import { Hero } from "@/components/ui/Hero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/forms/ContactForm";
import { getPublicClubInfo } from "@/lib/data/data-service";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Coordonnées | Robotics Club UPF",
  description: "Contactez le Robotics Club de l'Université Privée de Fès pour un partenariat, une démonstration ou une question générale.",
};

export default async function ContactPage() {
  const clubInfo = await getPublicClubInfo();
  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      <Hero
        badge="Échangez avec nous"
        title="Contactez le Bureau du"
        highlightedText="Robotics Club UPF"
        description="Une question technique, une idée de partenariat industriel ou envie d'assister à l'un de nos ateliers ?"
        primaryCta={{ label: "Écrire un message", href: "#form" }}
        secondaryCta={{ label: "Candidater au club", href: "/join" }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Coordonnées & Infos Campus */}
          <div className="space-y-6 sm:space-y-8">
            <SectionTitle
              badge="Informations Pratiques"
              title="Où Nous Trouver ?"
              subtitle="Notre FabLab et atelier mécanique sont situés sur le campus principal de l'Université Privée de Fès."
            />

            <div className="space-y-3 sm:space-y-4">
              {/* Localisation */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-slate-900 border border-cyan-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Localisation Campus</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{clubInfo.address}</p>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono mt-1">{clubInfo.campus}</p>
                </div>
              </div>

              {/* Email */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-slate-900 border border-cyan-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Email Officiel</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Pour toute demande officielle, sponsoring ou partenariat :</p>
                  <a
                    href={`mailto:${clubInfo.email}`}
                    className="text-xs text-cyan-600 dark:text-cyan-400 font-mono mt-1 inline-block hover:underline break-all"
                  >
                    {clubInfo.email}
                  </a>
                </div>
              </div>

              {/* Téléphone */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-slate-900 border border-cyan-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Téléphone & Accueil</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Standard de l&apos;Université Privée de Fès :</p>
                  <a
                    href={`tel:${clubInfo.phone}`}
                    className="text-xs text-cyan-600 dark:text-cyan-400 font-mono mt-1 inline-block hover:underline"
                  >
                    {clubInfo.phone}
                  </a>
                </div>
              </div>

              {/* Horaires */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-slate-900 border border-cyan-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Permanences du Laboratoire</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Mercredi & Vendredi : 14h00 – 18h30</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Samedi : 10h00 – 17h00 (Sessions Prototypage)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de Contact */}
          <div id="form" className="scroll-mt-28">
            <SectionTitle
              badge="Formulaire Direct"
              title="Envoyez-nous un Message"
              subtitle="Remplissez le formulaire ci-dessous pour joindre le secrétariat du club."
            />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
