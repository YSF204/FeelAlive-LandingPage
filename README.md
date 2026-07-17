# Feel Alive

An immersive, scroll-driven landing page built around motion, botanical artwork, and a cinematic video opening.

## What we built

- Full-screen looping hero video with an oversized Feel Alive title
- Scroll-driven reveal into a named botanical image archive
- Circular orbit gallery with six locally hosted floral artworks
- Horizontal “Elsewhere” chapter with a landscape image and pinned scroll animation
- Responsive editorial footer with contact actions and back-to-top navigation
- Persistent responsive navbar linking the main sections
- Reduced-motion support and accessible image descriptions

## Stack

- React 19 + React DOM
- TypeScript
- Vite
- Tailwind CSS v4 with `@tailwindcss/vite`
- Motion for React (`motion/react` / Framer Motion-style animation APIs)
- Lucide React icons
- React Compiler via `@vitejs/plugin-react` and Babel
- Oxlint
- Google Fonts: Instrument Serif, Manrope, Great Vibes, and Monoton
- Native HTML5 video, CSS transforms, CSS animations, and responsive layout

The project uses the supplied CloudFront MP4 for the hero and local PNG assets for the botanical archive and landscape chapter.

## Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.
After pushing the project to `main`, enable **Settings → Pages → Source: GitHub Actions** in the repository. Each push to `main` will then build and publish the site automatically.

The expected Pages URL is:

`https://ysf204.github.io/FeelAlive-LandingPage/`

## Attribution

This landing page was made by **SOL 5.6**. All prompting, creative direction, and AI work were done by **Yousef**.

---

