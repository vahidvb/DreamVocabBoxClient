const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  css: {
    loaderOptions: {
      css: {
        modules: {
          auto: (resourcePath) => resourcePath.endsWith('.scss') || resourcePath.endsWith('.module.css')
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Dream Vocab Box';
      return args;
    });
  }
});
