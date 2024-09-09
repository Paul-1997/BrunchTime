// pinia.d.ts
import { Router } from 'vue-router';

declare module 'pinia' {
  interface PiniaCustomProperties {
    $router: Router;
  }
}
