
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";

import Image from "next/image";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  X,
  Eye,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

import {
  certifications,
  type Certification,
} from "@/data/certifications";

import "@/app/certifications.css";

export default function Certifications() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certification | null>(null);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const certificateTriggerRef =
    useRef<HTMLButtonElement>(null);

  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  });

  const suppressClickUntil = useRef(0);

  /* =========================================
     CAROUSEL SCROLL STATE
  ========================================= */

  const updateScroll = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const maxScroll =
      track.scrollWidth - track.clientWidth;

    setCanScrollLeft(track.scrollLeft > 4);

    setCanScrollRight(
      track.scrollLeft < maxScroll - 4
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const frame = requestAnimationFrame(updateScroll);

    const observer = new ResizeObserver(updateScroll);

    observer.observe(track);

    window.addEventListener("resize", updateScroll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();

      window.removeEventListener(
        "resize",
        updateScroll
      );
    };
  }, [updateScroll]);

  /* =========================================
     CERTIFICATE MODAL
  ========================================= */

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!selectedCertificate || !dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow =
        previousOverflow;
    };
  }, [selectedCertificate]);

  function closeCertificate() {
    setSelectedCertificate(null);

    requestAnimationFrame(() => {
      certificateTriggerRef.current?.focus({
        preventScroll: true,
      });
    });
  }

  /* =========================================
     ARROW NAVIGATION
  ========================================= */

  function scrollCertifications(direction: number) {
    const track = trackRef.current;

    if (!track) return;

    const card =
      track.querySelector<HTMLElement>(
        ".certification-slide"
      );

    if (!card) return;

    const gap =
      parseFloat(
        getComputedStyle(track).columnGap
      ) || 0;

    const cardWidth =
      card.getBoundingClientRect().width;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }

  /* =========================================
     DESKTOP MOUSE DRAGGING
  ========================================= */

  function handlePointerDown(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0
    ) {
      return;
    }

    const target = event.target;

    if (
      target instanceof Element &&
      target.closest("button, a")
    ) {
      return;
    }

    const track = event.currentTarget;

    suppressClickUntil.current = 0;

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

    const distance =
      event.clientX - dragRef.current.startX;

    if (
      Math.abs(distance) < 5 &&
      !dragRef.current.moved
    ) {
      return;
    }

    dragRef.current.moved = true;

    const track = event.currentTarget;

    track.classList.add(
      "certifications-dragging"
    );

    track.scrollLeft =
      dragRef.current.scrollLeft - distance;
  }

  function handlePointerEnd(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (!dragRef.current.active) return;

    const track = event.currentTarget;

    const wasDragging = dragRef.current.moved;

    dragRef.current.active = false;
    dragRef.current.moved = false;

    track.classList.remove(
      "certifications-dragging"
    );

    if (wasDragging) {
      suppressClickUntil.current =
        performance.now() + 350;
    }

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    updateScroll();
  }

  function preventClickAfterDrag(
    event: MouseEvent<HTMLDivElement>
  ) {
    if (
      event.detail === 0 ||
      performance.now() >= suppressClickUntil.current
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    suppressClickUntil.current = 0;
  }

  /* =========================================
     SECTION
  ========================================= */

  return (
    <section
      id="certifications"
      className="certifications-section dark-section"
      data-nav-theme="dark"
      aria-labelledby="certifications-heading"
    >
      <div
        className="certifications-texture"
        aria-hidden="true"
      />

      <div className="site-container certifications-container">

        {/* SECTION HEADER */}

        <Reveal>
          <div className="certifications-header">
            <span>05 — Certifications</span>

            <span
              className="certifications-header-line"
              aria-hidden="true"
            />

            <span>A commitment to learning</span>
          </div>
        </Reveal>

        {/* SECTION INTRODUCTION */}

        <Reveal delay={0.1}>
          <div className="certifications-intro">
            <div>
              <p className="certifications-eyebrow">
                Continuous professional development
              </p>

              <h2 id="certifications-heading">
                Beyond qualifications.
                <em>Always evolving.</em>
              </h2>

              <p className="certifications-description">
                A collection of professional credentials
                reflecting my commitment to continuous
                learning, technical development and
                emerging technologies.
              </p>
            </div>
          </div>
        </Reveal>

        {/* CAROUSEL NAVIGATION */}

        <Reveal delay={0.2}>
          <div className="certifications-toolbar">
            <div
              className="certifications-navigation"
              role="group"
              aria-label="Certification carousel controls"
            >
              <button
                type="button"
                className="certifications-arrow"
                aria-label="Previous certification"
                aria-controls="certifications-track"
                disabled={!canScrollLeft}
                onClick={() =>
                  scrollCertifications(-1)
                }
              >
                <ArrowLeft
                  size={19}
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                className="certifications-arrow certifications-arrow-next"
                aria-label="Next certification"
                aria-controls="certifications-track"
                disabled={!canScrollRight}
                onClick={() =>
                  scrollCertifications(1)
                }
              >
                <ArrowRight
                  size={19}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </Reveal>

        {/* CERTIFICATIONS CAROUSEL */}

        <div
          ref={trackRef}
          id="certifications-track"
          className="certifications-track"
          role="region"
          aria-label="Certifications carousel"
          tabIndex={0}
          onScroll={updateScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={handlePointerEnd}
          onClickCapture={preventClickAfterDrag}
          onDragStart={(event) =>
            event.preventDefault()
          }
          onKeyDown={(event) => {
            if (
              event.target !== event.currentTarget
            ) {
              return;
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollCertifications(1);
            }

            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollCertifications(-1);
            }

            if (
              event.key === "Home" ||
              event.key === "End"
            ) {
              event.preventDefault();

              const track = trackRef.current;

              if (!track) return;

              const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches;

              track.scrollTo({
                left:
                  event.key === "Home"
                    ? 0
                    : track.scrollWidth -
                      track.clientWidth,
                behavior: reduceMotion
                  ? "instant"
                  : "smooth",
              });
            }
          }}
        >
          {certifications.map(
            (certification, index) => (
              <div
                key={certification.id}
                className="certification-slide"
              >
                <Reveal
                  className="certification-reveal"
                  delay={(index % 4) * 0.08}
                >
                  <article className="certification-card">

                    {/* CARD LOGO */}

                    <div className="certification-card-top">
                      <div className="certification-logo">
                        <Image
                          src={certification.logo}
                          alt={`${certification.issuer} logo`}
                          width={56}
                          height={56}
                          draggable={false}
                          className="certification-logo-image"
                        />
                      </div>

                      <Award
                        size={19}
                        className="certification-award"
                        aria-hidden="true"
                      />
                    </div>

                    {/* CARD INFORMATION */}

                    <div className="certification-card-content">
                      <h3>
                        {certification.title}
                      </h3>

                      <p className="certification-issuer">
                        {certification.issuer}
                      </p>

                      <p className="certification-date">
                        Issued {certification.issued}
                      </p>
                    </div>

                    {/* SKILL TAGS */}

                    {certification.skills &&
                      certification.skills.length > 0 && (
                        <div className="certification-skills">
                          {certification.skills.map(
                            (skill) => (
                              <span key={skill}>
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      )}

                    {/* CARD ACTIONS */}

                    {(certification.certificate ||
                      certification.credentialUrl ||
                      certification.credentialId) && (
                      <div className="certification-actions">

                        {certification.certificate && (
                          <button
                            type="button"
                            onClick={(event) => {
                              certificateTriggerRef.current =
                                event.currentTarget;

                              setSelectedCertificate(
                                certification
                              );
                            }}
                          >
                            <Eye
                              size={15}
                              aria-hidden="true"
                            />

                            View certificate
                          </button>
                        )}

                        {certification.credentialUrl && (
                          <a
                            href={
                              certification.credentialUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Verify credential

                            <ArrowUpRight
                              size={15}
                              aria-hidden="true"
                            />
                          </a>
                        )}

                        {certification.credentialId && (
                          <span className="certification-credential-id">
                            ID:{" "}
                            {certification.credentialId}
                          </span>
                        )}

                      </div>
                    )}

                  </article>
                </Reveal>
              </div>
            )
          )}
        </div>
      </div>

      {/* CERTIFICATE PREVIEW MODAL */}

      {selectedCertificate && (
        <dialog
          ref={dialogRef}
          className="certificate-dialog"
          aria-labelledby="certificate-dialog-title"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closeCertificate();
            }
          }}
          onCancel={(event) => {
            event.preventDefault();
            closeCertificate();
          }}
          onClick={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeCertificate();
            }
          }}
        >
          <div className="certificate-dialog-content">

            <div className="certificate-dialog-header">
              <div>
                <p>
                  {selectedCertificate.issuer}
                </p>

                <h3 id="certificate-dialog-title">
                  {selectedCertificate.title}
                </h3>
              </div>

              <button
                type="button"
                className="certificate-dialog-close"
                onClick={closeCertificate}
                aria-label="Close certificate preview"
              >
                <X
                  size={23}
                  aria-hidden="true"
                />
              </button>
            </div>

            {selectedCertificate.certificate && (
              <div className="certificate-preview">
                <Image
                  src={selectedCertificate.certificate}
                  alt={`${selectedCertificate.title} certificate`}
                  width={1200}
                  height={850}
                  className="certificate-preview-image"
                  unoptimized
                />
              </div>
            )}

            <div className="certificate-dialog-footer">
              <span>
                Issued {selectedCertificate.issued}
              </span>

              {selectedCertificate.certificate && (
                <a
                  href={selectedCertificate.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open original

                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>

          </div>
        </dialog>
      )}
    </section>
  );
}
