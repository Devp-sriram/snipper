import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({ rehypePlugins: [rehypeHighlight] }),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
