import type { Metadata } from "next";
import { TikTok_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { profile } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Masambu",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Masambu",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: { icon: "/images/masambu-logo.svg" },
};

// Applies the saved theme before first paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;if(sessionStorage.getItem("loader-seen")==="1")document.documentElement.dataset.loader="seen"}catch(e){}`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/images/profile-pic.png`,
  jobTitle: "Communications & Creative Professional and Full-Stack Software Engineer",
  description: SITE_DESCRIPTION,
  address: { "@type": "PostalAddress", addressCountry: "UG" },
  knowsAbout: [
    "Communications strategy",
    "Livestream and audio-visual production",
    "Brand and visual identity",
    "Full-stack web development",
    "UI/UX design",
  ],
  sameAs: [profile.linkedin, profile.github],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <div className="glow" aria-hidden />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Fixed overlay; last in the DOM so crawlers reach real content first. */}
        <Loader />
      </body>
    </html>
  );
}
