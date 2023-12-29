// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');
// const webpack = require('webpack');

// module.exports = (env) => {
//   return {
//     mode: env.mode ?? 'development',

//     //!Можно указывать несколько файлов, но всегда как обычно точкой входа является одна папка
//     //   entry: {
//     //     helloWorld: path.resolve(__dirname, 'src', 'index.js'),
//     //     helloWorldSeconfFile: path.resolve(__dirname, 'src', 'index.js'),
//     //   },

//     entry: path.resolve(__dirname, 'src', 'index.ts'),

//     output: {
//       path: path.resolve(__dirname, 'build'),
//       filename: '[name].[contenthash].bundle.js',
//       clean: true,
//     },

//     //сюда входят плагины
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: path.resolve(__dirname, 'public', 'index.html'),
//       }),
//       new webpack.ProgressPlugin(),
//     ],

//     module: {
//       rules: [
//         {
//           test: /\.tsx?$/,
//           use: 'ts-loader',
//           exclude: /node_modules/,
//         },
//       ],
//     },
//     resolve: {
//       extensions: ['.tsx', '.ts', '.js'],
//     },
//   };
// };

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
//для добавления devServer -> нужно импортировать type
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type Mode = 'production' | 'development';
interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  console.log('ENV:', env.mode);
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',

    //!Можно указывать несколько файлов, но всегда как обычно точкой входа является одна папка
    //   entry: {
    //     helloWorld: path.resolve(__dirname, 'src', 'index.js'),
    //     helloWorldSeconfFile: path.resolve(__dirname, 'src', 'index.js'),
    //   },

    entry: path.resolve(__dirname, 'src', 'index.tsx'),

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].bundle.js',
      clean: true,
    },

    //сюда входят плагины
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isDev && new webpack.ProgressPlugin(),
      isProd &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].file.css',
          chunkFilename: 'css/[name].[contenthash].chunkFile.css',
        }),
    ].filter(Boolean),

    module: {
      rules: [
        // loader для стилизации
        //npm i -D css-loader@6.8.1
        //npm i -D style-loader@3.3.3
        //npm i -D sass-loader@13.3.2
        {
          // test: /\.css$/i,
          test: /\.(css|s[ac]ss)$/i, //<---объядинли css и scss
          use: [
            // 'style-loader', если есть MiniCssExtractPlugin -> то style-loader можно не вставлять
            //
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          //ts-loader умеет работать с JSX
          //Если бы не использовали тайпскрипт: нужен был бы babel-loader
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isDev && 'inline-source-map',
    //и запускается через webpack server
    devServer: isDev
      ? {
          //npm run start -- --env port=5000
          port: env.port ?? 5001,
          open: true,
        }
      : undefined,
  };
  return config;
};
