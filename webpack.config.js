const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src')
]


module.exports = {
    entry: {
        app: ['babel-polyfill', './src/js/main'],
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './build'),
        publicPath: '/build'
    },
    externals: [
        './lib/three'
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.sass'],
        root: [path.join(__dirname, './src')]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};