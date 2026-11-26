
"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

import { NAV_LINKS } from "@/lib/constants";
import { profile } from "@/data/profile";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({
  isOpen,
  onClose,
}: MobileNavProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: -12 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -12 }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.25,
          }}
          className="mobile-navigation"
        >
          <div className="site-container">
            <p className="eyebrow mobile-menu-label">
              Navigation
            </p>

            <div className="mobile-nav-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="mobile-nav-link"
                >
                  <span className="mobile-nav-number">
                    {link.number}
                  </span>

                  <span>{link.label}</span>

                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>

            <a
              href={profile.cv}
              download
              onClick={onClose}
              className="btn btn-primary mobile-cv-button"
            >
              Download CV
              <Download size={16} aria-hidden="true" />
            </a>

            <p className="mobile-menu-location">
              {profile.location}
            </p>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
