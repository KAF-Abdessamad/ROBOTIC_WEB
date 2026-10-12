"use server";

import { joinApplicationSchema, contactFormSchema, adminLoginSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import {
  joinApplications,
  contactMessages,
  adminUsers,
  events,
  members,
  projects,
  siteSettings,
  historyEntries,
} from "@/lib/db/schema";
import {
  verifyPassword,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  requireAdminSession,
} from "@/lib/auth";
import { eq, desc, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DEMO_EVENTS, DEMO_MEMBERS } from "@/lib/data/demo-data";
import { sendInterviewInvitationEmail, sendAcceptanceEmail } from "@/lib/email";

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// ==========================================
// 1. CANDIDATURE AU CLUB (PUBLIC)
// ==========================================
export async function submitJoinApplication(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const firstName = ((formData.get("firstName") as string) || "").trim();
  const lastName = ((formData.get("lastName") as string) || "").trim();
  const rawFullName = ((formData.get("fullName") as string) || "").trim();
  const fullName = rawFullName || `${firstName} ${lastName}`.trim();

  const studyLevelRaw = (formData.get("studyLevel") as string) || "";
  const studyLevel =
    studyLevelRaw &&
    ["1A", "2A", "3A", "4A", "5A", "Master", "Doctorat", "Autre"].includes(studyLevelRaw)
      ? studyLevelRaw
      : "1A";

  let motivation = ((formData.get("motivation") as string) || "").trim();
  if (!motivation) {
    motivation = "Passionné(e) par la robotique et motivé(e) pour rejoindre le Robotics Club UPF.";
  }

  const rawData = {
    fullName,
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    facultyMajor: formData.get("facultyMajor"),
    studyLevel,
    motivation,
    experience: formData.get("experience") || "",
    honeypot: formData.get("website_url_hp") || "", // Champ piège honeypot
  };

  const validation = joinApplicationSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      message: "Veuillez vérifier les informations renseignées.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Protection Honeypot
  if (validation.data.honeypot && validation.data.honeypot.length > 0) {
    return {
      success: true,
      message: "Candidature reçue.",
    };
  }

  try {
    if (process.env.DATABASE_URL) {
      await db.insert(joinApplications).values({
        fullName: validation.data.fullName,
        email: validation.data.email,
        phone: validation.data.phone || null,
        facultyMajor: validation.data.facultyMajor,
        studyLevel: validation.data.studyLevel,
        motivation: validation.data.motivation,
        experience: validation.data.experience || null,
        status: "pending",
      });

      revalidatePath("/admin/dashboard");
      revalidatePath("/");
    }

    return {
      success: true,
      message:
        "Votre candidature a été transmise avec succès au bureau du club ! Nous reviendrons vers vous très prochainement par email.",
    };
  } catch (error) {
    console.error("Erreur insertion joinApplications:", error);
    return {
      success: false,
      message:
        "Une erreur temporaire est survenue lors de l'enregistrement de votre candidature. Veuillez réessayer dans quelques instants.",
    };
  }
}

// ==========================================
// 2. FORMULAIRE DE CONTACT (PUBLIC)
// ==========================================
export async function submitContactMessage(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    honeypot: formData.get("business_website_hp") || "",
  };

  const validation = contactFormSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      message: "Veuillez vérifier les champs du formulaire.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  if (validation.data.honeypot && validation.data.honeypot.length > 0) {
    return {
      success: true,
      message: "Message reçu.",
    };
  }

  try {
    if (process.env.DATABASE_URL) {
      await db.insert(contactMessages).values({
        fullName: validation.data.fullName,
        email: validation.data.email,
        subject: validation.data.subject,
        message: validation.data.message,
        isRead: false,
      });
    }

    return {
      success: true,
      message:
        "Votre message a été transmis avec succès au secrétariat du Robotics Club UPF. Nous vous répondrons rapidement.",
    };
  } catch (error) {
    console.error("Erreur insertion contactMessages:", error);
    return {
      success: false,
      message:
        "Impossible d'envoyer votre message pour le moment. Veuillez vérifier votre connexion ou nous contacter directement par email.",
    };
  }
}

