"use strict";

const path = require("path");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const webpackRxjsExternals = require("webpack-rxjs-externals");

module.exports = env => {

    let filename;
    let plugins;

    if (env && env.production) {
        filename = "rxjs-etc.min.umd.js";
        plugins = [new UglifyJsWebpackPlugin({
            uglifyOptions: {
                beautify: false,
                ecma: 6,
                compress: true,
                comments: false
            }
        })];
    } else {
        filename = "rxjs-etc.umd.js";
        plugins = []
    }

    return {
        context: path.join(__dirname, "./"),
        devtool: undefined,
        entry: {
            index: "./source/index.ts"
        },
        externals: webpackRxjsExternals(),
        module: {
            rules: [{
                test: /\.ts$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        compilerOptions: {
                            declaration: false
                        },
                        configFile: "tsconfig-dist-cjs.json"
                    }
                }
            }]
        },
        output: {
            filename,
            library: "RxEtc",
            libraryTarget: "umd",
            path: path.resolve(__dirname, "./bundles")
        },
        plugins,
        resolve: {
            extensions: [".ts", ".js"]
        }
    }
};
