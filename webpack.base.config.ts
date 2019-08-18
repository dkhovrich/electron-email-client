import webpack from 'webpack';
import path from 'path';

const config: webpack.Configuration = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devtool: 'source-map',
    plugins: [],
};

export default config;
