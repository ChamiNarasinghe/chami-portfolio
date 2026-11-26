
import { profile } from "./profile";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "";

export const site = {
  name: profile.name,

  title: "Chami Narasinghe | Software Engineer",

  description:
    "Chami Narasinghe is a Software Engineer based in Sri Lanka, with practical experience in full-stack development, artificial intelligence, computer vision, and backend engineering. Explore her professional experience, technical expertise, and software engineering projects.",

  shortDescription:
    "Engineering with purpose. Explore my professional experience, technical expertise, and selected software engineering projects.",

  url: siteUrl,

  locale: "en_US",

  language: "en",

  author: profile.name,

  email: "chaminarasinghe@gmail.com",

  keywords: [
    "Chami Narasinghe",
    "Chami Narasinghe Portfolio",
    "Software Engineer",
    "Associate Software Engineer",
    "Software Engineer Sri Lanka",
    "Software Developer",
    "Full Stack Developer",
    "Full Stack Development",
    "Artificial Intelligence",
    "Computer Vision",
    "Machine Learning",
    "Backend Engineering",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Go Developer",
    "Matara",
    "Sri Lanka",
  ],

  social: profile.social,
} as const;
