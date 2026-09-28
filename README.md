# Innovatieteam Dashboard

Internal site of the Innovatieteam at the Ministry of Finance (Ministerie van Financiën).
It has four tabs:

- **Producten**: the team's tools, each with an Online/Offline badge that is refreshed
  every minute and a button that opens the tool. Tools we stopped with sit below them in
  a collapsed "Kerkhof" (`RETIRED_PRODUCTS` in `src/data.js`) and are not pinged.
- **Services**: the three innovation services (Innovatieverkenning, Waarde ontwerp,
  Concept Lab). The text comes from the deck "Eerste opzet - Innovatieservices".
- **Onze werkwijze**: the phases from idea to service, with the steps inside
  Experimenteren.
- **Wie zijn wij**: mission and team members.

The active tab is kept in `?tab=`, so links to a tab can be shared.

Content lives in `src/data.js`. Product logos are in `public/icons/`, team photos in
`public/people/`.

## Stack

Vite + Vue 3 on the NLDD Design System
([`@nldd/design-system`](https://github.com/MinBZK/storybook), component docs at
<https://minbzk.github.io/storybook/>). The `nldd-*` elements are custom elements, not
Vue components: `vite.config.js` tells the Vue compiler to leave any `nldd-` tag to the
browser. `src/main.js` imports each component on its own; add a line there when a
template uses a new one.

## Tool URLs and status

Each tool URL is set at build time through a `VITE_URL_*` variable (see `Dockerfile`
and `azure-pipelines.yml`; the values are in the Azure DevOps variable group
`innovatieteam-secrets`). They end up in the public JavaScript bundle. A tool without a
valid `http(s)` URL shows as "Onbekend" with a disabled button.

The status check is a `no-cors` HEAD request from the visitor's browser. It tells you
whether the host answers from where the visitor sits, not whether the app works.

## Development

```sh
npm install
npm run dev      # Vite dev server
npm run build    # production bundle in dist/
npm run preview  # serve the production build locally
```

For local URLs, put the variables in `.env.local`, e.g. `VITE_URL_FINCHAT=https://…`.

## Docker

The multi-stage `Dockerfile` builds the app and serves it with nginx:

```sh
docker build --build-arg VITE_URL_FINCHAT=https://… -t innovatieteam .
docker run -p 8080:80 innovatieteam   # http://localhost:8080
```

`azure-pipelines.yml` builds the image on every push to `main`, pushes it to ACR and
deploys it to Azure Container Apps with an IP allowlist.
