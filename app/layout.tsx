import type { Metadata } from "next";
import { TikTok_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import "./globals.css";

const sans = TikTok_Sans({
  variable: "--font-sans-var",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Masambu — Communications, Creative & Software Engineering",
    template: "%s — Masambu",
  },
  description:
    "Portfolio of Masambu: 11+ years in communications and creative work, and 3+ years in full-stack software engineering, from Uganda.",
  icons: { icon: "/images/masambu-logo.svg" },
};

// Applies the saved theme before first paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;if(sessionStorage.getItem("loader-seen")==="1")document.documentElement.dataset.loader="seen"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <div className="glow" aria-hidden />
        <Loader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
