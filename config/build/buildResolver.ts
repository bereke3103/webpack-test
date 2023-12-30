import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

export function buildResolver(options: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    //нужно для описания красивого пути
    alias: {
      '@': options.paths.src,
    },
  };
}
