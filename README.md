# Innovatieteam Dashboard

Internal dashboard for the Innovation Team at the Ministry of Finance (Ministerie van
Financiën). Provides a single overview of all team products, their live status, and team
information.

Built with **Vite + React** on the **NL Design System** ([Rijkshuisstijl
Community](https://rijkshuisstijl.community/)) — design tokens, the official Rijksoverheid
font, and the `.rhc-theme` component library.

## Features

- Product cards with real-time availability status (pinged every 60 seconds)
- Click-through dialog with product details and direct links
- Team overview page
- NL Design System / Rijkshuisstijl styling

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
