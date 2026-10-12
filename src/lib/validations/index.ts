import { z } from "zod";

// Liste officielle des filières de l'Université Privée de Fès (UPF)
export const UPF_MAJORS = [
  "Cycle Préparatoire Scientifique",
  "Génie Informatique",
  "Génie des Systèmes Embarqués",
  "Génie Civil",
  "Génie des Énergies Renouvelables et Systèmes Énergétiques",
  "Design et Architecture d'Intérieur",
  "Urbanisme et Aménagement",
  "Autre filière UPF",
] as const;

export const UPF_STUDY_LEVELS = [
  "1A",
  "2A",
  "3A",
  "4A",
  "5A",
  "Master",
  "Doctorat",
  "Autre",
] as const;

// ==========================================
// FORMULAIRE CANDIDATURE (JOIN)
// ==========================================
export const joinApplicationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Le nom complet doit comporter au moins 3 caractères")
    .max(150, "Le nom complet ne peut pas dépasser 150 caractères"),
  email: z
    .string()
    .email("Adresse email invalide (idéalement votre email UPF)"),
  phone: z
    .string()
    .max(50, "Numéro de téléphone trop long")
    .optional()
    .or(z.literal("")),
  facultyMajor: z
    .string()
    .min(2, "Veuillez sélectionner votre filière UPF"),
  studyLevel: z.enum(
    ["1A", "2A", "3A", "4A", "5A", "Master", "Doctorat", "Autre"],
    { message: "Veuillez sélectionner un niveau d'études valide" }
  ),
  motivation: z
    .string()
    .min(30, "Expliquez votre motivation en au moins 30 caractères"),
  experience: z
    .string()
    .optional()
    .or(z.literal("")),
  // Honeypot antispam : doit impérativement rester vide
  honeypot: z
    .string()
    .max(0, "Tentative de spam détectée")
    .optional()
    .or(z.literal("")),
});

export type JoinApplicationInput = z.infer<typeof joinApplicationSchema>;

// ==========================================
// FORMULAIRE DE CONTACT
// ==========================================
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Le nom doit comporter au moins 2 caractères")
    .max(150, "Le nom ne peut pas dépasser 150 caractères"),
  email: z
    .string()
    .email("Adresse email invalide"),
  subject: z
    .string()
    .min(4, "Le sujet doit comporter au moins 4 caractères")
    .max(200, "Le sujet ne peut pas dépasser 200 caractères"),
  message: z
    .string()
    .min(15, "Le message doit comporter au moins 15 caractères"),
  // Honeypot antispam : doit être vide
  honeypot: z
    .string()
    .max(0, "Tentative de spam détectée")
    .optional()
    .or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// ==========================================
// AUTHENTIFICATION ADMIN
// ==========================================
export const adminLoginSchema = z.object({
  email: z.string().email("Adresse email administrateur invalide"),
  password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
