import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "upf-robotics-default-secret-change-in-env-production-2025"
);

const SESSION_COOKIE_NAME = "upf_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Seules les routes commençant par /admin sont vérifiées
  if (pathname.startsWith("/admin")) {
    // La page de login est toujours accessible
    if (pathname === "/admin/login") {
      // Si l'utilisateur est déjà authentifié, redirection vers le dashboard
      const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
      if (token) {
        try {
          await jwtVerify(token, JWT_SECRET);
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        } catch {
          // Token expiré ou invalide, laisser sur /admin/login
        }
      }
      return NextResponse.next();
    }

    // Pour toutes les autres pages /admin/*, vérifier la validité du cookie de session
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      // Jeton non valide ou expiré
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
