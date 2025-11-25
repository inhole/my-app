# Multi-stage Dockerfile for frontend

# Builder
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
# prefer CI when lockfile exists, otherwise install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
RUN npm run build

# Runner
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --only=production; else npm install --only=production; fi
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.js ./next.config.js
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "run", "start"]
