module.exports = {
  "outputDir": "C:\\Users\\ozhan\\Desktop\\iş\\JS\\experienceforme\\server\\public",
  "devServer": {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}