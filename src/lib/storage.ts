import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Neon Object Storage — path-style required
export const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-2",
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // Required for Neon
});

export const BUCKET = process.env.NEON_STORAGE_BUCKET || "robotics-images";
export const STORAGE_BASE = process.env.NEXT_PUBLIC_STORAGE_BASE_URL || "";

/**
 * Uploads a file buffer to Neon Object Storage.
 * Returns the public URL of the uploaded file.
 */
export async function uploadImage(
  key: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      // Cache public images for 1 year
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return `${STORAGE_BASE}/${key}`;
}

/**
 * Deletes a file from Neon Object Storage given its key.
 */
export async function deleteImage(key: string): Promise<void> {
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

/**
 * Extracts the S3 key from a full Neon storage URL.
 * Returns null if the URL doesn't belong to our bucket.
 */
export function urlToKey(url: string): string | null {
  if (!STORAGE_BASE || !url.startsWith(STORAGE_BASE)) return null;
  return url.slice(STORAGE_BASE.length + 1); // strip leading "/"
}
