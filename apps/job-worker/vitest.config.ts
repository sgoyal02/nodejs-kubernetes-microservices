import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    include: ['src/__tests__/**/*.test.ts', 'src/__tests__/*.test.ts'],
    alias: {
      '@nodejs-kubernetes-microservices/shared': path.resolve(
        __dirname,
        '../../packages/shared/src'
      ),
    },
  },
  optimizeDeps: { include: ['brcrypt'] },
});
