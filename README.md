# Lakshya Gupta — Interactive Portfolio

An animated, responsive developer portfolio featuring an explorable **3D city world**, project showcases, skills, achievements, and contact information. Inspired by the video reference supplied by Lakshya.

## What is included

- React 18 + Vite
- Three.js via React Three Fiber and Drei (low-poly 3D city)
- Framer Motion scroll/section animations
- Six project dashboard illustrations: GridSense, AI Maintenance Copilot, Kubernetes Auto-Healing, Warehouse & Supply Chain, BhoomiSeva, and NIDS
- Responsive design, mobile movement controls, keyboard navigation and motion-reduction support
- Resume PDF in `public/`
- GitHub Pages deployment workflow (`.github/workflows/deploy.yml`)

## Run locally on your Mac (VS Code)

Install **Node.js 20 or later** first from https://nodejs.org/ . You need an internet connection the first time, for installing the packages.

1. Unzip the download. Open the **`lakshya-portfolio`** folder in Visual Studio Code.
2. Open **Terminal → New Terminal**.
3. Run these commands:

```bash
npm install
npm run dev
```

4. Open the local link shown in the terminal (normally `http://localhost:5173/`).

**To stop** the local server press `Control + C` in Terminal.

## Controls

- Click **ENTER MY WORLD** or **Explore 3D world**.
- Use **W, A, S, D**, the arrow keys, or on-screen movement buttons.
- Click project landmarks or project list buttons to jump to a project.
- Press **Escape** or **EXIT WORLD** to leave the 3D experience.

## Customize content

- `src/data.js`: name, GitHub, LinkedIn, email, six project descriptions, repository links, filters, and skills.
- `src/App.jsx`: section content, layouts, and interactions.
- `src/styles.css`: typography, colors, breakpoints, and animations.
- `src/World.jsx`: 3D scene and controls.
- `public/Lakshya_Gupta_Resume.pdf`: replace with an updated resume PDF when needed.

**Note:** The NIDS repository link is intentionally not supplied until a public repo is confirmed. The profile README and empty `DATABASE_PROJECT` repository are not shown as standalone build cards. The sample project charts/screens in the portfolio are *illustrative visual designs*, not real-time connections to your projects. Review metrics/claims in the content before publishing.

## Build the production version

```bash
npm run build
npm run preview
```

`dist/` contains the generated static site.

## Free deployment with GitHub Pages

1. Create a **new GitHub repository**, for example `lakshya-portfolio` (do not overwrite existing project repositories).
2. Push this folder to the new repo:

```bash
git init
git add .
git commit -m "Launch interactive portfolio"
git branch -M main
git remote add origin https://github.com/Lakshya0023/lakshya-portfolio.git
git push -u origin main
```

3. In GitHub, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. The included workflow will build and deploy the site after pushing to `main`.
5. Open the deployment URL shown in GitHub Pages (typically `https://lakshya0023.github.io/lakshya-portfolio/`). The example URL will work only after you create and successfully deploy the repo.

For Vercel, import your new GitHub repository and accept the Vite settings: **Build command** `npm run build`, **Output directory** `dist`.

## Quality / performance

The 3D scene needs WebGL; if WebGL isn't supported, the portfolio includes a project navigation fallback. The design is optimized for typical modern desktop and mobile browsers, but should be tested on your actual devices. If animation is slow on older phones, consider reducing the DPR or shadows in `src/World.jsx`.

## License

Personal portfolio source shared for Lakshya's own use.
