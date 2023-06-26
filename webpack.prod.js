const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');



module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                generator: {
                    filename: `./images/[name][ext]`,
                },
                type: 'asset/resource',
            },
            {
                test: /\.(mp4|mp3)$/i,
                generator: {
                    filename: `./video/[name][ext]`,
                },
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                ImageminMozjpeg({
                    quality: 85,
                    progressive: true,
                }),
            ],
            pngquant: {
                quality: '70-85',
            },
            gifsicle: {
                interlaced: false,
                optimizationLevel: 10,
                colors: 256,
            },
            svgo: {}
        }),
        new TerserWebpackPlugin({
            terserOptions: {
                compress: { drop_console: true }
            }
        }),
    ]
})