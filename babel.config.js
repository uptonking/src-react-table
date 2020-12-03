module.exports = function (api) {
  const env = api.env();

  // Plugins run before Presets. Plugin ordering is first to last.
  const plugins = [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        fileName: true,
      },
    ],
    'react-refresh/babel',
    // ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    '@babel/plugin-proposal-class-properties',
  ];

  // Preset ordering is reversed (last to first).
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: env === 'esm' ? false : 'commonjs',
        targets: {
          node: 'current',
          // browsers: '> 0.5%',
        },
        corejs: { version: 3, proposals: true },
        useBuiltIns: 'usage',
        debug: false,
      },
    ],
    [
      '@babel/preset-react',
      { development: process.env.BABEL_ENV !== 'production' },
    ],
    // [
    //   '@babel/preset-typescript',
    //   {
    //     allExtensions: true,
    //     isTSX: true,
    //   },
    // ],
  ];

  const ignore = ['node_modules'];

  return {
    plugins,
    presets,
    ignore,
  };
};
