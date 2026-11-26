
import { profile } from "@/data/profile";

interface LogoProps {
  variant?: "light" | "dark";
}

export default function Logo({
  variant = "light",
}: LogoProps) {
  return (
    <a
      href="#home"
      className={`brand-logo ${
        variant === "dark"
          ? "brand-logo-dark"
          : "brand-logo-light"
      }`}
      aria-label={`${profile.name} — Home`}
    >
      <span className="brand-monogram">
        {profile.initials}
        <span>.</span>
      </span>

      <span className="brand-wordmark">
        {profile.name}
      </span>
    </a>
  );
}
