import * as dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { DEMO_MEMBERS, DEMO_PROJECTS, DEMO_EVENTS, DEMO_HISTORY, CLUB_INFO } from "../data/demo-data";
import { hashPassword } from "../auth";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ ERREUR: DATABASE_URL n'est pas définie dans .env.local");
  process.exit(1);
}

const sql = neon(connectionString);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Démarrage du seed pour le Robotics Club UPF...");

  try {
    // 1. Administrateur initial (Bootstrap sécurisé)
    const adminEmail = process.env.ADMIN_INITIAL_EMAIL || "admin.robotics@upf.ac.ma";
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "AdminRoboticsUPF2025!";
    const hashedPassword = await hashPassword(adminPassword);

    console.log(`➡️ Insertion du compte administrateur initial (${adminEmail})...`);
    await db.insert(schema.adminUsers).values({
      name: "Direction Technique UPF",
      email: adminEmail,
      passwordHash: hashedPassword,
      role: "superadmin",
      isActive: true,
    }).onConflictDoNothing();

    // 2. Membres du club
    console.log("➡️ Insertion des membres de l'équipe...");
    for (const member of DEMO_MEMBERS) {
      await db.insert(schema.members).values({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        roleTitle: member.roleTitle,
        team: member.team,
        bio: member.bio,
        avatarUrl: member.avatarUrl,
        linkedinUrl: member.linkedinUrl,
        githubUrl: member.githubUrl,
        displayOrder: member.displayOrder,
        isActive: true,
      }).onConflictDoNothing();
    }

    // 3. Projets robotiques
    console.log("➡️ Insertion des projets robotiques...");
    for (const proj of DEMO_PROJECTS) {
      await db.insert(schema.projects).values({
        id: proj.id,
        title: proj.title,
        slug: proj.slug,
        summary: proj.summary,
        description: proj.description,
        imageUrl: proj.imageUrl,
        technologies: proj.technologies,
        status: proj.status,
        githubRepo: proj.githubRepo,
        projectDate: proj.projectDate,
        displayOrder: 1,
      }).onConflictDoNothing();
    }

    // 4. Événements
    console.log("➡️ Insertion des événements...");
    for (const ev of DEMO_EVENTS) {
      await db.insert(schema.events).values({
        id: ev.id,
        title: ev.title,
        slug: ev.slug,
        description: ev.description,
        imageUrl: ev.imageUrl,
        location: ev.location,
        startDate: new Date(ev.startDate),
        endDate: ev.endDate ? new Date(ev.endDate) : null,
        status: ev.status,
        registrationUrl: ev.registrationUrl,
      }).onConflictDoNothing();
    }

    // 5. Historique
    console.log("➡️ Insertion de l'historique...");
    for (const h of DEMO_HISTORY) {
      await db.insert(schema.historyEntries).values({
        id: h.id,
        year: h.year,
        title: h.title,
        description: h.description,
        badge: h.badge,
        imageUrl: h.imageUrl,
        displayOrder: h.displayOrder,
      }).onConflictDoNothing();
    }

    // 6. Paramètres officiels
    console.log("➡️ Insertion des paramètres officiels du club...");
    await db.insert(schema.siteSettings).values({
      key: "club_name",
      value: CLUB_INFO.name,
      description: "Nom officiel du club",
    }).onConflictDoNothing();

    await db.insert(schema.siteSettings).values({
      key: "contact_email",
      value: CLUB_INFO.email,
      description: "Email de contact officiel",
    }).onConflictDoNothing();

    console.log("✅ Base de données Neon PostgreSQL initialisée et seedée avec succès !");
  } catch (error) {
    console.error("❌ Erreur pendant le seeding :", error);
    process.exit(1);
  }
}

seed();
