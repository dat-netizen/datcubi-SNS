import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // 外部アクセスの許可（Codespaces / Docker 等で必須）
    strictPort: true, // 3000番ポートが埋まっている時に勝手に別のポートに変わるのを防ぐ
    
    // API・静的ファイルのプロキシ設定（CORSエラー防止）
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  
  // `@/components/...` のように `@` で src フォルダを参照できるようにする設定
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})