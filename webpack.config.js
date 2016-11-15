module.exports = {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            { test: /\.json$/, loader: 'json'},
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {presets: ['es2015', 'react']}
            }
        ]
    }
};