
export type ProjectCategory =
  | "Full-Stack"
  | "AI & ML"
  | "Backend";

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  image: string;
  imageType: "screenshot" | "concept";
  github: string;
  featured: boolean;
  status?: string;
  period?: string;
  technologies: string[];
  features: string[];
  contributions: string[];
  statistics?: {
    value: string;
    label: string;
  }[];
}

export const projectCategories = [
  "All projects",
  "Full-Stack",
  "AI & ML",
  "Backend",
] as const;

export const projects: Project[] = [
  {
    id: "aysel",
    number: "01",
    title: "AYSEL",
    subtitle: "Premium Fashion E-Commerce Platform",
    category: "Full-Stack",

    description:
      "A premium fashion e-commerce platform combining elegant user experiences with scalable full-stack architecture, authentication and database integration.",

    image: "/images/projects/aysel.webp",
    imageType: "screenshot",

    github:
      "https://github.com/ChamiNarasinghe/aysel-fashion-store",

    featured: true,
    status: "In development",
    period: "November 2026 — Present",

    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Zustand",
      "Supabase",
      "PostgreSQL",
      "Lucide React",
      "Git",
    ],

    features: [
      "Premium responsive fashion storefront.",
      "Product collections and detailed product pages.",
      "Advanced product search, filtering and sorting.",
      "Shopping cart with product variants and quantity management.",
      "Wishlist management.",
      "Customer registration, email verification and authentication.",
      "Supabase database integration with Row Level Security.",
      "Persistent guest shopping cart and wishlist.",
    ],

    contributions: [
      "Full-stack application development.",
      "Reusable component architecture and responsive UI implementation.",
      "Authentication and database integration.",
      "Client-side state management using Zustand.",
      "Password-reset functionality under development and testing.",
      "Account-based cart and wishlist synchronization planned.",
    ],
  },

  {
    id: "resolveflow",
    number: "02",
    title: "ResolveFlow AI",
    subtitle: "Intelligent Support Ticket Classification",
    category: "AI & ML",

    description:
      "An AI-powered customer support ticket classification system designed to automate categorization, priority detection and sentiment analysis.",

    image: "/images/projects/resolveflow-ai.webp",
    imageType: "concept",

    github:
      "https://github.com/ChamiNarasinghe/ResolveFlow-AI",

    featured: false,

    technologies: [
      "Python",
      "FastAPI",
      "Go",
      "PostgreSQL",
      "NLP",
      "Machine Learning",
      "REST APIs",
      "Git",
    ],

    features: [
      "Automated customer support ticket classification.",
      "Four ticket categories: Billing, Technical Support, Account and General Inquiry.",
      "Four priority levels: Low, Medium, High and Urgent.",
      "Positive, negative and neutral sentiment classification.",
      "Group-aware dataset splitting to prevent scenario leakage.",
      "AI classification service and backend integration.",
    ],

    contributions: [
      "Created and managed synthetic customer support datasets.",
      "Prepared category, priority and sentiment labels.",
      "Performed dataset expansion, correction and quality auditing.",
      "Designed group-aware training, validation and testing splits.",
      "Contributed to Python FastAPI and Go backend integration.",
    ],

    statistics: [
      {
        value: "1,597",
        label: "Support tickets",
      },
      {
        value: "128",
        label: "Scenario groups",
      },
      {
        value: "4",
        label: "Categories",
      },
      {
        value: "4",
        label: "Priority levels",
      },
      {
        value: "3",
        label: "Sentiment classes",
      },
    ],
  },

  {
    id: "webhook-service",
    number: "03",
    title: "Webhook Delivery Service",
    subtitle: "Multi-Tenant Event-Driven Backend",
    category: "Backend",

    description:
      "A Go-based backend service providing a foundation for multi-tenant webhook event processing, persistent event storage and delivery-attempt tracking.",

    image: "/images/projects/webhook-service.webp",
    imageType: "concept",

    github:
      "https://github.com/ChamiNarasinghe/webhook-delivery-service",

    featured: false,

    technologies: [
      "Go",
      "PostgreSQL 17",
      "Docker",
      "REST APIs",
      "SQL",
      "Git",
      "API Testing",
      "Event-Driven Architecture",
    ],

    features: [
      "REST API for receiving webhook events.",
      "Multi-tenant event handling with tenant identification.",
      "Persistent event storage using PostgreSQL.",
      "Event status management.",
      "Delivery-attempt tracking.",
      "Separate events and delivery_attempts database tables.",
      "Docker-based PostgreSQL development environment.",
      "Automated testing of internal service components.",
    ],

    contributions: [
      "Designed and implemented backend API functionality using Go.",
      "Developed database models and PostgreSQL integration.",
      "Implemented tenant-aware event processing.",
      "Created event persistence and delivery-attempt tracking.",
      "Configured a containerized development environment.",
      "Performed API and backend testing.",
    ],
  },

  {
    id: "loanpredictor",
    number: "04",
    title: "LoanPredictor 360",
    subtitle: "Machine Learning Loan Eligibility Prediction",
    category: "AI & ML",

    description:
      "A collaborative machine learning project using a Decision Tree classifier and a Streamlit interface to explore loan eligibility prediction.",

    image: "/images/projects/loanpredictor-360.webp",
    imageType: "concept",

    github:
      "https://github.com/ChamiNarasinghe/Loan-Predication-Model-",

    featured: false,

    technologies: [
      "Python",
      "Streamlit",
      "Decision Tree",
      "Machine Learning",
    ],

    features: [
      "Decision Tree-based eligibility prediction.",
      "Interactive Streamlit application.",
      "Applicant and financial information inputs.",
      "Prediction based on income, loan amount, credit history and other applicant features.",
    ],

    contributions: [
      "Collaborative machine learning application development.",
      "Worked on a Decision Tree classification solution.",
      "Contributed to an interactive prediction interface.",
      "Explored practical applications of machine learning in financial services.",
    ],
  },
];
