import * as dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/lib/db/schema";
import { DEMO_MEMBERS, DEMO_EVENTS, DEMO_PROJECTS } from "../src/lib/data/demo-data";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL manquant");
  process.exit(1);
}

const sql = neon(connectionString);
const db = drizzle(sql, { schema });

async function run() {
  console.log("Synchronisation des membres réels...");
  for (const m of DEMO_MEMBERS) {
    await db
      .insert(schema.members)
      .values({
        id: m.id,
        firstName: m.firstName,
        lastName: m.lastName,
        roleTitle: m.roleTitle,
        team: m.team,
        bio: m.bio,
        avatarUrl: m.avatarUrl,
        linkedinUrl: m.linkedinUrl,
        githubUrl: m.githubUrl,
        displayOrder: m.displayOrder,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: schema.members.id,
        set: {
          firstName: m.firstName,
          lastName: m.lastName,
          roleTitle: m.roleTitle,
          team: m.team,
          bio: m.bio,
          avatarUrl: m.avatarUrl,
          linkedinUrl: m.linkedinUrl,
          githubUrl: m.githubUrl,
          displayOrder: m.displayOrder,
          updatedAt: new Date(),
        },
      });
  }

  console.log("Synchronisation des événements réels...");
  for (const e of DEMO_EVENTS) {
    await db
      .insert(schema.events)
      .values({
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        imageUrl: e.imageUrl,
        location: e.location,
        startDate: new Date(e.startDate),
        endDate: e.endDate ? new Date(e.endDate) : null,
        status: e.status,
        registrationUrl: e.registrationUrl,
      })
      .onConflictDoUpdate({
        target: schema.events.id,
        set: {
          title: e.title,
          slug: e.slug,
          description: e.description,
          imageUrl: e.imageUrl,
          location: e.location,
          startDate: new Date(e.startDate),
          endDate: e.endDate ? new Date(e.endDate) : null,
          status: e.status,
          registrationUrl: e.registrationUrl,
          updatedAt: new Date(),
        },
      });
  }

  console.log("✅ Données synchronisées avec succès !");
}

run().catch((err) => {
  console.error("Erreur:", err);
  process.exit(1);
});
