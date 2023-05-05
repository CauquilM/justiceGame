const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: "The Gavel's Call",
    themeColor: 'red',
    msTileColor: '#000000'
  }
}