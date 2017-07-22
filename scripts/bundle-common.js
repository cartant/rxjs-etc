/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

"use strict";

const browserify = require("browserify");
const fs = require("fs");

const shims = {
    "rxjs/add/observable/combineLatest": "Rx.unused",
    "rxjs/add/observable/concat": "Rx.unused",
    "rxjs/add/observable/defer": "Rx.unused",
    "rxjs/add/observable/empty": "Rx.unused",
    "rxjs/add/observable/from": "Rx.unused",
    "rxjs/add/observable/of": "Rx.unused",
    "rxjs/add/operator/concat": "Rx.unused",
    "rxjs/add/operator/concatMap": "Rx.unused",
    "rxjs/add/operator/delay": "Rx.unused",
    "rxjs/add/operator/dematerialize": "Rx.unused",
    "rxjs/add/operator/distinctUntilChanged": "Rx.unused",
    "rxjs/add/operator/do": "Rx.unused",
    "rxjs/add/operator/filter": "Rx.unused",
    "rxjs/add/operator/isEmpty": "Rx.unused",
    "rxjs/add/operator/let": "Rx.unused",
    "rxjs/add/operator/map": "Rx.unused",
    "rxjs/add/operator/mapTo": "Rx.unused",
    "rxjs/add/operator/materialize": "Rx.unused",
    "rxjs/add/operator/merge": "Rx.unused",
    "rxjs/add/operator/mergeMap": "Rx.unused",
    "rxjs/add/operator/multicast": "Rx.unused",
    "rxjs/add/operator/publish": "Rx.unused",
    "rxjs/add/operator/scan": "Rx.unused",
    "rxjs/add/operator/startWith": "Rx.unused",
    "rxjs/add/operator/switchMap": "Rx.unused",
    "rxjs/add/operator/take": "Rx.unused",
    "rxjs/add/operator/takeLast": "Rx.unused",
    "rxjs/add/operator/takeUntil": "Rx.unused",
    "rxjs/add/operator/takeWhile": "Rx.unused",
    "rxjs/add/operator/toArray": "Rx.unused",
    "rxjs/add/operator/toPromise": "Rx.unused",
    "rxjs/BehaviorSubject": "Rx",
    "rxjs/Notification": "Rx",
    "rxjs/Observable": "Rx",
    "rxjs/observable/combineLatest": "Rx.Observable",
    "rxjs/observable/concat": "Rx.Observable",
    "rxjs/observable/empty": "Rx.Observable",
    "rxjs/observable/forkJoin": "Rx.Observable",
    "rxjs/observable/merge": "Rx.Observable",
    "rxjs/observable/of": "Rx.Observable",
    "rxjs/observable/zip": "Rx.Observable",
    "rxjs/ReplaySubject": "Rx",
    "rxjs/scheduler/asap": "Rx.Scheduler",
    "rxjs/Subject": "Rx",
    "rxjs/Subscriber": "Rx",
    "rxjs/symbol/rxSubscriber": "Rx.Symbol"
};

module.exports = function (options) {

    const writeStream = fs.createWriteStream(options.bundle);

    let bundler = browserify({
        entries: options.entry,
        fullPaths: false,
        standalone: options.name
    });
    if (options.useGlobal) {
        bundler = bundler.transform(require("browserify-global-shim").configure(shims));
        writeStream.on("close", () => { verify(options.bundle); });
    }
    bundler.bundle().pipe(writeStream);
}

function verify(path) {

    const content = fs.readFileSync(path).toString();
    if (/require\s*\(\s*['"]rxjs/.test(content)) {
        throw new Error(`Found an unshimmed require in ${path}`);
    }
}
