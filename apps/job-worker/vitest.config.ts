import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/__tests__/**/*.test.ts', 'src/__tests__/*.test.ts'],
    alias: {
      '@nodejs-kubernetes-microservices/shared': path.resolve(
        __dirname,
        '../../packages/shared/src'
      ),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
  resolve: {
    alias: {
      bcrypt: path.resolve(__dirname, 'node_modules/bcrypt'),
    },
  },
});
