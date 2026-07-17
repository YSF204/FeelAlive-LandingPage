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

## Attribution

This landing page was made by **SOL 5.6**. All prompting, creative direction, and AI work were done by **Yousef**.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
