import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, { Configuration } from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/types';

export function buildPlugins({
  mode,
  paths,
}: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].file.css',
        chunkFilename: 'css/[name].[contenthash].chunkFile.css',
      })
    );
  }

  return plugins;
}
