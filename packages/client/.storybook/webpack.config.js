const path = require('path')
const rootPath = path.resolve(__dirname, '../src/')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = ({ config }) => {
  config.resolve.alias['@'] = rootPath
  config.resolve.alias['@mock'] = path.resolve(__dirname, '../__mock__/')
  config.resolve.alias['~mock'] = path.resolve(__dirname, '../../share/__mock__/')
  config.resolve.alias['~types'] = path.resolve(__dirname, '../../share/')
  config.resolve.extensions.push('.ts')


  config.module.rules.push({
    test: /\.ts$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      }
    ],
    exclude: [/node_modules/, /\.nuxt/, /middleware/]
  })

  config.module.rules.push({
    test: /\.stories\.ts?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      }
    ],

    exclude: [/node_modules/, /\.nuxt/],
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
    exclude: [/node_modules/, /\.nuxt/],
    include: rootPath

  });

  config.plugins.push(new ForkTsCheckerWebpackPlugin())

  return config
}
