FROM node:22-alpine

WORKDIR /app

RUN corepack enable
ENV CI=true

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* tsconfig.base.json ./
COPY packages/shared ./packages/shared
COPY apps/job-worker ./apps/job-worker

RUN pnpm install --frozen-lockfile
RUN cd packages/shared && pnpm build

WORKDIR /app/apps/job-worker
EXPOSE 3001

CMD ["pnpm", "dev"]