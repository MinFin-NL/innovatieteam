import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// base: './' keeps asset URLs relative so the build works under any nginx path.
export default defineConfig({
  plugins: [
    vue({
      template: {
        // Hand every <nldd-*> tag to the browser instead of resolving it as a
        // Vue component; @nldd/design-system registers them as custom elements.
        compilerOptions: { isCustomElement: (tag) => tag.startsWith('nldd-') },
      },
    }),
  ],
  base: './',
});
