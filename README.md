# 3D Creator Portfolio Landing Page

A stunning, fully responsive 3D Creator portfolio landing page built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Features

- **Dark Theme**: Custom #0C0C0C background with Kanit font (Google Fonts)
- **Hero Section**: Gradient text heading with magnetic portrait effect and sticky navbar
- **Marquee Section**: Horizontally scrolling image carousel with parallax scroll-based movement
- **About Section**: Character-by-character scroll animation with decorative 3D elements
- **Services Section**: Premium white background section with service offerings
- **Projects Section**: Sticky stacking card effect with scale transforms on scroll
- **Responsive Design**: Mobile-first approach with fluid typography using clamp()
- **Custom Components**:
  - `FadeIn`: Scroll-triggered entrance animations
  - `Magnet`: Mouse-following magnetic hover effect
  - `AnimatedText`: Character-level scroll-driven opacity animation
  - `ContactButton`: Custom gradient pill button
  - `LiveProjectButton`: Ghost outline button

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Basic knowledge of React and TypeScript

## 🚀 Installation

1. **Navigate to the project directory**:
   ```bash
   cd /mnt/user-data/outputs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
├── index.html                 # HTML entry point
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── src/
│   ├── main.tsx             # React entry point
│   ├── App.tsx              # Main application component
│   └── index.css            # Global styles
```

## 🎯 Key Components

### FadeIn
Scroll-triggered fade-in animation wrapper:
```tsx
<FadeIn delay={0.2} y={40} duration={0.7}>
  <h1>Content</h1>
</FadeIn>
```

### Magnet
Mouse-following magnetic hover effect:
```tsx
<Magnet padding={150} strength={3}>
  <img src="..." alt="..." />
</Magnet>
```

### AnimatedText
Character-by-character scroll animation:
```tsx
<AnimatedText 
  text="Your text here"
  className="text-white"
/>
```

## 🎨 Customization

### Colors
- Primary background: `#0C0C0C`
- Text color: `#D7E2EA`
- Accent: `#FFFFFF`

### Typography
- Font family: Kanit (weights: 300-900)
- Imported via Google Fonts in `src/index.css`

### Spacing
All sections use responsive padding with clamp():
- Mobile: sm (640px)
- Tablet: md (768px)
- Desktop: lg (1024px)

## 📱 Responsive Breakpoints

The site uses Tailwind's default breakpoints:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px

All typography uses `clamp()` for fluid scaling across all screen sizes.

## 🔧 Technologies

- **React 18.3.1**: UI framework
- **TypeScript 5.2.2**: Type safety
- **Vite 5.0.8**: Build tool
- **Framer Motion 12.38.0**: Animations
- **Tailwind CSS 3.4.1**: Styling
- **Lucide React 0.344.0**: Icons

## 🎬 Sections Overview

### Hero Section (h-screen)
- Sticky navbar with links
- Massive gradient heading: "Hi, i'm amit"
- Bottom bar with project description
- Magnetic portrait image with hover effect
- Staggered FadeIn animations

### Marquee Section
- 21 GIF images in 2 rows
- Scroll-based parallax movement
- Smooth infinite scrolling effect
- Lazy loading for performance

### About Section (min-h-screen)
- Gradient heading: "About me"
- Character-by-character scroll animation
- 4 decorative 3D corner elements
- Contact CTA button

### Services Section (white background)
- Heading: "Services"
- 5 service items with:
  - Large service number
  - Service name and description
  - Separator borders
- Staggered entrance animations

### Projects Section (sticky stacking)
- Heading: "Project"
- 3 project cards with:
  - Sticky stacking effect (scale transform)
  - Project number and category
  - "Live Project" button
  - 2-column image grid layout
  - CloudFront optimized images

## 🎭 Animation Details

- **Entrance animations**: 0.7s duration, ease [0.25, 0.1, 0.25, 1]
- **Magnetic effect**: 0.3s in, 0.6s out
- **Scroll animations**: 30% offset from screen
- **Project stacking**: 3% scale decrease per card

## 📸 Image Sources

- **Hero Portrait**: Custom hosted image
- **Marquee GIFs**: motionsites.ai assets
- **About Decorations**: Figma components
- **Project Images**: CloudFront optimized

## 🚀 Deployment

Build and deploy to any static hosting:
```bash
npm run build
```

The `dist/` folder contains production-ready files.

## 📝 License

This portfolio is custom-built and proprietary.

## 💬 Contact

For modifications or questions, reach out to the development team.
