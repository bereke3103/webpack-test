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

import webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import {
  BuildMode,
  BuildPath,
  BuildPlatform,
} from './config/build/types/types';
import path from 'path';
export interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  platform?: BuildPlatform;
  analyzer?: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPath = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    //нужно для описания красивого пути
    src: path.resolve(__dirname, 'src'),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    //npm run build:prod -- --env analyzer=true
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  });

  return config;
};
