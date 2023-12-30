import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, { Configuration } from 'mini-css-extract-plugin';
import webpack, { DefinePlugin } from 'webpack';
import { BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins({
  mode,
  paths,
  analyzer,
  platform,
}: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(
      //компиляция тайпскрипта с помощью этого плагина будет отдельным: не нагружая саму сборку
      new ForkTsCheckerWebpackPlugin()
    );
    //после того, как мы добавили этот плагин, в ts-loader нужно добавить дополнительную логику
    plugins.push(new ReactRefreshPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].file.css',
        chunkFilename: 'css/[name].[contenthash].chunkFile.css',
      })
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
