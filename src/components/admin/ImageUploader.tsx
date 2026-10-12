"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  /** Current image URL (default value) */
  currentUrl?: string;
  /** Hidden input name that will carry the final URL */
  inputName: string;
  /** Sub-folder in the bucket (e.g. "members", "events") */
  folder?: string;
  /** Label shown above the uploader */
  label?: string;
  /** Aspect ratio hint for the preview (tailwind classes) */
  aspectClass?: string;
}

export function ImageUploader({
  currentUrl = "",
  inputName,
  folder = "uploads",
  label = "Image",
  aspectClass = "aspect-square",
}: ImageUploaderProps) {
  const [url, setUrl] = useState(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrl(currentUrl);
  }, [currentUrl]);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    setProgress(10);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);

    try {
      // Simulate progress while uploading
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 15, 85));
      }, 200);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      clearInterval(progressInterval);
      setProgress(100);

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur upload");
      setUrl(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
          {label}
        </label>
      )}

      {/* Hidden input carrying the final URL to the form action */}
      <input type="hidden" name={inputName} value={url} />

      <div className="flex gap-3 items-start">
        {/* Preview */}
        <div
          className={`relative ${aspectClass} w-24 rounded-xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex-shrink-0`}
        >
          {url ? (
            <Image
              src={url}
              alt="Aperçu"
              fill
              className="object-cover"
              unoptimized={url.startsWith("https://br-")} // bypass Next.js optimization for Neon URLs
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <ImageIcon className="w-8 h-8" />
            </div>
          )}

          {/* Clear button */}
          {url && !uploading && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
              title="Supprimer l'image"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Drop zone */}
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && fileRef.current?.click()}
          className={`flex-1 relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
            uploading
              ? "border-cyan-400 bg-cyan-50/40 dark:bg-cyan-950/20"
              : "border-slate-300 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-600 hover:bg-cyan-50/30 dark:hover:bg-cyan-950/10"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />

          {uploading ? (
            <div className="space-y-2">
              <Loader2 className="w-5 h-5 animate-spin text-cyan-500 mx-auto" />
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                Envoi en cours…
              </p>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Cliquer ou glisser une image ici
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                JPG, PNG, WebP · max 8 MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* URL manuelle */}
      <div>
        <input
          type="text"
          placeholder="Ou coller une URL d'image directement…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full mt-1 p-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
          <X className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
