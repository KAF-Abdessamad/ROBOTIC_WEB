"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Shield, Cpu, Activity } from "lucide-react";

/* ── Icônes sociales inline ── */
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

/* ── Particules CSS ── */
function ParticlesBg() {
  const particles = Array.from({ length: 25 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-cyan-400/20 animate-pulse"
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            animationDuration: `${2 + (i % 4)}s`,
            animationDelay: `${(i * 0.3) % 3}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── ROBOT VISUEL HERO PERMANENT (Ne disparaît jamais sur refresh) ── */
function PermanentRobotCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] aspect-square mx-auto flex items-center justify-center cursor-pointer group"
      style={{ perspective: 1000 }}
    >
      {/* Halo lumineux d'ambiance */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/25 blur-3xl scale-90 pointer-events-none animate-pulse-subtle" />
      <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-2xl pointer-events-none" />

      {/* Anneaux futuristes rotatifs */}
      <div className="absolute inset-0 border border-cyan-500/30 rounded-full scale-105 pointer-events-none animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-0 border border-blue-500/20 rounded-full scale-110 pointer-events-none border-dashed animate-[spin_35s_linear_infinite_reverse]" />

      {/* Cadre du robot avec inclinaison 3D fluide */}
      <motion.div
        animate={{ rotateY: tilt.x, rotateX: tilt.y }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="relative w-full h-full rounded-3xl overflow-hidden p-2.5 glass-panel border border-cyan-500/40 shadow-2xl shadow-cyan-500/20"
      >
        {/* Photo du Robot HD - Permanente */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
          <Image
            src="/robot_hero.jpg"
            alt="Robot Humanoïde UPF"
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />

          {/* Dégradé cyber subtil en bas de carte */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/20 pointer-events-none" />

          {/* HUD Badges Technologiques */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/40 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono font-bold text-cyan-300 tracking-wider">UNIT // MK-IV ACTIVE</span>
          </div>

          <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md p-2 rounded-xl border border-cyan-500/30 text-cyan-400 shadow-lg">
            <Cpu className="w-4 h-4" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide">ROS 2 &amp; Jetson Orin</span>
                <span className="text-[10px] text-cyan-400 font-mono">IA Embarquée · UPF Robotics</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-950/90 text-emerald-400 border border-emerald-500/40">
              ONLINE
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── HERO PRINCIPAL ── */
interface HeroSectionProps {
  onJoin: () => void;
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/upf_robotics?vrfl=MTQxcHE3cDd6c2R1bg==",
    icon: IconInstagram,
    color: "hover:text-pink-500",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/upf-robotics?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: IconLinkedin,
    color: "hover:text-blue-500",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@upf_robotics?_r=1&_t=ZS-9ATaF8sue0K",
    icon: IconTiktok,
    color: "hover:text-slate-900 dark:hover:text-white",
  },
];

export function HeroSection({ onJoin }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-transparent">
      {/* Particules CSS discrètes */}
      {mounted && <ParticlesBg />}

      {/* ── Contenu ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh] sm:min-h-[75vh]">

          {/* ── GAUCHE : Texte principal ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center order-2 lg:order-1"
          >
            {/* Badge Tech */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 mb-5 tracking-widest uppercase font-mono shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                Université Privée de Fès — UPF
              </span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[0.92] text-slate-900 dark:text-white"
            >
              BUILD{" "}
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #0284c7 0%, #2563eb 55%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                THE FUTURE
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 dark:text-slate-200 mt-2 sm:mt-3 block">
                Robotics Club{" "}
                <span className="text-cyan-600 dark:text-cyan-400">UPF</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={item}
              className="mt-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg"
            >
              Innovation en robotique, intelligence artificielle embarquée et systèmes autonomes.
              Le club technologique d&apos;excellence de l&apos;Université Privée de Fès.
            </motion.p>

            {/* Boutons d'Action */}
            <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={onJoin}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-slate-950 text-sm
                  bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400
                  shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50
                  transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Rejoindre le Club
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <a
                href="/members"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-slate-800 dark:text-slate-200 text-sm
                  bg-white/90 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/60 hover:border-cyan-500/50 hover:bg-slate-100 dark:hover:bg-slate-800
                  transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              >
                Découvrir le Staff
              </a>
            </motion.div>

            {/* Réseaux sociaux */}
            <motion.div variants={item} className="mt-7 flex items-center gap-3">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">Suivez-nous</span>
              <div className="flex-1 h-px bg-slate-300 dark:bg-slate-800" />
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-xl bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-600 dark:text-slate-400 ${s.color} hover:border-slate-400 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 shadow-sm`}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={item}
              className="mt-10 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-mono"
            >
              <ChevronDown className="w-4 h-4 animate-bounce" />
              <span>Scroll to explore</span>
            </motion.div>
          </motion.div>

          {/* ── DROITE : Photo du Robot HD Permanente (Ne disparaît jamais) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <PermanentRobotCard />
          </motion.div>

        </div>
      </div>

      {/* Ligne de séparation dégradée en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </section>
  );
}
