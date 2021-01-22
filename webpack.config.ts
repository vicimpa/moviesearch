import { join } from "path";
import { DefinePlugin, Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const { stringify } = JSON
const { env } = process

const devMode = env.NODE_ENV != 'production'
const watchMode = devMode

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
      use: {
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
        "css-loader",
        "sass-loader"
      ]
    }
  ]
}

const externals: Configuration['externals'] = {
  // "react": "React",
  // "react-dom": "ReactDOM",
  // "react-transition-group": "ReactTransitionGroup",
  // "redux": "Redux"
}

const plugins: Configuration['plugins'] = [
  new DefinePlugin({
    'process.env': {
      'NODE_ENV': stringify(env.NODE_ENV),
      'USER': stringify(env.USER),
      'TERM_PROGRAM': stringify(env.TERM_PROGRAM),
      'TERM_PROGRAM_VERSION': stringify(env.TERM_PROGRAM_VERSION),
      'GDM_LANG': stringify(env.GDM_LANG)
    }
  })
]

const devServer: Configuration['devServer'] = {
  port: 8080,
  index: './index.html',
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