import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteContact } from "@/lib/site";

// Shared social profile definitions and button treatment.
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

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  ariaLabel?: string;
}

const defaultSocialLinks: SocialLink[] = [
  {
    icon: <GithubIcon size={20} />,
    href: siteContact.github,
    label: "GitHub",
    ariaLabel: "Visit GitHub profile",
  },
  {
    icon: <LinkedinIcon size={20} />,
    href: siteContact.linkedin,
    label: "LinkedIn",
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    icon: <MailIcon size={20} />,
    href: `mailto:${siteContact.email}`,
    label: "Gmail",
    ariaLabel: "Send email",
  },
];

interface SocialIconsProps {
  links?: SocialLink[];
  variant?: "default" | "minimal" | "large";
  className?: string;
  includeEmail?: boolean;
}

export function SocialIcons({
  links = defaultSocialLinks,
  variant = "default",
  className = "",
  includeEmail = true,
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
    default: "size-12",
    minimal: "size-10",
    large: "size-14",
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

  const visibleLinks = links.filter(
    (link) => includeEmail || link.label !== "Gmail"
  );

  return (
    <div className={`flex gap-3 ${className}`} aria-label="Social profiles">
      {visibleLinks.map((link, index) => {
        const offset = offsets[index] ?? { x: 0, y: 0 };

        return (
          <motion.a
            key={index}
            href={link.href}
            aria-label={`${link.ariaLabel || link.label}${link.href.startsWith("http") ? " (opens in a new tab)" : ""}`}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            onMouseMove={(event) => handleMouseMove(event, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={prefersReducedMotion || isTouchDevice ? { x: 0, y: 0, scale: 1 } : { x: offset.x, y: offset.y, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`group relative flex ${sizeClasses[variant]} cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-[transform,background-color,border-color,color] duration-200 hover:scale-110 hover:border-purple-400/50 hover:bg-purple-500/15 hover:text-purple-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400 active:scale-95 active:border-purple-400/70 active:bg-purple-500/25 active:text-white`}
          >
            <div className={iconSizes[variant]}>{link.icon}</div>
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-[calc(100%+0.65rem)] left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-white/10 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-[opacity,transform] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              {link.label}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
