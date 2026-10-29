# Update your portfolio on your Mac

This is **version 2** of your existing portfolio. It keeps the original pastel 3D world, page design, resume, About, Skills, Achievements and Contact sections, and expands your Projects section.

## Changes in this update

- Six featured projects: GridSense, AI Maintenance Copilot, Kubernetes Auto-Healing Agent, Warehouse & Supply Chain Management, BhoomiSeva, and NIDS.
- New interactive project filters (All Projects, AI & ML, Cloud / Agents, Full Stack, Cybersecurity).
- New bespoke industrial AI and supply chain dashboard artwork.
- Six project stops in the interactive 3D world; navigation from the 3D world to project cards.
- Verified GitHub links for five repositories and live demo links where available. NIDS has no public repository link in this version.
- Reuses your resume in the `public` folder.

GitHub also shows a separate empty `DATABASE_PROJECT` repository and a profile README repository; those are not presented as standalone finished projects.

## Option A — easiest: open the full updated project

1. Double-click `lakshya-portfolio-v2.zip` to extract it.
2. Open the `lakshya-portfolio` folder in VS Code.
3. Open **Terminal → New Terminal** and run:

```bash
npm install
npm run dev
```

4. Open the Local URL in the terminal (usually `http://localhost:5173`).

If your original portfolio is still running, press `Control + C` in that terminal first. Or the updated site may start on a different port (e.g. 5174).

## Option B — keep your existing folder

Copy these **five** files from the new version into the same locations in your existing portfolio, replacing the old versions:

- `src/data.js`
- `src/App.jsx`
- `src/ProjectVisuals.jsx`
- `src/World.jsx`
- `src/styles.css`
 Restart the development server if necessary.

## Customize

Edit `src/data.js`. Each project has `title`, `description`, `stack`, `github`, optional `live`, and `filter`. To add your future GitHub projects, add another object to `projects` and choose an available visual or create one in `ProjectVisuals.jsx`.

### Note about tests

All JavaScript and JSX source files passed a syntax check. A complete Vite production build could **not** be run in the artifact-generation environment because npm dependencies were not available offline and the package registry was unreachable. Run `npm install` on your Mac (with internet access) to fully verify it.
