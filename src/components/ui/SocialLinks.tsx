
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

interface SocialLinksProps {
  variant?: "light" | "dark";
  className?: string;
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: profile.social.linkedin,
  },
  {
    label: "GitHub",
    href: profile.social.github,
  }
];

export default function SocialLinks({
  variant = "light",
  className = "",
}: SocialLinksProps) {
  return (
    <div
      className={`social-links social-links-${variant} ${className}`}
      aria-label="Professional social profiles"
    >
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <span>{link.label}</span>

          <ArrowUpRight
            size={12}
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
}
