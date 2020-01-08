const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.plugins.has('copy') &&
      config.plugin('copy').tap(([pathConfigs]) => {
        pathConfigs.push({
          from: path.resolve(__dirname, './src/static/assets'),
          to: path.resolve(__dirname, './public/assets'),
          toType: 'dir'
        });

        return [pathConfigs];
      });
  }
};
