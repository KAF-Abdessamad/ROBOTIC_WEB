import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { uploadImage } from "@/lib/storage";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";
// Max 8 MB
export const maxDuration = 30;

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(req: NextRequest) {
  // Admin only
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "uploads";

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: `Type de fichier non supporté : ${file.type}. Utilisez JPG, PNG, WebP ou GIF.` },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: `Fichier trop volumineux (max 8 MB). Votre fichier : ${(file.size / 1024 / 1024).toFixed(1)} MB` },
      { status: 413 }
    );
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `${folder}/${randomUUID()}.${ext}`;

    const url = await uploadImage(key, buffer, file.type);

    return NextResponse.json({ url, key });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du fichier. Réessayez." },
      { status: 500 }
    );
  }
}
