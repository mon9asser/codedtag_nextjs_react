const PurgeCssPlugin = require('@fullhuman/postcss-purgecss');
const path = require('path');

module.exports = {
  plugins: [
    new PurgeCssPlugin({
      paths: [path.join(__dirname, 'src/*.js')],
    }),
  ],
};
