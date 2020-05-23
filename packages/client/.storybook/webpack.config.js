const path = require('path')
const rootPath = path.resolve(__dirname, '../src/')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = ({ config }) => {
  config.resolve.alias['@'] = rootPath
  config.resolve.alias['~'] = rootPath
  config.resolve.alias['@mock'] = path.resolve(__dirname, '../__mock__/')
  config.resolve.alias['~mock'] = path.resolve(__dirname, '../../share/__mock__/')
  config.resolve.extensions.push('.ts')

  config.module.rules.push({
    test: /\.vue$/,
    loader: 'vue-docgen-loader',
    enforce: 'post'
  })

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      }
    ],
    exclude: [/vendor/, /\.nuxt/]
  })

  config.module.rules.push({
    test: /\.stories\.ts?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      }
    ],
    enforce: 'pre',
  })

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }
    , 'sass-loader'
    ],
    include: rootPath,
  });

  config.plugins.push(new ForkTsCheckerWebpackPlugin())

  return config
}