// ==========================================
// 3. CONNEXION ADMIN (AUTHENTIFICATION SÉCURISÉE)
// ==========================================
export async function loginAdmin(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = adminLoginSchema.safeParse({ email, password });
  if (!validation.success) {
    return {
      success: false,
      message: "Identifiants invalides. Veuillez vérifier votre email et mot de passe.",
    };
  }

  try {
    let userFound = null;

    if (process.env.DATABASE_URL) {
      try {
        const records = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.email, validation.data.email.toLowerCase().trim()))
          .limit(1);

        if (records.length > 0) {
          userFound = records[0];
        }
      } catch (dbErr) {
        console.warn("Base Neon non migrée ou table manquante, recours au compte d'amorçage:", dbErr);
      }
    }

    // Si la base n'est pas encore provisionnée ou si le compte n'a pas été trouvé en base,
    // on permet au compte d'amorçage défini dans l'environnement d'administrer
    if (!userFound) {
      const bootstrapEmail = (process.env.ADMIN_INITIAL_EMAIL || "admin.robotics@upf.ac.ma").toLowerCase().trim();
      const bootstrapPassword = process.env.ADMIN_INITIAL_PASSWORD || "AdminRoboticsUPF2025!";

      if (validation.data.email.toLowerCase().trim() === bootstrapEmail) {
        if (validation.data.password === bootstrapPassword) {
          userFound = {
            id: "bootstrap-superadmin-upf",
            email: bootstrapEmail,
            name: "Super Administrateur UPF",
            role: "superadmin",
            passwordHash: "",
            isActive: true,
          };
        }
      }
    }

    // Message d'erreur générique ne révélant pas si l'email existe
    if (!userFound || !userFound.isActive) {
      return {
        success: false,
        message: "Email ou mot de passe incorrect. Accès réservé aux administrateurs autorisés.",
      };
    }

    // Si l'utilisateur vient de la base, vérifier le hash bcrypt
    if (userFound.passwordHash) {
      const isValid = await verifyPassword(validation.data.password, userFound.passwordHash);
      if (!isValid) {
        return {
          success: false,
          message: "Email ou mot de passe incorrect. Accès réservé aux administrateurs autorisés.",
        };
      }
    }

    // Création du token sécurisé et du cookie HTTPOnly
    const token = await createSessionToken({
      id: userFound.id,
      email: userFound.email,
      name: userFound.name,
      role: userFound.role,
    });

    await setSessionCookie(token);
  } catch (err) {
    console.error("Erreur loginAdmin:", err);
    return {
      success: false,
      message: "Une erreur inattendue est survenue lors de la tentative de connexion.",
    };
  }

  // Redirection vers le tableau de bord
  redirect("/admin/dashboard");
}

// ==========================================
// 4. DÉCONNEXION ADMIN
// ==========================================
export async function logoutAdmin(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}

// ==========================================
// 5. ACTION PROTÉGÉE : RÉCUPÉRATION DES CANDIDATURES
// ==========================================
// ==========================================
// 5. ACTIONS PROTÉGÉES : LECTURE COMPLÈTE DU SITE
// ==========================================
export async function getAdminApplicationsAction() {
  await requireAdminSession();
  if (!process.env.DATABASE_URL) return [];
  try {
    return await db
      .select()
      .from(joinApplications)
      .orderBy(desc(joinApplications.createdAt));
  } catch (err) {
    console.warn("Table join_applications pas encore migrée:", err);
    return [];
  }
}

export async function getAdminEventsAction() {
  await requireAdminSession();
  if (!process.env.DATABASE_URL) return DEMO_EVENTS as any[];
  try {
    const list = await db.select().from(events).orderBy(desc(events.startDate));
    return list.length > 0 ? list : (DEMO_EVENTS as any[]);
  } catch (err) {
    console.warn("getAdminEventsAction fallback:", err);
    return DEMO_EVENTS as any[];
  }
}

export async function getAdminProjectsAction() {
  await requireAdminSession();
  if (!process.env.DATABASE_URL) return [];
  try {
    return await db.select().from(projects).orderBy(asc(projects.displayOrder));
  } catch (err) {
    return [];
  }
}

export async function getAdminMembersAction() {
  await requireAdminSession();
  if (!process.env.DATABASE_URL) return DEMO_MEMBERS as any[];
  try {
    const list = await db.select().from(members).orderBy(asc(members.displayOrder));
    return list.length > 0 ? list : (DEMO_MEMBERS as any[]);
  } catch (err) {
    console.warn("getAdminMembersAction fallback:", err);
    return DEMO_MEMBERS as any[];
  }
}

export async function getAdminSettingsAction() {
  await requireAdminSession();
  if (!process.env.DATABASE_URL) return [];
  try {
    return await db.select().from(siteSettings);
  } catch (err) {
    return [];
  }
}

export async function getAdminMessagesAction() {
  await requireAdminSession();
  if (!process.env.DATABASE_URL) return [];
  try {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  } catch (err) {
    return [];
  }
}

// ==========================================
// 6. ACTIONS DE MODIFICATION DYNAMIQUE (ADMIN)
// ==========================================

