import webpack from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import path from 'path';

import baseConfig from './webpack.base.config';

const config: webpack.Configuration = merge.smart(baseConfig, {
    target: 'electron-main',
    entry: {
        main: path.resolve(__dirname, 'src', 'main.ts'),
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],
    externals: [nodeExternals()]
});

export default config;
