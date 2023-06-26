const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: './js/main.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'), // Dart Sass
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/images'),
                to: path.resolve(__dirname, 'assets/images')
            }, {
                from: path.resolve(__dirname, 'src/video'),
                to: path.resolve(__dirname, 'assets/video')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: './css/style.css',
        }),

    ],
    resolve: {
        alias: {
            "@image": path.resolve(__dirname, "./src/images/"),
        },
    },
}
