import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Tag, ArrowRight, Sparkles, History } from "lucide-react";
import { getPublicEvents, isEventUpcoming } from "@/lib/data/data-service";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Événements | Robotics Club UPF",
  description:
    "Agenda des hackathons, ateliers ROS 2, sessions de prototypage et conférences du Robotics Club UPF.",
};

function EventCard({ event }: { event: any }) {
  const isUpcoming = isEventUpcoming(event);
  const dateObj = new Date(event.startDate);
  const day = dateObj.getDate();
  const MONTHS_FR = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const month = MONTHS_FR[dateObj.getMonth()] || dateObj.toLocaleDateString("fr-FR", { month: "short" });
  const year = dateObj.getFullYear();
  const time = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 shadow-md">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900 shrink-0">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Date badge */}
        <div suppressHydrationWarning className="absolute top-3 left-3 flex flex-col items-center bg-white/95 dark:bg-slate-950/85 backdrop-blur-sm border border-slate-200 dark:border-slate-700/60 rounded-xl px-3 py-2 shadow-sm">
          <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">{day}</span>
          <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">{month}</span>
          <span className="text-[10px] text-slate-500">{year}</span>
        </div>

        {/* Status badge - Dynamique selon la date d'aujourd'hui */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border backdrop-blur-sm ${
              isUpcoming
                ? "bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                : "bg-slate-500/25 text-slate-700 dark:text-slate-300 border-slate-400/40"
            }`}
          >
            {isUpcoming ? event.statusLabel || "À venir" : "Terminé"}
          </span>
        </div>

        {/* Type badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-950/85 text-cyan-300 border border-cyan-800/40 backdrop-blur-sm">
            <Tag className="w-3 h-3 text-cyan-400" />
            {event.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-extrabold text-slate-950 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-2 leading-snug mb-3">
          {event.title}
        </h3>
        <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed line-clamp-3 flex-1 font-normal">
          {event.description}
        </p>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <Calendar className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <span>{`${day} ${month} ${year} à ${time}`}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Link
            href={`/activities/${event.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors group/link"
          >
            Voir les détails
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          {event.registrationUrl && isUpcoming && (
            <Link
              href={event.registrationUrl}
              className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 transition-opacity shadow-sm"
            >
              S&apos;inscrire
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function ActivitiesPage() {
  const allEvents = await getPublicEvents();
  // Comparaison dynamique avec la date d'aujourd'hui
  const upcomingEvents = allEvents.filter((e) => isEventUpcoming(e));
  const pastEvents = allEvents.filter((e) => !isEventUpcoming(e));

  return (
    <div className="min-h-screen bg-transparent pb-20">
      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 mb-4 tracking-widest uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            Agenda &amp; Formations
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Nos <span className="gradient-text-cyan">Événements</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Hackathons, workshops pratiques et conférences techniques organisés par le Robotics Club UPF sur le campus de l&apos;Université Privée de Fès.
          </p>
        </div>
      </section>

      {/* ── ÉVÉNEMENTS À VENIR ── */}
      {upcomingEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 mb-3 uppercase tracking-widest font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              À ne pas manquer ({upcomingEvents.length})
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Événements à Venir</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* ── ÉVÉNEMENTS PASSÉS ── */}
      {pastEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-slate-700 mb-3 uppercase tracking-widest font-mono">
              <History className="w-3.5 h-3.5" />
              Archives &amp; Réalisations ({pastEvents.length})
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 dark:from-slate-500 dark:to-slate-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Événements Passés</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <div className="max-w-2xl mx-auto px-5 sm:px-8 mt-20 text-center">
        <div className="glass-panel border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Proposer un événement</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-5">Une idée de workshop ou de conférence ? Contactez le bureau du Robotics Club UPF.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 transition-opacity shadow-md shadow-cyan-500/20"
          >
            Nous contacter <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
