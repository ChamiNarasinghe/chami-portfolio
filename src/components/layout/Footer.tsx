
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import { contact } from "@/data/contact";

import "@/app/footer.css";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="portfolio-footer dark-section"
      data-nav-theme="dark"
    >
      <div className="site-container footer-container">
        <div className="footer-main">
          {/* Personal branding */}

          <div className="footer-brand">
            <a
              href="#home"
              className="footer-brand-name"
              aria-label="Chami Narasinghe — Home"
            >
              Chami<span>.</span>
            </a>

            <p className="footer-tagline">
              Engineering with purpose.
            </p>

            <p className="footer-brand-description">
              Software engineering, artificial intelligence
              and meaningful digital experiences.
            </p>

            {/* Social links */}

            <div className="footer-socials">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <FaLinkedinIn size={17} />
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <FaGithub size={18} />
              </a>

              <a
                href={`mailto:${contact.email}`}
                aria-label="Send an email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Navigation */}

          <nav
            className="footer-navigation"
            aria-label="Footer navigation"
          >
            <h2 className="footer-column-heading">
              Explore
            </h2>

            <div className="footer-navigation-links">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Contact information */}

          <div className="footer-contact">
            <h2 className="footer-column-heading">
              Get in touch
            </h2>

            <a
              href={`mailto:${contact.email}`}
              className="footer-email"
            >
              {contact.email}
            </a>

            <p className="footer-location">
              {contact.location}
            </p>

            <a
              href="#contact"
              className="footer-contact-link"
            >
              Let&apos;s connect

              <ArrowUpRight
                size={15}
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Back to top */}

          <div className="footer-back-to-top">
            <a
              href="#home"
              className="footer-top-button"
              aria-label="Back to top"
            >
              <ArrowUp
                size={21}
                aria-hidden="true"
              />
            </a>

            <span>Back to top</span>
          </div>
        </div>

        {/* Footer bottom */}

        <div className="footer-bottom">
          <p>
            © {currentYear} {contact.name}. All rights reserved.
          </p>

          <p className="footer-credit">
            Designed & developed with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
