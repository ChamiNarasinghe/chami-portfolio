import Image from "next/image";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Download,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import Reveal from "@/components/ui/Reveal";
import { contact } from "@/data/contact";

import "@/app/contact.css";

export default function Contact() {
  const contactLinks = [
    {
      id: "email",
      label: "Email me",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: Mail,
      external: false,
    },
    {
      id: "linkedin",
      label: "Connect on LinkedIn",
      value: "Let's connect professionally",
      href: contact.linkedin,
      icon: FaLinkedinIn,
      external: true,
    },
    {
      id: "github",
      label: "Explore my GitHub",
      value: "Discover my projects and code",
      href: contact.github,
      icon: FaGithub,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      className="contact-section dark-section"
      data-nav-theme="dark"
      aria-labelledby="contact-heading"
    >
      {/* Decorative background */}

      <div
        className="contact-texture"
        aria-hidden="true"
      />

      <div
        className="contact-background-glow"
        aria-hidden="true"
      />

      <div className="site-container contact-container">
        {/* Section header */}

        <Reveal>
          <div className="contact-section-header">
            <span className="contact-section-index">
              06 — Contact
            </span>

            <span
              className="contact-header-divider"
              aria-hidden="true"
            />

            <span className="contact-section-caption">
              Let&apos;s connect
            </span>
          </div>
        </Reveal>

        <div className="contact-layout">
          {/* Contact information */}

          <div className="contact-content">
            <Reveal delay={0.1}>
              <div className="contact-eyebrow">
                <span
                  className="contact-eyebrow-dot"
                  aria-hidden="true"
                />

                I&apos;m always open to new opportunities.
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h2
                id="contact-heading"
                className="contact-heading"
              >
                <span>Let&apos;s build something</span>

                <em>meaningful.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="contact-description">
                Have an interesting project, professional
                opportunity or idea to discuss? I&apos;m always
                interested in connecting with people who
                share a passion for technology, innovation
                and meaningful digital experiences.
              </p>
            </Reveal>

            {/* Contact links */}

            <div className="contact-links">
              {contactLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal
                    key={item.id}
                    delay={0.25 + index * 0.08}
                  >
                    <a
                      href={item.href}
                      target={
                        item.external ? "_blank" : undefined
                      }
                      rel={
                        item.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="contact-link"
                    >
                      <div className="contact-link-icon">
                        <Icon
                          size={20}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="contact-link-content">
                        <span className="contact-link-label">
                          {item.label}
                        </span>

                        <span className="contact-link-value">
                          {item.value}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={20}
                        className="contact-link-arrow"
                        aria-hidden="true"
                      />
                    </a>
                  </Reveal>
                );
              })}
            </div>

            {/* Location */}

            <Reveal delay={0.45}>
              <div className="contact-location">
                <MapPin
                  size={17}
                  aria-hidden="true"
                />

                <span>{contact.location}</span>
              </div>
            </Reveal>

            {/* Download CV */}

            <Reveal delay={0.5}>
              <div className="contact-actions">
                <a
                  href={contact.cv}
                  download="Chami-Narasinghe-CV.pdf"
                  className="contact-cv-button"
                >
                  Download my CV

                  <Download
                    size={18}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Professional portrait */}

          <Reveal delay={0.2}>
            <div className="contact-portrait-wrapper">
              <div
                className="contact-portrait-frame"
                aria-hidden="true"
              />

              <div className="contact-portrait-card">
                <div className="contact-portrait-image-wrapper">
                  <Image
                    src={contact.portrait}
                    alt="Chami Narasinghe, Software Engineer"
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 480px"
                    className="contact-portrait-image"
                  />
                </div>
              </div>

              <div
                className="contact-portrait-decoration"
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
