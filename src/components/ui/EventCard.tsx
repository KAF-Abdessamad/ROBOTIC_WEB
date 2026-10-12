import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { EventItem } from "@/lib/data/demo-data";

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const dateObj = new Date(event.startDate);
  const formattedDate = dateObj.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isUpcoming = event.status === "upcoming";

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-slate-800/80">
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-slate-900/90 text-cyan-300 border border-cyan-500/30">
            <Tag className="w-3 h-3 text-cyan-400" />
            {event.type}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-semibold backdrop-blur-md border ${
              isUpcoming
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                : "bg-slate-900/80 text-slate-400 border-slate-700/50"
            }`}
          >
            {event.statusLabel}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-1.5 text-xs text-slate-400 mb-3">
            <div className="flex items-center gap-2 text-cyan-300 font-medium">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{formattedDate} à {formattedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
            {event.title}
          </h3>

          <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <Link
            href={`/activities/${event.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
          >
            Voir les détails & programme
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