// Mettre à jour un paramètre du site
export async function updateSiteSettingAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const key = formData.get("key") as string;
  const value = formData.get("value") as string;
  const description = (formData.get("description") as string) || "";

  if (!key) return { success: false, message: "Clé requise" };

  try {
    await db
      .insert(siteSettings)
      .values({ key, value, description, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value, description, updatedAt: new Date() },
      });

    revalidatePath("/", "layout");
    revalidatePath("/contact");
    revalidatePath("/members");
    revalidatePath("/activities");
    revalidatePath("/admin/dashboard");
    return { success: true, message: `Paramètre '${key}' mis à jour avec succès !` };
  } catch (err: any) {
    return { success: false, message: err?.message || "Erreur lors de la mise à jour" };
  }
}

// Mettre à jour le statut d'une candidature
export async function updateApplicationStatusAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id") as string;
  const status = formData.get("status") as any;

  if (!id || !status) return { success: false, message: "ID et statut requis" };

  try {
    await db
      .update(joinApplications)
      .set({ status, updatedAt: new Date() })
      .where(eq(joinApplications.id, id));

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Statut de la candidature mis à jour !" };
  } catch (err: any) {
    return { success: false, message: err?.message || "Erreur" };
  }
}

// Convoquer un candidat à un entretien et lui envoyer l'email de convocation
export async function sendInterviewInvitationAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id") as string;
  const interviewDate = (formData.get("interviewDate") as string)?.trim() || "Prochainement";
  const interviewTime = (formData.get("interviewTime") as string)?.trim() || "À convenir";
  const locationOrLink =
    (formData.get("locationOrLink") as string)?.trim() ||
    "Campus UPF — Local Robotique (Bâtiment B)";
  const notes = (formData.get("notes") as string)?.trim() || "";

  if (!id) return { success: false, message: "ID de candidature manquant" };

  try {
    const [app] = await db
      .select()
      .from(joinApplications)
      .where(eq(joinApplications.id, id));
    if (!app) return { success: false, message: "Candidature introuvable" };

    // Mettre à jour le statut vers under_review (en cours d'examen / entretien)
    await db
      .update(joinApplications)
      .set({ status: "under_review", updatedAt: new Date() })
      .where(eq(joinApplications.id, id));

    // Envoyer l'email
    const mailResult = await sendInterviewInvitationEmail({
      to: app.email,
      studentName: app.fullName,
      interviewDate,
      interviewTime,
      locationOrLink,
      notes,
    });

    revalidatePath("/admin/dashboard");
    return {
      success: true,
      message: mailResult.message,
    };
  } catch (err: any) {
    console.error("sendInterviewInvitationAction error:", err);
    return { success: false, message: err?.message || "Erreur lors de l'envoi de la convocation" };
  }
}

// Confirmer l'acceptation finale et envoyer l'email de bienvenue
export async function sendAcceptanceEmailAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id") as string;
  const team = (formData.get("team") as string)?.trim() || "Systèmes Autonomes & Robotique";
  const welcomeMessage = (formData.get("welcomeMessage") as string)?.trim() || "";
  const whatsappLink =
    (formData.get("whatsappLink") as string)?.trim() ||
    "https://chat.whatsapp.com/RoboticsClubUPF";

  if (!id) return { success: false, message: "ID de candidature manquant" };

  try {
    const [app] = await db
      .select()
      .from(joinApplications)
      .where(eq(joinApplications.id, id));
    if (!app) return { success: false, message: "Candidature introuvable" };

    // Mettre à jour le statut vers accepted
    await db
      .update(joinApplications)
      .set({ status: "accepted", updatedAt: new Date() })
      .where(eq(joinApplications.id, id));

    // Envoyer l'email
    const mailResult = await sendAcceptanceEmail({
      to: app.email,
      studentName: app.fullName,
      team,
      welcomeMessage,
      whatsappLink,
    });

    revalidatePath("/admin/dashboard");
    return {
      success: true,
      message: mailResult.message,
    };
  } catch (err: any) {
    console.error("sendAcceptanceEmailAction error:", err);
    return { success: false, message: err?.message || "Erreur lors de la validation de l'admission" };
  }
}

