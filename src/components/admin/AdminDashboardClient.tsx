"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  Cpu,
  Settings,
  Mail,
  Shield,
  LogOut,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  Edit2,
  Save,
  GraduationCap,
} from "lucide-react";
import {
  logoutAdmin,
  updateSiteSettingAction,
  updateApplicationStatusAction,
  saveEventAction,
  deleteEventAction,
  saveMemberAction,
  deleteMemberAction,
  saveProjectAction,
  deleteProjectAction,
} from "@/app/actions";

interface AdminDashboardClientProps {
  session: {
    userId?: string;
    id?: string;
    name: string;
    email: string;
    role: string;
  };
  initialData: {
    applications: any[];
    events: any[];
    projects: any[];
    members: any[];
    settings: any[];
    messages: any[];
  };
}

export function AdminDashboardClient({
  session,
  initialData,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "applications" | "events" | "members" | "projects" | "settings" | "messages"
  >("applications");

  const [notification, setNotification] = useState<string | null>(null);

  // Modals state
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  function notify(msg: string) {
    setNotification(msg);
    router.refresh();
    setTimeout(() => setNotification(null), 4000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* ── TOP BAR COMPACTE & PROPRE ── */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Connecté : {session.name} ({session.role})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Panneau d'Administration Intégral
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Gérez dynamiquement tout le contenu du club : candidatures, événements, staff, projets et coordonnées.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Site public
          </Link>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800/60 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </form>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-200 text-sm font-medium flex items-center gap-2 shadow-md">
          <CheckCircle className="w-5 h-5 text-cyan-500" />
          {notification}
        </div>
      )}

      {/* ── ONGLETS DE GESTION DYNAMIQUE ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("applications")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "applications"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
              : "bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Candidatures ({initialData.applications.length})
        </button>

        <button
          onClick={() => setActiveTab("events")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "events"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
              : "bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Événements ({initialData.events.length})
        </button>

        <button
          onClick={() => setActiveTab("members")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "members"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
              : "bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Users className="w-4 h-4" />
          Staff & Membres ({initialData.members.length})
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "projects"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
              : "bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Cpu className="w-4 h-4" />
          Projets ({initialData.projects.length})
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "settings"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
              : "bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Settings className="w-4 h-4" />
          Infos Dynamiques Club
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "messages"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
              : "bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Mail className="w-4 h-4" />
          Messages Contact ({initialData.messages.length})
        </button>
      </div>

      {/* ── 1. ONGLET CANDIDATURES ── */}
      {activeTab === "applications" && (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Dossiers de Candidature Reçus
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Table `join_applications` de la base Neon PostgreSQL
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
              {initialData.applications.length} enregistrements
            </span>
          </div>

          {initialData.applications.length > 0 ? (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {initialData.applications.map((app) => (
                <div key={app.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">{app.fullName}</h3>
                      <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                        {app.email} {app.phone ? `• ${app.phone}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {app.facultyMajor}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        Niveau {app.studyLevel}
                      </span>

                      {/* Statut modifiable */}
                      <form
                        action={async (fd) => {
                          const res = await updateApplicationStatusAction(fd);
                          if (res.success) notify(res.message);
                        }}
                      >
                        <input type="hidden" name="id" value={app.id} />
                        <select
                          name="status"
                          defaultValue={app.status}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className="text-xs font-bold px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                          <option value="pending">En attente</option>
                          <option value="under_review">En examen</option>
                          <option value="accepted">Acceptée</option>
                          <option value="rejected">Refusée</option>
                        </select>
                      </form>
                    </div>
                  </div>

                  <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">Motivation de l'étudiant :</span>
                    {app.motivation}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>ID: {app.id.slice(0, 8)}...</span>
                    <span>Date : {new Date(app.createdAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
              <Users className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
              Aucune candidature enregistrée pour le moment.
            </div>
          )}
        </div>
      )}

      {/* ── 2. ONGLET ÉVÉNEMENTS ── */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Gestion des Événements & Ateliers
            </h2>
            <button
              onClick={() => setEditingEvent({ id: "", title: "", slug: "", description: "", location: "UPF Campus Fès", startDate: new Date().toISOString().split("T")[0], status: "upcoming", imageUrl: "/robotique.webp" })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              Ajouter un événement
            </button>
          </div>

          {/* Formulaire ajout/édition événement */}
          {editingEvent && (
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 rounded-3xl border border-cyan-500/40 shadow-lg">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                {editingEvent.id ? "Modifier l'événement" : "Créer un nouvel événement"}
              </h3>
              <form
                action={async (fd) => {
                  const res = await saveEventAction(fd);
                  notify(res.message);
                  if (res.success) setEditingEvent(null);
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input type="hidden" name="id" value={editingEvent.id || ""} />
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Titre</label>
                  <input
                    name="title"
                    defaultValue={editingEvent.title}
                    required
                    className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lieu</label>
                  <input
                    name="location"
                    defaultValue={editingEvent.location}
                    required
                    className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Date</label>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={editingEvent.startDate ? new Date(editingEvent.startDate).toISOString().split("T")[0] : ""}
                    required
                    className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Statut</label>
                  <select
                    name="status"
                    defaultValue={editingEvent.status || "upcoming"}
                    className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="upcoming">À venir (Upcoming)</option>
                    <option value="ongoing">En cours (Ongoing)</option>
                    <option value="completed">Terminé (Completed)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingEvent.description}
                    rows={3}
                    required
                    className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 font-bold"
                  >
                    Enregistrer l'événement
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grille des événements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialData.events.map((ev) => (
              <div key={ev.id} className="bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                      {ev.status}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(ev.startDate).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{ev.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{ev.description}</p>
                  <p className="text-xs text-slate-500 font-medium mt-2">📍 {ev.location}</p>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setEditingEvent(ev)}
                    className="p-1.5 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <form action={async (fd) => {
                    if (confirm("Supprimer cet événement ?")) {
                      const res = await deleteEventAction(fd);
                      notify(res.message);
                    }
                  }}>
                    <input type="hidden" name="id" value={ev.id} />
                    <button type="submit" className="p-1.5 text-xs rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. ONGLET STAFF & MEMBRES ── */}
      {activeTab === "members" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Membres du Bureau & Responsables
            </h2>
            <button
              onClick={() => setEditingMember({ id: "", firstName: "", lastName: "", roleTitle: "Membre Actif", team: "Bureau Exécutif", bio: "", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              Ajouter un membre
            </button>
          </div>

          {editingMember && (
            <div className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-3xl border border-cyan-500/40 shadow-lg">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                {editingMember.id ? "Modifier le membre" : "Ajouter un nouveau membre"}
              </h3>
              <form
                action={async (fd) => {
                  const res = await saveMemberAction(fd);
                  notify(res.message);
                  if (res.success) setEditingMember(null);
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input type="hidden" name="id" value={editingMember.id || ""} />
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Prénom</label>
                  <input name="firstName" defaultValue={editingMember.firstName} required className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nom</label>
                  <input name="lastName" defaultValue={editingMember.lastName} required className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Rôle (Ex: Président, Tech Lead)</label>
                  <input name="roleTitle" defaultValue={editingMember.roleTitle} required className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pôle / Section</label>
                  <input name="team" defaultValue={editingMember.team} required className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Bio courte</label>
                  <textarea name="bio" defaultValue={editingMember.bio} rows={2} required className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingMember(null)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Annuler</button>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 font-bold">Enregistrer</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialData.members.map((m) => (
              <div key={m.id} className="bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-between">
                <div>
                  <img src={m.avatarUrl} alt={m.firstName} className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-cyan-500/40 mb-3" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{m.firstName} {m.lastName}</h3>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">{m.roleTitle}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{m.team}</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button onClick={() => setEditingMember(m)} className="p-1.5 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"><Edit2 className="w-4 h-4" /></button>
                  <form action={async (fd) => {
                    if (confirm("Retirer ce membre ?")) {
                      const res = await deleteMemberAction(fd);
                      notify(res.message);
                    }
                  }}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="p-1.5 text-xs rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. ONGLET PROJETS ── */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Projets Robotiques</h2>
            <button
              onClick={() => setEditingProject({ id: "", title: "", slug: "", summary: "", description: "", technologies: "ROS 2, Arduino", projectDate: "2025", status: "in_progress", imageUrl: "/robotique.webp" })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              Nouveau projet
            </button>
          </div>

          {editingProject && (
            <div className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-3xl border border-cyan-500/40 shadow-lg">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">{editingProject.id ? "Modifier le projet" : "Ajouter un projet"}</h3>
              <form
                action={async (fd) => {
                  const res = await saveProjectAction(fd);
                  notify(res.message);
                  if (res.success) setEditingProject(null);
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input type="hidden" name="id" value={editingProject.id || ""} />
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Titre</label>
                  <input name="title" defaultValue={editingProject.title} required className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Année / Période</label>
                  <input name="projectDate" defaultValue={editingProject.projectDate} required className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Technologies (séparées par des virgules)</label>
                  <input name="technologies" defaultValue={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(", ") : editingProject.technologies} required className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Résumé</label>
                  <textarea name="summary" defaultValue={editingProject.summary} rows={2} required className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Annuler</button>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 font-bold">Enregistrer</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialData.projects.map((p) => (
              <div key={p.id} className="bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">{p.status}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-2 mb-1">{p.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{p.summary}</p>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button onClick={() => setEditingProject(p)} className="p-1.5 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"><Edit2 className="w-4 h-4" /></button>
                  <form action={async (fd) => {
                    if (confirm("Supprimer ce projet ?")) {
                      const res = await deleteProjectAction(fd);
                      notify(res.message);
                    }
                  }}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="p-1.5 text-xs rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. ONGLET INFOS DYNAMIQUES DU CLUB (PARAMÈTRES SITE) ── */}
      {activeTab === "settings" && (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Configuration Dynamique du Club
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Modifiez les informations textuelles officielles affichées sur tout le site (nom, email, campus, téléphone, description).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: "club_name", label: "Nom officiel du Club", default: "Robotics Club UPF" },
              { key: "contact_email", label: "Email de Contact officiel", default: "robotics.club@upf.ac.ma" },
              { key: "campus_location", label: "Campus & Localisation", default: "Université Privée de Fès - Route de Sefrou, Fès" },
              { key: "phone_number", label: "Numéro de contact", default: "+212 5 35 60 00 00" },
              { key: "hero_badge", label: "Badge d'accroche Accueil", default: "Club Officiel d'Ingénierie & d'Innovation - UPF" },
              { key: "join_status", label: "Statut des Inscriptions", default: "Inscriptions 2024-2025 Ouvertes" },
            ].map((item) => {
              const currentVal = initialData.settings.find((s) => s.key === item.key)?.value || item.default;
              return (
                <div key={item.key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                  <form
                    action={async (fd) => {
                      const res = await updateSiteSettingAction(fd);
                      notify(res.message);
                    }}
                    className="space-y-2"
                  >
                    <input type="hidden" name="key" value={item.key} />
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      {item.label}
                    </label>
                    <div className="flex gap-2">
                      <input
                        name="value"
                        defaultValue={currentVal}
                        className="flex-1 p-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Sauvegarder
                      </button>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Clé: `{item.key}`</span>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 6. ONGLET MESSAGES DE CONTACT ── */}
      {activeTab === "messages" && (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Messages du Formulaire de Contact</h2>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
              {initialData.messages.length} messages
            </span>
          </div>
          {initialData.messages.length > 0 ? (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {initialData.messages.map((msg) => (
                <div key={msg.id} className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{msg.fullName} ({msg.email})</h3>
                    <span className="text-xs text-slate-500 font-mono">{new Date(msg.createdAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1">Sujet: {msg.subject}</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
              <Mail className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
              Aucun message de contact pour l'instant.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
