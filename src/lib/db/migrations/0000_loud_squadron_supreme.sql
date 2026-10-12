CREATE TYPE "public"."application_status" AS ENUM('pending', 'under_review', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."event_status" AS ENUM('draft', 'upcoming', 'ongoing', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('ideation', 'in_progress', 'completed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."admin_role" AS ENUM('admin', 'superadmin', 'moderator');--> statement-breakpoint
CREATE TYPE "public"."study_level" AS ENUM('1A', '2A', '3A', '4A', '5A', 'Master', 'Doctorat', 'Autre');--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "admin_role" DEFAULT 'admin' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"full_name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(200) NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"status" "event_status" DEFAULT 'upcoming' NOT NULL,
	"registration_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "history_entries" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"year" varchar(20) NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"badge" varchar(100),
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "join_applications" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"full_name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"faculty_major" varchar(150) NOT NULL,
	"study_level" "study_level" NOT NULL,
	"motivation" text NOT NULL,
	"experience" text,
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"admin_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"role_title" varchar(150) NOT NULL,
	"team" varchar(100) DEFAULT 'Bureau Exécutif' NOT NULL,
	"bio" text NOT NULL,
	"avatar_url" text NOT NULL,
	"email" varchar(255),
	"linkedin_url" text,
	"github_url" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"summary" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"technologies" text[] NOT NULL,
	"status" "project_status" DEFAULT 'in_progress' NOT NULL,
	"github_repo" text,
	"project_date" varchar(50) NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"key" varchar(100) PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"description" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "admin_users_email_idx" ON "admin_users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "contact_created_idx" ON "contact_messages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "contact_is_read_idx" ON "contact_messages" USING btree ("is_read");--> statement-breakpoint
CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "events_start_date_idx" ON "events" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "history_order_idx" ON "history_entries" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "applications_email_idx" ON "join_applications" USING btree ("email");--> statement-breakpoint
CREATE INDEX "applications_status_idx" ON "join_applications" USING btree ("status");--> statement-breakpoint
CREATE INDEX "applications_created_idx" ON "join_applications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "members_order_idx" ON "members" USING btree ("display_order");--> statement-breakpoint
CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "projects_order_idx" ON "projects" USING btree ("display_order");