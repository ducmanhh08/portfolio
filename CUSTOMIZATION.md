# Portfolio Customization Guide

This guide will help you customize the portfolio to showcase your personal projects and information.

## 🎯 Quick Start Customization

### 1. Update Hero Section

Edit `components/Hero.tsx`:

```tsx
// Update the subtitle
<p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
  Crafting beautiful, high-performance web experiences with modern
  technologies. Let's build something extraordinary together.
</p>
```

### 2. Update About Section

Edit `components/About.tsx`:

```tsx
// Update bio paragraph
<p className="text-lg text-gray-300 leading-relaxed">
  I'm a passionate full-stack developer with a love for creating
  elegant solutions to complex problems...
</p>

// Update stats
const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "50+" },
  // ...
];
```

### 3. Update Skills

Edit `components/Skills.tsx`:

```tsx
const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      // Add your skills
    ],
  },
  // Add more categories
];
```

### 4. Update Projects

Edit `components/Projects.tsx`:

```tsx
const projects = [
  {
    title: "E-Commerce Platform",
    description: "Your project description...",
    image: "🛍️",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/yourprofile/project",
    live: "https://your-project-url.com",
    featured: true,
  },
  // Add more projects
];
```

### 5. Update Experience

Edit `components/Experience.tsx`:

```tsx
const experiences = [
  {
    title: "Senior Frontend Engineer",
    company: "Your Company",
    period: "2023 - Present",
    description: "Your role description...",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      // ...
    ],
    tags: ["React", "TypeScript"],
  },
  // Add more experiences
];
```

### 6. Update Contact Information

Edit `components/Contact.tsx`:

```tsx
const contactInfo = [
  {
    icon: <Mail size={24} />,
    label: "Email",
    value: "your-email@example.com",
    href: "mailto:your-email@example.com",
  },
  {
    icon: <Phone size={24} />,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: <MapPin size={24} />,
    label: "Location",
    value: "Your City, State",
    href: "#",
  },
];
```

### 7. Update Social Links

Edit `components/SocialIcons.tsx`:

```tsx
const defaultSocialLinks: SocialLink[] = [
  {
    icon: <GithubIcon size={20} />,
    href: "https://github.com/yourprofile",
    label: "GitHub",
  },
  {
    icon: <LinkedinIcon size={20} />,
    href: "https://linkedin.com/in/yourprofile",
    label: "LinkedIn",
  },
  // Update all links
];
```

### 8. Update Metadata

Edit `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Name - Developer Portfolio",
  description: "Your custom description here",
  keywords: ["your", "keywords", "here"],
};
```

## 🎨 Customize Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --background: #0b0f19;
  --foreground: #ffffff;
  --primary: #7c3aed;      /* Change primary color */
  --secondary: #3b82f6;    /* Change secondary color */
  --text-secondary: #94a3b8;
}
```

### Popular Color Combinations

**Dark Purple & Pink**
```css
--primary: #a855f7;
--secondary: #ec4899;
```

**Dark Teal & Cyan**
```css
--primary: #14b8a6;
--secondary: #06b6d4;
```

**Dark Red & Orange**
```css
--primary: #dc2626;
--secondary: #f97316;
```

## 🔤 Customize Fonts

Edit `app/layout.tsx`:

```tsx
import { Font_Name } from "next/font/google";

const fontName = Font_Name({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
```

Available Google Fonts:
- Inter
- Poppins
- Roboto
- Playfair Display
- Montserrat
- Ubuntu Mono

## 🖼️ Add Custom Images

### Project Images
Replace emoji with actual images in `components/Projects.tsx`:

```tsx
// Instead of:
image: "🛍️",

// Use:
image: "https://your-image-url.jpg",
```

Then update the display:

```tsx
<img 
  src={project.image} 
  alt={project.title}
  className="w-12 h-12 object-cover rounded-lg"
/>
```

## 📝 Update Form Handling

Edit `components/Contact.tsx` to connect to your backend:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Show success message
      setFormData({ name: "", email: "", message: "" });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Create API Route

Create `app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  // Add your email sending logic here
  // Example with nodemailer or any email service

  return NextResponse.json({ success: true });
}
```

## 📱 Customize Responsive Breakpoints

Tailwind breakpoints are already configured. To customize further, edit `tailwind.config.ts`.

## 🎬 Animation Customization

Edit animation duration in `components/*.tsx`:

```tsx
// Change animation duration
transition={{ duration: 0.8 }}  // Default 0.8s

// Change animation type
transition={{ type: "spring", stiffness: 300 }}

// Add delay
transition={{ duration: 0.8, delay: 0.2 }}
```

## 🔍 SEO Optimization

### 1. Update Page Title
`app/layout.tsx`:
```tsx
title: "Your Name - Full Stack Developer"
```

### 2. Add Meta Description
```tsx
description: "Full stack developer specializing in React, Node.js..."
```

### 3. Add Keywords
```tsx
keywords: ["react", "developer", "portfolio", "fullstack"]
```

### 4. Update Open Graph Tags
```tsx
openGraph: {
  title: "Your Name - Portfolio",
  description: "...",
  url: "https://yoursite.com",
  siteName: "Your Name Portfolio",
}
```

## 📊 Add Analytics

Add Google Analytics to `app/layout.tsx`:

```tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 🎯 Add New Sections

To add a new section:

1. Create a new component in `components/NewSection.tsx`
2. Add "use client" directive for client components
3. Import in `app/page.tsx`
4. Add to main return JSX

Example:

```tsx
// components/Blog.tsx
"use client";

import { SectionContainer } from "./SectionContainer";
import { motion } from "framer-motion";

export function Blog() {
  return (
    <SectionContainer id="blog">
      <motion.div>
        <h2>Latest Articles</h2>
        {/* Your content */}
      </motion.div>
    </SectionContainer>
  );
}
```

## ✅ Testing Checklist

- [ ] Update all text content
- [ ] Add your social links
- [ ] Add your projects
- [ ] Update skills
- [ ] Update experience
- [ ] Change colors to your preference
- [ ] Test on mobile devices
- [ ] Test all navigation links
- [ ] Test contact form
- [ ] Update meta tags for SEO

## 🚀 Ready to Deploy?

Your portfolio is ready to deploy! Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.
