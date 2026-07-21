FROM node:22-alpine

WORKDIR /app

RUN corepack enable
ENV CI=true

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* tsconfig.base.json ./
COPY packages/shared ./packages/shared
COPY apps/stats-service ./apps/stats-service

RUN pnpm install --frozen-lockfile
RUN cd packages/shared && pnpm build

WORKDIR /app/apps/stats-service
EXPOSE 3002

CMD ["pnpm", "dev"]