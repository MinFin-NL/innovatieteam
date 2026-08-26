# Innovatieteam Dashboard

Internal dashboard for the Innovation Team at the Ministry of Finance (Ministerie van
Financiën). Provides a single overview of all team products, their live status, and team
information.

Built with **Vite + Vue 3** on the **NLDD Design System**
([`@nldd/design-system`](https://github.com/MinBZK/storybook)) — the web components of the
Nederlandse Digitale Dienst, with their CSS variables and the Rijksoverheid font. Live
component documentation: <https://minbzk.github.io/storybook/>.

The `nldd-*` elements are custom elements, not Vue components: `vite.config.js` tells the
Vue compiler to hand any `nldd-`-prefixed tag to the browser. `src/main.js` imports each
component through its own subpath export rather than the barrel — the barrel registers all
~115 elements including the CodeMirror-backed editors, roughly tripling the bundle. Add a
line there when a template starts using a new element.

## Features

- Product cards with real-time availability status (pinged every 60 seconds)
- Click-through sheet with product details and direct links
- Team overview page
- NLDD components throughout: accessibility and Rijkshuisstijl come from the design
  system rather than from local CSS

## Development

```sh
npm install
npm run dev      # start the Vite dev server
npm run build    # produce the production bundle in dist/
npm run preview  # serve the production build locally
```

## Docker

The multi-stage `Dockerfile` builds the app and serves the static bundle with nginx:

```sh
docker build -t innovatieteam .
docker run -p 8080:80 innovatieteam   # open http://localhost:8080
```
