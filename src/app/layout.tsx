
import type { Metadata } from "next";

import {
  Playfair_Display,
  DM_Sans,
} from "next/font/google";

import { site } from "@/data/site";
import { profile } from "@/data/profile";

import "./globals.css";
import "./navbar.css";
import "./hero-refinement.css";
import "./about.css";
import "./experience.css";
import "./projects.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...(site.url
    ? {
        metadataBase: new URL(site.url),
      }
    : {}),

  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },

  description: site.description,

  applicationName: `${site.name} Portfolio`,

  keywords: [...site.keywords],

  authors: [
    {
      name: site.author,
      url: site.url || undefined,
    },
  ],

  creator: site.author,

  publisher: site.author,

  category: "Technology",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  ...(site.url
    ? {
        alternates: {
          canonical: site.url,
        },
      }
    : {}),

  openGraph: {
    title: site.title,

    description: site.shortDescription,

    type: "website",

    locale: site.locale,

    siteName: `${site.name} Portfolio`,

    url: site.url || undefined,
  },

  twitter: {
    card: "summary_large_image",

    title: site.title,

    description: site.shortDescription,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const structuredData = {
  "@context": "https://schema.org",

  "@type": "Person",

  name: profile.name,

  jobTitle: profile.currentRole,

  description: site.description,

  ...(site.url
    ? {
        "@id": `${site.url}/#person`,
        url: site.url,
        image:
          `${site.url}/images/portraits/about-portrait.webp`,
      }
    : {}),

  address: {
    "@type": "PostalAddress",
    addressLocality: "Matara",
    addressCountry: "LK",
  },

  sameAs: [
    profile.social.linkedin,
    profile.social.github,
  ],

  knowsAbout: [
    "Software Engineering",
    "Full-Stack Development",
    "Artificial Intelligence",
    "Computer Vision",
    "Backend Engineering",
    "React",
    "Next.js",
    "TypeScript",
    "Go",
    "PostgreSQL",
    "REST APIs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={site.language}>
      <body
        className={`${playfair.variable} ${dmSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData
            ).replace(/</g, "\\u003c"),
          }}
        />

        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
