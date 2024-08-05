module.exports = {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
      require('@fullhuman/postcss-purgecss')({
        content: [
          './src/**/*.html',
          './src/**/*.js',
          './src/**/*.jsx',
          './src/**/*.ts',
          './src/**/*.tsx',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
    ],
  };
  