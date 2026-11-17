# Gabriel Gargur · Portfolio

Personal site of Gabriel Gargur, C# game developer and fullstack web developer.

The site has two views of the same content, switched from the top bar:

- **GUI** (workspace 1): a tiling-window-manager desktop. Each section is a window (about, contact, work, games, skills, background, repos) laid out in a grid, with the ASCII wallpaper showing through the gaps.
- **TTY** (workspace 2): the same content as a terminal session (`neofetch`, `ls ~/games`, `git log`, `cat skills.json`…), ending in a prompt you can type into.

Press <kbd>`</kbd> anywhere to open a drop-down console that works in both views. Type `help` to see the commands.

## Stack

Vue 3 (`<script setup>`), TypeScript and Vite. No UI framework; styles are plain CSS with design tokens in `src/style.css`.

## Editing content

Everything shown on the site lives in [`src/data/portfolio.ts`](src/data/portfolio.ts): projects, experience (games and web tracks), skills, awards, education and contact links. Both views and the console read from it, so one edit updates all three.

Console commands are in [`src/terminal/commands.ts`](src/terminal/commands.ts).

## Running

```sh
npm install
npm run dev      # local dev server on http://localhost:3000
npm run build    # type-check and build to dist/
npm start        # serve the built dist/ (uses $PORT)
```

## Deploying on Render

Use the production build instead of the dev server:

- **Build command:** `npm install && npm run build`
- **Start command:** `npm start`

Or create a Render *Static Site* with build command `npm install && npm run build` and publish directory `dist`.
