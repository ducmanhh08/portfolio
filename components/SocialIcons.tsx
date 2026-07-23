import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Custom SVG icons
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6 z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 7-7 7-7"></path>
  </svg>
);

const MailIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const ExternalLinkIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  ariaLabel?: string;
}

const defaultSocialLinks: SocialLink[] = [
  {
    icon: <GithubIcon size={20} />,
    href: "https://github.com/ducmanhh08",
    label: "GitHub",
    ariaLabel: "Visit GitHub profile",
  },
  {
    icon: <LinkedinIcon size={20} />,
    href: "https://www.linkedin.com/in/dmanhng811/",
    label: "LinkedIn",
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    icon: <MailIcon size={20} />,
    href: "mailto:nducmanh08@gmail.com",
    label: "Email",
    ariaLabel: "Send email",
  },
];

interface SocialIconsProps {
  links?: SocialLink[];
  variant?: "default" | "minimal" | "large";
  className?: string;
}

export function SocialIcons({
  links = defaultSocialLinks,
  variant = "default",
  className = "",
}: SocialIconsProps) {
  const [offsets, setOffsets] = useState<Record<number, { x: number; y: number }>>({});
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateDeviceSupport = () => setIsTouchDevice(!mediaQuery.matches);

    updateDeviceSupport();
    mediaQuery.addEventListener("change", updateDeviceSupport);

    return () => mediaQuery.removeEventListener("change", updateDeviceSupport);
  }, []);

  const sizeClasses = {
    default: "w-10 h-10",
    minimal: "w-8 h-8",
    large: "w-14 h-14",
  };

  const iconSizes = {
    default: "size-5",
    minimal: "size-4",
    large: "size-6",
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const clampedX = Math.max(-10, Math.min(10, x / 12));
    const clampedY = Math.max(-10, Math.min(10, y / 12));

    setOffsets((prev) => ({
      ...prev,
      [index]: { x: clampedX, y: clampedY },
    }));
  };

  const handleMouseLeave = (index: number) => {
    setOffsets((prev) => ({
      ...prev,
      [index]: { x: 0, y: 0 },
    }));
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map((link, index) => {
        const offset = offsets[index] ?? { x: 0, y: 0 };

        return (
          <motion.a
            key={index}
            href={link.href}
            aria-label={link.ariaLabel || link.label}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={(event) => handleMouseMove(event, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={prefersReducedMotion || isTouchDevice ? { x: 0, y: 0, scale: 1 } : { x: offset.x, y: offset.y, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`${sizeClasses[variant]} rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20`}
          >
            <div className={iconSizes[variant]}>{link.icon}</div>
          </motion.a>
        );
      })}
    </div>
  );
}
