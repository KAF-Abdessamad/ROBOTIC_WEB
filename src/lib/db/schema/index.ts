import {
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ==========================================
// ENUMS
// ==========================================
export const roleEnum = pgEnum("admin_role", ["admin", "superadmin", "moderator"]);
export const projectStatusEnum = pgEnum("project_status", ["ideation", "in_progress", "completed", "archived"]);
export const eventStatusEnum = pgEnum("event_status", ["draft", "upcoming", "ongoing", "completed", "cancelled"]);
export const applicationStatusEnum = pgEnum("application_status", ["pending", "under_review", "accepted", "rejected"]);
export const studyLevelEnum = pgEnum("study_level", ["1A", "2A", "3A", "4A", "5A", "Master", "Doctorat", "Autre"]);

// ==========================================
// 1. ADMIN USERS
// ==========================================
export const adminUsers = pgTable(
  "admin_users",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 128 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: roleEnum("role").default("admin").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("admin_users_email_idx").on(table.email),
  ]
);

// ==========================================
// 2. MEMBERS (Membres du bureau et de l'équipe)
// ==========================================
export const members = pgTable(
  "members",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    roleTitle: varchar("role_title", { length: 150 }).notNull(), // Ex: "Président", "Tech Lead ROS 2"
    team: varchar("team", { length: 100 }).default("Bureau Exécutif").notNull(), // Section organisationnelle
    bio: text("bio").notNull(),
    avatarUrl: text("avatar_url").notNull(),
    email: varchar("email", { length: 255 }),
    linkedinUrl: text("linkedin_url"),
    githubUrl: text("github_url"),
    displayOrder: integer("display_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("members_order_idx").on(table.displayOrder),
  ]
);

// ==========================================
// 3. PROJECTS (Projets robotiques)
// ==========================================
export const projects = pgTable(
  "projects",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: varchar("title", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    technologies: text("technologies").array().notNull(), // Ex: ["ROS 2", "Python", "LiDAR 3D"]
    status: projectStatusEnum("status").default("in_progress").notNull(),
    githubRepo: text("github_repo"),
    projectDate: varchar("project_date", { length: 50 }).notNull(), // Ex: "2024 - 2025"
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("projects_slug_idx").on(table.slug),
    index("projects_order_idx").on(table.displayOrder),
  ]
);

// ==========================================
// 4. EVENTS (Événements, hackathons, ateliers)
// ==========================================
export const events = pgTable(
  "events",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: varchar("title", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }),
    status: eventStatusEnum("status").default("upcoming").notNull(),
    registrationUrl: text("registration_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("events_slug_idx").on(table.slug),
    index("events_start_date_idx").on(table.startDate),
  ]
);

// ==========================================
// 5. HISTORY ENTRIES (Historique du club)
// ==========================================
export const historyEntries = pgTable(
  "history_entries",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    year: varchar("year", { length: 20 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    badge: varchar("badge", { length: 100 }),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("history_order_idx").on(table.displayOrder),
  ]
);

// ==========================================
// 6. JOIN APPLICATIONS (Candidatures pour rejoindre le club)
// ==========================================
export const joinApplications = pgTable(
  "join_applications",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    facultyMajor: varchar("faculty_major", { length: 150 }).notNull(), // Filière UPF
    studyLevel: studyLevelEnum("study_level").notNull(),
    motivation: text("motivation").notNull(),
    experience: text("experience"),
    status: applicationStatusEnum("status").default("pending").notNull(),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("applications_email_idx").on(table.email),
    index("applications_status_idx").on(table.status),
    index("applications_created_idx").on(table.createdAt),
  ]
);

// ==========================================
// 7. CONTACT MESSAGES (Messages reçus via le formulaire)
// ==========================================
export const contactMessages = pgTable(
  "contact_messages",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    subject: varchar("subject", { length: 200 }).notNull(),
    message: text("message").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("contact_created_idx").on(table.createdAt),
    index("contact_is_read_idx").on(table.isRead),
  ]
);

// ==========================================
// 8. SITE SETTINGS (Paramètres éditables du site)
// ==========================================
export const siteSettings = pgTable(
  "site_settings",
  {
    key: varchar("key", { length: 100 }).primaryKey(),
    value: text("value").notNull(),
    description: text("description"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  }
);
