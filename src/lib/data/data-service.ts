import { db } from "@/lib/db";
import { members, events, projects, siteSettings } from "@/lib/db/schema";
import { DEMO_MEMBERS, DEMO_EVENTS, DEMO_PROJECTS, CLUB_INFO, isEventUpcoming } from "./demo-data";
import { asc, desc } from "drizzle-orm";

export async function getPublicMembers() {
  if (!process.env.DATABASE_URL) return DEMO_MEMBERS;
  try {
    const list = await db
      .select()
      .from(members)
      .orderBy(asc(members.displayOrder));

    if (list.length > 0) {
      return list.map((m) => ({
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
    }
    return DEMO_MEMBERS;
  } catch (err) {
    console.warn("getPublicMembers fallback:", err);
    return DEMO_MEMBERS;
  }
}

export async function getPublicEvents() {
  if (!process.env.DATABASE_URL) return DEMO_EVENTS;
  try {
    const list = await db
      .select()
      .from(events)
      .orderBy(desc(events.startDate));

    if (list.length > 0) {
      return list.map((e) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        imageUrl: e.imageUrl,
        location: e.location,
        startDate: new Date(e.startDate).toISOString(),
        endDate: e.endDate ? new Date(e.endDate).toISOString() : undefined,
        status: e.status,
        statusLabel: e.status === "upcoming" ? "À venir" : e.status === "ongoing" ? "En cours" : "Terminé",
        registrationUrl: e.registrationUrl || undefined,
        type: "Événement UPF",
      }));
    }
    return DEMO_EVENTS;
  } catch (err) {
    console.warn("getPublicEvents fallback:", err);
    return DEMO_EVENTS;
  }
}

export async function getPublicProjects() {
  if (!process.env.DATABASE_URL) return DEMO_PROJECTS;
  try {
    const list = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.displayOrder));

    if (list.length > 0) {
      return list.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        summary: p.summary,
        description: p.description,
        imageUrl: p.imageUrl,
        technologies: p.technologies,
        status: p.status,
        statusLabel: p.status === "completed" ? "Terminé" : "En cours",
        projectDate: p.projectDate,
        githubRepo: p.githubRepo || undefined,
        highlights: [p.summary],
      }));
    }
    return DEMO_PROJECTS;
  } catch (err) {
    console.warn("getPublicProjects fallback:", err);
    return DEMO_PROJECTS;
  }
}

export async function getPublicClubInfo() {
  if (!process.env.DATABASE_URL) return CLUB_INFO;
  try {
    const settings = await db.select().from(siteSettings);
    const map = new Map(settings.map((s) => [s.key, s.value]));

    return {
      ...CLUB_INFO,
      name: map.get("club_name") || CLUB_INFO.name,
      email: map.get("contact_email") || CLUB_INFO.email,
      campus: map.get("campus_location") || CLUB_INFO.campus,
      phone: map.get("phone_number") || CLUB_INFO.phone,
    };
  } catch (err) {
    return CLUB_INFO;
  }
}

export { isEventUpcoming };
