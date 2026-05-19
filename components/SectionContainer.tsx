import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionContainer({
  children,
  id,
  className = "",
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`relative w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
