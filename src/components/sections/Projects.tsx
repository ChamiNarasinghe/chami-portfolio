
"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type PointerEvent,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";

import {
  projects,
  projectCategories,
  type Project,
} from "@/data/projects";

type Filter = (typeof projectCategories)[number];

export default function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<Filter>("All projects");

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(true);

  const trackRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  });

  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === "All projects" ||
      project.category === activeCategory
  );

const updateScroll = useCallback(() => {
  const track = trackRef.current;

  if (!track) return;

  const maxScroll =
    track.scrollWidth - track.clientWidth;

  const position = track.scrollLeft;

  setCanScrollLeft(position > 2);

  setCanScrollRight(
    position < maxScroll - 2
  );
}, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    track.scrollLeft = 0;

    const frame =
      requestAnimationFrame(updateScroll);

    const observer =
      new ResizeObserver(updateScroll);

    observer.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeCategory, updateScroll]);

  function scrollProjects(direction: number) {
    const track = trackRef.current;

    if (!track) return;

    const card =
      track.querySelector<HTMLElement>(
        ".project-slide"
      );

    if (!card) return;

    const gap =
      parseFloat(
        getComputedStyle(track).columnGap
      ) || 0;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    track.scrollBy({
      left:
        direction *
        (card.getBoundingClientRect().width + gap),

      behavior: reduceMotion ? "instant" : "smooth",
    });
  }

  function handlePointerDown(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0
    ) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest("button, a")) return;

    const track = event.currentTarget;

    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };

    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (!dragRef.current.active) return;

    const track = event.currentTarget;

    const distance =
      event.clientX - dragRef.current.startX;

    if (Math.abs(distance) < 5 &&
        !dragRef.current.moved) {
      return;
    }

    dragRef.current.moved = true;

    track.classList.add("projects-dragging");

    track.scrollLeft =
      dragRef.current.scrollLeft - distance;
  }

  function handlePointerEnd(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (!dragRef.current.active) return;

    const track = event.currentTarget;

    dragRef.current.active = false;

    track.classList.remove("projects-dragging");

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    updateScroll();
  }

  return (
    <section
      id="projects"
      className="projects-section"
      data-nav-theme="light"
      aria-labelledby="projects-heading"
    >
      <div
        className="projects-technical-texture"
        aria-hidden="true"
      />

      <div className="site-container">
        <Reveal>
          <div className="projects-section-header">
            <span className="projects-section-index">
              04 — Selected Work
            </span>

            <span
              className="projects-header-divider"
              aria-hidden="true"
            />

            <span className="projects-section-caption">
              Ideas into reality
            </span>
          </div>
        </Reveal>

        <div className="projects-introduction">
          <div>
            <Reveal delay={0.1}>
              <p className="projects-eyebrow">
                From concept to implementation
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h2
                id="projects-heading"
                className="projects-heading"
              >
                <span>Ideas engineered.</span>
                <em>Solutions realised.</em>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="projects-intro-description">
              A selection of projects exploring
              software engineering, artificial
              intelligence and scalable digital
              solutions through practical
              implementation and experimentation.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <div className="projects-toolbar">
            <div
              className="projects-filters"
              role="group"
              aria-label="Filter projects"
            >
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={
                    activeCategory === category
                  }
                  className={`project-filter ${
                    activeCategory === category
                      ? "project-filter-active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="projects-navigation">
              <span
                className="projects-count"
                aria-live="polite"
              >
                {String(
                  filteredProjects.length
                ).padStart(2, "0")}{" "}
                Projects
              </span>

              <button
                type="button"
                className="projects-arrow"
                aria-label="Previous project"
                disabled={!canScrollLeft}
                onClick={() => scrollProjects(-1)}
              >
                <ArrowLeft size={19} />
              </button>

              <button
                type="button"
                className="projects-arrow projects-arrow-next"
                aria-label="Next project"
                disabled={!canScrollRight}
                onClick={() => scrollProjects(1)}
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Horizontal carousel */}

        <div
          ref={trackRef}
          className="projects-track"
          role="region"
          aria-label="Project carousel"
          tabIndex={0}
          onScroll={updateScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={handlePointerEnd}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) {
              return;
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollProjects(1);
            }

            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollProjects(-1);
            }
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-slide"
            >
              <ProjectCard
                project={project}
                onOpen={setSelectedProject}
              />
            </div>
          ))}
        </div>

  
        <Reveal>
          <div className="projects-footer">
            <p>
              Always learning. Always building.
            </p>

            <a
              href="https://github.com/ChamiNarasinghe"
              target="_blank"
              rel="noopener noreferrer"
              className="projects-github-button"
            >
              <FaGithub size={18} />

              Explore my GitHub

              <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
