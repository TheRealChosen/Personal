# Hoekman — Banket & Koffiehuus

A warm, editorial one-page site for Banket & Koffiehuus Hoekman in Raalte.

## Deploy to Netlify

You **do not** need to upload every project file manually.

### Option 1 — recommended: connect a Git repository

1. Push this project to GitHub, GitLab, or Bitbucket.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Select the repository.
4. Netlify will use the included `netlify.toml` settings:
   - Build command: `npm run build`
   - Publish directory: `out`
5. Deploy.

Netlify installs the packages from `package.json`, runs the build, and publishes only the generated `out` folder. The project requires Node.js 20 or newer.

### Option 2 — drag and drop

This project is configured with a static export. From the project folder, run:

```bash
npm install
npm run build
```

Then drag **only the generated `out` folder** into Netlify's manual deploy area. Do not drag `node_modules`, `.next`, or the entire source project.

## Local development

```bash
npm install
npm run dev
```

The page uses remote Unsplash images, OpenStreetMap, Google Maps links, and a browser-only Spline scene. Those assets load from the browser after deployment and are not bundled into the `out` folder.
