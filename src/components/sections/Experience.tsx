
"use client";

import { useState } from "react";
import Image from "next/image";

import {
  ArrowUpRight,
  MapPin,
  Plus,
  Minus,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import { experiences } from "@/data/experience";

export default function Experience() {
  // All experience roles are collapsed by default.
  const [expandedRoles, setExpandedRoles] = useState<string[]>([]);

  function toggleRole(id: string) {
    setExpandedRoles((previous) =>
      previous.includes(id)
        ? previous.filter((roleId) => roleId !== id)
        : [...previous, id]
    );
  }

  return (
    <section
      id="experience"
      className="experience-section dark-section"
      data-nav-theme="dark"
      aria-labelledby="experience-heading"
    >
      {/* Decorative background */}

      <div
        className="experience-texture"
        aria-hidden="true"
      />

      <div className="site-container experience-container">
        {/* Section header */}

        <Reveal>
          <div className="experience-section-header">
            <span className="experience-section-index">
              03 — Experience
            </span>

            <span
              className="experience-header-divider"
              aria-hidden="true"
            />

            <span className="experience-section-caption">
              The journey so far
            </span>
          </div>
        </Reveal>

        <div className="experience-layout">
          {/* Editorial introduction */}

          <div className="experience-intro">
            <Reveal delay={0.1}>
              <p className="experience-eyebrow">
                Growth through experience
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h2
                id="experience-heading"
                className="experience-heading"
              >
                <span>Building experience.</span>
                <em>Creating impact.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="experience-description">
                My professional journey spans full-stack
                software development, artificial intelligence
                and computer vision, with hands-on experience
                contributing to intelligent systems and
                practical enterprise applications.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <a
                href="#projects"
                className="experience-project-link"
              >
                Explore my work

                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>

          {/* Company experience */}

          <div className="experience-companies">
            {experiences.map((company, companyIndex) => (
              <Reveal
                key={company.id}
                delay={companyIndex * 0.15}
              >
                <article className="experience-company-card">
                  {/* Company header */}

                  <div className="experience-company-header">
                    <div className="experience-company-logo">
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        width={52}
                        height={52}
                        className="experience-logo-image"
                      />
                    </div>

                    <div className="experience-company-information">
                      <h3>{company.name}</h3>

                      <p>
                        {company.employmentType}
                      </p>

                      <span className="experience-company-period">
                        {company.period}
                      </span>
                    </div>

                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="experience-company-link"
                      aria-label={`Visit ${company.name} on LinkedIn`}
                    >
                      <ArrowUpRight
                        size={19}
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  {/* Company location */}

                  {company.location && (
                    <div className="experience-location">
                      <MapPin
                        size={14}
                        aria-hidden="true"
                      />

                      <span>
                        {company.location}

                        {company.workMode &&
                          ` · ${company.workMode}`}
                      </span>
                    </div>
                  )}

                  {/* Career progression timeline */}

                  <div className="experience-role-timeline">
                    {company.roles.map((role) => {
                      const isExpanded =
                        expandedRoles.includes(role.id);

                      return (
                        <div
                          key={role.id}
                          className="experience-role"
                        >
                          {/* Timeline node */}

                          <span
                            className={`experience-role-node ${
                              role.current
                                ? "experience-role-node-current"
                                : ""
                            }`}
                            aria-hidden="true"
                          />

                          {/* Employment period and status */}

                          <div className="experience-role-header">
                            <span className="experience-period">
                              {role.period}
                            </span>

                            {role.current && (
                              <span className="experience-current">
                                <span
                                  className="experience-status-dot"
                                  aria-hidden="true"
                                />

                                Current
                              </span>
                            )}
                          </div>

                          {/* Job title */}

                          <h4 className="experience-role-title">
                            {role.title}
                          </h4>

                          {/* Expandable experience details */}

                          <div
                            id={`details-${role.id}`}
                            className={`experience-details ${
                              isExpanded
                                ? "experience-details-open"
                                : ""
                            }`}
                            aria-hidden={!isExpanded}
                          >
                            <div className="experience-details-inner">
                              {/* Responsibilities */}

                              <ul className="experience-responsibilities">
                                {role.responsibilities.map(
                                  (responsibility) => (
                                    <li key={responsibility}>
                                      {responsibility}
                                    </li>
                                  )
                                )}
                              </ul>

                              {/* Technology stack */}

                              <div className="experience-technologies">
                                {role.technologies.map(
                                  (technology) => (
                                    <span
                                      key={technology}
                                      className="experience-tech-tag"
                                    >
                                      {technology}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Expand / collapse button */}

                          <button
                            type="button"
                            className="experience-expand-button"
                            aria-expanded={isExpanded}
                            aria-controls={`details-${role.id}`}
                            onClick={() => toggleRole(role.id)}
                          >
                            <span>
                              {isExpanded
                                ? "Close details"
                                : "Explore experience"}
                            </span>

                            {isExpanded ? (
                              <Minus
                                size={16}
                                aria-hidden="true"
                              />
                            ) : (
                              <Plus
                                size={16}
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        </div>
                      );
                    })}
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
