module.exports = {
  "outputDir": "C:\\Users\\ozhan\\Desktop\\iş\\JS\\experienceforme\\client\\server\\public",
  "devServer": {
    proxy: {
      '/*': {
        target: 'http://localhost:3000/api/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}