FROM node:18.18.2-alpine AS build
ARG API_URL
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN sed -i "s+{{api_url}}+${API_URL}+g" ./src/environments/environment.prod.ts && \
    npm run build

FROM nginx:latest
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/browser ./app
EXPOSE 80