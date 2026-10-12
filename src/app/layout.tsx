import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { GlobalBackground } from "@/components/ui/GlobalBackground";
import { Suspense } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Robotics Club UPF | Club de Robotique & IA - Université Privée de Fès",
  description:
    "Club officiel de robotique et d'intelligence artificielle de l'Université Privée de Fès (UPF). Projets mécatroniques, drones autonomes, vision par ordinateur et compétitions d'ingénierie.",
  keywords: [
    "Robotics Club UPF",
    "Robotique Fès",
    "Université Privée de Fès",
    "IA embarquée",
    "ROS 2",
    "Mécatronique Maroc",
  ],
  authors: [{ name: "Robotics Club UPF" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth" data-theme="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('upf_theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.style.colorScheme = 'light';
                } else {
                  // Premier visiteur ou dark : mode sombre par défaut absolu
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.colorScheme = 'dark';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-black transition-colors duration-300">
        <ThemeProvider>
          {/* ── Background Global : robotique.webp ── */}
          <GlobalBackground />

          <Suspense fallback={<div className="h-20" />}>
            <Navbar />
          </Suspense>

          <main className="flex-1 w-full">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
