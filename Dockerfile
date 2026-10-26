# Build stage: compile the Vue app to static assets. Vite reads the VITE_URL_*
# build args from the environment; ARG values are visible to RUN as env vars.
# Base images are pinned by digest; the tag is only there for the reader.
FROM node:22-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_URL_FINDOCS
ARG VITE_URL_KASVISIE
ARG VITE_URL_INNOVATIEPLATFORM
ARG VITE_URL_BELEIDSASSISTENT
ARG VITE_URL_FINCHAT_INNOVATIE
ARG VITE_URL_KAMERDEBATAI
ARG VITE_URL_NORMNET
ARG VITE_URL_REGIEKAMER
ARG VITE_URL_TEAMGRIFFIE
ARG VITE_URL_TEKSTONTLEDER
ARG VITE_URL_TRANSCRIPTIE
ARG VITE_URL_DEVOPS_BOARD
RUN npm run build

# Serve stage: nginx serves the built static bundle as a non-root user.
FROM nginxinc/nginx-unprivileged:alpine@sha256:b5047b9b76845eac124358373c6852377c52e4b05834a47647e955dd91cb8f1e
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
