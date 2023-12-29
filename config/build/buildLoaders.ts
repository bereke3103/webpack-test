import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';

export function buildLoaders({ mode }: BuildOptions): ModuleOptions['rules'] {
  const isDev = mode === 'development';

  const scssLoader =
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
    };

  const tsLoader = {
    //ts-loader умеет работать с JSX
    //Если бы не использовали тайпскрипт: нужен был бы babel-loader
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [scssLoader, tsLoader];
}
