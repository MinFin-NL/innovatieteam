# Build stage: compile the Vue app to static assets. Vite reads the VITE_URL_*
# build args from the environment; ARG values are visible to RUN as env vars.
FROM node:22-alpine AS build
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
ARG VITE_URL_DEVOPS_BOARD
RUN npm run build

# Serve stage: nginx serves the built static bundle.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
