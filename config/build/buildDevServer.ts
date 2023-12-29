import { EnvVariables } from '../../webpack.config';
//для добавления devServer -> нужно импортировать type
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    //npm run start -- --env port=5000
    port: options.port ?? 5001,
    open: true,
  };
}
