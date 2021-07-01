module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@icons': './src/assets/icons',
          '@config': './src/config',
          '@mock': './src/mock',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@theme': './src/theme',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.json', '.tsx', '.ts'],
      },
    ],
  ],
};
