import { join } from "path";
import { DefinePlugin, Configuration, RuleSetRule } from "webpack";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

const { stringify } = JSON
const { argv, env } = process

const testArg = (arg: string) =>
    argv.indexOf(arg) !== -1

const addDefaultImport = (object: any) => {
  let outObject = {}

  let func = ((val) => {
    if(typeof val !== 'object')
      return {default: val}

    val.default = val
    return val
  }).toString()

  for(let key in object) {
    let val = object[key]
    outObject[key] = `(${func})(${val})`
  }

  return outObject
}

const devMode = !testArg('--prod')
const watchMode = testArg('--watch')

const mode = env.NODE_ENV = devMode ?
    'development' :
    'production'

const entry: Configuration['entry'] = {
  main: "./index.tsx"
}

const output: Configuration['output'] = {
  filename: '[name].js',
  path: join(__dirname, 'public'),
  publicPath: '/public/'
}

const devtool: Configuration['devtool'] =
    devMode ?
        'source-map' :
        false

const watch: Configuration['watch'] =
    devMode || watchMode

const resolve: Configuration['resolve'] = {
  extensions: [
    '.ts',
    '.tsx',
    '.js',
    '.json'
  ]
}

const modules: Configuration['module'] = {
  rules: [
    {
      test: /\.(eot|woff|woff2|ttf|gif|svg|png|jpg)$/,
      loader: {
        loader: 'file-loader',
        options: {
          regExp: /([a-z0-9]+)\/([a-z0-9\-\_]+)\/[a-z0-9\-\_]+\.[a-z]+$/i,
          name: `[2]/[1]/[name].[ext]`
        }
      }
    },
    {
      test: /\.tsx?$/,
      loader: "ts-loader"
    },
    {
      test: /\.scss|\.sass$/,
      use: [
        'style-loader',/**/
        MiniCssExtractPlugin.loader,/**/
        "css-loader",
        "sass-loader?outputStyle=compressed"
      ]
    }
  ]
}

const externals: Configuration['externals'] = addDefaultImport({
  "react": "React",
  "react-dom": "ReactDOM",
  "react-transition-group": "ReactTransitionGroup",
  "redux": "Redux"
})

const plugins: Configuration['plugins'] = [
  new DefinePlugin({
    'process.env': {
      'NODE_ENV': stringify(env.NODE_ENV),
      'USER': stringify(env.USER),
      'TERM_PROGRAM': stringify(env.TERM_PROGRAM),
      'TERM_PROGRAM_VERSION': stringify(env.TERM_PROGRAM_VERSION),
      'GDM_LANG': stringify(env.GDM_LANG)
    }
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // all options are optional
    filename: '[name].css',
    // chunkFilename: '[id].css',
  })
]

const devServer: Configuration['devServer'] = {
  port: 8080,
  // host: '192.168.1.12',
  // contentBase: './public',
  index: './index.html',
  // proxy: [
  //   {
  //     context: ['/api', '/socket', '/image', '/pdf'],
  //     target: 'http://localhost:8081'
  //   }
  // ]
}

export {
  entry,
  output,
  mode,
  devtool,
  watch,
  resolve,
  modules as module,
  externals,
  plugins,
  devServer
}