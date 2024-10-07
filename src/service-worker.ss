import { VitePWA } from 'vite-plugin-pwa';

VitePWA({
  srcDir: 'src',
  filename: 'service-worker.js',
  strategies: 'injectManifest', 
});
