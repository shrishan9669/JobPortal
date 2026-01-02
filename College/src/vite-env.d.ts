/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JSEARCH_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
