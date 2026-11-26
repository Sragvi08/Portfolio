# Sragvi’s Vault v2.0

A portfolio for Sragvi Shetty presented as a retro desktop with a handheld layout on small screens. One player. Endless side quests.

## Run locally

Use Node.js 20 or newer. The website has zero runtime or build-package dependencies.

```sh
npm run build
npm test
npm run dev
```

Open http://localhost:3000. The local server also accepts `--host` and `--port` after `npm run dev --`. The build generates HTML entry points for all registered app and detail URLs, plus the 404 page.

## Edit content

- [dist/content.js](dist/content.js) holds the profile, project records, lab notes, inventory, achievements, Brain Task Manager processes, and collectible clues.
- [dist/articles.js](dist/articles.js) holds the three migrated Field Notes, including the draft. The articles use arrays for heading, code, and quotation blocks.
- [dist/apps.js](dist/apps.js) defines the apps, filters, and templates. [dist/vault.js](dist/vault.js) manages windows, routes, preferences, and visitor interactions. [dist/state.js](dist/state.js) contains the settings defaults, time boundaries, and rectangle geometry.
- Add a publicly approved résumé PDF to `dist/assets/` and set `profile.resume` in `dist/content.js` to the corresponding `/assets/...` path. The résumé app activates the download when the field is set.
- For a project screenshot, put the approved file in `dist/assets/`, then add a `screenshots` array with `{src, alt}` entries to that project. Add verified repository or demo URLs to the project's `links` array as label/URL pairs.
- [dist/vault.css](dist/vault.css) holds the design tokens and responsive layouts. [dist/assets/](dist/assets/) contains ready-to-use site artwork and self-hosted typefaces.

The live site supplied three project case files and three posts. Notes on Becoming, BloodBets, and Smart MCQ Solver use the owner’s supplied project information. Two project screenshots were sourced from the owner’s public repositories and cropped for relevance. The résumé PDF, remaining project screenshots, and unconfirmed project URLs are omitted. Preview uses public contact links from the existing site. There is no analytics, account data, private journal content, or backend dependency.

## Artwork

`artwork/landscape-master.png` is the original landscape produced for this build from the celestial landscape brief. `scripts/lighting.py` makes the four lighting grades and the desktop and phone PNG rewards from that image, keeping the scenery in place across phases. `scripts/pixel-art.py` draws the desktop icons, cartridge art, and ambient cloud layers. Both scripts use Pillow. The lighting script also uses NumPy.

Avatar, full-body player sprite, and five dragon poses were isolated from the revised handoff artwork using `scripts/extract-sprites.py`. Its first argument is the folder containing the original two revised sheets. This optional asset workflow uses Pillow, NumPy, and SciPy. The application ships the ready-to-use transparent sprites. The reference sheets are excluded.

## Navigation and visitor state

Desktop title-bar arrow keys move a focused window. Add Shift to resize it, or Alt for single-pixel adjustments. Escape dismisses the Start menu or minimizes the active window. Start menu arrows move between apps. The mobile Home button returns to the app launcher.

The Vault reads the device clock for dawn (05:00–08:59), daylight (09:00–16:59), twilight (17:00–19:59), and moonlight (20:00–04:59). Browser-local storage preserves lighting, motion, cursor and dragon preferences, and the seven discoveries. Restoring visual settings preserves the constellation. The startup state lives only in session storage. The Terminal runs a fixed set of simulated commands.

## Deploy on Vercel

The repository’s `vercel.json` configures the existing Vercel project to build and serve `dist/` for this branch. The build creates directory indexes for URLs such as `/projects/ai-security-scanner` and a custom `dist/404.html` page. The site uses domain-root asset paths.

After the owner approves pushing `vault-v2` to GitHub, verify its Vercel Preview deployment and keep the pull request open until the owner approves the release.
