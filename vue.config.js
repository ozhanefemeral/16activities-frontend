module.exports = {
  "outputDir": "E:\\masaüstü\\iş\\JS\\experienceforme\\server\\public",
  "devServer": {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}