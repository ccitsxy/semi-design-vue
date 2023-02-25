import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), DefineOptions()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@douyinfe/semi-theme-default/scss/index.scss';
        @import '@douyinfe/semi-theme-default/scss/global.scss';
        @import '@douyinfe/semi-theme-default/scss/animation.scss';`
      }
    }
  }
})
