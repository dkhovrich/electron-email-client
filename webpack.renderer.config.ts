import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import baseConfig from './webpack.base.config';

const config: webpack.Configuration = merge.smart(baseConfig, {
    target: 'electron-renderer',
    entry: {
        app: path.resolve(__dirname, 'src', 'index.tsx'),
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
            {
                test: /\.ts(x?)$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader',
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],
});

export default config;