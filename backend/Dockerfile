# Multi-stage Dockerfile for backend

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
# install all deps (including dev) for build
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
# install only production deps
RUN npm ci --only=production
# copy built files from builder
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "dist/server.js"]
