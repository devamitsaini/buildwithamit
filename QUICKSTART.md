# Quick Start Guide

## 5-Minute Setup

### Option 1: Using npm

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Vite will automatically open http://localhost:3000
```

### Option 2: Using yarn

```bash
# 1. Install dependencies
yarn install

# 2. Start development server
yarn dev

# 3. Open in browser (port 3000)
```

## Building for Production

```bash
# Build the project
npm run build

# Preview production build locally
npm run preview
```

## File Structure Quick Reference

```
src/
├── App.tsx              ← Main portfolio component (all sections here)
├── main.tsx             ← React entry point
└── index.css            ← Global styles + Tailwind imports

Public files:
├── index.html           ← HTML template
├── vite.config.ts       ← Build configuration
├── tailwind.config.js   ← Tailwind settings
└── package.json         ← Dependencies

Config:
├── tsconfig.json        ← TypeScript config
├── postcss.config.js    ← PostCSS setup
└── tsconfig.node.json   ← Node TypeScript config
```

## Customization Tips

### Change Site Title
Edit `index.html`:
```html
<title>Your Name -- 3D Creator</title>
```

### Update Hero Text
Edit `src/App.tsx`, search for `"Hi, i'm amit"` and replace.

### Modify Colors
Edit `src/index.css` or use Tailwind classes in components.

### Add New Projects
In `src/App.tsx`, find the `ProjectsCarousel` function and add to the `projects` array:
```tsx
{
  number: '04',
  name: 'Your Project Name',
  category: 'Client/Personal',
  col1Image1: 'image-url',
  col1Image2: 'image-url',
  col2Image: 'image-url',
}
```

### Update Services
Find the services array in the services section and modify the 5 items.

### Change Contact Button Link
Add `onClick` or wrap in an `<a>` tag in the `ContactButton` component.

## Common Issues

### Port Already in Use
If port 3000 is busy, Vite will automatically use the next available port.

### Images Not Loading
- Check image URLs are accessible
- Verify CORS if using external domains
- Use `loading="lazy"` attribute (already included)

### Styles Not Applying
- Clear browser cache (Cmd/Ctrl + Shift + R)
- Ensure Tailwind CSS is properly installed
- Check `tailwind.config.js` includes your files

## Performance Tips

1. **Image Optimization**: Images are already optimized with WebP
2. **Lazy Loading**: Images load on demand
3. **Code Splitting**: Vite handles this automatically
4. **Build Size**: ~150KB+ gzipped (with all dependencies)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires ES2020 support

## Need Help?

1. Check the README.md for detailed documentation
2. Review comments in `src/App.tsx`
3. Inspect browser DevTools for errors
4. Verify all dependencies are installed with `npm list`

## Next Steps

1. Replace placeholder images with your own
2. Update text content and branding
3. Customize colors and fonts
4. Add your projects and services
5. Deploy to your hosting platform

---

**Happy building! 🚀**
