FROM node:18.18.2-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
ENTRYPOINT ["npm", "run", "start"]