"use client";

import React, { useRef, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Users, Cpu, ArrowRight, Zap, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { HeroSection } from "@/components/3d/HeroSection";
import { DEMO_EVENTS, DEMO_MEMBERS, isEventUpcoming } from "@/lib/data/demo-data";
import { submitJoinApplication, ActionResult } from "@/app/actions";

// ── Animated section wrapper ──────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 text-center">
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 mb-4 tracking-widest uppercase font-mono shadow-sm">
        {badge}
      </span>
      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Event card ────────────────────────────────────────────────────────────────
function EventCard({ event }: { event: (typeof DEMO_EVENTS)[number] }) {
  const isUpcoming = isEventUpcoming(event);
  const date = new Date(event.startDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("fr-FR", { month: "short" });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/40 overflow-hidden flex flex-col transition-all group shadow-md"
    >
      <div className="relative h-44 overflow-hidden bg-slate-900">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover opacity-85 group-hover:opacity-95 transition-opacity group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
        {/* Date badge */}
        <div className="absolute top-3 left-3 flex flex-col items-center bg-white/95 dark:bg-slate-950/85 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 shadow-sm">
          <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{day}</span>
          <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">{month}</span>
        </div>
        {/* Status */}
        <span
          className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-sm ${
            isUpcoming
              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
              : "bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-400/40"
          }`}
        >
          {isUpcoming ? event.statusLabel || "À venir" : "Terminé"}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <span className="text-[10px] font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-widest font-mono">
          {event.type}
        </span>
        <h3 className="text-base font-extrabold text-slate-950 dark:text-white leading-snug group-hover:text-cyan-500 transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-2 flex-1 leading-relaxed">{event.description}</p>
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-xs mt-2">
          <Calendar className="w-3.5 h-3.5 text-cyan-500" />
          <span>{event.location}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-colors flex flex-col gap-4 shadow-md"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} border border-current/20`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-extrabold text-slate-950 dark:text-white text-base mb-1">{title}</h3>
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">{desc}</p>
      </div>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const joinRef = useRef<HTMLElement>(null!);
  const [joinOpen, setJoinOpen] = useState(false);
  const [liveEvents, setLiveEvents] = useState(DEMO_EVENTS);
  const [liveMembers, setLiveMembers] = useState(DEMO_MEMBERS);
  const [isPending, startTransition] = useTransition();
  const [formResult, setFormResult] = useState<ActionResult | null>(null);

  React.useEffect(() => {
    fetch("/api/public-content")
      .then((res) => res.json())
      .then((data) => {
        if (data.events?.length > 0) setLiveEvents(data.events);
        if (data.members?.length > 0) setLiveMembers(data.members);
      })
      .catch((err) => console.warn("Live content load:", err));
  }, []);

  const handleJoinClick = () => {
    setJoinOpen(true);
    setTimeout(() => {
      joinRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleQuickJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await submitJoinApplication(null, formData);
      setFormResult(res);
      if (res.success) {
        form.reset();
      }
    });
  };

  const upcomingEvents = liveEvents.filter((e: any) => isEventUpcoming(e)).slice(0, 3);

  return (
    <main className="bg-transparent text-slate-900 dark:text-white overflow-x-hidden">
      {/* ── 1. HERO 3D ── */}
      <HeroSection onJoin={handleJoinClick} />

      {/* ── 2. ABOUT STRIP ── */}
      <section className="relative py-20 border-t border-slate-200/80 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Colonne Texte avec panneau de lisibilité parfait en clair et sombre */}
            <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-500/30 mb-5 uppercase tracking-widest font-mono shadow-sm">
                À Propos du Club
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white leading-tight mb-4">
                Ingénierie, IA &amp;{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#0284c7,#2563eb)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Innovation Robotique
                </span>
              </h2>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base font-normal">
                Le club technologique de l&apos;UPF dédié à la conception de systèmes mécatroniques autonomes, d&apos;intelligence artificielle embarquée et à la formation pratique d&apos;ingénieurs d&apos;excellence.
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                Basé sur le campus de l&apos;Université Privée de Fès, le club réunit des étudiants passionnés de robotique, d&apos;IA embarquée et de systèmes mécatroniques. Chaque semestre, nous organisons des workshops, hackathons et conférences ouverts à tous.
              </p>
              <Link
                href="/members"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
              >
                Découvrir l&apos;équipe <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature cards avec lisibilité maximale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                icon={Cpu}
                title="Robotique Autonome"
                desc="Conception et programmation de robots mobiles, drones et bras manipulateurs."
                color="text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/60"
              />
              <FeatureCard
                icon={Zap}
                title="Intelligence Artificielle"
                desc="Vision par ordinateur, deep learning et IA embarquée sur Nvidia Jetson et Raspberry Pi."
                color="text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60"
              />
              <FeatureCard
                icon={Users}
                title="Formation & Workshops"
                desc="Ateliers pratiques ROS 2, Gazebo, SolidWorks et programmation embarquée."
                color="text-violet-700 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/60"
              />
              <FeatureCard
                icon={Calendar}
                title="Compétitions & Hackathons"
                desc="Participation à des compétitions nationales et organisation d'événements inter-universités."
                color="text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 4. TEAM PREVIEW ── */}
      <section className="py-20 border-t border-slate-200/80 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <SectionHeader
              badge="Notre Équipe"
              title="Le Staff du Robotics Club"
              subtitle="Des étudiants passionnés qui façonnent l'avenir technologique de l'UPF."
            />
          </FadeIn>

          <FadeIn delay={0.15} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {liveMembers.filter((m: any) => m.team === "Leadership").map((m: any) => (
              <motion.div
                key={m.id}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center text-center glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors group shadow-md"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 group-hover:border-cyan-500/60 transition-colors mb-4 relative shadow-sm">
                  <Image
                    src={m.avatarUrl}
                    alt={`${m.firstName} ${m.lastName}`}
                    fill
                    sizes="128px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-cyan-500 transition-colors">
                  {m.firstName} {m.lastName}
                </h3>
                <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">{m.roleTitle}</p>
              </motion.div>
            ))}
          </FadeIn>

          <FadeIn delay={0.25} className="text-center mt-8">
            <Link
              href="/members"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-cyan-500/50 hover:text-cyan-500 transition-all hover:scale-105 shadow-sm"
            >
              Voir toute l&apos;équipe <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── 5. EVENTS ── */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 border-t border-slate-200/80 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeIn>
              <SectionHeader
                badge="Agenda"
                title="Prochains Événements"
                subtitle="Hackathons, workshops et conférences organisés par le Robotics Club UPF."
              />
            </FadeIn>

            <FadeIn delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </FadeIn>

            <FadeIn delay={0.25} className="text-center mt-8">
              <Link
                href="/activities"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-blue-500/50 hover:text-blue-500 transition-all hover:scale-105 shadow-sm"
              >
                Voir tous les événements <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── 6. JOIN CTA ── */}
      <section
        ref={joinRef}
        id="formulaire-rejoindre"
        className="relative py-24 border-t border-slate-200/80 dark:border-slate-800/60 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 mb-6 uppercase tracking-widest font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Candidature Ouverte
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Rejoins le Club
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Ouvert à tous les étudiants de l&apos;UPF — aucune expérience préalable requise. Dépose ta candidature et intègre une communauté passionnée par la robotique et l&apos;IA.
            </p>

            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl">
              {formResult?.success ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Candidature envoyée avec succès !
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    {formResult.message}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setFormResult(null)}
                      className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      Envoyer une autre candidature
                    </button>
                  </div>
                </div>
              ) : joinOpen ? (
                <form onSubmit={handleQuickJoinSubmit} className="space-y-4 text-left">
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-6">
                    Formulaire de candidature — ou contacte-nous directement à{" "}
                    <a
                      href="mailto:robotics.club@upf.ac.ma"
                      className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
                    >
                      robotics.club@upf.ac.ma
                    </a>
                  </p>

                  {formResult && !formResult.success && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formResult.message}</span>
                    </div>
                  )}

                  {/* Honeypot invisible */}
                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="website_url_hp" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="Prénom *"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        required
                        placeholder="Nom *"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email universitaire * (ex: prenom.nom@upf.ac.ma)"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      name="facultyMajor"
                      required
                      defaultValue=""
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
                    >
                      <option value="" disabled>Sélectionner votre filière UPF *</option>
                      <option value="Génie Informatique">Génie Informatique</option>
                      <option value="Génie des Systèmes Embarqués">Génie des Systèmes Embarqués</option>
                      <option value="Génie Civil">Génie Civil</option>
                      <option value="Génie des Énergies Renouvelables">Génie des Énergies Renouvelables</option>
                      <option value="IAAR">IAAR</option>
                      <option value="Design et Architecture d'Intérieur">Design et Architecture d&apos;Intérieur</option>
                      <option value="Urbanisme et Aménagement">Urbanisme et Aménagement</option>
                      <option value="Cycle Préparatoire Scientifique">Cycle Préparatoire Scientifique</option>
                    </select>

                    <select
                      name="studyLevel"
                      required
                      defaultValue="1A"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
                    >
                      <option value="1A">1ère année (Cycle Prépa / Tronc Commun)</option>
                      <option value="2A">2ème année (Cycle Prépa)</option>
                      <option value="3A">3ème année (1ère année Ingénieur)</option>
                      <option value="4A">4ème année (2ème année Ingénieur)</option>
                      <option value="5A">5ème année (Dernière année Ingénieur)</option>
                      <option value="Master">Master Spécialisé</option>
                      <option value="Doctorat">Doctorat</option>
                      <option value="Autre">Autre cycle</option>
                    </select>
                  </div>

                  <textarea
                    name="motivation"
                    rows={3}
                    placeholder="Parlez-nous de votre motivation ou intérêt pour le club..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none shadow-sm"
                  />

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3.5 rounded-xl font-bold text-slate-950 text-sm bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer ma candidature</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setJoinOpen(true)}
                  className="w-full py-4 rounded-xl font-bold text-slate-950 text-base bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Rejoindre le Club
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
