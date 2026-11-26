
"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

import { ArrowUpRight, Menu, X } from "lucide-react";

import Logo from "./Logo";
import MobileNav from "./MobileNav";

import { NAV_LINKS } from "@/lib/constants";
import { profile } from "@/data/profile";
import "@/app/navbar.css";

type GlassTheme = "dark" | "light";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [glassTheme, setGlassTheme] =
    useState<GlassTheme>("dark");

  const [activeSection, setActiveSection] =
    useState("#home");

  const headerRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const hoveredRef = useRef<HTMLAnchorElement | null>(null);
  const themeRef = useRef<GlassTheme>("dark");

  /* =========================================
     ADAPTIVE BACKGROUND & ACTIVE SECTION
  ========================================= */

  useEffect(() => {
    let frame = 0;

    function detectTheme(
      x: number,
      y: number
    ): GlassTheme | null {
      const background = document
        .elementsFromPoint(x, y)
        .find(
          (element) =>
            !headerRef.current?.contains(element) &&
            element.closest("main, footer, section")
        );

      if (!background) return null;

      const explicit = background.closest<HTMLElement>(
        "[data-nav-theme]"
      )?.dataset.navTheme;

      if (explicit === "dark" || explicit === "light") {
        return explicit;
      }

      return background.closest(
        ".hero-section, .dark-section, .integrated-expertise"
      )
        ? "dark"
        : "light";
    }

    function update() {
      frame = 0;

      setIsScrolled(window.scrollY > 30);

      const bounds =
        shellRef.current?.getBoundingClientRect();

      if (!bounds) return;

      /* Active section */

      let current = "#home";

      for (const link of NAV_LINKS) {
        const section = document.getElementById(
          link.href.replace(/^#/, "")
        );

        if (
          section &&
          section.getBoundingClientRect().top <=
            bounds.bottom + 40
        ) {
          current = link.href;
        }
      }

      const last = NAV_LINKS[NAV_LINKS.length - 1];

      if (
        last &&
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 5
      ) {
        current = last.href;
      }

      setActiveSection(current);

      /* Multi-point background sampling */

      const points = [0.2, 0.5, 0.8];

      const y = Math.min(
        window.innerHeight - 1,
        bounds.top + bounds.height / 2
      );

      let darkVotes = 0;
      let lightVotes = 0;

      for (const point of points) {
        const x = bounds.left + bounds.width * point;
        const theme = detectTheme(x, y);

        if (theme === "dark") darkVotes++;
        if (theme === "light") lightVotes++;
      }

      let nextTheme = themeRef.current;

      if (window.scrollY < 20) {
        nextTheme = "dark";
      } else if (darkVotes > lightVotes) {
        nextTheme = "dark";
      } else if (lightVotes > darkVotes) {
        nextTheme = "light";
      }

      if (nextTheme !== themeRef.current) {
        themeRef.current = nextTheme;
        setGlassTheme(nextTheme);
      }
    }

    function schedule() {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    }

    schedule();

    window.addEventListener("scroll", schedule, {
      passive: true,
    });

    window.addEventListener("resize", schedule);

    const observer = new ResizeObserver(schedule);

    observer.observe(document.body);

    if (shellRef.current) {
      observer.observe(shellRef.current);
    }

    return () => {
      cancelAnimationFrame(frame);

      observer.disconnect();

      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  /* =========================================
     MOBILE MENU SCROLL LOCK
  ========================================= */

  useEffect(() => {
    if (!isMenuOpen) return;

    const body = document.body;
    const html = document.documentElement;

    const previousBody = body.style.overflow;
    const previousHtml = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    body.classList.add("mobile-nav-open");

    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    const previousMainInert = main?.inert;
    const previousFooterInert = footer?.inert;

    if (main) main.inert = true;
    if (footer) footer.inert = true;

    return () => {
      body.style.overflow = previousBody;
      html.style.overflow = previousHtml;

      body.classList.remove("mobile-nav-open");

      if (main) {
        main.inert = previousMainInert ?? false;
      }

      if (footer) {
        footer.inert = previousFooterInert ?? false;
      }
    };
  }, [isMenuOpen]);

  /* =========================================
     MOBILE KEYBOARD ACCESSIBILITY
  ========================================= */

  useEffect(() => {
    if (!isMenuOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key === "Tab") {
        const focusable = headerRef.current
          ?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex="0"]'
          );

        if (!focusable) return;

        const visible = Array.from(focusable).filter(
          (element) =>
            element.getClientRects().length > 0 &&
            !element.closest("[inert]")
        );

        const first = visible[0];
        const last = visible[visible.length - 1];

        if (!first || !last) return;

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  /* =========================================
     RESPONSIVE MENU RESET
  ========================================= */

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px)"
    );

    function resize() {
      if (media.matches) {
        setIsMenuOpen(false);
      }

      hoveredRef.current = null;
    }

    media.addEventListener("change", resize);

    return () => {
      media.removeEventListener("change", resize);
    };
  }, []);

  /* =========================================
     SLIDING GLASS LENS
  ========================================= */

  function moveLens(element: HTMLElement | null) {
    const nav = navigationRef.current;
    const lens = lensRef.current;

    if (!nav || !lens) return;

    if (!element || !element.offsetWidth) {
      lens.style.opacity = "0";
      return;
    }

    const navBounds = nav.getBoundingClientRect();
    const elementBounds =
      element.getBoundingClientRect();

    lens.style.width = `${elementBounds.width}px`;
    lens.style.height = `${elementBounds.height}px`;

    lens.style.transform = `translate3d(
      ${elementBounds.left - navBounds.left}px,
      ${elementBounds.top - navBounds.top}px,
      0
    )`;

    lens.style.opacity = "1";
  }

  function restoreLens() {
    const nav = navigationRef.current;
    const focused = document.activeElement;

    moveLens(
      hoveredRef.current ??
        (focused instanceof HTMLAnchorElement &&
        nav?.contains(focused)
          ? focused
          : nav?.querySelector<HTMLElement>(
              '[aria-current="location"]'
            ) ?? null)
    );
  }

  useEffect(() => {
    const nav = navigationRef.current;

    function sync() {
      const focused = document.activeElement;

      moveLens(
        hoveredRef.current ??
          (focused instanceof HTMLAnchorElement &&
          nav?.contains(focused)
            ? focused
            : nav?.querySelector<HTMLElement>(
                '[aria-current="location"]'
              ) ?? null)
      );
    }

    const frame = requestAnimationFrame(sync);
    const observer = new ResizeObserver(sync);

    if (nav) observer.observe(nav);

    window.addEventListener("resize", sync);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();

      window.removeEventListener("resize", sync);
    };
  }, [activeSection, isScrolled]);

  /* =========================================
     POINTER REFLECTION
  ========================================= */

  function reflect(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const shell = event.currentTarget;
    const rect = shell.getBoundingClientRect();

    shell.style.setProperty(
      "--pointer-x",
      `${event.clientX - rect.left}px`
    );

    shell.style.setProperty(
      "--pointer-y",
      `${event.clientY - rect.top}px`
    );

    shell.style.setProperty(
      "--reflection-opacity",
      "1"
    );
  }

  function closeMenu(restoreFocus = false) {
    setIsMenuOpen(false);

    if (restoreFocus) {
      menuButtonRef.current?.focus();
    }
  }

  return (
    <>
      {/* Mobile backdrop */}

      <div
        className={`mobile-menu-backdrop ${
          isMenuOpen
            ? "mobile-menu-backdrop-visible"
            : ""
        }`}
        aria-hidden="true"
        onClick={() => closeMenu(true)}
      />

      {/* Main navbar */}

      <header
        ref={headerRef}
        data-theme={glassTheme}
        className={`site-header glass-navbar ${
          isScrolled ? "site-header-scrolled" : ""
        } ${
          isMenuOpen ? "glass-menu-open" : ""
        }`}
      >
        <div
          ref={shellRef}
          className="glass-navbar-shell"
          onPointerMove={reflect}
          onPointerLeave={() =>
            shellRef.current?.style.setProperty(
              "--reflection-opacity",
              "0"
            )
          }
        >
          <div
            className="glass-surface-reflection"
            aria-hidden="true"
          />

          <div
            className="glass-pointer-reflection"
            aria-hidden="true"
          />

          <div className="site-container navbar-inner">
            <Logo />

            {/* Desktop navigation */}

            <nav
              ref={navigationRef}
              className="desktop-navigation"
              aria-label="Main navigation"
              onPointerLeave={() => {
                hoveredRef.current = null;
                restoreLens();
              }}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget
                  )
                ) {
                  moveLens(
                    hoveredRef.current ??
                      navigationRef.current
                        ?.querySelector<HTMLElement>(
                          '[aria-current="location"]'
                        ) ??
                      null
                  );
                }
              }}
            >
              <span
                ref={lensRef}
                className="nav-glass-lens"
                aria-hidden="true"
              />

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${
                    activeSection === link.href
                      ? "nav-link-active"
                      : ""
                  }`}
                  aria-current={
                    activeSection === link.href
                      ? "location"
                      : undefined
                  }
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") {
                      hoveredRef.current =
                        event.currentTarget;

                      moveLens(event.currentTarget);
                    }
                  }}
                  onFocus={(event) =>
                    moveLens(event.currentTarget)
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Navbar actions */}

            <div className="navbar-actions">
              <a
                href={profile.cv}
                download
                className="btn btn-primary desktop-cv-button glass-cv-button"
              >
                <span className="glass-cv-label">
                  Download CV
                </span>

                <ArrowUpRight
                  size={16}
                  className="glass-cv-arrow"
                  aria-hidden="true"
                />
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                className="mobile-menu-toggle"
                onClick={() =>
                  setIsMenuOpen((value) => !value)
                }
                aria-label={
                  isMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls={
                  isMenuOpen
                    ? "mobile-navigation"
                    : undefined
                }
              >
                <span
                  className="mobile-toggle-icon"
                  aria-hidden="true"
                >
                  {isMenuOpen ? (
                    <X size={23} />
                  ) : (
                    <Menu size={23} />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        <MobileNav
          isOpen={isMenuOpen}
          onClose={() => closeMenu(true)}
        />
      </header>
    </>
  );
}
