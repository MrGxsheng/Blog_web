/* eslint-disable */

/// <reference types="vite/client" />

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "@kangc/v-md-editor/lib/codemirror-editor";
declare module "@kangc/v-md-editor/lib/theme/github.js";
declare module "codemirror";
declare module "hljs";
