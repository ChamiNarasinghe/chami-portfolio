
import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";

import { getImageProps } from "next/image";

import NeuralNetwork from "@/components/animations/NeuralNetwork";
import { profile } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Hero() {
  const { props: desktopImage } = getImageProps({
    src: "/images/portraits/hero-desktop.webp",
    alt: "",
    width: 1648,
    height: 928,
    sizes: "100vw",
    quality: 90,
  });

  const { props: mobileImage } = getImageProps({
    src: "/images/portraits/hero-mobile.webp",
    alt: "",
    width: 928,
    height: 1648,
    sizes: "100vw",
    quality: 90,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <section
      id="home"
      className="hero-section"
      data-nav-theme="dark"
      aria-labelledby="hero-heading"
    >
      {/* Responsive editorial photography */}

      <div
        className="hero-background"
        aria-hidden="true"
      >
        <picture>
          <source
            media="(min-width: 900px)"
            srcSet={desktopImage.srcSet}
            sizes="100vw"
          />

          <img
            {...mobileImage}
            alt=""
            className="hero-image"
          />
        </picture>
      </div>

      {/* Contrast overlay */}

      <div
        className="hero-overlay"
        aria-hidden="true"
      />

      {/* Interactive neural network animation */}

      <NeuralNetwork />

      {/* Main content */}

      <div className="site-container hero-container">
        <div className="hero-content">
          <Reveal immediate delay={0.05}>
            <div className="hero-identity">
              <span className="hero-identity-line" />

              <span>{profile.name}</span>

              <span className="hero-identity-line" />
            </div>
          </Reveal>

          <Reveal immediate delay={0.12}>
            <p className="hero-role">
              {profile.role}

              <span
                className="hero-role-dot"
                aria-hidden="true"
              />

              Sri Lanka
            </p>
          </Reveal>

          <Reveal immediate delay={0.2}>
            <h1
              id="hero-heading"
              className="hero-heading"
            >
              <span>Engineering</span>

              <em>with purpose.</em>
            </h1>
          </Reveal>

          <Reveal immediate delay={0.3}>
            <p className="hero-description">
              Building meaningful digital experiences
              through software engineering, artificial
              intelligence and computer vision.
            </p>
          </Reveal>

          <Reveal immediate delay={0.4}>
            <div className="hero-actions">
              <a
                href="#projects"
                className="btn btn-accent hero-primary-button"
              >
                Explore My Work

                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                />
              </a>

              <a
                href="#contact"
                className="btn btn-outline hero-secondary-button"
              >
                Contact Me
              </a>
            </div>
          </Reveal>

          <Reveal immediate delay={0.5}>
            <SocialLinks
              variant="dark"
              className="hero-social-links"
            />
          </Reveal>
        </div>
      </div>

      {/* Desktop scroll indicator */}

      <a
        href="#about"
        className="hero-scroll-link"
        aria-label="Scroll to About Me"
      >
        <span>Discover more</span>

        <ArrowDown
          size={15}
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
