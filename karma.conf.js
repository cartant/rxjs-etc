"use strict";

process.env.CHROME_BIN = require("puppeteer").executablePath();

exports = module.exports = function (config) {

    config.set({
        basePath: "",
        browsers: ["ChromeHeadlessNoSandbox"],
        colors: true,
        concurrency: Infinity,
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: "ChromeHeadless",
                flags: ["--no-sandbox"]
            }
        },
        exclude: [],
        files: [
            "node_modules/core-js/client/core.js",
            "node_modules/tslib/tslib.js",
            "bundles/rxjs-etc-test.umd.js"
        ],
        frameworks: ["mocha"],
        logLevel: config.LOG_INFO,
        port: 9876,
        preprocessors: {},
        proxies: {},
        reporters: ["spec"]
    });
};
