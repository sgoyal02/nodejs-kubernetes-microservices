FROM node:22-alpine

WORKDIR /app

RUN corepack enable
ENV CI=true

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/shared ./packages/shared
COPY apps/api-gateway ./apps/api-gateway

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/api-gateway
EXPOSE 3000

CMD ["pnpm", "dev"]