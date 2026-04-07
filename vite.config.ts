import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // 支持多种环境变量名，Cloudflare 上设哪个都行
        'process.env.API_KEY': JSON.stringify(env.VITE_OPENAI_API_KEY || env.OPENROUTER_API_KEY || env.GEMINI_API_KEY || env.API_KEY || ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
