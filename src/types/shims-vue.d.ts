declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@/stores/*' {
  const content: any;
  export default content;
}

declare module '@/composable/*' {
  const content: any;
  export default content;
}
