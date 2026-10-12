"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/members", label: "Staff" },
  { href: "/activities", label: "Nos Événements" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logos UPF & Club de Robotique (Présents uniquement dans la Navbar) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white rounded-xl px-2.5 py-1.5 flex items-center gap-2 shadow-md shadow-cyan-500/10 border border-slate-200 group-hover:scale-105 transition-transform h-10 sm:h-11">
              <Image
                src="/logo upf.png"
                alt="Université Privée de Fès"
                width={50}
                height={32}
                className="h-6 sm:h-7 w-auto object-contain"
                priority
              />
              <div className="w-px h-5 bg-slate-300" />
              <Image
                src="/UPF LOGO CLUBS-robotique-09.png"
                alt="Robotics Club UPF"
                width={100}
                height={32}
                className="h-6 sm:h-7 w-auto object-contain"
                priority
              />
            </div>
            
          </Link>

          {/* Navigation Simple Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Boutons d'Action & Theme Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Toggle Clair / Sombre */}
            <ThemeToggle />

            <Link
              href="/admin/login"
              title="Administration"
              className="p-2 text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <Shield className="w-4 h-4" />
            </Link>
            <a
              href="#formulaire-rejoindre"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95"
            >
              Rejoindre
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Boutons Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Link
              href="/admin/login"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500"
              title="Admin"
            >
              <Shield className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white rounded-lg focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 py-4 space-y-2 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <a
              href="#formulaire-rejoindre"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400"
            >
              Rejoindre le club
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
