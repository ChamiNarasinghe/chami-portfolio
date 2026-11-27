
"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowUpRight, Download } from "lucide-react";

import { NAV_LINKS } from "@/lib/constants";
import { profile } from "@/data/profile";

const MOBILE_NAV_EXIT_DURATION_MS = 250;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({
  isOpen,
  onClose,
}: MobileNavProps) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const isMountedRef = useRef(isOpen);
  const exitTimerRef = useRef<number | null>(null);
  const enterFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    if (enterFrameRef.current !== null) {
      window.cancelAnimationFrame(enterFrameRef.current);
      enterFrameRef.current = null;
    }

    if (isOpen) {
      isMountedRef.current = true;
      const reduceMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      enterFrameRef.current =
        window.requestAnimationFrame(() => {
          setIsMounted(true);

          if (reduceMotion) {
            setIsVisible(true);
            enterFrameRef.current = null;
          } else {
            enterFrameRef.current =
              window.requestAnimationFrame(() => {
                setIsVisible(true);
                enterFrameRef.current = null;
              });
          }
        });
    } else if (isMountedRef.current) {
      const reduceMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      enterFrameRef.current =
        window.requestAnimationFrame(() => {
          setIsVisible(false);
          enterFrameRef.current = null;

          if (reduceMotion) {
            isMountedRef.current = false;
            setIsMounted(false);
          } else {
            exitTimerRef.current = window.setTimeout(() => {
              isMountedRef.current = false;
              setIsMounted(false);
              exitTimerRef.current = null;
            }, MOBILE_NAV_EXIT_DURATION_MS);
          }
        });
    }

    return () => {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }

      if (enterFrameRef.current !== null) {
        window.cancelAnimationFrame(enterFrameRef.current);
        enterFrameRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <nav
      id="mobile-navigation"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`mobile-navigation ${
        isVisible ? "mobile-navigation--visible" : ""
      }`}
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
    </nav>
  );
}
