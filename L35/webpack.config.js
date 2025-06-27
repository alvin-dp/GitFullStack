const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
//console.log('IS DEV:', isDev)
//console.log('IS PROD:', isProd)

module.exports = {
  mode: 'production',
  //mode: 'development',  
  entry: {
    main: './src/index.js',
    stat: './src/statistics.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },  
  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),    
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'src/favicon.png'),
              to: path.resolve(__dirname, 'dist'),
            }
          ]
        }),
      new EslintWebpackPlugin({
        extensions: ['js'],
        fix: true 
    })    
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'less-loader', 
        ],
        },
        {
          test: /\.s[ac]ss$/, 
          use: [
            {
              loader: MiniCssExtractPlugin.loader, 
              //options: {
              //  publicPath: '',
              //},
            },
            'css-loader', 
            'sass-loader' 
          ],
        }, 
        {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
        },
        {
        test: /\.ts$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-typescript' 
            ]
          }
        }
        },
        {
        test: /\.jsx?$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-react' 
            ]
          }
        }
        }                                     
    ],
  }, 
  optimization: {
    // custom minimization in dev env
    splitChunks: {
      chunks: 'all', // Оптимізація загального коду для всіх типів чанків
    },    
    //minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserPlugin()     
    ],
  },     
}