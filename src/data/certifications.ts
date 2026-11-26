
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  logo: string;
  certificate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
}

export const certifications: Certification[] = [
  {
    id: "ibm-ai",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM",
    issued: "November 2026",
    logo: "/images/certifications/ibm.jfif",
  },
  {
    id: "linkedin-generative-ai",
    title: "Generative AI: From Prompts to Partnership",
    issuer: "LinkedIn",
    issued: "November 2026",
    logo: "/images/certifications/linkedin.jfif",
    skills: ["AI Literacy", "Generative AI"],
  },
  {
    id: "one-million-prompters",
    title: "One Million Prompters – Certificate of Completion",
    issuer: "One Million Prompters Initiative – Dubai",
    issued: "July 2026",
    logo: "/images/certifications/one-million-prompters.webp",
    certificate:
      "/documents/certificates/one-million-prompters.jfif",
    skills: ["Prompt Engineering", "AI Literacy"],
  },
  {
    id: "oracle-database",
    title: "Database Foundations",
    issuer: "Oracle",
    issued: "September 2024",
    logo: "/images/certifications/oracle.jfif",
    certificate:
      "/documents/certificates/database-foundations.jfif",
  },
  {
    id: "postman-student-expert",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Canvas Credentials (Badgr)",
    issued: "August 2024",
    logo: "/images/certifications/badgr.jfif",
    credentialId: "66cda9800ea2cf5db6747b05",
    skills: ["Postman API", "Postman"],
  },
  {
    id: "postman-api-beginner",
    title: "API Beginner Learning Path",
    issuer: "Postman",
    issued: "August 2024",
    logo: "/images/certifications/postman.jfif",
    certificate:
      "/documents/certificates/api-beginner.jfif",
    credentialUrl:
      "https://verify.skilljar.com/c/e6rje49n5mqp",
    skills: ["Postman API", "Postman"],
  },
  {
    id: "moratuwa-python",
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    issued: "June 2024",
    logo: "/images/certifications/moratuwa.jfif",
    certificate:
      "/documents/certificates/python-for-beginners.jfif",
    credentialId: "oErqAzITFj",
    skills: ["Python"],
  },
  {
    id: "moratuwa-web-design",
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    issued: "June 2024",
    logo: "/images/certifications/moratuwa.jfif",
    certificate:
      "/documents/certificates/web-design-for-beginners.jfif",
    credentialId: "azsIpbCBSV",
    skills: ["CSS", "JavaScript"],
  },
];
