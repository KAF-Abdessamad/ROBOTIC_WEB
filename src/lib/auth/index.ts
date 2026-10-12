import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "upf-robotics-default-secret-change-in-env-production-2025"
);

const SESSION_COOKIE_NAME = "upf_admin_session";
const SESSION_DURATION_HOURS = 24;

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

// ==========================================
// 1. HACHAGE ET VÉRIFICATION DE MOT DE PASSE
// ==========================================
export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plainText, salt);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

// ==========================================
// 2. CRÉATION DU JETON JWT DE SESSION
// ==========================================
export async function createSessionToken(user: {
  id: string;
  email: string;
  name: string;
  role: string;
}): Promise<string> {
  const expiration = Math.floor(Date.now() / 1000) + SESSION_DURATION_HOURS * 3600;

  return new SignJWT({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(JWT_SECRET);
}

// ==========================================
// 3. ENREGISTREMENT DU COOKIE DE SESSION HTTPONLY
// ==========================================
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_HOURS * 3600,
  });
}

// ==========================================
// 4. SUPPRESSION DE LA SESSION (DÉCONNEXION)
// ==========================================
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// ==========================================
// 5. RÉCUPÉRATION ET VALIDATION DE LA SESSION COURANTE
// ==========================================
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch (err) {
    return null;
  }
}

import { redirect } from "next/navigation";

// ==========================================
// 6. GARDIEN D'AUTORISATION STRICT (CÔTÉ SERVEUR)
// ==========================================
export async function requireAdminSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
