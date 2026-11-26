
import {
  Monitor,
  Server,
  Database,
  LayoutTemplate,
  BrainCircuit,
  ScanLine,
} from "lucide-react";

export const services = [
  {
    id: "web-applications",
    number: "01",
    title: "Web Applications",
    description:
      "Modern, responsive web applications built with React, Next.js and TypeScript, focusing on maintainable and scalable architecture.",
    icon: Monitor,
  },
  {
    id: "api-development",
    number: "02",
    title: "API Development",
    description:
      "Well-structured backend systems and RESTful APIs using Go, Node.js and Spring Boot to support reliable application integrations.",
    icon: Server,
  },
  {
    id: "database-engineering",
    number: "03",
    title: "Database Engineering",
    description:
      "Data modelling, database integration and structured data management using PostgreSQL, MongoDB, MySQL and Supabase.",
    icon: Database,
  },
  {
    id: "ui-ux",
    number: "04",
    title: "UI/UX Implementation",
    description:
      "Responsive and accessible interfaces that translate design concepts into functional experiences using reusable components.",
    icon: LayoutTemplate,
  },
  {
    id: "artificial-intelligence",
    number: "05",
    title: "AI & Machine Learning",
    description:
      "Intelligent software solutions involving machine learning, natural language processing, classification and predictive modelling.",
    icon: BrainCircuit,
  },
  {
    id: "computer-vision",
    number: "06",
    title: "Computer Vision",
    description:
      "Image analysis and intelligent document processing involving document detection, corner detection, glare segmentation and occlusion detection.",
    icon: ScanLine,
  },
];
