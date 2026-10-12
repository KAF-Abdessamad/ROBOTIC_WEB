import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { CLUB_INFO } from "@/lib/data/demo-data";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconTiktok({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

const SOCIALS = [
  { href: CLUB_INFO.socials.instagram, label: "Instagram", icon: IconInstagram, color: "hover:text-pink-500 hover:border-pink-500/40" },
  { href: CLUB_INFO.socials.linkedin, label: "LinkedIn", icon: IconLinkedin, color: "hover:text-blue-500 hover:border-blue-500/40" },
  { href: CLUB_INFO.socials.tiktok, label: "TikTok", icon: IconTiktok, color: "hover:text-slate-900 dark:hover:text-white hover:border-slate-400" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-slate-950/90 backdrop-blur-md text-slate-600 dark:text-slate-400 relative z-10 pt-14 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Col 1: Présentation + réseaux */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Titre du Club */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-wide">
                Robotics Club
              </span>
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950 px-2 py-0.5 rounded border border-cyan-300 dark:border-cyan-800">
                UPF
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
              {CLUB_INFO.description}
            </p>
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 ${s.color} transition-all hover:scale-110 shadow-sm`}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-semibold text-xs tracking-widest uppercase mb-4 font-mono text-cyan-600 dark:text-cyan-400">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Accueil</Link></li>
              <li><Link href="/members" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Staff &amp; Équipe</Link></li>
              <li><Link href="/activities" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Événements</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Rejoindre */}
          <div>
            <h3 className="font-semibold text-xs tracking-widest uppercase mb-4 font-mono text-cyan-600 dark:text-cyan-400">
              Rejoindre
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/join" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Candidater au club</Link></li>
              <li><a href="https://upf.ac.ma" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Portail UPF</a></li>
              <li>
                <Link href="/admin/login" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-xs">
                  Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Coordonnées */}
          <div>
            <h3 className="font-semibold text-xs tracking-widest uppercase mb-4 font-mono text-cyan-600 dark:text-cyan-400">
              Coordonnées
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>{CLUB_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a href={`mailto:${CLUB_INFO.email}`} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors break-all">
                  {CLUB_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a href={`tel:${CLUB_INFO.phone}`} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {CLUB_INFO.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="pt-7 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>© 2026-2027 Robotics Club UPF · Université Privée de Fès</p>
          <p className="font-mono">Think, Build, Automate</p>
        </div>
      </div>
    </footer>
  );
}
