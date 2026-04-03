import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const talkRoot = fileURLToPath(new URL('./', import.meta.url))
const sharedNodeModules = fileURLToPath(
  new URL('../Technical-writing-workshop/node_modules', import.meta.url),
)

export default defineConfig({
  server: {
    fs: {
      allow: [talkRoot, sharedNodeModules],
    },
  },
})
