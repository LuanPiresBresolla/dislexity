module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json',
            '.svg',
            '.png',
          ],
          alias: {
            '@components': './src/components',
            '@config': './src/config',
            '@context': './src/context',
            '@screens': './src/screens',
            '@hooks': './src/hooks',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@errors': './src/errors',
            '@services': './src/services',
            '@dtos': './src/dtos',
            '@routes': './src/routes',
            '@styles': './src/styles',
          },
        },
      ],
    ]
  };
};
