import webpack from 'webpack';
import merge from 'webpack-merge';
import { spawn } from 'child_process';

import baseConfig from './webpack.renderer.config';

const config: webpack.Configuration = merge.smart(baseConfig, {
    devServer: {
        port: 8080,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        before() {
            console.log('Starting main process'); // tslint:disable-line
            spawn('npm', ['run', 'start-main-dev'], {
                shell: true,
                env: process.env,
                stdio: 'inherit',
            })
                .on('close', (code) => process.exit(code))
                .on('error', (spawnError) => console.error(spawnError));
        },
    },
});

export default config;
