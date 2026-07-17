FROM node:22-alpine

WORKDIR /app

RUN corepack enable
ENV CI=true

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/shared ./packages/shared
COPY apps/service-a ./apps/service-a

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/service-a
EXPOSE 3000

CMD ["pnpm", "dev"]