const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: ["babel-polyfill", "./src/scripts/app.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "scripts/bundle.js"
    },
    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),

    
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            // {
            //     exclude: /node_modules/,
            //     test: /\.scss$/,
            //     use: [
            //         {
            //             loader: "style-loader" // creates style nodes from JS strings
            //         },
            //         {
            //             loader: "css-loader" // translates CSS into CommonJS
            //         },
            //         {
            //             loader: "sass-loader" // compiles Sass to CSS
            //         }
            //     ]
            // },

            // {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     use: [
            //       {
            //         loader: 'file-loader',
            //         options: {}
            //       }
            //     ]
            //   }
        ]
    }
};