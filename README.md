# Packages list
- @craco/craco
- @reduxjs/toolkit
- axios
- bootstrap(just the grid system) in index.css add `@import 'bootstrap/scss/bootstrap-grid.scss';`
- react-redux
- react-router-dom
- redux
- sass

## Package scripts changed to use @craco

```
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "craco eject"
  },
```
And `craco.config.js` created to paths defined below

## tsconfig.json paths
```
  "baseUrl": ".",
  "paths": {
    "@components": ["src/Components/index.ts"],
    "@hooks": ["src/Hooks/index.ts"],
    "@services": ["src/Services/index.ts"],
    "@store": ["src/Store/index.ts"],
    "@types": ["src/Types/index.ts"],
  }
```