FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./
RUN corepack enable
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]
