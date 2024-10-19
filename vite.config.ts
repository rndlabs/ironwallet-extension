import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// Check if the build should include the Svelte plugin
const useSvelte = process.env.VITE_USE_SVELTE === 'true';

// Minimal configuration with only the Svelte plugin
const svelteConfig = defineConfig({
  plugins: [svelte()],
});

// Full configuration without the Svelte plugin
const fullConfig = defineConfig({
  build: {
    rollupOptions: {
      input: {
        frame: path.resolve(__dirname, 'src/frame.ts'),
        index: path.resolve(__dirname, 'src/index.ts'),
      },
      output: {
        // Output files with the same names to avoid duplicates
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        dir: path.resolve(__dirname, 'dist'),  // Output to the same directory
        format: 'es',
      },
    },
    target: 'esnext',
    minify: true,
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts'],
  },
  publicDir: 'public',
  server: {
    open: true,
    port: 3000,
  },
  define: {
    'process.env': {},
  },
});

// Dynamically return the appropriate configuration based on the environment
export default useSvelte ? svelteConfig : fullConfig;
