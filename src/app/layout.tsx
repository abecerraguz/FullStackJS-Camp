import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack.abecerraguz.com";
const SITE_NAME = "FullStackJS Camp";
const SITE_DESCRIPTION =
  "Programa formativo Desarrollo de Aplicaciones Full Stack JavaScript — 9 módulos desde fundamentos hasta despliegue en nube.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Full Stack JavaScript Trainee · FullStackJS Camp",
    template: "%s · Full Stack JS",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "full stack",
    "javascript",
    "react",
    "next.js",
    "node.js",
    "postgresql",
    "docker",
    "programación",
    "desarrollo web",
    "trainee",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": 150,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE_NAME,
    title: "Full Stack JavaScript Trainee · FullStackJS Camp",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Stack JavaScript Trainee · FullStackJS Camp",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-background text-foreground">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
