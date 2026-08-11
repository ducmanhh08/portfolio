# Matthew Nguyen — AI Full-Stack Engineer

I build intelligent, product-focused systems that turn complex workflows into useful experiences—from AI-assisted productivity tools to polished, responsive web applications.

<p>
  <a href="https://matthewng.vercel.app"><img src="https://img.shields.io/badge/Visit%20the%20live%20site-7C3AED?style=for-the-badge&logo=vercel&logoColor=white" alt="Visit the live portfolio" /></a>
</p>


## Stack & architecture

- **Next.js 16 App Router** and **React 19** with TypeScript
- **Tailwind CSS 4** for responsive, utility-first styling
- **Framer Motion** for purposeful, reduced-motion-aware interactions
- **Next.js Image** and font optimisation for efficient media delivery
- **Static generation** for project case studies via `generateStaticParams`, plus per-project metadata with `generateMetadata`
- A component-led architecture: page sections in `components/`, portfolio content in `lib/`, and route-level composition in `app/`

## Key technical features

- Responsive portfolio experience with a keyboard-accessible command palette (`⌘/Ctrl + K`) for fast section navigation.
- Motion respects users’ `prefers-reduced-motion` setting, including hero animation, scrolling polish, and interactive components.
- Responsive, sized `next/image` usage prevents unnecessary image downloads; priority loading is reserved for the case-study hero image.
- SEO-ready metadata: descriptive titles, descriptions, keywords, robots directives, language declaration, and viewport/theme-color configuration.
- Statically generated case-study routes with route-specific metadata for fast, indexable project pages.
- Accessible interaction details throughout: semantic landmarks, labelled controls, visible focus styles, keyboard shortcuts, and live feedback when copying contact details.

## Lighthouse & production readiness

- ✅ **Production build passes** — `npm run build` completes successfully with type checking and static page generation.
- ✅ **Performance foundations** — static rendering, framework code splitting, responsive image sizing, and optimised fonts are in place.
- ✅ **Accessibility foundations** — reduced-motion support, keyboard navigation, focus management, semantic HTML, and ARIA labels are implemented.
- ⏳ **Lighthouse score** — run an audit against the deployed URL before publishing a numeric score; no score is claimed until it is measured in production.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact

- Email: [nducmanh08@gmail.com](mailto:nducmanh08@gmail.com)
- GitHub: [@ducmanhh08](https://github.com/ducmanhh08)
- LinkedIn: [Manh Nguyen](https://www.linkedin.com/in/dmanhng811/)
