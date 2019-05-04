const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
 * We've enabled Postcss, autoprefixer and precss for you. This allows your app
 * to lint  CSS, support variables and mixins, transpile future CSS syntax,
 * inline images, and more!
 *
 * To enable SASS or LESS, add the respective loaders to module.rules
 *
 * https://github.com/postcss/postcss
 *
 * https://github.com/postcss/autoprefixer
 *
 * https://github.com/jonathantneal/precss
 *
 */

const autoprefixer = require("autoprefixer");
const precss = require("precss");

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                loader: "babel-loader",
                //
                // options: {
                //     // plugins: ["syntax-dynamic-import"],
                //
                //     presets: [
                //         [
                //             "@babel/preset-env",
                //             {
                //                 modules: false,
                //             },
                //         ],
                //         "@babel/preset-typescript",
                //     ],
                // },
                test: /\.(js|ts)$/,
            },
            {
                test: /\.css$/,

                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",

                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",

                        options: {
                            plugins: function() {
                                return [precss, autoprefixer];
                            },
                        },
                    },
                ],
            },
        ],
    },

    entry: {
        main: "./src/UI/index.ts",
    },

    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
    },

    mode: "development",

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                },
            },

            chunks: "async",
            minChunks: 1,
            minSize: 30000,
            name: true,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Custom template",
            // Load a custom template (lodash by default)
            template: path.resolve(__dirname, "src/UI/demo.html"),
        }),
    ],
    resolve: { extensions: [".ts", ".tsx", ".js"] },
};
