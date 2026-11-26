
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  ArrowUpRight,
  Award,
  Plus,
  Minus,
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
  const [showAll, setShowAll] = useState(false);

  const [selectedCertificate, setSelectedCertificate] =
    useState<Certification | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const visibleCertifications = showAll
    ? certifications
    : certifications.slice(0, 4);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!selectedCertificate || !dialog) return;

    dialog.showModal();

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCertificate]);

  function closeCertificate() {
    setSelectedCertificate(null);
  }

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

        <div className="certifications-grid">
          {visibleCertifications.map((certification, index) => (
            <Reveal
              key={certification.id}
              delay={(index % 4) * 0.08}
            >
              <article className="certification-card">
                <div className="certification-card-top">
                  <div className="certification-logo">
                    <Image
                      src={certification.logo}
                      alt={`${certification.issuer} logo`}
                      width={56}
                      height={56}
                      className="certification-logo-image"
                    />
                  </div>

                  <Award
                    size={19}
                    className="certification-award"
                    aria-hidden="true"
                  />
                </div>

                <div className="certification-card-content">
                  <h3>{certification.title}</h3>

                  <p className="certification-issuer">
                    {certification.issuer}
                  </p>

                  <p className="certification-date">
                    Issued {certification.issued}
                  </p>
                </div>

                {certification.skills &&
                  certification.skills.length > 0 && (
                    <div className="certification-skills">
                      {certification.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  )}

                <div className="certification-actions">
                  {certification.certificate && (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCertificate(certification)
                      }
                    >
                      <Eye size={15} aria-hidden="true" />

                      View certificate
                    </button>
                  )}

                  {certification.credentialUrl && (
                    <a
                      href={certification.credentialUrl}
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
                      ID: {certification.credentialId}
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {certifications.length > 4 && (
          <div className="certifications-footer">
            <button
              type="button"
              className="certifications-toggle"
              aria-expanded={showAll}
              onClick={() => setShowAll((previous) => !previous)}
            >
              {showAll
                ? "Show fewer credentials"
                : `View all ${certifications.length} credentials`}

              {showAll ? (
                <Minus size={17} aria-hidden="true" />
              ) : (
                <Plus size={17} aria-hidden="true" />
              )}
            </button>
          </div>
        )}
      </div>

      {selectedCertificate && (
        <dialog
          ref={dialogRef}
          className="certificate-dialog"
          aria-labelledby="certificate-dialog-title"
          onCancel={(event) => {
            event.preventDefault();
            closeCertificate();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeCertificate();
            }
          }}
        >
          <div className="certificate-dialog-content">
            <div className="certificate-dialog-header">
              <div>
                <p>{selectedCertificate.issuer}</p>

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
                <X size={23} aria-hidden="true" />
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

                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
