# Chami Narasinghe — Personal Portfolio

**Engineering with purpose.**

A premium, responsive personal portfolio showcasing my professional experience, academic achievements, certifications, and selected software engineering projects.

## About

I am a Software Engineer based in Matara, Sri Lanka, passionate about building meaningful digital experiences through full-stack development, artificial intelligence, computer vision, and backend engineering.

This portfolio brings together my professional journey, technical capabilities, and commitment to continuous learning.

## Features

- Premium editorial design with burgundy and golden colour accents
- Responsive desktop, tablet, and mobile layouts
- Interactive neural network canvas animation
- Adaptive glass-effect navigation
- Professional experience with expandable role details
- Interactive project carousel with category filtering
- Detailed project preview modals
- Professional certifications and certificate previews
- Downloadable curriculum vitae
- Optimized WebP image assets
- Reduced-motion accessibility support
- SEO metadata and JSON-LD structured data
- Custom favicon and social sharing previews
- Dynamic sitemap and robots configuration

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Application framework |
| React 19 | User interface development |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Styling and responsive layouts |
| Framer Motion | Animations and transitions |
| Canvas API | Interactive neural network visualization |
| Lucide React | Interface icons |
| React Icons | Social and brand icons |
| Sharp | Image optimization and brand asset generation |

## Featured Projects

| Project | Description |
|---|---|
| AYSEL Fashion Store | Premium fashion e-commerce platform |
| ResolveFlow AI | Intelligent support ticket classification |
| Multi-Tenant Webhook Delivery Service | Tenant-aware backend event management service |
| LoanPredictor 360 | Machine learning-based loan eligibility prediction |

## Design System

The visual identity combines premium editorial aesthetics with modern software engineering elements.

| Colour | Hex |
|---|---|
| Deep Burgundy | `#5B0E14` |
| Golden Sand | `#F1E194` |
| Warm Ivory | `#F8F6F0` |
| Charcoal | `#171513` |
| Muted Taupe | `#756A61` |

**Typography:** Playfair Display and DM Sans.

## Performance

Local production Lighthouse audit results:

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 90 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Image asset optimization reduced the combined size of nine original images from 16.07 MB to 0.89 MB — a 94.4% reduction.

Lighthouse results are based on local production testing and may vary across devices, environments, and deployments.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/ChamiNarasinghe/chami-portfolio.git
cd chami-portfolio
```

### Install dependencies

```bash
npm ci
```

### Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production build

```bash
npm run build
npm run start
```

### Code quality checks

```bash
npm run lint
npx tsc --noEmit
```

## Environment Configuration

Copy `.env.example` to `.env.local` and configure the public website URL when deploying.

```env
NEXT_PUBLIC_SITE_URL=
```

The public URL is used for canonical metadata, social sharing images, sitemap generation, and search engine configuration.

## Project Structure

```text
chami-portfolio/
├── public/
│   ├── documents/
│   └── images/
├── scripts/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── animations/
│   │   ├── layout/
│   │   ├── projects/
│   │   ├── sections/
│   │   └── ui/
│   ├── data/
│   └── lib/
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

## Deployment

The portfolio is designed for deployment on Vercel using Next.js production builds.

## Connect With Me

- LinkedIn: https://www.linkedin.com/in/chami-narasinghe/
- GitHub: https://github.com/ChamiNarasinghe
- Email: chaminarasinghe@gmail.com
- Location: Matara, Sri Lanka

## Copyright

Copyright © 2026 Chami Narasinghe. All rights reserved.

Personal photographs, branding, portfolio content, and professional documents are not licensed for unauthorized reuse.

---

Designed and developed by Chami Narasinghe.