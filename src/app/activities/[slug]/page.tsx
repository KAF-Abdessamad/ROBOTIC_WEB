import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/db/queries";
import { ArrowLeft, Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Événement introuvable | Robotics Club UPF",
    };
  }

  return {
    title: `${event.title} | Robotics Club UPF`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const startDateObj = new Date(event.startDate);
  const formattedDate = startDateObj.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = startDateObj.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="py-24 sm:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Link
        href="/activities"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux activités
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-cyan-300 border border-cyan-500/30">
            {event.type}
          </span>
          <span className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            {event.statusLabel}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {event.title}
        </h1>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 max-h-[440px]">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Date & Heure</p>
            <p className="text-sm font-semibold text-white mt-0.5 capitalize">{formattedDate}</p>
            <p className="text-xs text-cyan-400 font-mono">à {formattedTime}</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Lieu de l'événement</p>
            <p className="text-sm font-semibold text-white mt-0.5">{event.location}</p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white">Programme & Objectifs</h2>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
          {event.description}
        </p>
      </div>

      {event.registrationUrl && (
        <div className="flex justify-center pt-4">
          <Link
            href={event.registrationUrl}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:opacity-90 transition-opacity text-sm shadow-lg shadow-cyan-500/20"
          >
            S'inscrire à l'événement
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
