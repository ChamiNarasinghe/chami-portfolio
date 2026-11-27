
export interface ExperienceRole {
  id: string;
  title: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  technologies: string[];
}

export interface ExperienceCompany {
  id: string;
  name: string;
  logo: string;
  website: string;
  employmentType: string;
  period: string;
  location?: string;
  workMode?: string;
  roles: ExperienceRole[];
}

export const experiences: ExperienceCompany[] = [
  {
    id: "botcalm",
    name: "BotCalm",
    logo: "/images/companies/botcalm.webp",
    website: "https://www.linkedin.com/company/96096906/",
    employmentType: "Full-time",
    period: "September 2025 — Present",

    roles: [
      {
        id: "botcalm-associate",
        title: "Associate Software Engineer",
        period: "September 2026 — Present",
        current: true,

        responsibilities: [
          "Contribute to the development of full-stack web applications using React, Next.js, TypeScript, Node.js, and Go.",

          "Develop and integrate REST APIs and work with PostgreSQL and MongoDB databases.",

          "Contribute to asset management and compliance management systems.",

          "Collaborate on software development, debugging, and system improvements.",
        ],

        technologies: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "Go",
          "REST APIs",
          "PostgreSQL",
          "MongoDB",
        ],
      },

      {
        id: "botcalm-ai-intern",
        title: "Intern – AI Solutions Architect",
        period: "September 2025 — September 2026",
        current: false,

        responsibilities: [
          "Contributed to AI-powered KYC and identity document processing solutions.",

          "Worked on computer vision workflows, including document detection, corner detection, glare segmentation, and occlusion detection.",

          "Participated in data collection, annotation, model training, testing, and evaluation.",

          "Researched OCR technologies and barcode/document extraction techniques.",
        ],

        technologies: [
          "Artificial Intelligence",
          "Computer Vision",
          "KYC",
          "OCR",
          "Document Processing",
          "Image Segmentation",
          "Model Training",
          "Go",
        ],
      },
    ],
  },

  {
    id: "sri-lanka-telecom",
    name: "Sri Lanka Telecom",
    logo: "/images/companies/slt.png",
    website: "https://www.linkedin.com/company/166104/",
    employmentType: "Internship",
    period: "November 2024 — May 2025",
    location: "Colombo, Sri Lanka",
    workMode: "Hybrid",

    roles: [
      {
        id: "slt-fullstack-intern",
        title: "Software Engineer Intern – Full-Stack Development",
        period: "November 2024 — May 2025",
        current: false,

        responsibilities: [
          "Contributed to the development of internal digital systems, including Incident Management and Internship Management applications.",

          "Worked with Java, JavaScript, React, Spring Boot, and MySQL.",

          "Participated in frontend and backend development activities.",

          "Used GitHub, Jira, Trello, Postman, and Figma during development and collaboration.",

          "Collaborated with team members throughout the software development lifecycle.",
        ],

        technologies: [
          "Java",
          "JavaScript",
          "React",
          "Spring Boot",
          "MySQL",
          "GitHub",
          "Jira",
          "Trello",
          "Postman",
          "Figma",
        ],
      },
    ],
  },
];
