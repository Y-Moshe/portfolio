/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    PUBLIC_URL: string
    REACT_APP_IS_EDIT_MODE: string
    // REACT_APP_....
  }
}
