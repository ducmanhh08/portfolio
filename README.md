# Premium Developer Portfolio 🚀

A modern, premium developer portfolio website built with cutting-edge technologies. Featuring a dark futuristic theme, glassmorphism UI, smooth animations, and a fully responsive design inspired by top-tier AI engineer portfolios and SaaS landing pages.

## ✨ Features

### Design & UI
- **Dark Futuristic Theme** - Deep blue-black gradient background (#0B0F19)
- **Glassmorphism UI** - Semi-transparent frosted glass effect on cards and components
- **Purple/Blue Gradient Accents** - Primary (#7C3AED) and secondary (#3B82F6) colors
- **Modern Typography** - Inter font for clean, professional appearance
- **Responsive Mobile-First Layout** - Fully responsive from mobile to desktop
- **Minimal & Clean** - Uncluttered design with excellent visual hierarchy

### Animations & Effects
- **Framer Motion Animations** - Smooth fade-in, slide-in, and scale animations
- **Scroll Reveal Animations** - Sections animate in as you scroll down
- **Hover Effects** - Interactive lift and glow effects on cards and buttons
- **Floating Background Blobs** - Subtle animated gradient blobs
- **Smooth Scrolling** - Native CSS smooth scroll behavior
- **Noise Texture Overlay** - Subtle noise for depth

### Sections

1. **Sticky Navbar** - Transparent with blur effect, smooth navigation, mobile menu
2. **Hero Section** - Large heading with animation, CTA buttons, floating cards
3. **About Section** - Bio, stats cards, resume button
4. **Skills Section** - Tech stack by category, skill badges, progress bars
5. **Projects Section** - Featured projects with descriptions and links
6. **Experience Section** - Timeline with jobs, achievements, tech stacks
7. **Contact Section** - Contact info cards and contact form
8. **Footer** - Quick links, social icons, scroll to top

## 🛠️ Technology Stack

- **Next.js 16.2.6** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🎨 Color Palette

```css
--background: #0B0F19
--primary: #7C3AED (Purple)
--secondary: #3B82F6 (Blue)
--text-secondary: #94A3B8
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   └── page.tsx             # Main page
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ...other components
├── lib/
│   └── utils.ts
└── package.json
```

## 🚀 Key Features

### Glassmorphism Cards
Semi-transparent frosted glass effect with backdrop blur and gradient borders.

### Smooth Animations
- Fade in/out animations
- Slide animations on scroll
- Hover scale effects
- Floating animations on cards

### Responsive Design
Mobile-first approach with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Proper color contrast
- Focus indicators

## 📱 Responsive

All sections are fully responsive and tested on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## 🔧 Customization

### Update Content
Edit components in `components/` folder:
- Hero section - `Hero.tsx`
- About section - `About.tsx`
- Projects - `Projects.tsx`
- Experience - `Experience.tsx`
- Contact - `Contact.tsx`

### Modify Colors
Update CSS variables in `app/globals.css`

### Change Fonts
Update `app/layout.tsx` and import different Google Fonts

## 🎯 Performance

- Next.js automatic code splitting
- CSS minification
- Font loading optimization
- Image optimization ready
- Smooth animations using GPU acceleration

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Other Options
- Netlify
- GitHub Pages
- AWS Amplify
- DigitalOcean

## 📄 License

MIT License - feel free to use this template for your portfolio!

---

**Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion**
