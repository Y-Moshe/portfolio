# Added Package list
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
And `craco.config.js` added for paths
```
const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/app'),
    },
  },
}
```

## tsconfig.json paths
```
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/app/*"],
  },
```
