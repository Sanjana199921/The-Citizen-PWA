const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        __dirname + '/src/js/index.js',
        __dirname + '/src/scss/app.scss',
    ],
    output: {
        publicPath: '/public/',
        path: path.resolve(__dirname, 'public/'),
        filename: 'js/index.min.js',
    },
    devServer: {
        compress: true,
        port: 8000,
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'css/', name: '[name].css' }
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/app.min.css",
        })
    ]
};