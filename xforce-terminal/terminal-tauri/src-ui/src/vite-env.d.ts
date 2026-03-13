/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PYTH_API_KEY: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_WS_URL: string
  readonly DEV: boolean
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
