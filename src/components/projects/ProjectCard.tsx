
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onOpen,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <div
        className="project-image-wrapper"
        data-nav-theme={
          project.imageType === "concept" ? "dark" : "light"
        }
      >
        <Image
          src={project.image}
          alt={`${project.title} ${
            project.imageType === "concept"
              ? "concept illustration"
              : "application screenshot"
          }`}
          fill
          sizes="(max-width: 599px) 85vw, (max-width: 1023px) 55vw, 40vw"
          className="project-image"
          draggable={false}
        />

        {project.featured && (
          <span className="project-featured-label">
            Featured project
          </span>
        )}

        {project.imageType === "concept" && (
          <span className="project-image-caption">
            Concept illustration
          </span>
        )}
      </div>

      <div className="project-content">
        <div className="project-meta">
          <span>
            {project.number} / {project.category}
          </span>

          {project.status && (
            <span className="project-status">
              <span aria-hidden="true" />
              {project.status}
            </span>
          )}
        </div>

        <h3 className="project-title">
          {project.title}
        </h3>

        <p className="project-subtitle">
          {project.subtitle}
        </p>

        <p className="project-description">
          {project.description}
        </p>

        <div className="project-technologies">
          {project.technologies
            .slice(0, 4)
            .map((technology) => (
              <span
                key={technology}
                className="project-tech-tag"
              >
                {technology}
              </span>
            ))}

          {project.technologies.length > 4 && (
            <span className="project-tech-more">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="project-actions">
          <button
            type="button"
            className="project-case-button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
          >
            View case study

            <ArrowUpRight
              size={16}
              aria-hidden="true"
            />
          </button>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-github-link"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub
              size={19}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}
