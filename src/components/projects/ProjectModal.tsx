
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { X, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  const dialogRef =
    useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const previousOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    const previousFocus =
      document.activeElement;

    dialog.showModal();

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow =
      "hidden";

    return () => {
      dialog.close();

      document.body.style.overflow =
        previousOverflow;

      document.documentElement.style.overflow =
        previousHtmlOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus({
          preventScroll: true,
        });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="project-modal-panel">
        <header className="project-modal-header">
          <span>
            Project / {project.number} — Case Study
          </span>

          <button
            type="button"
            className="project-modal-close"
            aria-label="Close case study"
            onClick={onClose}
            autoFocus
          >
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        <div className="project-modal-body">
          <div className="project-modal-intro">
            <span className="project-modal-category">
              {project.category}
              {project.status &&
                ` · ${project.status}`}
            </span>

            <h2 id="project-modal-title">
              {project.title}
            </h2>

            <p className="project-modal-subtitle">
              {project.subtitle}
            </p>

            {project.period && (
              <p className="project-modal-period">
                {project.period}
              </p>
            )}
          </div>

          <div className="project-modal-image">
            <Image
              src={project.image}
              alt={`${project.title} ${
                project.imageType === "concept"
                  ? "concept illustration"
                  : "application screenshot"
              }`}
              fill
              sizes="(max-width: 900px) 90vw, 850px"
              className="project-modal-visual"
            />

            {project.imageType === "concept" && (
              <span className="project-image-caption">
                Concept illustration
              </span>
            )}
          </div>

          <p className="project-modal-description">
            {project.description}
          </p>

          {project.imageType === "concept" && (
            <p className="project-concept-note">
              This visual is a conceptual
              illustration, not an actual
              application screenshot. Illustrative
              metrics do not represent measured
              project results.
            </p>
          )}

          {project.statistics && (
            <div className="project-statistics">
              {project.statistics.map((statistic) => (
                <div
                  key={statistic.label}
                  className="project-statistic"
                >
                  <strong>{statistic.value}</strong>
                  <span>{statistic.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="project-modal-details">
            <section className="project-detail-section">
              <h3>Key features</h3>

              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>

            <section className="project-detail-section">
              <h3>My contributions</h3>

              <ul>
                {project.contributions.map(
                  (contribution) => (
                    <li key={contribution}>
                      {contribution}
                    </li>
                  )
                )}
              </ul>
            </section>
          </div>

          <section className="project-modal-stack">
            <h3>Technology stack</h3>

            <div className="project-technologies">
              {project.technologies.map(
                (technology) => (
                  <span
                    key={technology}
                    className="project-tech-tag"
                  >
                    {technology}
                  </span>
                )
              )}
            </div>
          </section>

          <div className="project-modal-footer">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="projects-github-button"
            >
              <FaGithub size={19} />
              View source code
              <ArrowUpRight size={16} />
            </a>

            <button
              type="button"
              className="project-modal-back"
              onClick={onClose}
            >
              Back to projects
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
