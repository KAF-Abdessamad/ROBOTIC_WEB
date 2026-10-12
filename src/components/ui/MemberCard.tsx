import React from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { SocialIconLinkedin, SocialIconGithub } from "./SocialIcons";
import { MemberItem } from "@/lib/data/demo-data";

interface MemberCardProps {
  member: MemberItem;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center text-center border border-slate-200 dark:border-slate-800/80 group shadow-md">
      {/* Avatar Container */}
      <div className="relative mb-5">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-700/80 group-hover:border-cyan-500/80 transition-colors bg-slate-100 dark:bg-slate-900 shadow-lg relative">
          <Image
            src={member.avatarUrl}
            alt={`${member.firstName} ${member.lastName}`}
            fill
            sizes="(max-width: 640px) 128px, 160px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-cyan-500 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>

      {/* Nom & Titre */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
        {member.firstName} {member.lastName}
      </h3>
      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono mt-1">
        {member.roleTitle}
      </p>

      {/* Équipe / Bureau Badge */}
      <span className="mt-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
        {member.team}
      </span>

      {/* Biographie */}
      <p className="mt-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
        {member.bio}
      </p>

      {/* Réseaux sociaux */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 w-full flex items-center justify-center gap-3">
        {member.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors border border-slate-200 dark:border-slate-800"
            aria-label={`LinkedIn de ${member.firstName}`}
          >
            <SocialIconLinkedin className="w-4 h-4" />
          </a>
        )}
        {member.githubUrl && (
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors border border-slate-200 dark:border-slate-800"
            aria-label={`GitHub de ${member.firstName}`}
          >
            <SocialIconGithub className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
