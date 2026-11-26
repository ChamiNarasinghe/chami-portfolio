
"use client";

import type { MouseEvent } from "react";

import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/services";

import "@/app/services.css";

export default function Services() {
  function handleMouseMove(
    event: MouseEvent<HTMLElement>
  ) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );

    card.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );
  }

  return (
    <section
      id="services"
      className="services-section"
      data-nav-theme="light"
      aria-labelledby="services-heading"
    >
      <div
        className="services-texture"
        aria-hidden="true"
      />

      <div className="site-container services-container">
        {/* Section header */}

        <Reveal>
          <div className="services-header">
            <span className="services-section-index">
              02 — Services
            </span>

            <span
              className="services-header-divider"
              aria-hidden="true"
            />

            <span className="services-section-caption">
              What I do
            </span>
          </div>
        </Reveal>

        {/* Introduction */}

        <div className="services-intro">
          <Reveal delay={0.1}>
            <p className="services-eyebrow">
              Expertise in action
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h2
              id="services-heading"
              className="services-heading"
            >
              <span>From ideas to solutions.</span>
              <em>Built with purpose.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="services-description">
              Combining software engineering, intelligent
              technologies and thoughtful design to create
              meaningful digital experiences and practical
              solutions.
            </p>
          </Reveal>
        </div>

        {/* Services grid */}

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal
                key={service.id}
                delay={0.08 * (index % 3)}
              >
                <article
                  className="service-card"
                  onMouseMove={handleMouseMove}
                >
                  <div
                    className="service-card-glow"
                    aria-hidden="true"
                  />

                  <div className="service-card-content">
                    <div className="service-card-header">
                      <div className="service-icon">
                        <Icon
                          size={25}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </div>

                      <span className="service-number">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="service-title">
                      {service.title}
                    </h3>

                    <p className="service-description">
                      {service.description}
                    </p>

                    <div
                      className="service-card-line"
                      aria-hidden="true"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
