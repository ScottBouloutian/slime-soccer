const path = require('path');

module.exports = {

    /**
    * Minimal build setup.
    * Create your app bundle.
    */
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public', 'assets', 'scripts'),
    },

    /**
    * Minimal development setup.
    * Serves files in ./public folder.
    * Refresh browser automatically when your bundle changes.
    */

    devServer: {
        publicPath: '/assets/scripts/',
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
    },

    // Custom configuration
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: require.resolve('phaser-ce/build/custom/pixi'),
                use: {
                    loader: 'expose-loader',
                    options: 'PIXI',
                },
            },
            {
                test: require.resolve('phaser-ce/build/custom/p2'),
                use: {
                    loader: 'expose-loader',
                    options: 'p2',
                },
            },
            {
                test: require.resolve('phaser-ce/build/custom/phaser-split'),
                use: {
                    loader: 'expose-loader',
                    options: 'Phaser',
                },
            },
        ],
    },
};
