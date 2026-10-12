import { db } from "@/lib/db";
import {
  projects,
  events,
  members,
  historyEntries,
  joinApplications,
  contactMessages,
  siteSettings,
} from "@/lib/db/schema";
import {
  DEMO_PROJECTS,
  DEMO_EVENTS,
  DEMO_MEMBERS,
  DEMO_HISTORY,
  ProjectItem,
  EventItem,
  MemberItem,
  HistoryItem,
} from "@/lib/data/demo-data";
import { eq, desc, asc } from "drizzle-orm";

// ==========================================
// PROJETS
// ==========================================
export async function getProjects(): Promise<ProjectItem[]> {
  try {
    if (!process.env.DATABASE_URL) return DEMO_PROJECTS;
    const res = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.displayOrder), desc(projects.createdAt));

    if (!res || res.length === 0) return DEMO_PROJECTS;

    return res.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      description: p.description,
      imageUrl: p.imageUrl,
      technologies: p.technologies || [],
      status: p.status as ProjectItem["status"],
      statusLabel:
        p.status === "completed"
          ? "Projet finalisé"
          : p.status === "in_progress"
          ? "En développement actif"
          : "En idéation",
      projectDate: p.projectDate,
      githubRepo: p.githubRepo || undefined,
      highlights: [
        "Conception CAO & Prototypage UPF",
        "Architecture système validée",
        "Algorithmes temps réel",
      ],
    }));
  } catch (err) {
    console.error("Erreur lors de la récupération des projets depuis Neon:", err);
    return DEMO_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  try {
    if (!process.env.DATABASE_URL) {
      return DEMO_PROJECTS.find((p) => p.slug === slug) || null;
    }
    const res = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);

    if (res.length > 0) {
      const p = res[0];
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        summary: p.summary,
        description: p.description,
        imageUrl: p.imageUrl,
        technologies: p.technologies || [],
        status: p.status as ProjectItem["status"],
        statusLabel:
          p.status === "completed"
            ? "Projet finalisé"
            : p.status === "in_progress"
            ? "En développement actif"
            : "En idéation",
        projectDate: p.projectDate,
        githubRepo: p.githubRepo || undefined,
        highlights: [
          "Conception CAO & Prototypage UPF",
          "Architecture système validée",
          "Algorithmes temps réel",
        ],
      };
    }

    return DEMO_PROJECTS.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.error("Erreur getProjectBySlug:", err);
    return DEMO_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

// ==========================================
// ÉVÉNEMENTS
// ==========================================
export async function getEvents(): Promise<EventItem[]> {
  try {
    if (!process.env.DATABASE_URL) return DEMO_EVENTS;
    const res = await db
      .select()
      .from(events)
      .orderBy(desc(events.startDate));

    if (!res || res.length === 0) return DEMO_EVENTS;

    return res.map((e) => ({
      id: e.id,
      title: e.title,
      slug: e.slug,
      description: e.description,
      imageUrl: e.imageUrl,
      location: e.location,
      startDate: e.startDate.toISOString(),
      endDate: e.endDate ? e.endDate.toISOString() : undefined,
      status: e.status as EventItem["status"],
      statusLabel:
        e.status === "upcoming"
          ? "Inscriptions ouvertes"
          : e.status === "ongoing"
          ? "En cours"
          : "Terminé",
      registrationUrl: e.registrationUrl || undefined,
      type: "Activité Technique & Hackathon",
    }));
  } catch (err) {
    console.error("Erreur getEvents:", err);
    return DEMO_EVENTS;
  }
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  try {
    if (!process.env.DATABASE_URL) {
      return DEMO_EVENTS.find((e) => e.slug === slug) || null;
    }
    const res = await db
      .select()
      .from(events)
      .where(eq(events.slug, slug))
      .limit(1);

    if (res.length > 0) {
      const e = res[0];
      return {
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        imageUrl: e.imageUrl,
        location: e.location,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate ? e.endDate.toISOString() : undefined,
        status: e.status as EventItem["status"],
        statusLabel:
          e.status === "upcoming"
            ? "Inscriptions ouvertes"
            : e.status === "ongoing"
            ? "En cours"
            : "Terminé",
        registrationUrl: e.registrationUrl || undefined,
        type: "Activité Technique & Hackathon",
      };
    }

    return DEMO_EVENTS.find((e) => e.slug === slug) || null;
  } catch (err) {
    console.error("Erreur getEventBySlug:", err);
    return DEMO_EVENTS.find((e) => e.slug === slug) || null;
  }
}

// ==========================================
// MEMBRES
// ==========================================
export async function getMembers(): Promise<MemberItem[]> {
  try {
    if (!process.env.DATABASE_URL) return DEMO_MEMBERS;
    const res = await db
      .select()
      .from(members)
      .where(eq(members.isActive, true))
      .orderBy(asc(members.displayOrder));

    if (!res || res.length === 0) return DEMO_MEMBERS;

    return res.map((m) => ({
      id: m.id,
      firstName: m.firstName,
      lastName: m.lastName,
      roleTitle: m.roleTitle,
      team: m.team,
      bio: m.bio,
      avatarUrl: m.avatarUrl,
      linkedinUrl: m.linkedinUrl || undefined,
      githubUrl: m.githubUrl || undefined,
      displayOrder: m.displayOrder,
    }));
  } catch (err) {
    console.error("Erreur getMembers:", err);
    return DEMO_MEMBERS;
  }
}

// ==========================================
// HISTORIQUE
// ==========================================
export async function getHistory(): Promise<HistoryItem[]> {
  try {
    if (!process.env.DATABASE_URL) return DEMO_HISTORY;
    const res = await db
      .select()
      .from(historyEntries)
      .orderBy(asc(historyEntries.displayOrder), asc(historyEntries.year));

    if (!res || res.length === 0) return DEMO_HISTORY;

    return res.map((h) => ({
      id: h.id,
      year: h.year,
      title: h.title,
      description: h.description,
      badge: h.badge || undefined,
      imageUrl: h.imageUrl || undefined,
      displayOrder: h.displayOrder,
    }));
  } catch (err) {
    console.error("Erreur getHistory:", err);
    return DEMO_HISTORY;
  }
}
