const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/app/Components/index.ts'),
      '@hooks': path.resolve(__dirname, 'src/app/Hooks/index.ts'),
      '@services': path.resolve(__dirname, 'src/app/Services/index.ts'),
      '@store': path.resolve(__dirname, 'src/app/Store/index.ts'),
      '@types': path.resolve(__dirname, 'src/app/Types/index.ts'),
    },
  },
}
