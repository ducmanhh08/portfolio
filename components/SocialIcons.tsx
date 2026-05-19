import React from "react";

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
    href: "https://github.com",
    label: "GitHub",
    ariaLabel: "Visit GitHub profile",
  },
  {
    icon: <LinkedinIcon size={20} />,
    href: "https://linkedin.com",
    label: "LinkedIn",
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    icon: <TwitterIcon size={20} />,
    href: "https://twitter.com",
    label: "Twitter",
    ariaLabel: "Visit Twitter profile",
  },
  {
    icon: <MailIcon size={20} />,
    href: "mailto:contact@example.com",
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

  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          aria-label={link.ariaLabel || link.label}
          target="_blank"
          rel="noopener noreferrer"
          className={`${sizeClasses[variant]} rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-110`}
        >
          <div className={iconSizes[variant]}>{link.icon}</div>
        </a>
      ))}
    </div>
  );
}
