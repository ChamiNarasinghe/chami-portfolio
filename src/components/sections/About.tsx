
import Image from "next/image";

import {
  ArrowUpRight,
  GraduationCap,
  CodeXml,
  BrainCircuit,
  ScanEye,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import { academicQualifications } from "@/data/education";

const focusAreas = [
  {
    icon: CodeXml,
    title: "Software Engineering",
  },
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence",
  },
  {
    icon: ScanEye,
    title: "Computer Vision",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="about-heading"
    >
      {/* Decorative background */}
      <div
        className="about-technical-texture"
        aria-hidden="true"
      />

      <div className="site-container">
        {/* Section header */}
        <Reveal>
          <div className="about-section-header">
            <span className="about-section-index">
              01 — About Me
            </span>

            <span
              className="about-header-divider"
              aria-hidden="true"
            />

            <span className="about-section-caption">
              The person behind the code
            </span>
          </div>
        </Reveal>

        {/* Main editorial layout */}
        <div className="about-grid">
          {/* Portrait */}
          <Reveal delay={0.1}>
            <figure className="about-figure">
              <div className="about-image-wrapper">
                <Image
                  src="/images/portraits/about-portrait.webp"
                  alt="Professional portrait of Chami Narasinghe"
                  fill
                  sizes="(max-width: 899px) 100vw, 40vw"
                  className="about-image"
                />
              </div>
            </figure>
          </Reveal>

          {/* Biography */}
          <div className="about-content">
            <Reveal delay={0.15}>
              <p className="about-eyebrow">
                Built on curiosity. Driven by purpose.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h2
                id="about-heading"
                className="about-heading"
              >
                <span>Beyond the code.</span>
                <em>Behind the ideas.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="about-introduction">
                I&apos;m Chami Narasinghe, a software
                engineer exploring the intersection of
                technology, intelligence and meaningful
                digital experiences.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="about-description">
                <p>
                  My interests span software engineering,
                  artificial intelligence and computer
                  vision, with a focus on transforming
                  complex ideas into practical and
                  thoughtful digital solutions.
                </p>

                <p>
                  I believe great engineering begins with
                  curiosity, grows through experimentation
                  and creates value through purposeful
                  innovation.
                </p>
              </div>
            </Reveal>

            {/* Focus areas */}
            <Reveal delay={0.35}>
              <div className="about-focus">
                <span className="about-focus-label">
                  Areas of focus
                </span>

                <div className="about-focus-list">
                  {focusAreas.map((area) => {
                    const Icon = area.icon;

                    return (
                      <div
                        key={area.title}
                        className="about-focus-item"
                      >
                        <Icon
                          size={16}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />

                        <span>{area.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Journey button */}
            <Reveal delay={0.4}>
              <a
                href="#experience"
                className="about-journey-link"
              >
                <span>Explore my journey</span>

                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Academic qualifications */}
        <div className="about-academic">
          <Reveal>
            <div className="academic-header">
              <div>
                <span className="academic-eyebrow">
                  Education / Achievements
                </span>

                <h3>Academic excellence.</h3>
              </div>
            </div>
          </Reveal>

          <div className="academic-grid">
            {academicQualifications.map((qualification, index) => (
              <Reveal
                key={qualification.id}
                delay={index * 0.1}
              >
                <article className="academic-card">
                  <div className="academic-icon">
                    <GraduationCap
                      size={23}
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="academic-information">
                    <h4 className="academic-title">
                      {qualification.title}
                    </h4>

                    <p className="academic-programme">
                      {qualification.programme}
                    </p>

                    <p className="academic-institution">
                      {qualification.institution}
                    </p>

                    <span className="academic-classification">
                      {qualification.classification}
                    </span>
                  </div>

                  <div className="academic-gpa">
                    <strong>{qualification.gpa}</strong>
                    <span>GPA</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