// Créer ou modifier un événement
export async function saveEventAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id") as string;
  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim() || title.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const description = (formData.get("description") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const imageUrl = (formData.get("imageUrl") as string)?.trim() || "/robotique.webp";
  const startDateStr = formData.get("startDate") as string;
  const status = (formData.get("status") as any) || "upcoming";
  const registrationUrl = (formData.get("registrationUrl") as string)?.trim() || null;

  if (!title || !description || !location || !startDateStr) {
    return { success: false, message: "Veuillez remplir tous les champs obligatoires." };
  }

  try {
    const startDate = new Date(startDateStr);

    if (id) {
      await db
        .update(events)
        .set({
          title,
          slug,
          description,
          location,
          imageUrl,
          startDate,
          status,
          registrationUrl,
          updatedAt: new Date(),
        })
        .where(eq(events.id, id));
    } else {
      await db.insert(events).values({
        title,
        slug,
        description,
        location,
        imageUrl,
        startDate,
        status,
        registrationUrl,
      });
    }

    revalidatePath("/activities");
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, message: id ? "Événement mis à jour !" : "Événement créé avec succès !" };
  } catch (err: any) {
    return { success: false, message: err?.message || "Erreur lors de l'enregistrement de l'événement." };
  }
}

// Supprimer un événement
export async function deleteEventAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id") as string;
  if (!id) return { success: false, message: "ID manquant" };

  try {
    await db.delete(events).where(eq(events.id, id));
    revalidatePath("/activities");
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Événement supprimé." };
  } catch (err: any) {
    return { success: false, message: err?.message || "Erreur de suppression" };
  }
}

// Créer ou modifier un membre du staff
export async function saveMemberAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id") as string;
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const roleTitle = (formData.get("roleTitle") as string)?.trim();
  const team = (formData.get("team") as string)?.trim() || "Bureau Exécutif";
  const bio = (formData.get("bio") as string)?.trim();
  const avatarUrl = (formData.get("avatarUrl") as string)?.trim() || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80";
  const email = (formData.get("email") as string)?.trim() || null;
  const linkedinUrl = (formData.get("linkedinUrl") as string)?.trim() || null;
  const githubUrl = (formData.get("githubUrl") as string)?.trim() || null;

  if (!firstName || !lastName || !roleTitle || !bio) {
    return { success: false, message: "Veuillez remplir les informations requises pour le membre." };
  }

  try {
    if (id) {
      await db
        .update(members)
        .set({
          firstName,
          lastName,
          roleTitle,
          team,
          bio,
          avatarUrl,
          email,
          linkedinUrl,
          githubUrl,
          updatedAt: new Date(),
        })
        .where(eq(members.id, id));
    } else {
      await db.insert(members).values({
        firstName,
        lastName,
        roleTitle,
        team,
        bio,
        avatarUrl,
        email,
        linkedinUrl,
        githubUrl,
      });
    }

    revalidatePath("/members");
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, message: id ? "Membre mis à jour !" : "Membre ajouté avec succès !" };
  } catch (err: any) {
    return { success: false, message: err?.message || "Erreur lors de l'enregistrement." };
  }
}

// Supprimer un membre
export async function deleteMemberAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id") as string;
  if (!id) return { success: false, message: "ID manquant" };

  try {
    await db.delete(members).where(eq(members.id, id));
    revalidatePath("/members");
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Membre retiré." };
  } catch (err: any) {
    return { success: false, message: err?.message || "Erreur" };
  }
}

// Créer ou modifier un projet
export async function saveProjectAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id") as string;
  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim() || title.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const summary = (formData.get("summary") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || summary;
  const imageUrl = (formData.get("imageUrl") as string)?.trim() || "/robotique.webp";
  const techStr = (formData.get("technologies") as string)?.trim() || "Robotique, Arduino, C++";
  const technologies = techStr.split(",").map((s) => s.trim()).filter(Boolean);
  const projectDate = (formData.get("projectDate") as string)?.trim() || "2025";
  const status = (formData.get("status") as any) || "in_progress";
  const githubRepo = (formData.get("githubRepo") as string)?.trim() || null;

  if (!title || !summary) {
    return { success: false, message: "Titre et résumé du projet obligatoires." };
  }

  try {
    if (id) {
      await db
        .update(projects)
        .set({
          title,
          slug,
          summary,
          description,
          imageUrl,
          technologies,
          projectDate,
          status,
          githubRepo,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, id));
    } else {
      await db.insert(projects).values({
        title,
        slug,
        summary,
        description,
        imageUrl,
        technologies,
        projectDate,
        status,
        githubRepo,
      });
    }

    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, message: id ? "Projet mis à jour !" : "Projet ajouté avec succès !" };
  } catch (err: any) {
    return { success: false, message: err?.message || "Erreur d'enregistrement du projet." };
  }
}

// Supprimer un projet
export async function deleteProjectAction(formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id") as string;
  if (!id) return { success: false, message: "ID manquant" };

  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Projet supprimé." };
  } catch (err: any) {
    return { success: false, message: err?.message || "Erreur" };
  }
}
