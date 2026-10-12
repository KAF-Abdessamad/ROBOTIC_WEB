import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === "production") {
  console.warn("⚠️ DATABASE_URL n'est pas définie dans l'environnement de production.");
}

// Connexion sans état optimisée pour le Serverless de Neon
const sql = neon(connectionString || "postgresql://mock:mock@localhost:5432/mock");

export const db = drizzle(sql, { schema });
export { schema };
